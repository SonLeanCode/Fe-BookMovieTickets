import { Link } from "react-router-dom";
const HeaderPage = () => {
  return (
    <div className="header">
      <nav className="header-nav fixed left-0 right-0 top-0 z-10 flex h-16 justify-between bg-black">
        <div className="header-inline ml-4 mt-2 flex items-center gap-12">
          <img
            src="img/home.jpg"
            className="logo"
            alt=""
            width="200px"
            height="30px"
          />
          <ul className="flex gap-8">
            <li>
              <Link to="/" className="text-white">
                HOME
              </Link>
            </li>
            <li>
              <Link to="/detail" className="text-white">
                MOVIE
              </Link>
            </li>
            <li>
              <a href="/prolist" className="text-white">
                NEWS
              </a>
            </li>
            <li>
              <a href="#" className="text-white">
                MY LIST
              </a>
            </li>
          </ul>
        </div>
        <div className="icons mr-8 flex items-center gap-6">
          <div className="input-search relative">
            <input
              className="search h-8 w-[237px] rounded-lg pl-4"
              type="text"
              placeholder="Tìm bộ phim"
            />
            <i className="fa-solid fa-magnifying-glass absolute right-2 text-gray-500"></i>
          </div>
          <i className="fa-regular fa-bell text-white"></i>
          <i className="fa-regular fa-user text-white"></i>
        </div>
      </nav>
    </div>
  );
};

export default HeaderPage;
