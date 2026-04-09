const SPREADSHEET_ID = '14CcqWCX0IUeY4ozepCuZWV2Y7apjQTWWF7H8fFOX-Ew';
const SHEET_NAME = 'Data';

// Hàm này chạy MỘT LẦN DUY NHẤT để tạo cấu trúc bảng trên Google Sheets
function setupSheet() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
  }
  
  // Dọn dẹp sheet nếu muốn tạo lại mới hoàn toàn (chỉ uncomment nếu cần)
  // sheet.clear();
  
  // Thiết lập tiêu đề cột
  const headers = [
    'Thời gian tạo',
    'Họ và tên',
    'Đối tượng',
    'Số điện thoại',
    'Địa chỉ (Tỉnh/Thành phố)',
    'Ngành nghề 1',
    'Ngành nghề 2',
    'Ngành nghề 3',
    'Ngành nghề 4',
    'Ngành nghề 5'
  ];
  
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setValues([headers]);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#f3f4f6');
  
  sheet.setFrozenRows(1); // Cố định dòng 1
  
  Logger.log('Tạo bảng thành công!');
}

// Hàm xử lý khi ứng dụng React POST dữ liệu lên
function doPost(e) {
  try {
    // Lấy dữ liệu gửi lên (Dạng JSON string)
    let rawData;
    if (e.postData && e.postData.contents) {
      rawData = JSON.parse(e.postData.contents);
    } else {
      rawData = e.parameter; // Dự phòng trường hợp gửi theo content type khác
    }
    
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = ss.getSheetByName(SHEET_NAME);
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Sheet chưa được tạo. Hãy chạy hàm setupSheet() trước.'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    const careers = Array.isArray(rawData.careers) ? rawData.careers : [];
    
    // Tách ngành nghề theo chiều dọc ra các cột ngang
    const c1 = careers.length > 0 ? careers[0] : '';
    const c2 = careers.length > 1 ? careers[1] : '';
    const c3 = careers.length > 2 ? careers[2] : '';
    const c4 = careers.length > 3 ? careers[3] : '';
    const c5 = careers.length > 4 ? careers[4] : '';
    
    // Những ngành nghề từ thứ 6 trở đi sẽ rải tiếp phía sau
    const restCareers = careers.length > 5 ? careers.slice(5) : [];
    
    // Chuẩn bị dữ liệu để ghi vào dòng mới
    let rowData = [
      rawData.createdAt || new Date().toISOString(),
      rawData.name || '',
      rawData.role || '',
      rawData.phone || '',
      rawData.province || '',
      c1,
      c2,
      c3,
      c4,
      c5,
      ...restCareers
    ];
    
    sheet.appendRow(rowData);
    
    return ContentService.createTextOutput(JSON.stringify({
       status: 'success',
       message: 'Đã thêm dữ liệu thành công'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({
       status: 'error',
       message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
