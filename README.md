# Tư Vấn Hướng Nghiệp - Trang Web Trắc Nghiệm

Trang web trắc nghiệm hướng nghiệp tích hợp 3 bộ test (Holland RIASEC, MBTI, DISC), phân tích kết quả bằng thuật toán, và có tùy chọn phân tích nâng cao bằng AI hoàn toàn miễn phí.

## Tính năng

- **3 bộ trắc nghiệm**: Holland RIASEC, MBTI (16 personalities), DISC
- **Phân tích AI miễn phí**: Sử dụng Google Gemini API để phân tích chuyên sâu
- **Không cần đăng nhập**: Lưu kết quả trong localStorage
- **Giao diện tiếng Việt**: Phù hợp học sinh THPT
- **Mobile responsive**: Hoạt động tốt trên mọi thiết bị
- **AI insights**: Nhận xét về triển vọng nghề nghiệp trong thời đại AI

## Cài đặt

### Yêu cầu

- Node.js 18+
- npm hoặc yarn

### Các bước cài đặt

1. **Clone/Download project** vào thư mục của bạn

2. **Cài đặt dependencies**:
   ```bash
   npm install
   ```

3. **Lấy API Key Gemini** (miễn phí):
   - Truy cập [aistudio.google.com](https://aistudio.google.com)
   - Đăng nhập bằng tài khoản Google
   - Vào mục "Get API key" → "Create API key"
   - Copy API key

4. **Tạo file .env** (từ .env.example):
   ```bash
   cp .env.example .env
   ```
   Sau đó thay `your_key_here` bằng API key của bạn:
   ```
   VITE_GEMINI_API_KEY=AIzaSy...
   ```

5. **Chạy development server**:
   ```bash
   npm run dev
   ```

6. **Mở trình duyệt**: http://localhost:3000

## Cấu trúc project

```
src/
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── quiz/           # QuestionCard, ProgressBar, AnswerOptions
│   └── results/        # Result components for each test type
├── data/
│   ├── questions/       # Câu hỏi trắc nghiệm (42 Holland, 60 MBTI, 28 DISC)
│   ├── careers.js      # 50+ nghề nghiệp
│   └── mbti-profiles.js # 16 profiles MBTI
├── lib/
│   ├── scoring.js      # Thuật toán tính điểm
│   ├── gemini-api.js   # Gọi Gemini API
│   └── storage.js      # localStorage helpers
└── pages/
    ├── HomePage.jsx    # Landing page
    ├── TestSelectPage.jsx
    ├── QuizPage.jsx
    ├── ResultPage.jsx
    └── HistoryPage.jsx
```

## Cách sử dụng

1. **Trang chủ**: Xem giới thiệu về 3 bài test, bấm "Bắt đầu trắc nghiệm"

2. **Chọn bài test**: Chọn 1 hoặc nhiều bài test muốn làm

3. **Làm bài**:
   - Mỗi câu hỏi hiển thị một, có nút Trước/ Tiếp theo
   - Thanh tiến trình hiển thị % hoàn thành
   - Có thể tạm dừng và quay lại sau (được lưu tự động)

4. **Xem kết quả**:
   - Kết quả từng bài test với biểu đồ
   - Top nghề phù hợp cho từng loại tính cách
   - Nhãn "Triển vọng trong thời đại AI" cho từng nghề

5. **Phân tích AI** (miễn phí):
   - Bấm "Phân tích chuyên sâu bằng AI"
   - Xem phân tích điểm mạnh, lộ trình học tập, dự báo xu hướng
   - Chat thêm 5 lượt với AI về kết quả

6. **Lịch sử**: Xem lại các lần làm bài trước trong "Kết quả của tôi"

## Các bài test

### Holland RIASEC (42 câu)
- 6 nhóm tính cách: R (Thực tế), I (Nghiên cứu), A (Nghệ thuật), S (Xã hội), E (Doanh nhân), C (Quy củ)
- Mỗi nhóm 7 câu hỏi, thang điểm 1-5
- Kết quả: Mã Holland 3 chữ (vd: IAS, SEC) + 10-15 nghề phù hợp

### MBTI (60 câu)
- 4 chiều: E/I, S/N, T/F, J/P
- 16 personality types
- Mỗi câu chọn 1 trong 2 phương án

### DISC (28 câu)
- 4 nhóm: D (Thống trị), I (Ảnh hưởng), S (Ổn định), C (Cẩn thận)
- Mỗi nhóm 7 câu, thang điểm 1-5
- Xác định phong cách chủ đạo và phụ

## Triển vọng AI

Mỗi nghề trong database có đánh giá triển vọng AI:
- **Phát triển mạnh**: Nghề sẽ thịnh vượng nhờ AI
- **Ổn định**: Nghề ít bị AI ảnh hưởng
- **Rủi ro cao**: Nghề có nguy cơ bị AI thay thế

## Công nghệ

- React 18 + Vite
- Tailwind CSS
- Recharts (biểu đồ)
- Google Gemini API
- localStorage (lưu trữ phía client)

## License

MIT