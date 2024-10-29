import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaUserAlt, FaHistory, FaSignOutAlt, FaBars } from "react-icons/fa"; // Import necessary icons
import avt_defaut from "../../assets/img/avatar_defaut/avatar_default.png";
import Toastify from "../../helper/Toastify";
import i18n  from "i18next";
import { useTranslation } from 'react-i18next';
const HeaderWeb = () => {
  const { t } = useTranslation(); 
  const [scrolled, setScrolled] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userAvatar, setUserAvatar] = useState("");
  const [fullName, setFullName] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const navigate = useNavigate();


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    // Check login status when component mounts
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
    Toastify("Đăng xuất thành công", 200);
    navigate("/auth/login");
  };

  // Function to handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic here, e.g., navigate to search results page
    console.log("Searching for:", searchTerm);
    // Example: navigate(`/search?query=${searchTerm}`);
  };

  // changes languages
  const changeLanguage = async (language) => {
      
    try {

      i18n.changeLanguage(language);
      console.log("Current language:", i18n.language);
    }
    catch (error) {
      console.error("Error updating language:", error);
    }
  };
  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-colors  duration-300 ${scrolled ? "bg-black" : "bg-black bg-opacity-20"
        }`}
    >
      <div className="flex items-center justify-between p-2">
        <div className="flex items-center">
          <Link
            to="/cinema"
            className="font-montserrat animate-sparkle xs:text-4xl relative ml-16 bg-gradient-to-r from-red-600 via-red-300 to-red-600 bg-clip-text text-7xl font-bold text-transparent sm:text-5xl md:text-6xl" // Thay đổi kích thước chữ
          >
            {t("ST-FLIX")}
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden items-center space-x-4 md:flex">
          <Link
            to="/cinema/buy-tickets"
            className="relative bg-red-600 px-6 py-2 font-bold text-white"
            style={{ clipPath: "polygon(25% 0%, 100% 0%, 75% 100%, 0% 100%)" }}
          >
            {t("Mua vé")}
          </Link>

          <Link
            to="/cinema/movie"
            className="font-medium text-white hover:text-gray-300"
          >
            {t("Phim")}
          </Link>

          <div className="group relative">
            <button className="cinema-corner-button font-medium text-white hover:text-gray-300">
              {t("Góc điện ảnh")}
            </button>
            <div className="absolute h-10 w-24"></div>
            <div className="absolute left-0 mt-2 hidden flex-col rounded-md bg-gray-700 shadow-md group-hover:flex">
              <Link
                to="/cinema/genrefilm"
                className="whitespace-nowrap px-4 py-2 text-white hover:bg-gray-600"
              >
                {t("Thể loại phim")}
              </Link>
              <Link
                to="/cinema/actor"
                className="whitespace-nowrap px-4 py-2 text-white hover:bg-gray-600"
              >
                {t("Diễn viên")}
              </Link>
            </div>
          </div>

          <div className="group relative">
            <button className="cinema-corner-button font-medium text-white hover:text-gray-300">
              {t("Sự kiện")}
            </button>
            <div className="absolute h-10 w-24"></div>

            <div className="absolute left-0 mt-2 hidden flex-col rounded-md bg-gray-700 shadow-md group-hover:flex">
              <Link
                to="/cinema/voucher"
                className="whitespace-nowrap px-4 py-2 text-white hover:bg-gray-600"
              >
                {t("Ưu đãi")}
              </Link>
              <Link
                to=""
                className="whitespace-nowrap px-4 py-2 text-white hover:bg-gray-600"
              >
                {t("Phim hay tháng")}
              </Link>
            </div>
          </div>

          <Link
            to="/cinema/cheap-tickets"
            className="font-medium text-white hover:text-gray-300"
          >
             {t("Rạp/giá rẻ")}
          </Link>

          <div className="relative flex-grow">
            <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 transform text-white"></i>
            <input
              type="text"
              placeholder={t("Tìm kiếm...")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch(e)} // Handle enter key for search
              className={`rounded-lg border border-gray-300 bg-transparent py-2 pl-10 pr-4 text-white focus:outline-none focus:ring-2 ${scrolled ? "bg-black" : "bg-gray-500"
                }`}
            />
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-2">
          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="group relative">
                  <img
                    src={userAvatar || avt_defaut}
                    alt="User Avatar"
                    className="h-14 w-14 cursor-pointer rounded-full"
                  />
                  <div className="absolute h-10 w-10"></div>
                  <div className="absolute -right-28 mt-2 hidden w-40 rounded-lg bg-gray-700 shadow-lg group-hover:block">
                    <Link
                      to="/cinema/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-white hover:bg-gray-600"
                    >
                      <FaUserAlt />
                      <span>{t("Tài khoản")}</span>
                    </Link>
                    <Link
                      to="/cinema/transaction"
                      className="flex items-center space-x-2 px-4 py-2 text-white hover:bg-gray-600"
                    >
                      <FaHistory />
                      <span>{t("Lịch sử")}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center space-x-2 px-4 py-2 text-left text-white hover:bg-gray-600"
                    >
                      <FaSignOutAlt />
                      <span>{t("Đăng xuất")}</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-white">{t("Xin chào")} </span>
                <span className="max-w-32 truncate font-bold text-yellow-300">
                  {fullName}
                </span>
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

          {/* Language Menu for Desktop Only */}
          <div className="relative hidden text-left md:inline-block">
            <button
              className="flex w-full items-center justify-between rounded-md bg-gray-800 px-4 py-2 text-white"
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
            >
                {t('Ngôn ngữ')} <i className="fas fa-language ml-2"></i>
            </button>

            {languageMenuOpen && (
              <div className="absolute right-0 z-10 w-full rounded-md bg-gray-800">
                <button
                  onClick={() => changeLanguage("vi")}
                  className="block w-full px-4 py-2 text-sm text-white transition-none hover:bg-gray-700"
                >
                   {t('Tiếng Việt')}
                </button>
                <button
                  onClick={() => changeLanguage("en")}
                  className="block w-full px-4 py-2 text-sm text-white transition-none hover:bg-gray-700"
                >
                    {t('English')}
                </button>
              </div>
            )}

          </div>
          {/* Mobile Menu Button */}
          <button
            className="flex items-center text-white md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <FaBars className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute right-0 top-0 h-screen w-1/3 bg-gray-800 p-4 md:hidden">
          <button
            className="relative mb-3 flex items-center justify-center rounded-md p-2 text-white transition-colors duration-200 hover:bg-red-600"
            onClick={() => setMobileMenuOpen(false)}
          >
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
          </button>

          {isLoggedIn ? (
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="group relative">
                  <img
                    src={userAvatar || avt_defaut}
                    alt="User Avatar"
                    className="h-14 w-24 cursor-pointer rounded-full"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-white">Xin chào, </span>
                <span className="font-bold text-yellow-300">{fullName}</span>
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
          <Link
            to="/cinema/buy-tickets"
            className="block py-2 text-white hover:bg-gray-600"
          >
            Mua vé
          </Link>
          <Link
            to="/cinema/movie"
            className="block py-2 text-white hover:bg-gray-600"
          >
            Phim
          </Link>
          <Link
            to="/cinema/cheap-tickets"
            className="block py-2 text-white hover:bg-gray-600"
          >
            Rạp/giá rẻ
          </Link>
          <Link
            to="/auth/login"
            className="block py-2 text-white hover:bg-gray-600"
          >
            Đăng nhập
          </Link>
          {isLoggedIn && (
            <>
              <Link
                to="/cinema/profile"
                className="block py-2 text-white hover:bg-gray-600"
              >
                Tài khoản
              </Link>
              <Link
                to="/cinema/transaction"
                className="block py-2 text-white hover:bg-gray-600"
              >
                Lịch sử
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full py-2 text-left text-white hover:bg-gray-600"
              >
                Đăng xuất
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default HeaderWeb;
