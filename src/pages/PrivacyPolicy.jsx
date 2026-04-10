import React from 'react';
import { Link } from 'react-router-dom';

function PrivacyPolicy() {
  return (
    <div className="min-h-screen py-10 sm:py-14 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-navy hover:text-navy-light font-be-vietnam text-sm mb-6 transition-colors">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Quay lại Trang chủ
            </Link>
            <h1 className="font-be-vietnam font-bold text-2xl sm:text-3xl text-navy">
              Chính sách bảo mật
            </h1>
            <p className="font-be-vietnam text-gray-500 mt-2 text-sm">
              Cập nhật lần cuối: Tháng 4/2026
            </p>
          </div>

          <div className="prose prose-navy max-w-none font-be-vietnam text-gray-700 space-y-6">
            <section>
              <h2 className="text-xl font-bold text-navy mb-3">1. Thông tin chúng tôi thu thập</h2>
              <p>Ứng dụng thu thập các thông tin cơ bản sau:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li><strong>Thông tin người dùng:</strong> Họ tên, số điện thoại, tỉnh/thành phố, đối tượng hiện tại, và các ngành nghề quan tâm do bạn cung cấp.</li>
                <li><strong>Dữ liệu trắc nghiệm:</strong> Câu trả lời và kết quả các bài trắc nghiệm hướng nghiệp (Holland, MBTI, DISC) mà bạn thực hiện.</li>
                <li><strong>Phân tích AI:</strong> Lịch sử phiên trò chuyện hoặc các kết quả phân tích cá nhân hóa do AI cung cấp.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">2. Mục đích sử dụng thông tin</h2>
              <p>Chúng tôi sử dụng thông tin của bạn vào các mục đích:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Lưu trữ cục bộ kết quả bài kiểm tra của bạn, giúp bạn có thể xem lại kết quả ngay trên trình duyệt mà không cần tạo tài khoản.</li>
                <li>Sử dụng thông tin kết quả (phi danh tính) gửi đến API AI (như Google Gemini) nhằm sinh ra các đánh giá và nhận xét hướng nghiệp phù hợp nhất cho cá nhân bạn.</li>
                <li>Tổng hợp dữ liệu chung cho quản trị viên (có thể qua Google Sheets) để cải thiện chất lượng khảo sát của hệ thống.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">3. Lưu trữ và Bảo mật dữ liệu</h2>
              <p>
                - Dữ liệu lịch sử bài kiểm tra của bạn được <strong>lưu trữ trực tiếp trên trình duyệt (localStorage)</strong>. Điều này có nghĩa là chúng tôi không có cơ sở dữ liệu (Database) trung tâm thu thập dữ liệu nhạy cảm của bạn.<br />
                - Các lượt gọi AI được thực hiện ẩn danh, hệ thống sẽ không cung cấp thông tin cá nhân cụ thể của bạn (SĐT) cho AI ngoài kết quả bài test.<br />
                - Bất kỳ khi nào bạn xóa bộ nhớ trình duyệt (clear cache), dữ liệu này sẽ bị xóa khỏi máy của bạn.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">4. Quyền của người dùng</h2>
              <p>Bạn có toàn quyền:</p>
              <ul className="list-disc pl-5 space-y-2 mt-2">
                <li>Chỉnh sửa thông tin cá nhân bằng cách xóa dữ liệu cũ và nhập dữ liệu mới.</li>
                <li>Tham gia hoặc không tham gia việc cung cấp thông tin (bạn có quyền dừng sử dụng webapp nếu không đồng ý).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-navy mb-3">5. Thay đổi chính sách</h2>
              <p>
                Chúng tôi có quyền cập nhật hoặc thay đổi chính sách bảo mật này bất cứ lúc nào để phản ánh các thay đổi trong quy trình hoạt động hoặc quy định pháp luật.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
