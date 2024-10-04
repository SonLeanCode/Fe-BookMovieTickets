import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';

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
      className={`w-full fixed top-0 left-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-black' : 'bg-black bg-opacity-20'
      }`}
    >
      <div className="p-2 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="font-montserrat text-7xl font-bold text-transparent bg-gradient-to-r from-red-600 via-red-300 to-red-600 bg-clip-text relative ml-16 animate-sparkle">
            ST-FLIX
          </Link>
        </div>
        <div className="flex items-center space-x-4">
        <Link 
          to="/buy-tickets" 
          className="bg-red-600 text-white py-2 px-6 font-bold relative" 
          style={{ clipPath: 'polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)' }}
        >
          Mua vé
        </Link>

          <Link to="/movie" className="text-white font-medium hover:text-gray-300">Phim</Link>
          <div className="relative">
            <button 
              onClick={() => setCinemaCornerOpen(!cinemaCornerOpen)} 
              className="text-white font-medium hover:text-gray-300 cinema-corner-button"
            >
              Góc điện ảnh
            </button>
            {cinemaCornerOpen && (
              <div className="absolute left-0 flex flex-col bg-gray-700 rounded-md shadow-md">
                <Link 
                  to="/cinema-corner/genres" 
                  className="text-white px-4 py-2 whitespace-nowrap hover:bg-gray-600 "
                >
                  Thể loại phim
                </Link>
                <Link 
                  to="/actor" 
                  className="text-white px-4 py-2 whitespace-nowrap hover:bg-gray-600 "
                >
                  Diễn viên
                </Link>
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
              <div className="absolute right-0 z-10 w-full rounded-md bg-gray-800">
                <Link to="/language/vi" className="block w-full px-4 py-2 text-sm text-white hover:bg-gray-700 transition-none">Tiếng Việt</Link>
                <Link to="/language/en" className="block w-full px-4 py-2 text-sm text-white hover:bg-gray-700 transition-none">English</Link>
              </div>
            )}
          </div>
          <Link to="/login" className="bg-red-600 text-white py-2 px-4 rounded-md font-bold transition-transform duration-300 hover:bg-red-700 transform hover:scale-105">
            Đăng nhập
          </Link>
        </div>
      </div>
    </header>
  );
}

export default HeaderWeb;
