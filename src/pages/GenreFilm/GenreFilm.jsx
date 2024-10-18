import { useState, useEffect } from "react";
import { useGetAllGenresQuery } from "../../services/Genre/genre.service";
import { useGetMoviesByGenreQuery } from "../../services/Genre/genre_movies.service";
import { useGetAllMoviesQuery } from "../../services/Movies/movies.services";
import { Link, useParams } from "react-router-dom";

const MovieList = () => {
  const { id } = useParams();
  const { data: genreData } = useGetAllGenresQuery();
  const { data: allMoviesData } = useGetAllMoviesQuery();
  const [selectedGenre, setSelectedGenre] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);
  useEffect(() => {
    if (id) {
      setSelectedGenre(id);
    }
  }, [id]);
  
  // Lấy dữ liệu phim theo thể loại khi chọn thể loại
  const { data: moviesByGenreData } = useGetMoviesByGenreQuery(selectedGenre, {
    skip: !selectedGenre, // Bỏ qua nếu không có thể loại được chọn
  });

  // Xác định phim nào cần hiển thị
  const moviesToDisplay = selectedGenre
    ? moviesByGenreData?.data.map((data) => ({
        _id: data.movie_id._id,
        name: data.movie_id.name,
        img: data.movie_id.img,
      }))
    : allMoviesData?.data;

  // Xử lý khi nhấn nút "Xem thêm"
  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  return (
    <div className="mt-28 bg-gray-900 p-[4.5rem] pt-7 text-white">
      <div className="flex justify-between filter">
        <div className="menuleft mb-6 flex items-center content-center justify-start gap-10 text-center align-text-top">
          <h2 className="text-2xl font-bold uppercase">
          <span className="border-l-4 border-solid border-red-600 mr-2"></span>
            Thể loại phim
          </h2>

          {/* Lọc theo thể loại */}
          <div>
            <select
              id="genre"
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="w-36 rounded bg-white p-2 text-black"
            >
              <option value="">Tất cả</option>
              {genreData?.data.map((data) => (
                <option key={data._id} value={data._id}>
                  {data.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="thanhngang mb-6 h-px bg-slate-400"></div>

      {/* Hiển thị danh sách phim */}
      <div className="grid grid-cols-4 gap-4">
        {moviesToDisplay && moviesToDisplay.length > 0 ? (
          moviesToDisplay.slice(0, visibleCount).map((movie, index) => (
            <div key={index} className="group relative overflow-hidden">
              <div className="relative">
                <img
                  src={movie.img}
                  alt={movie.name}
                  className="w-full object-cover duration-300 hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="button-container flex flex-col space-y-4">
                    <Link
                      to={`/cinema/movie/${movie._id}`}
                      className="overlay-btn-xh w-38 py-2 text-center text-white"
                    >
                      Trailer <i className="fas fa-video ml-1"></i>
                    </Link>
                    <Link
                      to={`/cinema/movie/${movie._id}`}
                      className="overlay-btn-xh w-38 py-2 text-center text-white"
                    >
                      Mua vé <i className="fas fa-ticket-alt ml-1"></i>
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
            Hiện chưa có phim với thể loại này
          </p>
        )}
      </div>

      <div className="xemthem flex items-center justify-between">
        <div className="thanhngang mr-5 h-px w-3/4 bg-slate-400"></div>

        <button
          className="w-1/4 rounded-full bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          onClick={handleShowMore}
        >
          Xem thêm
        </button>
      </div>
    </div>
  );
};

export default MovieList;
