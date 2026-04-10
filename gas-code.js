// ============================================================
// GOOGLE APPS SCRIPT - LƯU DỮ LIỆU TRẮC NGHIỆM HƯỚNG NGHIỆP
// Sheet ID: 19UBQpSiVZg3IQVe91GHHWNA1BjkS1e2L_MRkCT4B9Es
// ============================================================

// ---- HÀM TẠO BẢNG (CHẠY 1 LẦN DUY NHẤT) ----
function createSpreadsheetStructure() {
  const sheetId = '19UBQpSiVZg3IQVe91GHHWNA1BjkS1e2L_MRkCT4B9Es';
  const ss = SpreadsheetApp.openById(sheetId);

  // Xóa sheet cũ nếu có
  const existingSheet = ss.getSheetByName('DanhSach');
  if (existingSheet) {
    ss.deleteSheet(existingSheet);
  }

  // Tạo sheet mới
  const sheet = ss.insertSheet('DanhSach');

  // Set header row
  const headers = [
    'Thời gian',
    'Họ và tên',
    'Đối tượng',
    'SĐT',
    'Tỉnh/TP',
    'Ngành 1',
    'Ngành 2',
    'Ngành 3',
    'Ngành 4',
    'Ngành 5',
    'Ngành 6',
    'Ngành 7',
    'Ngành 8',
    'Ngành 9',
    'Ngành 10',
    'Test Holland',
    'Mã Holland',
    'Test MBTI',
    'Mã MBTI',
    'Test DISC',
    'Phong cách DISC',
    'Kết quả AI'
  ];

  // Set widths
  sheet.setColumnWidth(1, 180); // Thời gian
  sheet.setColumnWidth(2, 200); // Họ và tên
  sheet.setColumnWidth(3, 150); // Đối tượng
  sheet.setColumnWidth(4, 120); // SĐT
  sheet.setColumnWidth(5, 150); // Tỉnh/TP
  sheet.setColumnWidth(6, 200); // Ngành 1
  sheet.setColumnWidth(7, 200); // Ngành 2
  sheet.setColumnWidth(8, 200); // Ngành 3
  sheet.setColumnWidth(9, 200); // Ngành 4
  sheet.setColumnWidth(10, 200); // Ngành 5
  sheet.setColumnWidth(11, 200); // Ngành 6
  sheet.setColumnWidth(12, 200); // Ngành 7
  sheet.setColumnWidth(13, 200); // Ngành 8
  sheet.setColumnWidth(14, 200); // Ngành 9
  sheet.setColumnWidth(15, 200); // Ngành 10

  // Format header row
  sheet.getRange(1, 1, 1, headers.length)
    .setValues([headers])
    .setFontWeight('bold')
    .setBackground('#1e3a5f')
    .setFontColor('#ffffff')
    .setFontSize(11)
    .setFontFamily('Be Vietnam Pro')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');

  // Freeze header row
  sheet.setFrozenRows(1);

  // Add data validation for Đối tượng column (column 3)
  const validationRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(['HS tiểu học', 'HS Trung học cơ sở', 'HS Trung học phổ thông', 'Sinh viên', 'Khác'], true)
    .build();
  sheet.getRange('C2:C1000').setDataValidation(validationRule);

  // Protect header row
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.protect().setDescription('Protected header row');

  Logger.log('Đã tạo bảng thành công! Sheet: DanhSach');
  return sheet.getName() + ' đã sẵn sàng!';
}


// ---- HÀM NHẬN DỮ LIỆU TỪ APP (WEB APP) ----
function doPost(e) {
  try {
    const sheetId = '19UBQpSiVZg3IQVe91GHHWNA1BjkS1e2L_MRkCT4B9Es';
    const ss = SpreadsheetApp.openById(sheetId);
    let sheet = ss.getSheetByName('DanhSach');

    // Nếu chưa có sheet thì tạo
    if (!sheet) {
      sheet = ss.insertSheet('DanhSach');
    }

    // Parse JSON từ request
    const jsonData = JSON.parse(e.postData.contents);
    const {
      timestamp,
      name,
      role,
      phone,
      province,
      careers, // Array
      testsCompleted,
      hollandCode,
      mbtiType,
      discStyle,
      aiAnalysis
    } = jsonData;

    // Chuẩn bị row data
    // Các cột: Thời gian, Họ tên, Đối tượng, SĐT, Tỉnh/TP, Ngành 1-10, Holland, MBTI, DISC, AI
    const rowData = [
      timestamp || new Date().toISOString(),
      name || '',
      role || '',
      phone || '',
      province || ''
    ];

    // Thêm ngành nghề (tối đa 10)
    for (let i = 0; i < 10; i++) {
      rowData.push(careers && careers[i] ? careers[i] : '');
    }

    // Thêm kết quả test
    const hasHolland = testsCompleted && testsCompleted.includes('holland');
    const hasMBTI = testsCompleted && testsCompleted.includes('mbti');
    const hasDISC = testsCompleted && testsCompleted.includes('disc');

    rowData.push(hasHolland ? '✓' : '');
    rowData.push(hasHolland && hollandCode ? hollandCode : '');

    rowData.push(hasMBTI ? '✓' : '');
    rowData.push(hasMBTI && mbtiType ? mbtiType : '');

    rowData.push(hasDISC ? '✓' : '');
    rowData.push(hasDISC && discStyle ? discStyle : '');

    // AI Analysis (cắt ngắn nếu quá dài - giới hạn cell 50000 chars)
    let aiText = aiAnalysis || '';
    if (aiText.length > 50000) {
      aiText = aiText.substring(0, 49997) + '...';
    }
    rowData.push(aiText);

    // Append row
    sheet.appendRow(rowData);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Đã lưu!' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


// ---- HÀM GET (ĐỂ TEST) ----
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'GAS đang hoạt động!' }))
    .setMimeType(ContentService.MimeType.JSON);
}


// ============================================================
// HƯỚNG DẪN DEPLOY
// ============================================================
/*
1. Mở Google Sheets có ID: 14CcqWCX0IUeY4ozepCuZWV2Y7apjQTWWF7H8fFOX-Ew

2. Vào Extensions > Apps Script

3. Copy toàn bộ code này vào Code.gs

4. Chạy hàm createSpreadsheetStructure() để tạo bảng (chỉ chạy 1 lần)

5. Deploy > New deployment > Web app
   - Description: Career Test API
   - Execute as: Me
   - Who has access: Anyone

6. Copy URL web app (dạng: https://script.google.com/macros/s/XXX/exec)
   Paste vào file .env của React app:
   VITE_GAS_WEBAPP_URL=https://script.google.com/macros/s/XXX/exec

7. Trong React app, import hàm gửi dữ liệu:
   import { submitToGoogleSheet } from './lib/google-sheets';

   Gọi khi user nhấn nút trong form:
   await submitToGoogleSheet(userInfo, testResults, aiAnalysis);
*/