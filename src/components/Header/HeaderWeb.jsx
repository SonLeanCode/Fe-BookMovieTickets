import { FaFilm, FaSearch, FaBars } from "react-icons/fa"; // Import icons from react-icons
import { Input, Button } from "react-daisyui";
import { Link } from "react-router-dom";

const HeaderWeb = () => {
  return (
    <header className="bg-gray-800 text-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <FaFilm className="text-primary text-indigo-500 h-8 w-8" /> {/* Use FaFilm icon */}
              <span className="text-primary ml-2 text-2xl font-bold">
                Cinema
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <nav className="ml-10 flex items-baseline space-x-4">
              <Link
                to="/movies"
                className="text-foreground hover:text-primary rounded-md px-3 py-2 text-sm font-medium"
              >
                Movies
              </Link>
              <Link
                to="/showtimes"
                className="text-foreground hover:text-primary rounded-md px-3 py-2 text-sm font-medium"
              >
                Showtimes
              </Link>
              <Link
                to="/offers"
                className="text-foreground hover:text-primary rounded-md px-3 py-2 text-sm font-medium"
              >
                Offers
              </Link>
              <Link
                to="/about"
                className="text-foreground hover:text-primary rounded-md px-3 py-2 text-sm font-medium"
              >
                About
              </Link>
            </nav>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <form className="flex items-center">
                <Input
                  type="text"
                  placeholder="Search movies..."
                  className="mr-2 w-64"
                />
                <Button size="small" className="btn-ghost">
                  <FaSearch className="h-4 w-4" /> {/* Use FaSearch icon */}
                  <span className="sr-only">Search</span>
                </Button>
              </form>
            </div>
          </div>
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="small"
              className="text-foreground hover:text-primary inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <FaBars className="h-6 w-6" aria-hidden="true" /> {/* Use FaBars icon */}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderWeb;
