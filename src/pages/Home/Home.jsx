import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-daisyui";
import "./Home.css";
import { FaHeart, FaStar, FaTicketAlt } from "react-icons/fa";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useGetLatestMoviesByCreationDateQuery } from "../../services/Movies/movies.services";
import Banner from "../../components/Home/Banner";
import Modal_Video from "../../components/Movie/Modal_Video";
import LoadingLocal from "../Loading/LoadingLocal";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const visibleMoviesCount = 4;
  const { data: latestMovies, isLoading: latestMoviesLoading } = useGetLatestMoviesByCreationDateQuery();

  const handleTrailerClick = (url) => {
    setVideoUrl(url);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setVideoUrl("");
  };

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
      bannerUrl:
        "https://i.ytimg.com/vi/AXesMuuI0tE/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAO0zNnWjtkmXgvcgIuPMFQitmgCQ",
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
      bannerUrl:
        "https://m.media-amazon.com/images/M/MV5BODUzNzRhNjUtYjk4NC00ODY2LWI4NjktZmIyZjc3NjgzYjBhXkEyXkFqcGdeQXVyNTI5NjIyMw@@._V1_.jpg",
      description:
        "A spine-chilling tale that will keep you on the edge of your seat. Discover the secrets hidden in the dark.",
    },
    {
      id: 3,
      title: "Love in the City",
      author: "Emily Johnson",
      image:
        "https://m.media-amazon.com/images/M/MV5BNWI4YTBjZjMtYzhiYS00YzcwLWE4NGUtNzM3ZjIzOWEwYmEwXkEyXkFqcGdeQXVyNTI5NjIyMw@@._V1_.jpg",
      genres: ["Romance", "Comedy", "Drama"],
      seasons: 2,
      releaseYear: 1999,
      bannerUrl:
        "https://media.senscritique.com/media/000020087690/0/love_in_the_city.jpg",
      description:
        "A heartwarming story about love, friendship, and the journey of life in the bustling city.",
    },
    {
      id: 4,
      title: "Fantasy World",
      author: "William Brown",
      image:
        "https://m.media-amazon.com/images/M/MV5BNWI4YTBjZjMtYzhiYS00YzcwLWE4NGUtNzM3ZjIzOWEwYmEwXkEyXkFqcGdeQXVyNTI5NjIyMw@@._V1_.jpg",
      genres: ["Fantasy", "Adventure"],
      seasons: 4,
      releaseYear: 2002,
      bannerUrl:
        "https://images.nightcafe.studio/jobs/0xu0X3VOF13QitP08kgP/0xu0X3VOF13QitP08kgP--1--hud01.jpg?tr=w-1600,c-at_max",
      description:
        "Step into a world of magic, dragons, and epic quests in this breathtaking fantasy series.",
    },
    {
      id: 5,
      title: "Science Explorers",
      author: "Sarah Davis",
      image:
        "https://m.media-amazon.com/images/M/MV5BOWE1YWVhNzUtNDI0ZC00OGYzLWIwOTMtYWE1MDIxNDZjMDViXkEyXkFqcGdeQXVyNzc5MjA3OA@@._V1_.jpg",
      genres: ["Sci-Fi", "Adventure"],
      seasons: 5,
      releaseYear: 2008,
      bannerUrl:
        "https://media.senscritique.com/media/000017560335/0/explorers.jpg",
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

  const handleScroll = (direction) => {
    const container = document.getElementById("movie-list");
    const boxWidth = container.querySelector(".movie-card").offsetWidth; // Lấy kích thước của 1 box phim
    const scrollAmount = boxWidth * 5; // Cuộn qua 5 box phim

    if (direction === "left") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if(latestMoviesLoading){
    return <LoadingLocal />
  }

  return (
    <div className="bg-black text-gray-100">
      <main className="bg-black">
        <section className="relative mb-12 bg-black">
          {/* Banner */}
          <Banner
            banners={carouselBanners}
            currentBannerIndex={currentBannerIndex}
          />

          <div className="absolute top-0 h-screen w-1/2">
            {/* Giới thiệu phim */}
            <div className="absolute top-[125px] mt-8 h-48 w-full">
              {carouselBanners.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`absolute ml-20 transition-transform duration-1000 ease-in-out ${
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
                    <Button className="flex items-center rounded bg-red-600 px-6 py-2 font-semibold text-white transition-colors duration-300 hover:bg-red-500">
                      BOOK NOW <FaTicketAlt size={20} className="ml-2" />
                    </Button>
                    <Button className="ml-4 rounded border border-solid border-gray-300 px-6 py-2 font-semibold transition-colors duration-300 hover:bg-gray-100 hover:text-gray-800">
                      VIEW MORE
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Popular This Week */}
            <div className="absolute top-[400px] ml-20 mr-4 overflow-hidden">
              <div className="flex items-center justify-between py-2">
                <h2 className="text-md flex items-center font-bold">
                  {" "}
                  <FaStar className="mr-1" />
                  PHỔ BIẾN TRONG TUẦN
                </h2>
                <div>
                  <button
                    className="relative top-1 mr-2 rounded-full border border-solid p-1 hover:opacity-[0.5]"
                    onClick={goToPrevious}
                  >
                    <AiOutlineLeft className="text-sm" />
                  </button>
                  <button
                    className="relative top-1 mr-2 rounded-full border border-solid p-1 hover:opacity-[0.5]"
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
                    className="flex-none px-1"
                    style={{ flex: `0 0 ${100 / visibleMoviesCount}%` }}
                  >
                    <div className="flex flex-col items-center rounded-lg text-center">
                      <img
                        src={movie.image}
                        alt={movie.title}
                        className="h-[205px] w-40 cursor-pointer rounded-md object-fill"
                        onClick={() => handleBannerIndex(index)}
                      />
                      <h2 className="mt-2 text-center text-sm font-semibold text-gray-300">
                        {movie.title}
                      </h2>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="movie-section relative">
          <div className="containe mx-auto px-4">
            <h3 className="section-title mb-6 text-4xl font-bold">
              | Xu hướng hiện nay
            </h3>
            <div
              className="relative flex items-center justify-center px-8"
              style={{ width: "94%", marginLeft: "3%" }}
            >
              <button
                className="absolute left-0 z-10 rounded-full bg-red-600 p-3 text-white"
                style={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  marginLeft: "-2%",
                }}
                onClick={() => handleScroll("left")}
              >
                <AiOutlineLeft size={24} />
              </button>
              <div
                className="hide-scrollbar flex w-full overflow-x-auto"
                id="movie-list"
                style={{ padding: "0 10px" }}
              >
                <div className="flex space-x-9">
                  {movies.slice(0, 10).map((movie) => (
                    <div
                      key={movie.id}
                      className="movie-card relative flex-none overflow-hidden"
                      style={{ width: "calc(19% - 1rem)", flexShrink: 0 }}
                    >
                      <img
                        src={movie.image}
                        alt={movie.name}
                        className="h-[300px] w-full rounded-t-lg object-cover"
                      />
                      <div className="overlay">
                        <div className="overlay-content">
                          <h4
                            className="movie-name"
                            style={{ color: "red", fontWeight: "bold" }}
                          >
                            {movie.name}
                          </h4>
                          <p className="movie-rating">
                            Đánh giá: {movie.rating}
                          </p>
                          <button className="overlay-favorite">
                            <FaHeart />
                            <br></br>
                          </button>
                          <div className="button-container flex flex-col space-y-4">
                            <Link
                              to="/cinema/detail"
                              className="overlay-btn-xh w-38 py-2 text-center text-white"
                            >
                              Trailer <i className="fas fa-video ml-1"></i>
                            </Link>
                            <Link
                              to="/"
                              className="overlay-btn-xh w-38 x` py-2 text-center text-white"
                            >
                              Mua vé <i className="fas fa-ticket-alt ml-1"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Nút phải */}
              <button
                className="absolute right-0 z-10 rounded-full bg-red-600 p-3 text-white"
                style={{
                  top: "50%",
                  transform: "translateY(-50%)",
                  marginRight: "-2%",
                }}
                onClick={() => handleScroll("right")}
              >
                <AiOutlineRight size={24} />
              </button>
            </div>
          </div>
        </section>

        <div className="section-divider-animation"></div>

        <section className="container mx-auto my-10 flex w-full justify-center">
          <div className="update-section w-full">
            <h3 className=" text-4xl  font-bold">
              | Phim mới cập nhật
            </h3>
            <div className="flex flex-col justify-center lg:flex-row">
              {/* Cột trái: 1 phim */}
              <div className="mb-8 flex w-full flex-col items-center justify-center p-4 hover:cursor-pointer lg:mb-0 lg:w-2/5">
                {latestMovies?.data?.slice(0, 1).map((movie) => (
                  <div
                    key={movie._id}
                    className="group relative flex flex-1 flex-col overflow-hidden rounded-lg shadow-lg"
                    style={{ minHeight: "200px" }}
                  >
                    <img
                      src={movie.img}
                      alt={movie.name}
                      className="w-full object-cover"
                    />
                    <div className="flex flex-1 items-center justify-center p-2">
                      <strong className="block p-2 text-center text-xl transition-colors duration-300 group-hover:text-red-500">
                        {movie.name}
                      </strong>
                    </div>
                    {/* Overlay buttons */}
                    <div className="overlay absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="button-container flex flex-col space-y-4">
                        <button
                          onClick={() => handleTrailerClick(movie?.url_video)} // Use the movie's trailer URL
                          className="overlay-btn-xh w-38 py-2 text-center text-white"
                        >
                          Trailer <i className="fas fa-video ml-1"></i>
                        </button>
                        <Link
                          to={`/cinema/movie/${movie._id}`}
                          className="overlay-btn-xh w-38 py-2 text-center text-white"
                        >
                          Mua vé <i className="fas fa-ticket-alt ml-1"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Modal to display video */}
                {isModalOpen && (
                  <Modal_Video
                    urlvideo={videoUrl}
                    isModalOpen={isModalOpen}
                    handleCloseModal={handleCloseModal}
                  />
                )}
              </div>
              
              {/* Cột phải: 6 phim, 2 hàng, mỗi hàng 3 box */}
              <div className="flex flex-wrap justify-between lg:w-3/4">
                {latestMovies?.data?.slice(1, 9).map((movie) => (
                  <div
                    key={movie._id}
                    className="m-4 flex w-full flex-col lg:w-1/4"
                  >
                    <div className="group relative flex h-full flex-col overflow-hidden rounded-lg shadow-md">
                      <img
                        src={movie.img}
                        alt={movie.name}
                        className="h-[250px] w-full"
                      />
                      <strong className="block p-2 text-center text-sm transition-colors duration-300 group-hover:text-red-500">
                        {movie.name}
                      </strong>
                      {/* Overlay buttons */}
                      <div className="absolute inset-0 flex h-[250px] items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="flex flex-col">
                        <button
                          onClick={() => handleTrailerClick(movie?.url_video)} // Use the movie's trailer URL
                          className="overlay-btn-xh w-38 py-2 text-center text-white"
                        >
                          Trailer <i className="fas fa-video ml-1"></i>
                        </button>
                          <Link
                            to={"/cinema/movie/" + movie._id}
                            className="overlay-btn-xh w-38 py-2 text-center text-white"
                          >
                            Mua vé <i className="fas fa-ticket-alt ml-1"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="section-divider-animation"></div>

        <section className="container mx-auto my-10 flex w-full flex-col justify-between lg:flex-row">
          <div className="flex w-full flex-col p-4 lg:w-8/12">
            <h3 className="gy-h3 mb-6 text-4xl font-bold">
              | Phim Gợi Ý
            </h3>
            <div className="grid flex-grow grid-cols-3 gap-4 hover:cursor-pointer">
              {movies.slice(0, 6).map((movie) => (
                <div
                  key={movie.id}
                  className="overflow-hidden rounded-lg shadow-lg"
                  style={{ width: "200px" }}
                >
                  <img
                    src={movie.image}
                    alt={movie.name}
                    className="w-full object-cover"
                    style={{ height: "250px" }}
                  />
                  <div className="p-2">
                    <strong className="block text-center">{movie.name}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col p-4 lg:w-4/12">
            <h3 className="tt-h3 mb-6 text-4xl font-bold">
              | Top Trending
            </h3>
            <div className="tt flex flex-grow flex-col gap-4 hover:cursor-pointer">
              {movies.slice(0, 6).map((movie, index) => (
                <div
                  key={movie.id}
                  className="justify-right flex items-center rounded-lg p-2 shadow-lg"
                >
                  <span
                    className={`mr-4 text-2xl font-bold number-color-${index + 1}`}
                  >
                    {index + 1}
                  </span>
                  <img
                    src={movie.image}
                    alt={movie.name}
                    className="mr-4 h-16 w-16 rounded object-cover"
                  />
                  <strong>{movie.name}</strong>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider-animation"></div>

        <section className="top-movie-section my-6">
          <h3 className="ml-24 text-4xl  font-bold">| Phim mới cập nhật</h3>
          <div className="top-movie-container" style={{ width: "84%", marginLeft: "8%" }}>
            {movies.map((movie) => (
              <div key={movie.id} className="top-movie-card rounded-lg">
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="rounded-t-lg object-cover"
                />
                <div className="overlay">
                  <div className="overlay-content">
                    <h4 className="movie-name">{movie.name}</h4>
                    <p className="movie-rating">Đánh giá: {movie.rating}</p>
                    <button className="overlay-favorite">
                      <FaHeart />
                    </button>
                    <div className="button-container">
                      <div className="button-container flex flex-col space-y-4">
                        <Link
                          to="/cinema/detail"
                          className="overlay-btn-xh w-38 py-2 text-center text-white"
                        >
                          Trailer <i className="fas fa-video ml-1"></i>
                        </Link>
                        <Link
                          to="/"
                          className="overlay-btn-xh w-38 x` py-2 text-center text-white"
                        >
                          Mua vé <i className="fas fa-ticket-alt ml-1"></i>
                        </Link>
                      </div>
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
              <div className="member-card">
                <img
                  src="https://bizweb.dktcdn.net/thumb/1024x1024/100/411/892/products/the-thanh-vien-vip-danh-cho-khach-hang-tai-salon-cao-cap.jpg?v=1611827787823"
                  alt="Thành viên Vip"
                />
                <h2>Thành viên kì cựu</h2>
                <p>Độc quyền cho các thành viên lâu năm!</p>
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
