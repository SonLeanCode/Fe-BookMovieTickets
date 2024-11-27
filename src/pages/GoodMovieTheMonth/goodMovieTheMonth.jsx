import React, { useState } from 'react';
import { Link } from "react-router-dom";
import {FaPhotoVideo, FaTicketAlt } from "react-icons/fa";
import { FaClock, FaMapMarkerAlt, FaQuoteLeft } from "react-icons/fa";
import { useGetMoviesWithTicketStatsQuery } from '../../services/Movies/movies.services';
import NowShowingMovies from '../Actor/NowShowingMovies';
import { formatDate } from "../../utils/formatDate";
import { useTranslation } from 'react-i18next';

const MoviePage = () => {
  const { t } = useTranslation(); 
  const { data: topMovies, isLoading, isError } = useGetMoviesWithTicketStatsQuery();
  const [selectedTrailer, setSelectedTrailer] = useState(null); // Quản lý trạng thái trailer được chọn

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        Đang tải dữ liệu...
      </div>
    );
  }

  if (isError || !topMovies) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-red-500">
        Lỗi khi tải dữ liệu. Vui lòng thử lại sau.
      </div>
    );
  }

  return (
    <section className="flex justify-center bg-black">
      <div className="mx-24 w-11/12">
        <div className="mt-32 my-4 flex flex-col md:flex-row">
          {/* Phim Hay Trong Tháng */}
          <div className="flex-1 text-white">
            <div className="relative mb-8">
              <h2 className="text-3xl font-extrabold text-white tracking-wide uppercase">
                | Phim Hay Trong Tháng
              </h2>
              <div className="mt-4 ml-5 bottom-0 left-0 max-w-96 h-1 bg-red-500"></div>
            </div>

            {/* Hiển thị danh sách phim */}
            {topMovies.map((movie) => (
              <div
                className="flex items-start bg-gray-900 p-6 mb-6 rounded-md"
                key={movie._id}
              >
                <div className="flex-shrink-0">
                  <Link to={`/cinema/movie/${movie._id}`}>
                    <img
                      
                      src={movie.img || 'https://via.placeholder.com/255x370'}
                      alt={movie.name}
                      className="rounded-md"
                      style={{ width: '245px', height: '280px' }}
                    />
                  </Link>
                </div>

                <div className="ml-6 flex-1">
                  <h3 className="text-2xl font-bold text-white">{movie.name}</h3>
                  <div className="mt-2 flex items-center text-sm text-gray-300">
                    <span className="mr-2 rounded-full bg-red-500 p-1 px-2 text-white">
                      {movie.age_limit}+
                    </span>
                    <span>Phim dành cho tuổi từ {movie.age_limit}+ trở lên</span>
                  </div>

                  <div className="mt-2 text-sm text-gray-300">
                    <div>Tổng số vé đã bán: {movie.totalTickets}</div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-5 text-sm text-gray-300">
                    <div className="flex items-center">
                      <FaClock className="mr-2 text-white" />
                      <span>{movie.duration} phút</span>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="mr-2 text-white" />
                      <span>Quốc gia: {movie.country}</span>
                    </div>
                    <div className="flex items-center">
                      <FaQuoteLeft className="mr-2 text-white" />
                      <span>{movie.subtitles}</span>
                    </div>
                    <div className="flex items-center">
                      <span>
                        Ngày khởi chiếu : {formatDate(movie.release_date)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4">
                  <span className="text-white">
                    Nhà sản xuất: {movie.producer.split(' Xem thêm tại: ')[0]}
                  </span>
                  </div>
                  <div className="mt-4">
                    <span className="text-white">Đạo diễn: </span>
                    <button className="ml-2 rounded border border-gray-700 px-2 py-1 text-white hover:bg-gray-700">
                      {movie.director}
                    </button>
                  </div>

                  <div className='flex gap-2 mt-3'>
                    {/* Nút mở trailer */}
                    {movie.url_video && (
                        <button
                        onClick={() => setSelectedTrailer(movie.url_video)}
                        className="bg-orange-500 rounded w-28 p-2 font-bold flex items-center justify-center text-center text-white"
                        >
                        Trailer
                        <FaPhotoVideo  size={18} className="ml-2" />
                        </button>
                    )}
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
            ))}
          </div>

          {/* Phim Đang Chiếu */}
          <div className='mt-4 w-full md:mt-0 md:w-[30%]'>
            <NowShowingMovies />
          </div>
        </div>
      </div>

      {/* Hiển thị trailer YouTube */}
      {selectedTrailer && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg overflow-hidden shadow-lg w-11/12 md:w-3/4 lg:w-1/2">
            <div className="relative">
              <iframe
                className="w-full aspect-video"
                src={selectedTrailer.replace('watch?v=', 'embed/')} // Chuyển đổi link YouTube
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              <button
                className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-700"
                onClick={() => setSelectedTrailer(null)}
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MoviePage;
