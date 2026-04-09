import React from 'react';
import { Link } from 'react-router-dom';

const SCHOOL_LOGO = 'https://doantruong.chuyennguyentrai.edu.vn/wp-content/uploads/2026/02/Logo-CNT.png';
const DOAN_LOGO = 'https://doantruong.chuyennguyentrai.edu.vn/wp-content/uploads/2025/12/Huy_Hieu_Doan.png';

function Footer() {
  return (
    <footer className="bg-navy-dark text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">

          {/* Organization Info with Logos */}
          <div className="sm:col-span-2 lg:col-span-2">
            <div className="flex items-center gap-3 sm:gap-4 mb-4">
              <img
                src={SCHOOL_LOGO}
                alt="Logo Trường THPT Chuyên Nguyễn Trãi"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover bg-white p-0.5 shadow-lg flex-shrink-0"
              />
              <img
                src={DOAN_LOGO}
                alt="Huy hiệu Đoàn TNCS Hồ Chí Minh"
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full object-cover bg-white p-0.5 shadow-lg flex-shrink-0"
              />
              <div className="min-w-0">
                <h3 className="font-be-vietnam font-bold text-sm sm:text-base lg:text-lg text-gold leading-tight">
                  Đoàn trường THPT Chuyên Nguyễn Trãi
                </h3>
                <p className="font-be-vietnam text-gray-400 text-xs sm:text-sm mt-0.5">
                  Tư vấn hướng nghiệp cho học sinh
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-2 mb-3">
              <svg className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <p className="font-be-vietnam text-gray-300 text-xs sm:text-sm leading-relaxed">
                Đường Nguyễn Văn Linh, Phường Lê Thanh Nghị, TP Hải Phòng
              </p>
            </div>

            {/* Description */}
            <p className="font-be-vietnam text-gray-400 text-xs sm:text-sm leading-relaxed">
              Trang web trắc nghiệm hướng nghiệp tích hợp 3 bộ test Holland RIASEC, MBTI, DISC 
              cùng phân tích AI để giúp học sinh khám phá nghề nghiệp phù hợp.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-be-vietnam font-semibold text-gold mb-3 sm:mb-4 text-sm sm:text-base">
              Liên kết nhanh
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="font-be-vietnam text-gray-300 hover:text-white text-xs sm:text-sm transition-colors inline-flex items-center gap-1.5">
                  <span className="text-gold/60">→</span> Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/select-test" className="font-be-vietnam text-gray-300 hover:text-white text-xs sm:text-sm transition-colors inline-flex items-center gap-1.5">
                  <span className="text-gold/60">→</span> Làm bài trắc nghiệm
                </Link>
              </li>
              <li>
                <Link to="/history" className="font-be-vietnam text-gray-300 hover:text-white text-xs sm:text-sm transition-colors inline-flex items-center gap-1.5">
                  <span className="text-gold/60">→</span> Kết quả của tôi
                </Link>
              </li>
            </ul>
          </div>

          {/* About Tests */}
          <div>
            <h3 className="font-be-vietnam font-semibold text-gold mb-3 sm:mb-4 text-sm sm:text-base">
              Các bài test
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-300 font-be-vietnam">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></span>
                Holland RIASEC
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></span>
                MBTI - 16 personalities
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full flex-shrink-0"></span>
                DISC - Phong cách làm việc
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar - Copyright & Developer */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4">
            <p className="font-be-vietnam text-gray-400 text-[11px] sm:text-xs text-center sm:text-left">
              © 2026 Đoàn trường THPT Chuyên Nguyễn Trãi. Phân tích AI bằng Gemini API.
            </p>
            <p className="font-be-vietnam text-gray-500 text-[11px] sm:text-xs text-center sm:text-right">
              Phát triển bởi{' '}
              <span className="text-gold/80 font-medium">thầy giáo Lương Hải Anh</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;