import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetMoviesNowShowingQuery } from "../../services/Movies/movies.services";
import { FaTicketAlt } from "react-icons/fa";

const NowShowingMovies = () => {
  const { t } = useTranslation();

  const {
    data: nowShowingMovies,
    isLoading: nowShowingLoading,
    isError,
  } = useGetMoviesNowShowingQuery();

  // Check loading and error states
  if (nowShowingLoading) {
    return <p className="text-white">{t("Đang tải...")}</p>;
  }

  if (isError || !nowShowingMovies?.success) {
    return <p className="text-red-500">{t("Có lỗi xảy ra, vui lòng thử lại sau.")}</p>;
  }

  // Get the list of now showing movies
  const movies = nowShowingMovies?.nowShowingMovies || [];

  return (
    <div className="">
      <h2 className="font-roboto mb-3 text-center text-2xl font-bold text-white">
        {t("| PHIM ĐANG CHIẾU")}
      </h2>

      {/* Display list of movies */}
      {movies.length > 0 ? (
        movies.slice(0, 3).map((movie) => (
          <div className="group ml-6 mb-6 md:mb-4" key={movie._id}>
            <div className="relative my-2 flex flex-shrink-0 flex-grow flex-col items-center">
              <img
                src={movie.img_video}
                alt={movie.name}
                className="h-auto w-full rounded-lg shadow-lg object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <Link
                  to={`/cinema/movie/${movie._id}`}
                  className="bg-orange-500 rounded w-28 p-2 font-bold flex items-center justify-center text-center text-white"
                >
                  {t("Mua vé")}
                  <FaTicketAlt size={18} className="mt-1 ml-2" />
                </Link>
              </div>
              {movie?.age_limit ? (
                <div className="absolute bottom-0 rounded-tl-md rounded-br-md right-0 bg-orange-600 text-white px-2 py-1">
                  {movie.age_limit}+
                </div>
              ) : (
                <div className="absolute bottom-0 rounded-tl-md rounded-br-md right-0 bg-orange-600 text-white px-2 py-1">
                  0+
                </div>
              )}
              <div className="absolute bottom-14 right-2 text-yellow-400">
                ★★★★☆
              </div>
            </div>
            <div className="text-white text-xl font-bold">{movie.name}</div>
          </div>
        ))
      ) : (
        <p className="text-white text-center">{t("Không có phim nào đang chiếu.")}</p>
      )}

      {/* Link to full movie list */}
      <div className="mt-5 text-right">
        <Link
          to="/cinema/movie"
          className="ml-auto mt-5 w-48 rounded-sm border border-orange-600 p-2 text-lg text-orange-600"
        >
          {t("Xem thêm")}
        </Link>
      </div>
    </div>
  );
};

export default NowShowingMovies;
