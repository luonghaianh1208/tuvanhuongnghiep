# AI Career Counseling Platform 🚀

Một nền tảng tư vấn hướng nghiệp toàn diện, tích hợp trí tuệ nhân tạo (AI Gemini), giúp học sinh, sinh viên và người đi làm khám phá thế mạnh bản thân và định hướng sự nghiệp phù hợp. Dự án cung cấp cả giao diện cho người dùng (làm test, nhận phân tích AI) và trang quản trị (Admin Dashboard) để thống kê kết quả.

## ✨ Tính Năng Nổi Bật

### 🧑‍🎓 Dành Cho Người Dùng (Client)
- **Hệ thống bài test chuẩn quốc tế**: Tích hợp các bộ câu hỏi phổ biến và uy tín (Holland RIASEC, MBTI, DISC).
- **Phân tích AI chuyên sâu**: Tự động tổng hợp kết quả các bài test và yêu cầu AI phân tích chi tiết (Điểm mạnh, Top 3 nghề phù hợp, Lộ trình học tập, Kỹ năng cần thiết, Cảnh báo đào thải của AI).
- **Đánh giá nghề nghiệp mong muốn**: AI sẽ đối chiếu ngành nghề user quan tâm lúc đăng ký với kết quả test để đưa ra tư vấn mức độ phù hợp và triển vọng 5-10 năm tới.
- **Tính toán Local & Lưu trữ đa nền tảng**: Xử lý logic offline, lưu trữ dữ liệu đồng bộ qua Firebase Firestore.
- **Trải nghiệm mượt mà, Dark Theme UI**: Giao diện trẻ trung, hiện đại theo thiết kế GenZ, hỗ trợ render Markdown format.

### 👑 Dành Cho Quản Trị Viên (Admin)
- **Đăng nhập an toàn**: Tích hợp bảo mật Firebase Google Auth (chỉ cho phép admin được chỉ định).
- **Dashboard Tổng Quan**: Trực quan hóa số liệu lượng người dùng, biểu đồ xu hướng theo ngày.
- **Thống kê chuyên sâu (Analytics)**: Cung cấp biểu đồ trực quan (Recharts) theo từng nhóm ngành cho riêng các bài test Holland, MBTI và DISC.
- **Quản lý Dữ liệu**: Theo dõi danh sách người dùng, xem chi tiết bài test của từng cá nhân.
- **Xuất dữ liệu thông minh**: Hỗ trợ xuất dữ liệu Test và User ra định dạng Excel (.xlsx) với format chuẩn.

## 🛠️ Công Nghệ Sử Dụng

- **Frontend**: React 18, Vite, Tailwind CSS v4, Framer Motion
- **Chart/Data**: Recharts, SheetJS (XLSX)
- **Backend/BaaS**: Firebase (Firestore Database, Authentication)
- **AI Integration**: Google Gemini 2.5 Flash API (Tích hợp qua Netlify Functions giúp bảo mật API Key)
- **Deploy**: Netlify

## 🚀 Hướng Dẫn Cài Đặt

### 1. Yêu cầu hệ thống
- Node.js bản mới nhất (khuyến nghị >= 18.x)
- Tài khoản Firebase (để tạo project web)
- Tài khoản Google Studio / Gemini API Key

### 2. Cài đặt chi tiết
1. Clone repository về máy:
   ```bash
   git clone https://github.com/luonghaianh1208/tuvanhuongnghiep.git
   cd tuvanhuongnghiep
   ```

2. Cài đặt các thư viện phụ thuộc:
   ```bash
   npm install
   ```

3. Thiết lập biến môi trường:
   - Tạo file `.env.local` tại thư mục gốc của project (ngang hàng với `package.json`).
   - Khai báo các thông tin sau:
     ```env
     # Firebase Config (Lấy từ Firebase Console)
     VITE_FIREBASE_API_KEY=your_firebase_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     
     # Gemini API Key (Không bắt buộc lấy trực tiếp nếu dùng qua Netlify proxy ở production)
     VITE_GEMINI_API_KEY=your_gemini_api_key

     # Chỉ định email Admin có quyền truy cập Dashboard
     VITE_ADMIN_EMAIL=your_admin_email@example.com
     ```

4. Khởi chạy máy chủ phát triển cục bộ:
   ```bash
   npm run dev
   ```

5. Ứng dụng sẽ chạy tại địa chỉ: `http://localhost:5173`

## 🔒 Firebase Security Rules
Để bảo mật trang Admin, vui lòng cập nhật rules sau lên Firestore Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /test_results/{document=**} {
      // Cho phép mọi người read/write trên data cá nhân
      allow read, write: if true;
      // Chỉ Admin được xóa
      allow delete: if request.auth != null && request.auth.token.email == "your_admin_email@example.com";
    }
    match /users/{document=**} {
      allow read, write: if true;
      allow delete: if request.auth != null && request.auth.token.email == "your_admin_email@example.com";
    }
  }
}
```

## 📄 Giấy phép Bản Quyền (License)

Dự án này được phân phối dưới giấy phép **MIT License**.
Bản quyền © 2026 thuộc về **LƯƠNG HẢI ANH**.
Xem chi tiết các quyền lợi và giới hạn tại file [LICENSE](./LICENSE).