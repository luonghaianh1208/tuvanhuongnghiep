import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SCHOOL_LOGO = 'https://doantruong.chuyennguyentrai.edu.vn/wp-content/uploads/2026/02/Logo-CNT.png';

function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-navy text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0" onClick={handleLinkClick}>
            <img
              src={SCHOOL_LOGO}
              alt="Logo Trường THPT Chuyên Nguyễn Trãi"
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover bg-white p-0.5 shadow-md"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-be-vietnam font-bold text-sm sm:text-base lg:text-lg">Hướng Nghiệp</span>
              <span className="font-be-vietnam text-[9px] sm:text-[10px] text-gold/80 hidden xs:block">Chuyên Nguyễn Trãi</span>
            </div>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link
              to="/"
              className={`font-be-vietnam font-medium text-sm lg:text-base transition-colors duration-200 ${
                isActive('/') ? 'text-gold' : 'hover:text-gold'
              }`}
            >
              Trang chủ
            </Link>
            <Link
              to="/select-test"
              className={`font-be-vietnam font-medium text-sm lg:text-base transition-colors duration-200 ${
                isActive('/select-test') ? 'text-gold' : 'hover:text-gold'
              }`}
            >
              Làm bài test
            </Link>
            <Link
              to="/history"
              className={`font-be-vietnam font-medium text-sm lg:text-base transition-colors duration-200 ${
                isActive('/history') ? 'text-gold' : 'hover:text-gold'
              }`}
            >
              Kết quả của tôi
            </Link>
            <Link
              to="/academic-disclaimer"
              className={`font-be-vietnam font-medium text-sm lg:text-base transition-colors duration-200 ${
                isActive('/academic-disclaimer') ? 'text-gold' : 'hover:text-gold'
              }`}
            >
              Tuyên bố học thuật
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-gold focus:outline-none p-1.5 sm:p-2 rounded-md transition-colors"
              aria-label={mobileMenuOpen ? 'Đóng menu' : 'Mở menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - toggle visibility */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-navy-light animate-fadeIn border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            <Link
              to="/"
              onClick={handleLinkClick}
              className={`block px-3 py-2.5 rounded-lg font-be-vietnam font-medium text-sm transition-colors ${
                isActive('/') ? 'text-gold bg-navy-dark' : 'hover:text-gold hover:bg-navy-dark/50'
              }`}
            >
              🏠 Trang chủ
            </Link>
            <Link
              to="/select-test"
              onClick={handleLinkClick}
              className={`block px-3 py-2.5 rounded-lg font-be-vietnam font-medium text-sm transition-colors ${
                isActive('/select-test') ? 'text-gold bg-navy-dark' : 'hover:text-gold hover:bg-navy-dark/50'
              }`}
            >
              📝 Làm bài test
            </Link>
            <Link
              to="/history"
              onClick={handleLinkClick}
              className={`block px-3 py-2.5 rounded-lg font-be-vietnam font-medium text-sm transition-colors ${
                isActive('/history') ? 'text-gold bg-navy-dark' : 'hover:text-gold hover:bg-navy-dark/50'
              }`}
            >
              📊 Kết quả của tôi
            </Link>
            <Link
              to="/academic-disclaimer"
              onClick={handleLinkClick}
              className={`block px-3 py-2.5 rounded-lg font-be-vietnam font-medium text-sm transition-colors ${
                isActive('/academic-disclaimer') ? 'text-gold bg-navy-dark' : 'hover:text-gold hover:bg-navy-dark/50'
              }`}
            >
              📚 Tuyên bố học thuật
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;