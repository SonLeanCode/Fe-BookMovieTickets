import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import './HeaderWeb.css'; // Đảm bảo bạn đã tạo file CSS này

const HeaderWeb = () => {
  const [scrolled, setScrolled] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={` from-black fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled 
        ? 'bg-gradient-to-b from-black to-transparent' 
        : 'bg-gradient-to-b from-black to-transparent'
      }`}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <span className="logo-text">ST-FLIX</span>
        </div>
        <div className="flex items-center space-x-4 menu-container">
          <Link to="/buy-tickets" className="sticker-button">Mua vé</Link>
          <Link to="/movies" className="text-white font-medium hover:text-gray-300">Phim</Link>
          <Link to="/cinema-corner" className="text-white font-medium hover:text-gray-300">Góc điện ảnh</Link>
          <Link to="/events" className="text-white font-medium hover:text-gray-300">Sự kiện</Link>
          <Link to="/cheap-tickets" className="text-white font-medium hover:text-gray-300">Rạp/giá rẻ</Link>
          <div className="relative flex-grow">
            <input 
              type="text" 
              placeholder="Tìm kiếm..." 
              className={`bg-transparent text-white border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 ${
                scrolled 
                ? 'bg-black' 
                : 'bg-gray-500'
              }`}
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className={`text-white h-5 w-5 ${scrolled ? 'text-white' : 'text-gray-300'}`} />
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <button 
              className="language-button" 
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
            >
              Ngôn ngữ
            </button>
            {languageMenuOpen && (
              <div className="language-menu">
                <Link to="/language/vi" className="language-item">Tiếng Việt</Link>
                <Link to="/language/en" className="language-item">English</Link>
                {/* Thêm các ngôn ngữ khác ở đây */}
              </div>
            )}
          </div>
          <Link to="/login" className="login-button">Đăng nhập</Link>
        </div>
      </div>
    </header>
  );
}

export default HeaderWeb;
