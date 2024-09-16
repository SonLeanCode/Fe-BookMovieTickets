import { FaFilm, FaSearch } from "react-icons/fa";
import { Input, Button } from "react-daisyui";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from 'react';

const HeaderWeb = () => {
  const [scrolled, setScrolled] = useState(false);

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
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        scrolled 
        ? 'bg-gradient-to-b from-black to-transparent' 
        : 'bg-gradient-to-b from-gray-500 to-transparent'
      }`}
    >
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src="https://openui.fly.dev/openui/24x24.svg?text=⭐" alt="BHD Cineplex Logo" className="h-8 w-8 mr-2" />
          <span className="text-green-500 font-bold text-lg">Book MovieTickets</span>
        </div>
        <div className="flex space-x-4">
          <button className="text-white font-medium hover:text-gray-300">Mua vé</button>
          <button className="text-white font-medium hover:text-gray-300">Lịch chiếu</button>
          <button className="text-white font-medium hover:text-gray-300">Hệ thống rạp</button>
          <button className="text-white font-medium hover:text-gray-300">Cửa hàng</button>
          <button className="text-white font-medium hover:text-gray-300">Khuyến mãi/Sự kiện</button>
          <button className="text-white font-medium hover:text-gray-300">Khác</button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative w-full">
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
          <div className="relative inline-block text-left">
            <select className="bg-white text-black w-40 px-3 py-2 rounded-md border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full">
              <option value="ho-chi-minh">TP. Hồ Chí Minh</option>
              <option value="ha-noi">Hà Nội</option>
              <option value="da-nang">Đà Nẵng</option>
              <option value="hue">Huế</option>
              {/* Add other cities as needed */}
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderWeb;
