
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import './HeaderWeb.css'; // Đảm bảo bạn đã tạo file CSS này

const HeaderWeb = () => {
  const [scrolled, setScrolled] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [cinemaCornerOpen, setCinemaCornerOpen] = useState(false);

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
      className={`bg-black w-full fixed top-0 left-0 z-50 transition-colors duration-300 ${
        scrolled 
        ? 'bg-transparent' 
        : 'bg-transparent'
      }`}
    >
      <div className="p-2 flex items-center justify-between">
        <div className="flex items-center">


          <Link to="" className="logo-text">ST-FLIX</Link>

        </div>
        <div className="flex items-center space-x-4 menu-container">
          <Link to="/buy-tickets" className="sticker-button">Mua vé</Link>
          <Link to="/movie" className="text-white font-medium hover:text-gray-300">Phim</Link>

          <div className="relative">
            <button 
              onClick={() => setCinemaCornerOpen(!cinemaCornerOpen)} 
              className="text-white font-medium hover:text-gray-300 cinema-corner-button"
            >
              Góc điện ảnh
            </button>
            {cinemaCornerOpen && (
              <div className="cinema-corner-menu">
                <Link to="/cinema-corner/genres" className="cinema-corner-item">Thể loại phim</Link>
                <Link to="/actor" className="cinema-corner-item">Diễn viên</Link>
              </div>
            )}
          </div>

          <Link to="/events" className="text-white font-medium hover:text-gray-300">Sự kiện</Link>
          <Link to="/cheap-tickets" className="text-white font-medium hover:text-gray-300">Rạp/giá rẻ</Link>
          <div className="relative flex-grow">
  <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 transform -translate-y-1/2 text-white"></i>
  <input 
    type="text" 
    placeholder="Tìm kiếm..." 
    className={`bg-transparent text-white border border-gray-300 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 ${
      scrolled 
      ? 'bg-black' 
      : 'bg-gray-500'
    }`}
  />
</div>

        </div>

          <div className="flex items-center space-x-2">
          <div className="relative inline-block text-left">
  <button 
    className="flex items-center justify-between w-full bg-gray-800 text-white rounded-md px-4 py-2"
    onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
  >
    Ngôn ngữ <i className="fas fa-language ml-2"></i>
  </button>
  {languageMenuOpen && (
    <div className="absolute right-0 z-10 w-full rounded-md  bg-gray-700">
      <div className="">
        <Link to="/language/vi" className="block w-full px-4 py-2 text-sm text-white hover:bg-gray-600 transition-none">Tiếng Việt</Link>
        <Link to="/language/en" className="block w-full px-4 py-2 text-sm text-white hover:bg-gray-600 transition-none">English</Link>
        {/* Thêm các ngôn ngữ khác ở đây */}
      </div>
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
