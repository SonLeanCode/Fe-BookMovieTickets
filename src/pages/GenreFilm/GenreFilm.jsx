import { useState, useEffect } from "react";
import { useGetAllGenresQuery } from "../../services/Genre/genre.service";
import { useGetAllMoviesQuery } from "../../services/Movies/movies.services";
import {FaPhotoVideo, FaTicketAlt , FaHeart  } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import Modal_Video from "../../components/Movie/Modal_Video";
import { getUserByIdFormToken } from "../../components/Utils/auth";
import { useCreateMoviesFavouriteMutation } from "../../services/MovieFavourite/moviesFavourite_service";
import Toastify from "../../helper/Toastify";

const MovieList = () => {
  const { t } = useTranslation(); 
  const { id } = useParams();
  const { data: genreData } = useGetAllGenresQuery();
  const { data: allMoviesData } = useGetAllMoviesQuery();
  const [selectedGenre, setSelectedGenre] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);
  const [videoUrl, setVideoUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = getUserByIdFormToken();
  const [createMoviesFavourite] = useCreateMoviesFavouriteMutation();
  

  const handleMovieFavourite = async (movId) => {
    const dataFaMoive = {
      userId: userId,
      movieFavourite: movId,
    };   

    // console.log("dataFsss", dataFaMoive);
    try {
      const dataMovieFa = await createMoviesFavourite(dataFaMoive);
      Toastify("Thêm vào yêu thích thành công", 200);
      // console.log("dataFa", dataMovieFa);
    } catch (err) {
      Toastify("Thêm vào yêu thích lỗi",400);
      // console.error("Lỗi khi thêm vào yêu thích:", err);
    }
  };

  useEffect(() => {
    if (id) {
      setSelectedGenre(id);
    }
  }, [id]);


  // Trích xuất danh sách quốc gia từ dữ liệu phim
  // const countryList = allMoviesData?.data.flatMap((movie) => {
  //   // console.log(movie.country);  
  //   return Array.isArray(movie.country) ? movie.country : [movie.country]; // Trả về mảng quốc gia
  // })
  // .filter((country) => country && country._id) // Lọc bỏ giá trị null hoặc undefined
  // .reduce((acc, country) => {
  //   if (!acc.some((c) => c._id === country._id)) {
  //     acc.push(country); // Chỉ thêm quốc gia nếu chưa tồn tại trong danh sách
  //   }
  //   return acc;
  // }, []) || [];
  
  // const [selectedCountry, setSelectedCountry] = useState("");



  // Xác định phim nào cần hiển thị dựa trên thể loại đã chọn
  const moviesToDisplay = selectedGenre
    ? allMoviesData?.data.filter((movie) => 
         movie.genres.some((genre) => genre._id === selectedGenre)
      )
    : allMoviesData?.data;

  // Xử lý khi nhấn nút "Xem thêm"
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const handleTrailerClick = (url) => {
    setVideoUrl(url);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setVideoUrl("");
  };

  return (
    <div className="md:pt-28 pt-36 bg-gray-900 p-3 md:p-[4.5rem] text-white">
      <div className="flex justify-center md:justify-between filter">
        <div className="menuleft mb-6 flex flex-col sm:flex-row items-center content-center justify-start md:gap-10 text-center sm:text-left align-text-top">
          <h2 className="text-2xl md:mt-0 mt-8 font-bold uppercase">
            <span className="border-l-4 border-solid border-red-600 mr-2"></span>
          {t("Thể loại phim")} 
          </h2>

          {/* Lọc theo thể loại */}
          <div className="mt-4 sm:mt-0">
            <select
              id="genre"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="md:w-36 w-72 rounded bg-white p-2 text-black"
            >
              <option value="">Tất cả</option>
              {genreData?.data.map((data) => (
                <option key={data._id} value={data._id}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>

           {/* Lọc theo quốc gia */}
           {/* <select
            id="countries"
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="md:w-36 w-72 rounded bg-white p-2 text-black"
          >
            <option value="">{t("Tất cả quốc gia")}</option>
            {countryList.length > 0 ? (
              countryList.map((country) => (
                <option key={country._id} value={country._id}>
                  {country.name}
                </option>
              ))
            ) : (
              <option value="">{t("Không có quốc gia")}</option>
            )}
          </select> */}




        </div>
      </div>

      <div className="thanhngang mb-6 h-px bg-slate-400"></div>

      {/* Hiển thị danh sách phim */}
      <div className="grid md:grid-cols-4 grid-cols-1 gap-4">
        {moviesToDisplay && moviesToDisplay.length > 0 ? (
          moviesToDisplay.slice(0, visibleCount).map((movie, index) => (
            <div key={index} className="group relative overflow-hidden">
              <div className="relative">
                <img
                  src={movie.img}
                  alt={movie.name}
                  className="w-full h-[500px] object-cover duration-300 hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="button-container flex flex-col space-y-4">
                    
                  <Link
                      className="w-28 p-2 font-bold flex items-center justify-center text-center text-white"
                    >
                     <FaHeart 
                        onClick={() => handleMovieFavourite(movie?._id)}
                        size={24}
                        className="cursor-pointer"
                      />
                  </Link>

                  <Link
                    onClick={() => handleTrailerClick(movie?.url_video)}
                      to={``}
                      className="bg-red-500 rounded w-28 p-2 font-bold flex items-center justify-center text-center text-white"
                    >
                      {t("Trailer")}
                      <FaPhotoVideo size={18} className="mt-1 ml-2" />
                    </Link>
                    <Link
                      to={`/cinema/movie/${movie._id}`}
                      className="bg-orange-500 rounded w-28 p-2 font-bold flex items-center justify-center text-center text-white"
                    >
                      {t("Mua vé")}
                      <FaTicketAlt size={18} className="mt-1 ml-2" />
                  </Link>
                  </div>
                </div>
              </div>
              <div className="p-1">
                <h3 className="p-2 text-center text-lg font-semibold transition-colors duration-300 group-hover:text-red-500">
                  {movie.name}
                </h3>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-4 text-center text-xl text-white">
           {t("Hiện chưa có phim với thể loại này")} 
          </p>
        )}
      </div>

      <div className="xemthem flex items-center justify-between">
        <div className="thanhngang mr-5 h-px hidden md:block md:w-3/4 bg-slate-400"></div>

        <button
          className="md:w-1/4 w-full rounded-full bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={handleShowMore}
        >
         {t("Xem thêm")}
        </button>
      </div>
      {/* Modal to display video */}
      {isModalOpen && (
                  <Modal_Video
                    urlvideo={videoUrl}
                    isModalOpen={isModalOpen}
                    handleCloseModal={handleCloseModal}
                  />
                )}
    </div>
    
  );
};

export default MovieList;
