/**
 * Script import dữ liệu từ Google Sheets CSV vào Firebase Firestore
 * 
 * Chạy: node scripts/import-csv-to-firestore.js
 * 
 * Lưu ý: 
 * - Firestore Security Rules chặn write từ client, nhưng script này
 *   dùng Firebase Admin SDK (server-side) nên bypass rules.
 * - Cần file service account key từ Firebase Console.
 */

import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ============================================================
// CẤU HÌNH - Sửa đường dẫn file nếu cần
// ============================================================
const CSV_FILE = join(__dirname, '..', 'Thông tin tư vấn hướng nghiệp - DanhSach.csv');
const SERVICE_ACCOUNT_FILE = join(__dirname, '..', 'serviceAccountKey.json');
const COLLECTION = 'users';
const BATCH_SIZE = 400; // Firestore cho phép max 500 writes/batch

// ============================================================
// KHỞI TẠO FIREBASE ADMIN
// ============================================================
let app;
try {
  const serviceAccount = JSON.parse(readFileSync(SERVICE_ACCOUNT_FILE, 'utf8'));
  app = initializeApp({ credential: cert(serviceAccount) });
} catch (err) {
  console.error('❌ Không tìm thấy file serviceAccountKey.json!');
  console.error('');
  console.error('Hướng dẫn tải:');
  console.error('  1. Vào https://console.firebase.google.com/project/tuvan-huong-nghiep/settings/serviceaccounts/adminsdk');
  console.error('  2. Click "Générer une nouvelle clé privée" (Generate new private key)');
  console.error('  3. Lưu file JSON vào thư mục gốc project với tên: serviceAccountKey.json');
  console.error('  4. Chạy lại script này');
  process.exit(1);
}

const db = getFirestore(app);

// ============================================================
// PARSE CSV
// ============================================================
function parseCSV(filePath) {
  const raw = readFileSync(filePath, 'utf8');
  const lines = raw.split('\n').filter(line => line.trim());

  // Header line
  const header = lines[0].replace(/\r$/, '');
  console.log('📋 Header:', header);

  const records = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].replace(/\r$/, '');
    if (!line.trim()) continue;

    // Parse CSV (xử lý dấu phẩy trong quotes)
    const cols = parseCSVLine(line);

    // Cột: timestamp, name, role, phone, province, ngành1-10, testHolland, maHolland, testMBTI, maMBTI, testDISC, phongCachDISC, ketQuaAI
    const timestamp = cols[0] || '';
    const name = (cols[1] || '').trim();
    const role = (cols[2] || '').trim();
    const phone = (cols[3] || '').trim();
    const province = (cols[4] || '').trim();

    // Gom ngành nghề (cột 5-14, tức index 5 đến 14)
    const careers = [];
    for (let j = 5; j <= 14; j++) {
      const career = (cols[j] || '').trim();
      if (career && career !== '...' && career !== '…' && career !== '...') {
        careers.push(career);
      }
    }

    // Skip dòng không hợp lệ
    if (!name || !phone) {
      console.warn(`⚠️  Bỏ qua dòng ${i + 1}: thiếu tên hoặc SĐT`);
      continue;
    }

    records.push({
      name,
      phone,
      province,
      role,
      careers,
      birthYear: null,   // Không có trong GAS
      school: '',        // Không có trong GAS
      createdAt: timestamp ? new Date(timestamp) : new Date(),
      source: 'google_sheets_import',
      deviceId: `imported_${i}`  // Fake deviceId cho data cũ
    });
  }

  return records;
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

// ============================================================
// IMPORT VÀO FIRESTORE
// ============================================================
async function importToFirestore(records) {
  console.log(`\n🚀 Bắt đầu import ${records.length} bản ghi vào Firestore...`);

  let imported = 0;
  let failed = 0;

  // Chia thành batches
  for (let i = 0; i < records.length; i += BATCH_SIZE) {
    const batch = db.batch();
    const chunk = records.slice(i, i + BATCH_SIZE);

    for (const record of chunk) {
      const docRef = db.collection(COLLECTION).doc();
      batch.set(docRef, {
        ...record,
        createdAt: record.createdAt // Admin SDK tự convert Date → Timestamp
      });
    }

    try {
      await batch.commit();
      imported += chunk.length;
      console.log(`  ✅ Batch ${Math.floor(i / BATCH_SIZE) + 1}: ${chunk.length} bản ghi (${imported}/${records.length})`);
    } catch (err) {
      failed += chunk.length;
      console.error(`  ❌ Batch ${Math.floor(i / BATCH_SIZE) + 1} thất bại:`, err.message);
    }
  }

  console.log(`\n📊 Kết quả:`);
  console.log(`  ✅ Thành công: ${imported}`);
  console.log(`  ❌ Thất bại:   ${failed}`);
  console.log(`  📦 Tổng:       ${records.length}`);
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  console.log('='.repeat(50));
  console.log('📥 IMPORT CSV → FIRESTORE');
  console.log('='.repeat(50));

  const records = parseCSV(CSV_FILE);
  console.log(`\n📄 Đọc được ${records.length} bản ghi từ CSV`);

  // Preview 3 bản ghi đầu
  console.log('\n🔍 Preview 3 bản ghi đầu:');
  records.slice(0, 3).forEach((r, i) => {
    console.log(`  ${i + 1}. ${r.name} | ${r.phone} | ${r.province} | [${r.careers.join(', ')}]`);
  });

  // Hỏi xác nhận
  console.log(`\n⚡ Sẽ import ${records.length} bản ghi vào collection "${COLLECTION}"...`);

  await importToFirestore(records);

  console.log('\n✨ Hoàn tất!');
  process.exit(0);
}

main().catch(err => {
  console.error('💥 Lỗi:', err);
  process.exit(1);
});
