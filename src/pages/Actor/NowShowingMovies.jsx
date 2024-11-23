import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useGetMoviesNowShowingQuery } from "../../services/Movies/movies.services";
import {FaTicketAlt } from "react-icons/fa";

const NowShowingMovies = () => {
  const { t } = useTranslation();

  const {
    data: nowShowingMovies,
    isLoading: nowShowingLoading,
    isError,
  } = useGetMoviesNowShowingQuery();

  // Kiểm tra trạng thái tải hoặc lỗi
  if (nowShowingLoading) {
    return <p className="text-white">{t("Đang tải...")}</p>;
  }

  if (isError || !nowShowingMovies?.success) {
    return <p className="text-red-500">{t("Có lỗi xảy ra, vui lòng thử lại sau.")}</p>;
  }

  // Lấy danh sách phim đang chiếu
  const movies = nowShowingMovies?.nowShowingMovies || [];

  return (
    <div className="mt-4 w-full md:mt-0 md:w-[30%]">
      <h2 className="font-roboto mb-3 text-center text-2xl font-semibold text-white">
        {t("Phim đang chiếu")}
      </h2>

      {/* Hiển thị danh sách phim */}
      {movies.length > 0 ? (
        movies.slice(0,3).map((movie) => (
          <div className="group ml-6" key={movie._id}>
            <div className="relative my-2 flex flex-shrink-0 flex-grow flex-col items-center">
              <img
                src={movie.img_video}
                alt={movie.name}
                className="h-auto w-full"
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
                    <div className="absolute  bottom-0 rounded-tl-md rounded-br-md right-0 bg-orange-600 text-white px-2 py-1">
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
            <div className="text-white">{movie.name}</div>
          </div>
        ))
      ) : (
        <p className="text-white">{t("Không có phim nào đang chiếu.")}</p>
      )}

      {/* Link đến danh sách đầy đủ */}
      <h2 className="font-roboto right-0 ml-auto mt-5 w-48 rounded-sm border border-orange-600 p-2 text-center text-lg text-orange-600">
        <Link to="/cinema/movie">{t("Xem thêm")}</Link>
      </h2>
    </div>
  );
};

export default NowShowingMovies;
