import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-navy text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
            <svg className="w-8 h-8 text-gold" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="font-be-vietnam font-bold text-xl">Hướng Nghiệp</span>
          </Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className={`font-be-vietnam font-medium transition-colors duration-200 ${
                isActive('/') ? 'text-gold' : 'hover:text-gold'
              }`}
            >
              Trang chủ
            </Link>
            <Link
              to="/select-test"
              className={`font-be-vietnam font-medium transition-colors duration-200 ${
                isActive('/select-test') ? 'text-gold' : 'hover:text-gold'
              }`}
            >
              Làm bài test
            </Link>
            <Link
              to="/history"
              className={`font-be-vietnam font-medium transition-colors duration-200 ${
                isActive('/history') ? 'text-gold' : 'hover:text-gold'
              }`}
            >
              Kết quả của tôi
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:text-gold focus:outline-none p-2 rounded-md transition-colors"
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
        <div className="md:hidden bg-navy-light animate-fadeIn">
          <div className="px-4 py-3 space-y-2">
            <Link
              to="/"
              onClick={handleLinkClick}
              className={`block px-3 py-2 rounded-md font-be-vietnam font-medium transition-colors ${
                isActive('/') ? 'text-gold bg-navy-dark' : 'hover:text-gold hover:bg-navy-dark/50'
              }`}
            >
              Trang chủ
            </Link>
            <Link
              to="/select-test"
              onClick={handleLinkClick}
              className={`block px-3 py-2 rounded-md font-be-vietnam font-medium transition-colors ${
                isActive('/select-test') ? 'text-gold bg-navy-dark' : 'hover:text-gold hover:bg-navy-dark/50'
              }`}
            >
              Làm bài test
            </Link>
            <Link
              to="/history"
              onClick={handleLinkClick}
              className={`block px-3 py-2 rounded-md font-be-vietnam font-medium transition-colors ${
                isActive('/history') ? 'text-gold bg-navy-dark' : 'hover:text-gold hover:bg-navy-dark/50'
              }`}
            >
              Kết quả của tôi
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;