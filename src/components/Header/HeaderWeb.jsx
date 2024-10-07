import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserAlt, FaHistory, FaSignOutAlt } from "react-icons/fa"; // Import các icon cần dùng
import avt_defaut from "../../assets/img/avatar_defaut/avatar_default.png";

const HeaderWeb = () => {
  const [scrolled, setScrolled] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [cinemaCornerOpen, setCinemaCornerOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Kiểm tra trạng thái đăng nhập khi component mount
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setIsLoggedIn(true);
      setUserAvatar(userData.avatar);
      setFullName(userData.fullname);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/auth/login"); // Điều hướng về trang đăng nhập
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-colors duration-300 ${
        scrolled ? "bg-black" : "bg-black bg-opacity-20"
      }`}
    >
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center">
          <Link
            to="/cinema"
            className="font-montserrat animate-sparkle relative ml-16 bg-gradient-to-r from-red-600 via-red-300 to-red-600 bg-clip-text text-7xl font-bold text-transparent"
          >
            ST-FLIX
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            to="/cinema/buy-tickets"
            className="relative bg-red-600 px-6 py-2 font-bold text-white"
            style={{ clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)" }}
          >
            Mua vé
          </Link>

          <Link
            to="/cinema/movie"
            className="font-medium text-white hover:text-gray-300"
          >
            Phim
          </Link>
          <div className="relative">
            <button
              onClick={() => setCinemaCornerOpen(!cinemaCornerOpen)}
              className="cinema-corner-button font-medium text-white hover:text-gray-300"
            >
              Góc điện ảnh
            </button>
            {cinemaCornerOpen && (
              <div className="absolute left-0 flex flex-col rounded-md bg-gray-700 shadow-md">
                <Link
                  to="/cinema/cinema-corner/genres"
                  className="whitespace-nowrap px-4 py-2 text-white hover:bg-gray-600"
                >
                  Thể loại phim
                </Link>
                <Link
                  to="/cinema/actor"
                  className="whitespace-nowrap px-4 py-2 text-white hover:bg-gray-600"
                >
                  Diễn viên
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/cinema/events"
            className="font-medium text-white hover:text-gray-300"
          >
            Sự kiện
          </Link>
          <Link
            to="/cinema/cheap-tickets"
            className="font-medium text-white hover:text-gray-300"
          >
            Rạp/giá rẻ
          </Link>
          <div className="relative flex-grow">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 transform text-white"></i>
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className={`rounded-lg border border-gray-300 bg-transparent py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 ${
                scrolled ? "bg-black" : "bg-gray-500"
              }`}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <div className="flex flex-col">
                <span className="text-white">Xin chào, </span>
                <span className="font-bold text-yellow-300">{fullName}</span>
              </div>

              <div className="relative">
                {/* Bọc hình ảnh avatar trong div */}
                <div className="group relative">
                  <img
                    src={userAvatar || avt_defaut}
                    alt="User Avatar"
                    className="h-14 w-14 cursor-pointer rounded-full"
                  />
                  {/* Phần này là lớp giả giúp duy trì hover */}
                  <div className="absolute -right-2 top-2 h-16 w-16"></div>{" "}
                  {/* Lớp giả */}
                  {/* Menu xuất hiện khi hover vào avatar */}
                  <div className="absolute right-0 mt-2 hidden w-40 rounded-lg bg-gray-700 shadow-lg group-hover:block">
                    <Link
                      to="/cinema/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-white hover:bg-gray-600"
                    >
                      <FaUserAlt />
                      <span>Tài khoản</span>
                    </Link>
                    <Link
                      to="/cinema/transaction"
                      className="flex items-center space-x-2 px-4 py-2 text-white hover:bg-gray-600"
                    >
                      <FaHistory />
                      <span>Lịch sử</span>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                      }}
                      className="flex w-full items-center space-x-2 px-4 py-2 text-left text-white hover:bg-gray-600"
                    >
                      <FaSignOutAlt />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <Link
              to="/auth/login"
              className="transform rounded-md bg-red-600 px-4 py-2 font-bold text-white transition-transform duration-300 hover:scale-105 hover:bg-red-700"
            >
              Đăng nhập
            </Link>
          )}

          <div className="relative inline-block text-left">
            <button
              className="flex w-full items-center justify-between rounded-md bg-gray-800 px-4 py-2 text-white"
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
            >
              Ngôn ngữ <i className="fas fa-language ml-2"></i>
            </button>

            {languageMenuOpen && (
              <div className="absolute right-0 z-10 w-full rounded-md bg-gray-800">
                <Link
                  to="/language/vi"
                  className="block w-full px-4 py-2 text-sm text-white transition-none hover:bg-gray-700"
                >
                  Tiếng Việt
                </Link>
                <Link
                  to="/language/en"
                  className="block w-full px-4 py-2 text-sm text-white transition-none hover:bg-gray-700"
                >
                  English
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderWeb;
