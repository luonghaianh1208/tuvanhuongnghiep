import React from 'react';
import { Link } from 'react-router-dom';

const SCHOOL_LOGO = 'https://doantruong.chuyennguyentrai.edu.vn/wp-content/uploads/2026/02/Logo-CNT.png';
const DOAN_LOGO = 'https://doantruong.chuyennguyentrai.edu.vn/wp-content/uploads/2025/12/Huy_Hieu_Doan.png';

function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-navy via-navy-light to-navy text-white py-12 sm:py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Logos */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8">
              <img
                src={SCHOOL_LOGO}
                alt="Logo Trường THPT Chuyên Nguyễn Trãi"
                className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full object-cover bg-white p-0.5 sm:p-1 shadow-xl"
              />
              <img
                src={DOAN_LOGO}
                alt="Huy hiệu Đoàn TNCS Hồ Chí Minh"
                className="w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full object-cover bg-white p-0.5 sm:p-1 shadow-xl"
              />
            </div>

            {/* Subtitle */}
            <p className="font-be-vietnam text-gold/90 text-xs sm:text-sm md:text-base font-medium tracking-wide uppercase mb-3 sm:mb-4">
              Đoàn trường THPT Chuyên Nguyễn Trãi - Hải Phòng
            </p>

            <h1 className="font-be-vietnam font-black text-2xl sm:text-3xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 leading-tight">
              Khám phá nghề nghiệp<br />
              <span className="text-gold">phù hợp với bạn</span>
            </h1>
            <p className="font-be-vietnam text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 max-w-3xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2">
              Trang web trắc nghiệm hướng nghiệp miễn phí với 3 bộ test phổ biến nhất:
              Holland RIASEC, MBTI và DISC. Kết hợp phân tích AI để đưa ra lời khuyên
              cá nhân hóa cho tương lai của bạn.
            </p>
            <Link
              to="/select-test"
              className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-gold hover:bg-gold-dark text-navy font-be-vietnam font-bold text-sm sm:text-base lg:text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all"
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Bắt đầu trắc nghiệm miễn phí
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-10 sm:py-14 md:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-be-vietnam font-bold text-xl sm:text-2xl md:text-3xl text-navy text-center mb-8 sm:mb-12">
            Tại sao chọn chúng tôi?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-navy/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-navy" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-be-vietnam font-bold text-base sm:text-lg text-navy mb-2">3 Bộ Test Chuẩn Quốc Tế</h3>
              <p className="font-be-vietnam text-gray-600 text-xs sm:text-sm">
                Holland RIASEC, MBTI 16 personalities và DISC - được sử dụng rộng rãi trên toàn thế giới
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="font-be-vietnam font-bold text-base sm:text-lg text-navy mb-2">Phân Tích AI Miễn Phí</h3>
              <p className="font-be-vietnam text-gray-600 text-xs sm:text-sm">
                Nhận lời khuyên cá nhân hóa từ AI, lộ trình học tập và dự báo xu hướng nghề nghiệp
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 sm:p-6 shadow-md text-center sm:col-span-2 md:col-span-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                <svg className="w-7 h-7 sm:w-8 sm:h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-be-vietnam font-bold text-base sm:text-lg text-navy mb-2">Tiết Kiệm Thời Gian</h3>
              <p className="font-be-vietnam text-gray-600 text-xs sm:text-sm">
                Làm test nhanh chóng, xem kết quả ngay. Không cần đăng ký hay đăng nhập
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tests Introduction */}
      <section className="py-10 sm:py-14 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-be-vietnam font-bold text-xl sm:text-2xl md:text-3xl text-navy text-center mb-8 sm:mb-12">
            3 Bộ Trắc Nghiệm Hướng Nghiệp
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Holland */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 sm:p-6 text-white">
                <h3 className="font-be-vietnam font-bold text-lg sm:text-xl mb-1">Holland RIASEC</h3>
                <p className="font-be-vietnam text-blue-100 text-xs sm:text-sm">42 câu hỏi</p>
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {['R', 'I', 'A', 'S', 'E', 'C'].map((code) => (
                    <span key={code} className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-be-vietnam font-bold text-xs sm:text-sm">
                      {code}
                    </span>
                  ))}
                </div>
                <p className="font-be-vietnam text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
                  Xác định 6 nhóm tính cách: Thực tế, Nghiên cứu, Nghệ thuật, Xã hội, Doanh nhân, Quy củ.
                  Kết quả là mã 3 chữ cái giúp bạn khám phá nghề nghiệp phù hợp.
                </p>
                <div className="text-[10px] sm:text-xs text-gray-500">
                  <span className="font-semibold">Phù hợp:</span> Học sinh THPT, người chưa rõ định hướng
                </div>
              </div>
            </div>

            {/* MBTI */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4 sm:p-6 text-white">
                <h3 className="font-be-vietnam font-bold text-lg sm:text-xl mb-1">MBTI</h3>
                <p className="font-be-vietnam text-purple-100 text-xs sm:text-sm">16 Personality Types</p>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-4 gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {['E', 'I', 'S', 'N', 'T', 'F', 'J', 'P'].map((dim) => (
                    <span key={dim} className="w-7 h-7 sm:w-8 sm:h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-be-vietnam font-bold text-xs sm:text-sm">
                      {dim}
                    </span>
                  ))}
                </div>
                <p className="font-be-vietnam text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
                  Đo 4 chiều tính cách: Hướng ngoại/nội, Giác quan/Trực giác, Lý trí/Cảm xúc,
                  Nguyên tắc/Linh hoạt. Kết quả là 1 trong 16 personality types.
                </p>
                <div className="text-[10px] sm:text-xs text-gray-500">
                  <span className="font-semibold">Phù hợp:</span> Ai muốn hiểu rõ tính cách bản thân
                </div>
              </div>
            </div>

            {/* DISC */}
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl transition-shadow sm:col-span-2 md:col-span-1">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 sm:p-6 text-white">
                <h3 className="font-be-vietnam font-bold text-lg sm:text-xl mb-1">DISC</h3>
                <p className="font-be-vietnam text-green-100 text-xs sm:text-sm">Phong cách làm việc</p>
              </div>
              <div className="p-4 sm:p-6">
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
                  {[
                    { code: 'D', color: 'bg-red-100 text-red-700' },
                    { code: 'I', color: 'bg-yellow-100 text-yellow-700' },
                    { code: 'S', color: 'bg-green-100 text-green-700' },
                    { code: 'C', color: 'bg-blue-100 text-blue-700' }
                  ].map(({ code, color }) => (
                    <span key={code} className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-be-vietnam font-bold text-xs sm:text-sm ${color}`}>
                      {code}
                    </span>
                  ))}
                </div>
                <p className="font-be-vietnam text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">
                  Xác định 4 phong cách: Thống trị, Ảnh hưởng, Ổn định, Cẩn thận.
                  Giúp bạn hiểu cách làm việc và giao tiếp hiệu quả.
                </p>
                <div className="text-[10px] sm:text-xs text-gray-500">
                  <span className="font-semibold">Phù hợp:</span> Người muốn cải thiện kỹ năng mềm
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sample Results Preview */}
      <section className="py-10 sm:py-14 md:py-16 bg-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-be-vietnam font-bold text-xl sm:text-2xl md:text-3xl text-center mb-8 sm:mb-12">
            Xem trước kết quả mẫu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 sm:p-6">
              <h3 className="font-be-vietnam font-semibold text-gold mb-3 sm:mb-4 text-sm sm:text-base">Biểu đồ Holland RIASEC</h3>
              <div className="bg-white/5 rounded-lg p-3 sm:p-4">
                <div className="space-y-2 sm:space-y-3">
                  {[
                    { name: 'R - Thực tế', value: 75 },
                    { name: 'I - Nghiên cứu', value: 60 },
                    { name: 'A - Nghệ thuật', value: 85 },
                    { name: 'S - Xã hội', value: 45 },
                    { name: 'E - Doanh nhân', value: 55 },
                    { name: 'C - Quy củ', value: 30 }
                  ].map((item) => (
                    <div key={item.name} className="flex items-center">
                      <span className="w-24 sm:w-28 font-be-vietnam text-[10px] sm:text-xs md:text-sm text-gray-300 flex-shrink-0">{item.name}</span>
                      <div className="flex-1 h-3 sm:h-4 bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-gold rounded-full transition-all duration-500" style={{ width: `${item.value}%` }}></div>
                      </div>
                      <span className="ml-2 sm:ml-3 font-be-vietnam text-[10px] sm:text-xs md:text-sm font-medium w-8 text-right">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="font-be-vietnam text-xs sm:text-sm text-gray-300 mt-2 sm:mt-3">
                Mã Holland của bạn: <span className="text-gold font-bold">AIR</span>
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4 sm:p-6">
              <h3 className="font-be-vietnam font-semibold text-gold mb-3 sm:mb-4 text-sm sm:text-base">Nghề nghiệp gợi ý</h3>
              <div className="space-y-2 sm:space-y-3">
                {[
                  { name: 'Nhà thiết kế đồ họa', compat: 92, ai: 'Phát triển mạnh' },
                  { name: 'Kiến trúc sư', compat: 88, ai: 'Ổn định' },
                  { name: 'Game Designer', compat: 85, ai: 'Phát triển mạnh' },
                  { name: 'Nhà văn/Biên kịch', compat: 80, ai: 'Rủi ro cao' },
                  { name: 'Content Creator', compat: 78, ai: 'Phát triển mạnh' }
                ].map((career) => (
                  <div key={career.name} className="bg-white/5 rounded-lg p-2.5 sm:p-3 flex items-center justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <span className="font-be-vietnam font-medium text-white text-xs sm:text-sm block truncate">{career.name}</span>
                      <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full inline-block mt-0.5 ${
                        career.ai === 'Phát triển mạnh' ? 'bg-green-500/30 text-green-300' :
                        career.ai === 'Ổn định' ? 'bg-yellow-500/30 text-yellow-300' :
                        'bg-red-500/30 text-red-300'
                      }`}>
                        {career.ai}
                      </span>
                    </div>
                    <span className="font-be-vietnam font-bold text-gold text-sm sm:text-base flex-shrink-0">{career.compat}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-14 md:py-16 bg-gold">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-be-vietnam font-bold text-xl sm:text-2xl md:text-3xl text-navy mb-3 sm:mb-4">
            Sẵn sàng khám phá bản thân?
          </h2>
          <p className="font-be-vietnam text-navy/80 mb-6 sm:mb-8 text-sm sm:text-base">
            Làm 3 bài test hoàn toàn miễn phí và nhận phân tích AI cá nhân hóa
          </p>
          <Link
            to="/select-test"
            className="inline-flex items-center px-6 py-3 sm:px-8 sm:py-4 bg-navy hover:bg-navy-light text-white font-be-vietnam font-bold text-sm sm:text-base lg:text-lg rounded-xl shadow-lg transform hover:scale-105 transition-all"
          >
            Bắt đầu ngay
            <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;