import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

// ===== ĐỂ CẬP NHẬT PHIÊN BẢN MỚI =====
// 1. Đổi CURRENT_VERSION thành version mới (vd: 'v2.2.0')
// 2. Sửa VERSION_NAME thành tên phiên bản mới
// 3. Sửa RELEASE_DATE thành ngày phát hành mới
// 4. Cập nhật mảng CHANGELOG_ITEMS bên dưới
// =========================================

const CURRENT_VERSION = 'v2.1.1';
const VERSION_NAME = "Bộ câu hỏi chuẩn quốc tế";
const RELEASE_DATE = "10/04/2026";

const CHANGELOG_ITEMS = [
  {
    type: 'major',
    icon: '🎯',
    title: 'NÂNG CẤP LỚN',
    color: 'text-navy',
    bg: 'bg-blue-50',
    items: [
      'Toàn bộ bộ câu hỏi Holland RIASEC, MBTI, DISC đã được kiểm định lại theo chuẩn tâm lý học quốc tế',
      'Sửa 8 câu hỏi bị phân loại sai nhóm, gây kết quả không chính xác',
      'Loại bỏ câu hỏi trùng lặp, tăng độ phân biệt giữa các nhóm tính cách',
      'Điểm tương thích nghề nghiệp được tính theo thuật toán thực (không còn ngẫu nhiên)'
    ]
  },
  {
    type: 'security',
    icon: '🔒',
    title: 'BẢO MẬT',
    color: 'text-green-700',
    bg: 'bg-green-50',
    items: [
      'API key được bảo vệ hoàn toàn phía server (Netlify Function)',
      'Không còn lộ key qua DevTools'
    ]
  },
  {
    type: 'performance',
    icon: '⚡',
    title: 'HIỆU NĂNG',
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    items: [
      'Cache kết quả AI — không mất thời gian chờ khi xem lại',
      'Tự động thử lại khi mạng yếu',
      'Timeout thông minh 35 giây'
    ]
  },
  {
    type: 'feature',
    icon: '📋',
    title: 'TIỆN ÍCH',
    color: 'text-teal-700',
    bg: 'bg-teal-50',
    items: [
      'Thêm trang Chính sách bảo mật',
      'Thành phố Hải Phòng có trong danh sách địa chỉ',
      'Thêm nghề nghiệp đặc thù vùng Hải Phòng'
    ]
  }
];

function BannerChangelog() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const seenVersion = localStorage.getItem('seen_version');
    if (seenVersion !== CURRENT_VERSION) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('seen_version', CURRENT_VERSION);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity"
      onClick={handleClose}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-[520px] max-h-[90vh] flex flex-col shadow-2xl overflow-hidden font-be-vietnam animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-r from-navy to-navy-light p-6 text-white text-center">
          <button 
            onClick={handleClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            aria-label="Đóng"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="inline-flex items-center justify-center space-x-2 bg-gold/20 text-gold px-3 py-1 rounded-full text-xs font-bold mb-3 ring-1 ring-gold/40">
            <span className="w-2 h-2 rounded-full bg-gold animate-pulse"></span>
            <span>PHIÊN BẢN MỚI</span>
          </div>
          
          <h2 className="text-xl sm:text-2xl font-bold mb-1">
            Phiên bản {CURRENT_VERSION}
          </h2>
          <p className="text-base font-semibold text-gold mb-1">"{VERSION_NAME}"</p>
          <p className="text-sm text-gray-300">Cập nhật ngày {RELEASE_DATE}</p>
        </div>

        {/* Content / Changelog Items */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6 bg-gray-50/50">
          {CHANGELOG_ITEMS.map((section, idx) => (
            <div key={idx} className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-xl">{section.icon}</span>
                <h3 className={`font-bold text-sm tracking-wider uppercase ${section.color}`}>
                  {section.title}
                </h3>
              </div>
              <div className={`${section.bg} rounded-xl p-4 border border-black/5`}>
                <ul className="space-y-2">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-700">
                      <svg className={`w-5 h-5 mr-2 flex-shrink-0 ${section.color}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-white">
          <button 
            onClick={handleClose}
            className="w-full bg-gold hover:bg-gold-dark text-navy font-bold py-3.5 px-4 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center space-x-2"
          >
            <span>Đã hiểu, bắt đầu trắc nghiệm</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default BannerChangelog;
