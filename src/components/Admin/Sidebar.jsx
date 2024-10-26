import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Menu } from "react-daisyui";
import { Link, NavLink, useLocation } from "react-router-dom";
import { MdCategory } from "react-icons/md";
import { FaHome, FaFilm, FaUserAlt,FaMapMarkerAlt } from "react-icons/fa";

const menuItems = [
  { name: "Bảng điều khiển", icon: FaHome, link: "/admin/dashboard" },
  { name: "Quản lý phim", icon: FaFilm, link: "/admin/movies" },
  { name: "Quản lý thể loại", icon: MdCategory, link: "/admin/genres" },
  { name: "Quản lý diễn viên", icon: FaUserAlt, link: "/admin/actors" },
  { name: "Quản lý khu vực", icon: FaMapMarkerAlt , link: "/admin/regions" },
  { name: "Quản lý rạp", icon: FaMapMarkerAlt , link: "/admin/cinemas" },
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
                className="font-montserrat animate-sparkle relative bg-gradient-to-r from-red-600 via-red-300 to-red-600 bg-clip-text text-6xl font-bold text-transparent"
              >
                ST-FLIX
              </Link>
            </div>
          </div>
          <div className="scrollbar-hide mt-5 h-[300px] overflow-y-auto lg:h-auto">
            <Menu className="flex-grow">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Menu.Item key={item.name} className="relative">
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
                          <div className="bg-red-600 absolute left-0 top-0 h-full w-1" />
                        )}
                        <div className="flex items-center">
                          <Icon
                            className={`${
                              activeItem === item.name
                                ? "text-primary mr-3 h-5 w-5 text-white text-md"
                                : "mr-3 h-5 w-5 text-gray-300 text-md"
                            }`}
                          />
                          <span className="flex items-center text-lg">
                            {item.name}
                          </span>
                        </div>
                      </div>
                    </NavLink>
                  </Menu.Item>
                );
              })}
            </Menu>
          </div>
        </div>
        <div className="mx-4 mb-2 flex flex-col items-center">
          <div className="rounded-lg bg-gray-800 p-4 text-center text-gray-200 shadow-md">
            <p className="text-sm">Cập nhật các tính năng mới</p>
            <Button className="mt-4 rounded-lg p-2 bg-green-500 text-white shadow-md hover:bg-green-600">
              + Đang phát triển
            </Button>
          </div>
          <div className="mt-2 text-xs text-gray-400">
            <p className="font-bold uppercase text-center">ST-Flix</p>
            <p className="font-light">Created by NTD @2024</p>
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
