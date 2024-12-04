import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-daisyui";
import "./Home.css";
import PopupNotification from "./Popup";
import {
  FaRegKissWinkHeart,
  FaPhotoVideo,
  FaRegHandPointRight,
  FaStar,
  FaTicketAlt,
} from "react-icons/fa";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import {
  useGetLatestMoviesByCreationDateQuery,
  useGetMoviesByReleaseAndShowtimesQuery,
  useGetTopRatedMoviesWithShowtimesQuery,
  useGetMoviesWithHighestBookingsQuery,
  useGetMostViewedMoviesWithShowtimesQuery,
} from "../../services/Movies/movies.services";
import Banner from "../../components/Home/Banner";
import Modal_Video from "../../components/Movie/Modal_Video";
import LoadingLocal from "../Loading/LoadingLocal";
import { useTranslation } from "react-i18next";
import { useCreateMoviesFavouriteMutation } from "../../services/MovieFavourite/moviesFavourite_service";
import { getUserByIdFormToken } from "../../components/Utils/auth";
const Home = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = getUserByIdFormToken();
  const [videoUrl, setVideoUrl] = useState("");
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const visibleMoviesCount = 4;
  const { data: latestMovies, isLoading: latestMoviesLoading } =
    useGetLatestMoviesByCreationDateQuery();
  const { data: currentTrendMovies, isLoading: currentMoviesLoading } =
    useGetMoviesByReleaseAndShowtimesQuery();
  const { data: topRateMovies, isLoading: topRateMoviesLoading } =
    useGetTopRatedMoviesWithShowtimesQuery();
  const { data: toptrendingMovies, isLoading: toptrendingMoviesLoading } =
    useGetMoviesWithHighestBookingsQuery();
  const { data: areConcernedMovies, isLoading: areConcernedMoviesLoading } =
    useGetMostViewedMoviesWithShowtimesQuery();

  const [createMoviesFavourite] = useCreateMoviesFavouriteMutation();
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

  if (
    latestMoviesLoading ||
    currentMoviesLoading ||
    topRateMoviesLoading ||
    toptrendingMoviesLoading ||
    areConcernedMoviesLoading
  ) {
    return <LoadingLocal />;
  }

  const handleMovieFavourite = async (movId) => {
    const dataFaMoive = {
      userId: userId,
      movieFavourite: movId,
    };
    console.log("dataFsss", dataFaMoive);
    try {
      const dataMovieFa = await createMoviesFavourite(dataFaMoive);
      console.log("dataFa", dataMovieFa);
    } catch (err) {
      console.error("Lỗi khi thêm vào yêu thích:", err);
    }
  };
  // hiển thị cửa sô popup

  return (
    <div className="overflow-x-hidden bg-black text-gray-100">
      <main className="bg-black">
        <section className="relative mb-12 bg-black">
          {/* show popup */}
          <PopupNotification />
          {/* Banner */}
          <Banner
            banners={carouselBanners}
            currentBannerIndex={currentBannerIndex}
          />

          <div className="absolute top-0 h-screen w-full md:w-1/2">
            {/* Giới thiệu phim */}
            <div className="absolute top-[100px] ml-4 mt-8 flex h-48 w-full flex-col items-center text-center md:ml-20 md:items-start md:text-left">
              {carouselBanners.map((banner, index) => (
                <div
                  key={banner.id}
                  className={`absolute transition-transform duration-1000 ease-in-out ${
                    currentBannerIndex === index
                      ? "translate-x-0 opacity-100"
                      : "translate-x-full opacity-0"
                  }`}
                >
                  <h2 className="text-sm font-semibold sm:text-lg">
                    {banner.genres.join(" | ")}
                  </h2>
                  <h5 className="mt-1 text-2xl font-bold sm:mt-2 sm:text-3xl md:text-5xl">
                    {banner.title}
                  </h5>
                  <div className="mt-1 flex flex-col items-center sm:mt-2 sm:flex-row sm:flex-wrap sm:justify-center">
                    <h2 className="mr-0 text-sm sm:mr-4 sm:text-base">
                      {banner.releaseYear}
                    </h2>
                    <span className="hidden sm:inline">{" | "}</span>
                    <h2 className="ml-0 mr-0 mt-1 flex text-sm sm:ml-4 sm:mr-4 sm:mt-0 sm:text-base">
                      DIRECTOR:{" "}
                      <p className="ml-1 text-gray-300 sm:ml-2">
                        {banner.author}
                      </p>
                    </h2>
                    <span className="hidden sm:inline">{" | "}</span>
                    <h2 className="ml-0 mt-1 flex text-sm sm:ml-4 sm:mt-0 sm:text-base">
                      SEASONS:{" "}
                      <p className="ml-1 text-gray-300 sm:ml-2">
                        {banner.seasons} (26 Episodes)
                      </p>
                    </h2>
                  </div>
                  <p className="mt-2 font-bold text-gray-300">
                    {banner.description}
                  </p>
                  <div className="mt-4 flex flex-col items-center sm:flex-row">
                    <Button className="flex items-center justify-center rounded bg-red-600 px-3 py-2 font-semibold text-white transition-colors duration-300 hover:bg-red-500 sm:px-4 md:px-6">
                      BOOK NOW <FaTicketAlt size={18} className="ml-2" />
                    </Button>
                    <Button className="ml-0 mt-2 rounded border border-solid border-gray-300 px-3 py-2 font-semibold transition-colors duration-300 hover:bg-gray-100 hover:text-gray-800 sm:ml-4 sm:mt-0 sm:px-4 md:px-6">
                      VIEW MORE{" "}
                      <FaRegHandPointRight size={18} className="ml-2" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Popular This Week */}
            <div className="absolute top-[430px] ml-4 mr-4 overflow-hidden md:ml-20">
              <div className="flex items-center justify-between py-2">
                <h2 className="text-md flex items-center font-bold">
                  <FaStar className="mr-1" />
                  {t("PHỔ BIẾN TRONG TUẦN")}
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
            <h3 className="section-title mb-6 text-center text-4xl font-bold">
              | {t("Xu hướng hiện nay")}
            </h3>
            <div className="relative flex w-full items-center justify-center px-8">
              {/* Nút trái */}
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

              <div className="hide-scrollbar flex w-full overflow-x-auto p-2">
                <div
                  className={`flex gap-6 ${
                    currentTrendMovies?.data?.length < 3 ? "w-full" : ""
                  }`}
                >
                  {currentTrendMovies?.data?.map(({ movie }) => (
                    <div
                      key={movie?._id}
                      className="relative flex-none overflow-hidden rounded-lg bg-white shadow-lg"
                    >
                      <img
                        src={movie?.img}
                        alt={movie?.name}
                        className="h-72 rounded-t-lg object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 hover:opacity-100">
                        <div className="space-y-3 text-center text-white">
                          <h4 className="text-lg font-bold">{movie?.name}</h4>
                          <p className="text-sm">Đánh giá: {movie?.rating}</p>
                          <div className="flex flex-col items-center space-y-3">
                            <FaRegKissWinkHeart
                              onClick={() => handleMovieFavourite(movie?._id)}
                              size={24}
                              className="cursor-pointer"
                            />
                            <button
                              onClick={() =>
                                handleTrailerClick(movie?.url_video)
                              }
                              className="overlay-btn-xh w-38 flex items-center justify-center gap-2 text-center text-white"
                            >
                              {t("Trailer")}
                              <FaPhotoVideo size={18} />
                            </button>
                            <Link
                              to={`/cinema/movie/${movie?._id}`}
                              className="overlay-btn-xh w-38 flex items-center justify-center gap-2 text-center text-white"
                            >
                              {t("Mua vé")}
                              <FaTicketAlt size={18} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Placeholder for better alignment if movies < 3 */}
                  {currentTrendMovies?.data?.length < 3 &&
                    Array.from({
                      length: 3 - currentTrendMovies?.data?.length,
                    }).map((_, index) => (
                      <div
                        key={`placeholder-${index}`}
                        className="w-[calc(20%-1rem)] flex-none sm:w-[calc(50%-1rem)] md:w-[calc(40%-1rem)]"
                      ></div>
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

        <section className="containe flex justify-center">
          <div className="update-section ml-3 w-[96%]">
            <h3 className="text-4xl font-bold">|{t("Phim mới cập nhật")} </h3>
            <div className="flex flex-col justify-center lg:flex-row">
              {/* Cột trái: 1 phim */}
              <div className="flex w-full flex-col items-center justify-center hover:cursor-pointer lg:mb-0 lg:w-2/5">
                {latestMovies?.data?.slice(0, 1).map((movie) => (
                  <div
                    key={movie._id}
                    className="group relative flex flex-1 flex-col overflow-hidden rounded-lg shadow-lg"
                    style={{ minHeight: "200px" }}
                  >
                    <img
                      src={movie.img}
                      alt={movie.name}
                      className="h-[560px] w-[450px] object-cover"
                    />
                    <div className="flex flex-1 items-center justify-center p-2">
                      <strong className="block text-center text-xl transition-colors duration-300 group-hover:text-red-500">
                        {movie.name}
                      </strong>
                    </div>
                    {/* Overlay buttons */}
                    <div className="overlay absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="button-container flex flex-col space-y-4">
                        <FaRegKissWinkHeart
                          onClick={() => handleMovieFavourite(movie._id)}
                          size={18}
                          className="ml-11 flex items-center justify-center font-bold"
                        />
                        <button
                          onClick={() => handleTrailerClick(movie?.url_video)}
                          className="overlay-btn-xh w-38 flex items-center justify-center text-center text-white"
                        >
                          Trailer
                          <FaPhotoVideo size={18} className="ml-2" />
                        </button>
                        <Link
                          to={`/cinema/movie/${movie._id}`}
                          className="overlay-btn-xh w-38 flex items-center justify-center text-center text-white"
                        >
                          {t("Mua vé")}
                          <FaTicketAlt size={18} className="ml-2 mt-1" />
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

              {/* Cột phải: 6 phim, 2 hàng, mỗi hàng 2 box trên màn hình nhỏ */}
              <div className="flex flex-wrap justify-between lg:w-3/4">
                {latestMovies?.data?.slice(1, 9).map((movie) => (
                  <div
                    key={movie._id}
                    className="flex w-1/2 lg:w-1/4" // Hiển thị 2 box phim trên màn hình nhỏ
                  >
                    <div className="group relative flex h-full flex-col overflow-hidden rounded-lg shadow-md">
                      <img
                        src={movie.img}
                        alt={movie.name}
                        className="h-[250px] w-[200px] object-cover"
                      />
                      <strong className="block p-2 text-center text-sm transition-colors duration-300 group-hover:text-red-500">
                        {movie.name}
                      </strong>
                      {/* Overlay buttons */}
                      <div className="absolute inset-0 flex h-[250px] items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="flex flex-col">
                          <FaRegKissWinkHeart
                            onClick={() => handleMovieFavourite(movie._id)}
                            size={18}
                            className="ml-11 flex items-center justify-center font-bold"
                          />
                          <button
                            onClick={() => handleTrailerClick(movie?.url_video)}
                            className="overlay-btn-xh w-38 flex items-center justify-center text-center text-white"
                          >
                            Trailer
                            <FaPhotoVideo size={18} className="ml-2" />
                          </button>
                          <Link
                            to={`/cinema/movie/${movie._id}`}
                            className="overlay-btn-xh w-38 flex items-center justify-center text-center text-white"
                          >
                            {t("Mua vé")}
                            <FaTicketAlt size={18} className="ml-2 mt-1" />
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

        <section className="containe mx-auto my-10 flex w-full flex-col justify-between lg:flex-row">
          <div className="flex w-full flex-col p-10 lg:w-8/12">
            <h3 className="gy-h3 mb-6 text-4xl font-bold">
              | {t("Được đánh giá cao")}
            </h3>
            <div className="grid grid-cols-2 gap-5 hover:cursor-pointer md:grid-cols-4">
              {topRateMovies?.data?.slice(0, 8).map((movie) => (
                <div
                  key={movie._id}
                  className="group relative overflow-hidden rounded-lg shadow-lg"
                >
                  <img
                    src={movie.img}
                    alt={movie.name}
                    className="w-full object-cover"
                    style={{ height: "250px" }}
                  />
                  <div className="p-2">
                    <strong className="block text-center">{movie.name}</strong>
                  </div>
                  {/* Overlay buttons */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex flex-col">
                      <FaRegKissWinkHeart
                        onClick={() => handleMovieFavourite(movie._id)}
                        size={18}
                        className="ml-11 flex items-center justify-center font-bold"
                      />
                      <button
                        onClick={() => handleTrailerClick(movie?.url_video)}
                        className="overlay-btn-xh w-38 flex items-center justify-center text-center text-white"
                      >
                        Trailer
                        <FaPhotoVideo size={18} className="ml-2" />
                      </button>
                      <Link
                        to={`/cinema/movie/${movie._id}`}
                        className="overlay-btn-xh w-38 flex items-center justify-center text-center text-white"
                      >
                        {t("Mua vé")}
                        <FaTicketAlt size={18} className="ml-2 mt-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex w-full flex-col p-10 lg:w-4/12">
            <h3 className="tt-h3 mb-6 text-4xl font-bold">
              |{t("Top Trending")}
            </h3>
            <div className="tt flex flex-grow flex-col gap-4 hover:cursor-pointer">
              {toptrendingMovies?.data?.slice(0, 6).map((movie, index) => (
                <Link
                  to={`/cinema/movie/${movie?._id}`}
                  key={movie._id}
                  className="justify-right flex items-center rounded-lg p-2 shadow-lg"
                >
                  <span
                    className={`mr-4 text-2xl font-bold number-color-${index + 1}`}
                  >
                    {index + 1}
                  </span>
                  <img
                    src={movie.img}
                    alt={movie.name}
                    className="mr-4 h-16 w-16 rounded object-cover"
                  />
                  <strong>{movie.name}</strong>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider-animation"></div>

        <section className="top-movie-section my-6">
          <h3 className="ml-20 text-4xl font-bold">
            | {t("Phim được truy cập nhiều")}
          </h3>
          <div
            className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
            style={{ width: "90%", marginLeft: "5%" }}
          >
            {areConcernedMovies?.data?.map((movie) => (
              <div
                key={movie._id}
                className="top-movie-card relative overflow-hidden rounded-lg"
              >
                <img
                  src={movie.img}
                  alt={movie.name}
                  className="rounded-t-lg object-cover"
                  style={{ height: "350px" }} // Đặt chiều cao cố định cho hình ảnh
                />
                <div className="overlay">
                  <div className="overlay-content">
                    <h4 className="movie-name font-bold text-red-500">
                      {movie.name}
                    </h4>
                    <p className="movie-rating">Đánh giá: {movie.rating}</p>
                    <br></br>
                    <div className="button-container flex flex-col space-y-4">
                      <FaRegKissWinkHeart
                        onClick={() => handleMovieFavourite(movie._id)}
                        size={18}
                        className="ml-11 flex items-center justify-center font-bold"
                      />
                      <button
                        onClick={() => handleTrailerClick(movie?.url_video)}
                        className="overlay-btn-xh w-38 flex items-center justify-center text-center text-white"
                      >
                        Trailer
                        <FaPhotoVideo size={18} className="ml-2" />
                      </button>
                      <Link
                        to={`/cinema/movie/${movie._id}`}
                        className="overlay-btn-xh w-38 flex items-center justify-center text-center text-white"
                      >
                        {t("Mua vé")}
                        <FaTicketAlt size={18} className="ml-2 mt-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="member-section">
          <div
            className="flex flex-col items-center bg-cover bg-center p-5"
            style={{
              backgroundImage:
                "url('https://cinestar.com.vn/_next/image/?url=%2Fassets%2Fimages%2Fbg-cfriends.webp&w=1920&q=75')",
            }}
          >
            <h1 className="mb-2 text-5xl font-bold uppercase text-red-600 shadow-lg">
              {t("Chương trình thành viên")}
            </h1>
            <h2 className="mb-10 text-lg font-bold text-white shadow-lg">
              {t("Đăng ký thành viên để nhận nhiều ưu đãi hấp dẫn")}
            </h2>
            <div className="w-[90%]">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <div className="flex flex-col items-center rounded-lg bg-white p-5 shadow-lg transition-transform duration-300 hover:scale-105">
                  <img
                    src="https://api-website.cinestar.com.vn/media/wysiwyg/CMSPage/Member/Desktop519x282_CMember.webp"
                    alt="Thành viên mới"
                    className="mb-3 h-48 w-full rounded-lg object-cover"
                  />
                  <h2 className="mb-2 text-xl text-gray-800">
                    {t("Thành viên mới")}
                  </h2>
                  <p className="mb-4 text-gray-600">
                    {t("Thẻ có nhiều ưu đãi cho thành viên mới")}
                  </p>
                  <button className="rounded bg-gradient-to-r from-red-600 to-purple-600 px-4 py-2 text-white transition-transform duration-300 hover:scale-105">
                    {t("Tìm hiểu ngay")}
                  </button>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-white p-5 shadow-lg transition-transform duration-300 hover:scale-105">
                  <img
                    src="https://api-website.cinestar.com.vn/media/wysiwyg/CMSPage/Member/c-vip.webp"
                    alt="Thành viên Vip"
                    className="mb-3 h-48 w-full rounded-lg object-cover"
                  />
                  <h2 className="mb-2 text-xl text-gray-800">
                    {t("Thành viên Vip")}
                  </h2>
                  <p className="mb-4 text-gray-600">
                    {t("Thẻ Vip sở hữu nhiều ưu đãi độc quyền")}
                  </p>
                  <button className="rounded bg-gradient-to-r from-red-600 to-purple-600 px-4 py-2 text-white transition-transform duration-300 hover:scale-105">
                    {t("Tìm hiểu ngay")}
                  </button>
                </div>
                <div className="flex flex-col items-center rounded-lg bg-white p-5 shadow-lg transition-transform duration-300 hover:scale-105">
                  <img
                    src="https://bizweb.dktcdn.net/thumb/1024x1024/100/411/892/products/the-thanh-vien-vip-danh-cho-khach-hang-tai-salon-cao-cap.jpg?v=1611827787823"
                    alt="Thành viên kì cựu"
                    className="mb-3 h-48 w-full rounded-lg object-cover"
                  />
                  <h2 className="mb-2 text-xl text-gray-800">
                    {t("Thành viên kì cựu")}
                  </h2>
                  <p className="mb-4 text-gray-600">
                    {t("Độc quyền cho các thành viên lâu năm!")}
                  </p>
                  <button className="rounded bg-gradient-to-r from-red-600 to-purple-600 px-4 py-2 text-white transition-transform duration-300 hover:scale-105">
                    {t("Tìm hiểu ngay")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
