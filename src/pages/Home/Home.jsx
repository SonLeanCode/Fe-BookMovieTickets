import { useState, useRef, useEffect } from "react";
import { Button, Card, Carousel } from "react-daisyui";
import {
  FaCalendarAlt,
  FaArrowLeft,
  FaArrowRight,
  FaHeart,
  FaStar,
  FaTicketAlt,
} from "react-icons/fa";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Home = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const movieContainerRef = useRef(null);
  const visibleMoviesCount = 4;

  const carouselBanners = [
    {
      id: 1,
      title: "The Great Adventure",
      author: "John Doe",
      image:
        "https://m.media-amazon.com/images/M/MV5BOWE1YWVhNzUtNDI0ZC00OGYzLWIwOTMtYWE1MDIxNDZjMDViXkEyXkFqcGdeQXVyNzc5MjA3OA@@._V1_.jpg",
      genres: ["Action", "Adventure", "Drama"],
      seasons: 3,
      releaseYear: 2020,
      description:
        "Join the thrilling adventures of a group of heroes as they journey through unknown lands.",
    },
    {
      id: 2,
      title: "Mystery of the Night",
      author: "Jane Smith",
      image:
        "https://m.media-amazon.com/images/M/MV5BNWI4YTBjZjMtYzhiYS00YzcwLWE4NGUtNzM3ZjIzOWEwYmEwXkEyXkFqcGdeQXVyNTI5NjIyMw@@._V1_.jpg",
      genres: ["Mystery", "Thriller", "Horror"],
      seasons: 1,
      releaseYear: 2021,
      description:
        "A spine-chilling tale that will keep you on the edge of your seat. Discover the secrets hidden in the dark.",
    },
    {
      id: 3,
      title: "Love in the City",
      author: "Emily Johnson",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwK7JNM2aOr6TlKLy0OS-4LpRpQs1azHr0Cw&s",
      genres: ["Romance", "Comedy", "Drama"],
      seasons: 2,
      releaseYear: 1999,
      description:
        "A heartwarming story about love, friendship, and the journey of life in the bustling city.",
    },
    {
      id: 4,
      title: "Fantasy World",
      author: "William Brown",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7fPTCqidRF-0tUVSjfsHNjXR5YdY8hifTedVVWCDZlVmqPyJjsDO3mMSxWTUkedgfxAE&usqp=CAU",
      genres: ["Fantasy", "Adventure"],
      seasons: 4,
      releaseYear: 2002,
      description:
        "Step into a world of magic, dragons, and epic quests in this breathtaking fantasy series.",
    },
    {
      id: 5,
      title: "Science Explorers",
      author: "Sarah Davis",
      image:
        "https://musicart.xboxlive.com/7/4dcd5000-0000-0000-0000-000000000002/504/image.jpg?w=1920&h=1080",
      genres: ["Sci-Fi", "Adventure"],
      seasons: 5,
      releaseYear: 2008,
      description:
        "Explore the wonders of the universe with a group of young scientists on their quest for knowledge.",
    },
  ];

  const movies = [
    {
      id: 1,
      views: 10,
      name: "Inception",
      image:
        "https://m.media-amazon.com/images/M/MV5BMjExMjkwNTQ0Nl5BMl5BanBnXkFtZTcwNTY0OTk1Mw@@._V1_.jpg",
      rating: "8.8",
    },
    {
      id: 2,
      views: 9,
      name: "The Dark Knight",
      image:
        "https://cms-assets.webediamovies.pro/cdn-cgi/image/dpr=1,fit=scale-down,gravity=auto,metadata=none,quality=85,width=2500/production/4756/da6d320019b0cffcb187e7a20bf9cdcb.jpg",
      rating: "9.0",
    },
    {
      id: 3,
      views: 10,
      name: "Interstellar",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS9maE7-yWPpULS8xay8yVKGnVZctnXkOXMg&s",
      rating: "8.6",
    },
    {
      id: 4,
      views: 10,
      name: "Pulp Fiction",
      image:
        "https://www.theoriginalunderground.com/cdn/shop/products/pulp-fiction-film-poster-print-281196_1024x.jpg?v=1661524235",
      rating: "8.9",
    },
    {
      id: 5,
      views: 10,
      name: "The Matrix",
      image:
        "https://m.media-amazon.com/images/I/613ypTLZHsL._AC_UF894,1000_QL80_.jpg",
      rating: "8.7",
    },
    {
      id: 6,
      views: 9,
      name: "The Matrix",
      image:
        "https://m.media-amazon.com/images/I/613ypTLZHsL._AC_UF894,1000_QL80_.jpg",
      rating: "8.7",
    },
    {
      id: 7,
      views: 9,
      name: "The Matrix",
      image:
        "https://m.media-amazon.com/images/I/613ypTLZHsL._AC_UF894,1000_QL80_.jpg",
      rating: "8.7",
    },
    {
      id: 8,
      views: 9,
      name: "The Matrix",
      image:
        "https://m.media-amazon.com/images/I/613ypTLZHsL._AC_UF894,1000_QL80_.jpg",
      rating: "8.7",
    },
    {
      id: 9,
      views: 9,
      name: "The Matrix",
      image:
        "https://m.media-amazon.com/images/I/613ypTLZHsL._AC_UF894,1000_QL80_.jpg",
      rating: "8.7",
    },
    {
      id: 10,
      views: 9,
      name: "The Matrix",
      image:
        "https://m.media-amazon.com/images/I/613ypTLZHsL._AC_UF894,1000_QL80_.jpg",
      rating: "8.7",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex(
        (prevIndex) => (prevIndex + 1) % carouselBanners.length,
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [carouselBanners.length]);

  const scrollLeft = () => {
    if (movieContainerRef.current) {
      movieContainerRef.current.scrollBy({ left: -1500, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (movieContainerRef.current) {
      movieContainerRef.current.scrollBy({ left: 1500, behavior: "smooth" });
    }
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide
      ? carouselBanners.length - 1
      : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === carouselBanners.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handleBannerIndex = (index) => {
    setCurrentBannerIndex(index);
  };

  return (
    <div className="bg-black text-gray-100">
      <main className="bg-black">
        <section className="relative mb-12 bg-black">
          {/* Banner */}
          <div className="relative h-screen w-full overflow-hidden">
            {carouselBanners.map((banner, index) => (
              <div
                key={banner.id}
                className={`absolute inset-0 h-full w-full transition-transform duration-[800ms] ease-in-out ${
                  currentBannerIndex === index
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0"
                }`}
                style={{
                  backgroundImage: `url(${banner.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></div>
            ))}
          </div>
          {/* Giới thiệu phim */}
          <div className="absolute top-[125px] ml-24 mt-8 h-48 w-2/5">
            {carouselBanners.map((banner, index) => (
              <div
                key={banner.id}
                className={`absolute transition-transform duration-1000 ease-in-out ${
                  currentBannerIndex === index
                    ? "translate-x-0 opacity-100"
                    : "translate-x-full opacity-0"
                }`}
              >
                <h2 className="text-lg font-semibold">
                  {banner.genres.join(" | ")}
                </h2>
                <h5 className="mt-2 text-5xl font-bold">{banner.title}</h5>
                <div className="mt-2 flex">
                  <h2 className="mr-4">{banner.releaseYear}</h2> {" | "}
                  <h2 className="ml-4 mr-4 flex">
                    DIRECTOR:{" "}
                    <p className="ml-2 text-gray-300">{banner.author}</p>
                  </h2>
                  {" | "}
                  <h2 className="ml-4 flex">
                    SEASONS:{" "}
                    <p className="ml-2 text-gray-300">
                      {banner.seasons} (26 Episodes)
                    </p>
                  </h2>
                </div>
                <p className="mt-2 text-gray-300">{banner.description}</p>
                <div className="mt-4 flex">
                  <button className="flex items-center rounded bg-red-600 px-6 py-2 font-semibold text-white transition-colors duration-300 hover:bg-red-500">
                    BOOK NOW <FaTicketAlt size={20} className="ml-2" />
                  </button>
                  <button className="ml-4 rounded border border-solid border-gray-300 px-6 py-2 font-semibold transition-colors duration-300 hover:bg-gray-100 hover:text-gray-800">
                    VIEW MORE
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Popular This Week */}
          <div className="absolute top-[400px] ml-24 w-2/5 overflow-hidden">
            <div className="flex items-center justify-between py-2">
              <h2 className="text-md flex items-center font-bold">
                {" "}
                <FaStar className="mr-1" />
                PHỔ BIẾN TRONG TUẦN
              </h2>
              <div>
                <button
                  className="relative top-1 mr-2 rounded-full border border-solid p-1"
                  onClick={goToPrevious}
                >
                  <AiOutlineLeft className="text-sm" />
                </button>
                <button
                  className="relative top-1 mr-6 rounded-full border border-solid p-1"
                  onClick={goToNext}
                >
                  <AiOutlineRight className="text-sm" />
                </button>
              </div>
            </div>
            <div
              className="mt-2 flex transition-transform duration-500"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleMoviesCount)}%)`,
              }}
            >
              {carouselBanners.map((movie, index) => (
                <div
                  key={index}
                  className="w-2/5 flex-none px-2"
                  style={{ flex: `0 0 ${100 / visibleMoviesCount}%` }}
                >
                  <div className="flex flex-col items-center rounded-lg text-center">
                    <img
                      src={movie.image}
                      alt={movie.title}
                      className="h-36 w-24 rounded-md object-cover cursor-pointer"
                      onClick={() => handleBannerIndex(index)}
                    />
                    <h2 className="mt-2 text-center">{movie.title}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="movie-section">
          <h3 className="mx-10 mb-6 text-5xl font-bold">| Xu hướng hiện nay</h3>
          <div className="container relative mx-auto px-4">
            <button className="navigation-button left" onClick={scrollLeft}>
              <FaArrowLeft />
            </button>
            <button className="navigation-button right" onClick={scrollRight}>
              <FaArrowRight />
            </button>
            <div className="movie-container" ref={movieContainerRef}>
              {movies.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <img
                    src={movie.image}
                    alt={movie.name}
                    className="h-[400px] w-full rounded-t-lg object-cover"
                  />
                  <div className="overlay">
                    <div className="overlay-content">
                      <h4 className="movie-name">{movie.name}</h4>
                      <p className="movie-rating">Đánh giá: {movie.rating}</p>
                      Yêu thích{" "}
                      <button className="overlay-favorite">
                        <FaHeart />
                      </button>
                      <div className="button-container">
                        <button className="overlay-button">
                          <i className="fas fa-video"></i> Trailer
                        </button>
                        <button className="overlay-button">
                          Mua vé <i className="fas fa-arrow-right"></i>{" "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider-animation"></div>

        <section className="top-movie-section my-6">
          <h3 className="mx-10 mb-6 text-5xl font-bold">Được đánh giá cao</h3>
          <p className="hot-monthly-movies">Hot trong tháng</p>
          <div className="top-movie-container">
            {movies.map((movie) => (
              <div key={movie.id} className="top-movie-card">
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="rounded-t-lg object-cover"
                />
                <div className="overlay">
                  <div className="overlay-content">
                    <h4 className="movie-name">{movie.name}</h4>
                    <p className="movie-rating">Đánh giá: {movie.rating}</p>
                    Yêu thích{" "}
                    <button className="overlay-favorite">
                      <FaHeart />
                    </button>
                    <div className="button-container">
                      <button className="overlay-button">
                        <i className="fas fa-video"></i> Trailer
                      </button>
                      <button className="overlay-button">
                        Mua vé <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="member-section">
          <div className="member-background">
            <h1>Chương trình thành viên</h1>
            <h2>Đăng ký thành viên để nhận nhiều ưu đãi hấp dẫn</h2>
            <div className="cards-container">
              <div className="member-card">
                <img
                  src="https://api-website.cinestar.com.vn/media/wysiwyg/CMSPage/Member/Desktop519x282_CMember.webp"
                  alt="Thành viên mới"
                />
                <h2>Thành viên mới</h2>
                <p>Thẻ có nhiều ưu đãi cho thành viên mới</p>
                <button>Tìm hiểu ngay</button>
              </div>
              <div className="member-card">
                <img
                  src="https://api-website.cinestar.com.vn/media/wysiwyg/CMSPage/Member/c-vip.webp"
                  alt="Thành viên Vip"
                />
                <h2>Thành viên Vip</h2>
                <p>Thẻ Vip sở hữu nhiều ưu đãi độc quyền</p>
                <button>Tìm hiểu ngay</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
