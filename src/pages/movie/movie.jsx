import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { useGetLatestMoviesByCreationDateQuery } from "../../services/Movies/movies.services";
import Modal_Video from "../../components/Movie/Modal_Video";
import LoadingLocal from "../Loading/LoadingLocal";
import { useTranslation } from 'react-i18next';
const Movie = () => {
  const { t } = useTranslation(); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedTab, setSelectedTab] = useState("Đang chiếu"); // Default to "Đang chiếu"

  // Hook to fetch the latest movies
  const { data: latestMovies, isLoading: latestMoviesLoading } = useGetLatestMoviesByCreationDateQuery();

  const handleTrailerClick = (url) => {
    setVideoUrl(url);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setVideoUrl("");
  };

  const handleTabClick = (tabName) => {
    setSelectedTab(tabName); // Update the selected tab
  };

  // Loading state
  if (latestMoviesLoading) {
    return <LoadingLocal />;
  }

  return (
    <>
      <div className="flex justify-center bg-black">
        <div className="w-full">
          <div className="flex justify-center items-center font-sans mx-auto mt-0">
            <div className="w-4/5 mt-28 pt-2 text-center font-semibold text-2xl md:text-3xl text-gray-300 border-b border-white">
              <div className="inline-flex items-center">
                <strong className="text-orange-600 px-2">|</strong> {t("Phim")} 
              </div>
              <div className="flex justify-center items-center space-x-2 md:space-x-4 my-2 text-lg md:text-xl">
                <Link
                  onClick={() => handleTabClick("Đang chiếu")}
                  className={`${selectedTab === "Đang chiếu" ? "text-orange-600" : "text-white"} cursor-pointer`}
                >
                  {t("Đang chiếu")}
                </Link>
                <Link
                  onClick={() => handleTabClick("Sắp chiếu")}
                  className={`${selectedTab === "Sắp chiếu" ? "text-orange-600" : "text-white"} cursor-pointer`}
                >
                  {t("Sắp chiếu")} 
                </Link>
                <Link
                  onClick={() => handleTabClick("Phim Imax")}
                  className={`${selectedTab === "Phim Imax" ? "text-orange-600" : "text-white"} cursor-pointer`}
                >
                 {t("Phim Imax")} 
                </Link>
              </div>
            </div>
          </div>

          {/* Movie Grid */}
          <div className="w-4/5 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
            {/* Movie Card */}
            {latestMovies?.data?.slice(0, 20).map((movie) => (
              <div key={movie._id} className="group w-full">
                <div className="relative flex flex-col items-center my-2">
                  <img src={movie.img} alt={movie.name} className="w-full h-[385px]" />
                  <div className="overlay absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="button-container flex flex-col space-y-4">
                      <button
                        onClick={() => handleTrailerClick(movie?.url_video)} // Use the movie's trailer URL
                        className="overlay-btn-xh bg-orange-500 w-38 py-2 text-center text-white"
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
                  <div className="absolute bottom-0 right-0 bg-orange-600 text-white px-2 py-1">T18</div>
                  <div className="absolute bottom-14 right-2 text-yellow-400">★★★★☆</div>
                </div>
                <div className="text-white text-center mt-2 text-sm md:text-base">{movie.name}</div>
              </div>
            ))}
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
      </div>

      <div className="flex flex-col w-4/5 justify-center m-auto text-white py-5 px-5">
        <div className="w-full py-8 text-center font-semibold text-2xl md:text-3xl text-gray-300">
          Phim đang chiếu
        </div>

        {latestMovies?.data?.slice(0, 20).map((movie) => (
          <div key={movie.id} className="text-sm md:text-base mt-4">
            <div className="flex items-center space-x-2 font-bold">
              <div>1. {movie.name}</div>
              <div>– Kinh dị, Hài</div>
              <div>– {formatDate(movie.release_date)}</div>
            </div>
            <div className="mt-2">{movie.description}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Movie;
