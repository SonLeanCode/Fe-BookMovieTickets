import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  useGetMoviesNowShowingQuery,
  useGetMoviesComingSoonQuery,
} from "../../services/Movies/movies.services";
import { formatDate } from "../../utils/formatDate";
import Modal_Video from "../../components/Movie/Modal_Video";
import {FaPhotoVideo, FaTicketAlt } from "react-icons/fa";
import LoadingLocal from "../Loading/LoadingLocal";

const Movie = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [selectedTab, setSelectedTab] = useState("Đang chiếu"); // Default tab: Đang chiếu

  // Fetch data for each category
  const {
    data: nowShowingMovies,
    isLoading: nowShowingLoading,
  } = useGetMoviesNowShowingQuery();

  const {
    data: comingSoonMovies,
    isLoading: comingSoonLoading,
  } = useGetMoviesComingSoonQuery();

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

  const isLoading =
    selectedTab === "Đang chiếu" ? nowShowingLoading : comingSoonLoading;
    console.log("Selected Tab:", selectedTab);
    const movies =
    selectedTab === "Đang chiếu"
      ? nowShowingMovies?.nowShowingMovies || []  // Kiểm tra đúng thuộc tính
      : comingSoonMovies?.comingSoonMovies || [];
  
  console.log("Movies to render:", movies);  // Kiểm tra mảng phim hiện tại


  if (isLoading) {
    return <LoadingLocal />;
  }

  return (
    <>
      <div className="flex justify-center bg-black">
        <div className="w-full">
          <div className="flex justify-center items-center font-sans mx-auto mt-0">
            <div className="w-10/12 mt-28 pt-2 text-center font-semibold text-2xl md:text-3xl text-gray-300 border-b border-white">
              <div className="inline-flex items-center">
                <strong className="text-orange-600 px-2">|</strong> {t("Phim")}
              </div>
              <div className="flex justify-center items-center space-x-2 md:space-x-4 my-2 text-lg md:text-xl">
                <Link
                  onClick={() => handleTabClick("Đang chiếu")}
                  className={`${
                    selectedTab === "Đang chiếu" ? "text-orange-600" : "text-white"
                  } cursor-pointer`}
                >
                  {t("Đang chiếu")}
                </Link>
                <Link
                  onClick={() => handleTabClick("Sắp chiếu")}
                  className={`${
                    selectedTab === "Sắp chiếu" ? "text-orange-600" : "text-white"
                  } cursor-pointer`}
                >
                  {t("Sắp chiếu")}
                </Link>
              </div>
            </div>
          </div>

          {/* Movie Grid */}
          <div className="w-10/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7 mt-4">
                {movies.map((movie) => (
                  <div key={movie._id} className="group w-full ">
                    <div className="relative flex flex-col items-center my-2 ">
                      <img src={movie.img} alt={movie.name} className="w-full rounded-lg" />
                      <div className="overlay absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <div className="button-container flex flex-col space-y-4">
                          <Link
                            onClick={() => handleTrailerClick(movie?.url_video)}
                            to={``}
                            className="bg-orange-500 rounded w-28 p-2 font-bold flex items-center justify-center text-center text-white"
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
                      {movie?.age_limit ? (
                          <div className="absolute w-12 text-center bottom-0 rounded-tl-md rounded-br-md right-0 bg-orange-600 text-white px-2 py-1">
                            {movie.age_limit}+
                          </div>
                        ) : (
                          <div className="absolute w-12 text-center bottom-0 rounded-tl-md rounded-br-md right-0 bg-orange-600 text-white px-2 py-1">
                            0+
                          </div>
                        )}

                      <div className="absolute bottom-14 right-2 text-yellow-400">
                        ★★★★☆
                      </div>
                    </div>
                    <div className="text-white text-center mt-2 text-lg  font-semibold ">
                      {movie.name}
                    </div>
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
      <div className="flex flex-col w-10/12 justify-center m-auto text-white mb-5 ">
        <div className="w-full py-8 text-center font-semibold text-2xl md:text-3xl text-gray-300">
          {selectedTab === "Đang chiếu" ? t("Phim đang chiếu") : t("Phim sắp chiếu")}
        </div>

        {movies.slice(0, 20).map((movie,index) => (
          <div key={movie._id} className="text-sm md:text-base mt-4">
            <div className="flex items-center space-x-2 font-bold">
              <div>{index+1}. {movie.name}</div>
              {/* <div>– Kinh dị, Hài</div> */}
              <div>– {formatDate(movie.release_date)}</div>
            </div>
            <div className="mt-2 text-gray-300">{movie.description}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Movie;
