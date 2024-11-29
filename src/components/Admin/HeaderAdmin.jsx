import { useEffect, useState } from "react";
import { FaBell } from 'react-icons/fa';
import PropTypes from "prop-types";
import { AiOutlineSearch } from 'react-icons/ai';   
import avt_defaut from "../../assets/img/avatar_defaut/avatar_default.png";
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { name: "Bảng điều khiển", link: "/admin/dashboard" },
  { name: "Danh sách phim",  link: "/admin/movies" },
  { name: "Danh sách thể loại", link: "/admin/genres" },
  { name: "Danh sách diễn viên",  link: "/admin/actors" },
];

const HeaderAdmin = ({ isSidebarOpen }) => {
  const [activeItem, setActiveItem] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const foundItem = menuItems.find((item) => location.pathname === item.link);
    if (foundItem) {
      setActiveItem(foundItem);
    }
  }, [location.pathname]);

  const Breadcrumb = () => (
    <nav className="text-gray-400 my-4" aria-label="Breadcrumb">
      <ol className="list-none p-0 inline-flex">
        <li className="flex items-center">
          <Link to="/admin" className="text-gray-300 hover:text-white hover:underline">
            Admin
          </Link>
          <span className="mx-2">|</span>
        </li>
        {activeItem && (
          <li className="flex items-center">
            <Link to={activeItem.link} className="text-gray-300 hover:text-white hover:underline">
              {activeItem.name}
            </Link>
          </li>
        )}
      </ol>
    </nav>
  );

  return (
    <div
      className={`h-16 fixed top-0 right-0 bg-[#111111] flex items-center justify-between px-6 shadow-md transition-all duration-300 z-50`}
      style={{
        width: isSidebarOpen ? 'calc(100% - 0rem)' : 'calc(100% - 16rem)', // 16rem cho w-64 và 4rem cho w-16
        left: isSidebarOpen ? '0rem' : '16rem',
      }}
    >
      <div className="text-md font-light text-white">
      <Breadcrumb />
      </div>

      {/* Search bar */}
      <div className="flex items-center w-[600px] rounded-md px-3 py-1">
        <AiOutlineSearch className="absolute ml-64 size-5 text-white mr-2" />
        <input
          type="text"
          placeholder="Tìm kiếm..."
          className="bg-transparent outline-none w-[286px] rounded-full text-white placeholder-gray-400"
        />
      </div>

      {/* Notification and User Info */}
      <div className="flex items-center space-x-6">
        {/* Notification Icon */}
        <div className="relative">
          <FaBell className="text-white text-xl cursor-pointer" />
          {/* Notification Badge */}
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </div>

        {/* User Info */}
        <div className="flex items-center">
          <img
            src={avt_defaut}
            alt="Admin Avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="ml-2 text-white font-medium">Admin Name</span>
        </div>
      </div>
    </div>
  );
};

HeaderAdmin.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
};

export default HeaderAdmin;
