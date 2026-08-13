import { collection, getDocs, deleteDoc, doc, setDoc, query, orderBy } from 'firebase/firestore';
import { db } from './firebase';
import * as XLSX from 'xlsx';

export const ADMIN_ROLES = ['owner', 'viewer'];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeEmail(email) {
  return (email || '').trim().toLowerCase();
}

export async function fetchAdmins() {
  const snapshot = await getDocs(collection(db, 'admins'));
  return snapshot.docs
    .map(d => ({ email: d.id, role: d.data().role }))
    .sort((a, b) => a.email.localeCompare(b.email));
}

/**
 * Cấp hoặc đổi quyền cho một email. Document id là email viết thường nên
 * cấp lại cùng email sẽ ghi đè vai trò cũ thay vì tạo bản trùng.
 * Firestore Rules vẫn kiểm tra lại y hệt, phần này chỉ để báo lỗi sớm.
 */
export async function saveAdmin(email, role) {
  const normalized = normalizeEmail(email);
  if (!EMAIL_PATTERN.test(normalized)) throw new Error('Email không hợp lệ.');
  if (!ADMIN_ROLES.includes(role)) throw new Error('Vai trò không hợp lệ.');

  await setDoc(doc(db, 'admins', normalized), { role, updatedAt: new Date() }, { merge: true });
  return normalized;
}

export async function removeAdmin(email) {
  await deleteDoc(doc(db, 'admins', normalizeEmail(email)));
}

export async function fetchAllUsers() {
  const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function fetchAllTestResults() {
  const q = query(collection(db, 'test_results'), orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function deleteUser(docId) {
  await deleteDoc(doc(db, 'users', docId));
}

export async function deleteTestResult(docId) {
  await deleteDoc(doc(db, 'test_results', docId));
}

export function exportToExcel(data, filename) {
  if (!data.length) return;

  const ws = XLSX.utils.json_to_sheet(data);

  // Auto-fit column widths
  const colWidths = Object.keys(data[0]).map(key => {
    const maxLen = Math.max(
      key.length,
      ...data.map(row => {
        const val = row[key];
        return val ? String(val).length : 0;
      })
    );
    return { wch: Math.min(Math.max(maxLen + 2, 10), 50) };
  });
  ws['!cols'] = colWidths;

  // Style header row (bold + background)
  const range = XLSX.utils.decode_range(ws['!ref']);
  for (let C = range.s.c; C <= range.e.c; C++) {
    const addr = XLSX.utils.encode_cell({ r: 0, c: C });
    if (!ws[addr]) continue;
    ws[addr].s = {
      font: { bold: true, color: { rgb: 'FFFFFF' } },
      fill: { fgColor: { rgb: '334155' } },
      alignment: { horizontal: 'center' }
    };
  }

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Dữ liệu');
  XLSX.writeFile(wb, `${filename}_${new Date().toISOString().slice(0, 10)}.xlsx`);
}
