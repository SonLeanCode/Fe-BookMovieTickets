import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaClock, FaMapMarkerAlt, FaQuoteLeft } from "react-icons/fa";
import { useGetMovieByIdQuery } from "../../services/Movies/movies.services";
import { useGetGenresByMovieQuery } from "../../services/Genre/genre_movies.service";
import { useGetActorsByMovieQuery } from "../../services/Actor/actor_movies.service";
import { formatDate } from "../../utils/formatDate";
import notfound_img from "../../assets/img/404/not_found_img.jpg";
import VideoPlayer from "../../components/Movie/VideoPlayer";
import NowShowing from "../../components/Movie/NowShowing";
import CommentsSection from "../../components/Movie/CommentsSection";
import LoadingLocal from "../Loading/LoadingLocal";

const MovieDetailPage = () => {
  const { id } = useParams();
  const { data: movieData, isLoading: movieDataLoading  } = useGetMovieByIdQuery(id);
  const { data: genre_moviesData, isLoading: genre_moviesDataLoading } = useGetGenresByMovieQuery(id);
  const { data: actor_moviesData, isLoading: actor_moviesDataLoaing } = useGetActorsByMovieQuery(id);
  const [activeTab, setActiveTab] = useState("content");

  const tabs = [
    { id: "content", label: "Nội dung", content: movieData?.data.description },
    {
      id: "figure",
      label: "Nhân vật",
      content: (
        <>
          <div className="producer">
            <strong className="text-xl">Tác giả : </strong>
            <span className="">{movieData?.data.producer}</span>
          </div>
          <div className="director mt-4">
            <strong className="text-xl">Đạo diễn : </strong>
            <span className="">{movieData?.data.director}</span>
          </div>
          <div className="actor mt-6 flex">
            <strong className="mr-4 text-xl">Diễn viên: </strong>
            {actor_moviesData?.data.map((movie) => (
              <div
                key={movie._id}
                className="mr-8 w-32 flex-col items-center text-center"
              >
                <img
                  src={movie.actor_id.feature_img || notfound_img}
                  alt={movie.actor_id.name}
                  className="h-32 w-32 rounded-full"
                />
                <span className="mt-4">{movie.actor_id.name}</span>
              </div>
            ))}
          </div>
        </>
      ),
    },
    {
      id: "settings",
      label: "Hình ảnh",
      content: (
        <>
          <strong>Một số hình ảnh trong phim</strong>
          <img src={movieData?.data.img} alt="" className="w-[200px]" />
        </>
      ),
    },
    {
      id: "invoice",
      label: "Mã giảm ",
      content: (
        <>
          <div className="flex">
            Hiện tại chưa có mã giảm giá dành riêng cho phim
          </div>
        </>
      ),
    },
  ];

  if(movieDataLoading || genre_moviesDataLoading || actor_moviesDataLoaing){
    return <LoadingLocal/>
  }

  return (
    <div className="mt-[88px] min-h-screen bg-black text-white">
      {/* Show video */}
      <VideoPlayer
        urlvideo={movieData?.data.url_video}
        urlvideo_img={movieData?.data.img_video}
      />

      <div className="mx-28 grid max-w-[85rem] grid-cols-1 gap-10 py-6 pt-2 md:grid-cols-4">
        {/* left session */}
        <div className="flex flex-col space-y-6 md:col-span-3">
          {/* Movie Detail */}
          <div className="flex items-start space-x-6">
            <img
              src={movieData?.data.img}
              alt={movieData?.data.name}
              className="z-40 -mt-32 w-[350px] rounded-lg object-cover shadow-lg md:h-[450px]"
            />
            <div className="w-full">
              <div className="flex items-end justify-between">
                <h1 className="text-3xl font-bold text-gray-200">
                  {movieData?.data.name}
                </h1>
              </div>
              {movieData?.data.age_limit ? (
                <div className="age mb-2 mt-2 flex items-center text-sm text-gray-300">
                  <span className="mr-2 rounded-full bg-red-500 p-1 px-2 font-bold text-white">
                    {movieData.data.age_limit}+
                  </span>
                  <p className="flex items-center">
                    Phim được phổ biến từ người xem{" "}
                    <span className="mx-1 font-bold text-yellow-300">
                      {movieData.data.age_limit}+
                    </span>{" "}
                    tuổi trở lên
                  </p>
                </div>
              ) : (
                <div className="age mb-2 mt-2 flex items-center text-sm text-gray-300">
                  <span className="mr-2 rounded-full bg-green-500 p-1 px-2 font-bold text-white">
                    0+
                  </span>
                  <p className="flex items-center">
                    Phim được phổ biến đến người xem ở mọi độ tuổi
                  </p>
                </div>
              )}
              <div className="mt-4 flex items-center">
                <svg
                  className="me-1 h-6 w-6 text-yellow-300"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 20"
                >
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <p className="text-xl font-bold text-white">
                  {movieData?.data.rating}
                </p>
                <span className="text-md ml-2 font-medium text-gray-300">
                  ({movieData?.data.votes} lượt đánh giá)
                </span>
              </div>
              <div className="mt-2 flex items-center gap-5 text-sm text-gray-300">
                <div className="flex items-center">
                  <FaClock className="mr-1 text-white" />
                  <span>{movieData?.data.duration} phút</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="mr-1 text-white" />
                  <span>Quốc gia: {movieData?.data.country}</span>
                </div>
                <div className="flex items-center">
                  <FaQuoteLeft className="mr-1 text-white" />
                  <span> Phụ đề : {movieData?.data.subtitles}</span>
                </div>
                <div className="flex items-center">
                  <FaQuoteLeft className="mr-1 text-white" />
                  <span>
                    Ngày khởi chiếu : {formatDate(movieData?.data.release_date)}
                  </span>
                </div>
              </div>

              <div className="mt-3 text-sm text-gray-300">
                <div className="mt-2">
                  <span className="text-white">
                    {" "}
                    Nhà sản xuất : {movieData?.data.producer}{" "}
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-white">Thể Loại: </span>
                  {genre_moviesData?.data.map((movie) => {
                    return (
                      <Link
                        to={'/cinema/genrefilm/'+movie.genre_id._id}
                        key={movie._id}
                        className="ml-3 rounded border border-gray-700 px-2 py-1 text-white hover:bg-gray-700"
                      >
                        {movie?.genre_id.name}
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-2">
                  <span className="text-white">Đạo diễn:</span>
                  <button className="ml-3 rounded border border-gray-700 px-2 py-1 text-white hover:bg-gray-700">
                    {movieData?.data.director}
                  </button>
                </div>
                <div className="mt-2">
                  <span className="mr-2 text-white">Diễn viên:</span>
                  {actor_moviesData?.data.map((movie) => {
                    return (
                      <Link
                        to={'/cinema/actor/'+movie?.actor_id._id}
                        key={movie._id}
                        className="ml-3 rounded border border-gray-700 px-2 py-1 text-white hover:bg-gray-700"
                      >
                        {movie?.actor_id.name}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* nội dung  */}
          <div className="sm:hidden">
            <select
              id="tabs"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              onChange={(e) => setActiveTab(e.target.value)}
            >
              {tabs.map((tab) => (
                <option key={tab.id} value={tab.id}>
                  {tab.label}
                </option>
              ))}
            </select>
          </div>
          <ul className="hidden rounded-lg text-center text-sm font-medium text-gray-500 shadow dark:divide-gray-700 dark:text-gray-300 sm:flex">
            {tabs.map((tab) => (
              <li key={tab.id} className="w-full focus-within:z-10">
                <button
                  className={`inline-block w-full border-r border-gray-700 bg-gray-900 p-4 dark:bg-gray-800 dark:hover:text-white ${activeTab === tab.id ? "font-semibold uppercase text-white" : "bg-gray text-gray-500"} border-b-0 border-gray-100`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-4">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`tab-content ${activeTab === tab.id ? "block" : "hidden"}`}
              >
                {tab.content}
              </div>
            ))}
          </div>

          {/* bình luận  */}
          <CommentsSection />
        </div>

        {/*  right session */}
        <NowShowing />
      </div>
    </div>
  );
};

export default MovieDetailPage;
