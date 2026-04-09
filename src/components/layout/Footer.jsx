import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-navy-dark text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <svg className="w-6 h-6 text-gold" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="font-be-vietnam font-bold text-lg">Tư Vấn Hướng Nghiệp</span>
            </div>
            <p className="font-be-vietnam text-gray-300 text-sm">
              Khám phá nghề nghiệp phù hợp với bạn thông qua 3 bộ trắc nghiệm tâm lý phổ biến nhất: Holland RIASEC, MBTI và DISC.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-be-vietnam font-semibold text-gold mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="font-be-vietnam text-gray-300 hover:text-white text-sm transition-colors">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link to="/select-test" className="font-be-vietnam text-gray-300 hover:text-white text-sm transition-colors">
                  Làm bài trắc nghiệm
                </Link>
              </li>
              <li>
                <Link to="/history" className="font-be-vietnam text-gray-300 hover:text-white text-sm transition-colors">
                  Kết quả của tôi
                </Link>
              </li>
            </ul>
          </div>

          {/* About Tests */}
          <div>
            <h3 className="font-be-vietnam font-semibold text-gold mb-4">Về các bài test</h3>
            <ul className="space-y-2 text-sm text-gray-300 font-be-vietnam">
              <li>• Holland RIASEC - Khám phá nhóm tính cách</li>
              <li>• MBTI - 16 personalities</li>
              <li>• DISC - Phong cách làm việc</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="font-be-vietnam text-gray-400 text-sm">
            © 2025 Tư Vấn Hướng Nghiệp. Phân tích AI miễn phí bằng Gemini API.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;