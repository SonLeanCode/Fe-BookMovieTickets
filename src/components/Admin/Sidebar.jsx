import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button } from "react-daisyui";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdCategory, MdDashboard } from "react-icons/md";
import {
  FaHome,
  FaFilm,
  FaUserAlt,
  FaMapMarkerAlt,
  FaVideo ,
  FaUser, 
  FaTicketAlt
} from "react-icons/fa";
import { RiAdvertisementLine } from 'react-icons/ri';
import { MdOutlineTheaters, MdOutlineComment } from 'react-icons/md';
const menuItems = [
  { name: "Bảng điều khiển", icon: MdDashboard, link: "/admin/dashboard" },
  { name: "Quản lý phim", icon: FaFilm, link: "/admin/movies" },
  { name: "Quản lý thể loại", icon: MdCategory, link: "/admin/genres" },
  { name: "Quản lý diễn viên", icon: FaUserAlt, link: "/admin/actors" },
  { name: "Quản lý khu vực", icon: FaMapMarkerAlt, link: "/admin/regions" },
  { name: "Quản lý rạp", icon: FaVideo , link: "/admin/cinemas" },
  { name: "Quản lý tài khoản", icon: FaUser , link: "/admin/users" },
  { name: "Quản lý phòng chiếu", icon: FaHome , link: "/admin/rooms" },
  { name: "Quản lý suất chiếu", icon: MdOutlineTheaters , link: "/admin/showtimes" },
  { name: "Quản lý bình luận", icon: MdOutlineComment , link: "/admin/commentManagement" },
  { name: "Quản lý vé", icon: FaTicketAlt , link: "/admin/ticketsManagement" },
  { name: "Quản lý banner", icon: RiAdvertisementLine , link: "/admin/banner" },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState("Dashboard");
  const location = useLocation();

  useEffect(() => {
    const foundItem = menuItems.find((item) => location.pathname === item.link);
    if (foundItem) setActiveItem(foundItem.name);

    // Đóng sidebar khi chuyển trang ở màn hình nhỏ
    if (isOpen) {
      toggleSidebar();
    }
  }, [location.pathname, isOpen, toggleSidebar]);

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ease-in-out lg:inset-auto lg:z-auto ${
        isOpen ? "block" : "hidden lg:block"
      }`}
    >
      <div
        className="fixed inset-0 bg-black opacity-50 lg:hidden"
        onClick={toggleSidebar}
      ></div>
      <div className="relative flex h-screen w-64 flex-col justify-between bg-[#111111] text-white shadow-lg">
        <div>
          <div className="mt-8 flex items-center px-4">
            <div className="flex items-center gap-2 text-center">
              <Link
                to="/cinema"
                className="font-montserrat animate-sparkle relative bg-gradient-to-r from-red-600 via-red-300 to-red-600 bg-clip-text text-5xl font-bold text-transparent"
              >
                SBC-FLIX
              </Link>
            </div>
          </div>
          <div className="scrollbar-hide mt-5 h-[375px] overflow-y-auto">
            <div className="flex-grow">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.name} className="relative">
                    <NavLink
                      to={item.link}
                      className={`flex w-full items-center justify-start rounded-lg px-4 py-2 transition-colors duration-200 ease-in-out ${
                        activeItem === item.name
                          ? "bg-gray-700 font-bold text-white"
                          : "bg-transparent font-light hover:bg-gray-800/70"
                      } `}
                      onClick={() => setActiveItem(item.name)}
                    >
                      <div className="flex w-full items-center">
                        {activeItem === item.name && (
                          <div className="absolute left-0 top-0 h-full w-1 bg-red-600" />
                        )}
                        <div className="flex items-center">
                          <Icon
                            className={`${
                              activeItem === item.name
                                ? "text-primary text-md mr-3 h-5 w-5 text-white"
                                : "text-md mr-3 h-5 w-5 text-gray-300"
                            }`}
                          />
                          <span className="flex items-center text-lg">
                            {item.name}
                          </span>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="mx-4 mb-2 flex flex-col items-center">
          <div className="rounded-lg bg-gray-800 p-4 text-center text-gray-200 shadow-md">
            <p className="text-sm">Cập nhật các tính năng mới</p>
            <Button className="mt-4 rounded-lg bg-green-500 p-2 text-white shadow-md hover:bg-green-600">
              + Đang phát triển
            </Button>
          </div>
          <div className="mt-2 text-xs text-gray-400">
            <p className="text-center font-bold uppercase">SBC-Flix</p>
            <p className="font-light">Created by SBC @2024</p>
          </div>
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
