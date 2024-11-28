import { Link } from "react-router-dom";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
import { useGetActorByIdQuery } from "../../services/Actor/actor.service";
import { useGetMoviesByActorIdQuery } from "../../services/Movies/movies.services";
import notfound_img from "../../assets/img/404/not_found_img.jpg";
import NowShowingMovies from './NowShowingMovies';

const Actordetail = () => {
  const { id } = useParams();
  const { data: actorData } = useGetActorByIdQuery(id);
  const { data: moviesData } = useGetMoviesByActorIdQuery(id);

  const images = [
    "https://cdn.galaxycine.vn/media/1/4/1425307280510.cached.jpg",
    "https://cdn.galaxycine.vn/media/m/a/margot-robbie.jpg",
    "https://cdn.galaxycine.vn/media/m/a/margot-robbie-hd-pictures.jpg",
    "https://cdn.galaxycine.vn/media/m/a/margot-robbie-hd-pictures.jpg",
    "https://cdn.galaxycine.vn/media/1/4/1425307280510.cached.jpg", // Repeat for testing
    "https://cdn.galaxycine.vn/media/m/a/margot-robbie.jpg",
    "https://cdn.galaxycine.vn/media/m/a/margot-robbie-hd-pictures.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const imagesPerSlide = 4; // Number of images to show at once

  // Handle "Next" button click
  const handleNext = () => {
    if (currentIndex + imagesPerSlide < images.length) {
      setCurrentIndex(currentIndex + imagesPerSlide);
    }
  };

  // Handle "Previous" button click
  const handlePrevious = () => {
    if (currentIndex - imagesPerSlide >= 0) {
      setCurrentIndex(currentIndex - imagesPerSlide);
    }
  };

  const Breadcrumb = () => (
    <nav className="my-4 text-gray-400" aria-label="Breadcrumb">
      <ol className="inline-flex list-none p-0">
        <li className="flex items-center">
          <Link
            to="/cinema"
            className="text-gray-300 hover:text-white hover:underline"
          >
            Trang chủ
          </Link>
          <span className="mx-2">/</span>
        </li>
        <li className="flex items-center">
          <Link
            to="/cinema/actor"
            className="text-gray-300 hover:text-white hover:underline"
          >
            Diễn viên
          </Link>
          <span className="mx-2">/</span>
        </li>
        <li className="text-gray-300">
          {actorData?.data.name || "Đang tải..."}
        </li>
      </ol>
    </nav>
  );

  return (
    <section className="flex justify-center bg-black">
      <div className="mx-24 w-11/12">
        <div className="my-4 mt-28 flex flex-col md:flex-row">
          <div className="mr-2 flex-1 text-white">
            <div
              className="flex items-start rounded-sm bg-gray-900 p-4 pt-10"
              style={{ backgroundColor: "#181818" }}
            >
              <div className="flex-shrink-0">
                <img
                  src={actorData?.data.feature_img || notfound_img}
                  alt={actorData?.data.name}
                  className="rounded-md object-cover"
                  style={{ width: "255px", height: "384px" }}
                />
              </div>
              <div className="ml-4 flex flex-1 flex-col">
                <Breadcrumb />
                <h2 className="text-4xl font-semibold text-gray-200">
                  {actorData?.data.name}
                </h2>
                <div className="my-2 flex items-center">
                  <button
                    className="rounded px-2 text-white"
                    style={{ backgroundColor: "#4080ff" }}
                  >
                    <i className="fa-regular fa-thumbs-up"></i> Thích
                  </button>
                  <div className="ml-4 rounded-sm bg-gray-200 px-2 text-black">
                    <i className="fa-solid fa-eye"></i> {actorData?.data.views}
                  </div>
                </div>
                <p className="text-gray-300">{actorData?.data.description}</p>
                <ul className="text-md mt-6 font-semibold">
                  <li className="mb-2">
                    <span className="text-gray-300">Ngày sinh: </span>
                    <span>{formatDate(actorData?.data.date_of_birth)}</span>
                  </li>
                  <li className="mb-2">
                    <span className="text-gray-300">Chiều cao: </span>
                    {!actorData?.data.height ? (
                      <span>Đang Cập Nhật</span>
                    ) : (
                      <span>{actorData?.data.height + "cm"}</span>
                    )}
                  </li>
                  <li className="mb-2">
                    <span className="text-gray-300">Quốc tịch: </span>
                    {!actorData?.data.nationality ? (
                      <span>Đang Cập Nhật</span>
                    ) : (
                    <span>{actorData?.data.nationality}</span>
                  )}
                  </li>
                </ul>
              </div>
            </div>

            {/* Hình ảnh */}
            <div className="relative p-4">
              <h2 className="border-b-2 border-gray-600 pb-2 text-2xl font-bold">
                <span className="mr-2 border-l-4 border-solid border-red-600"></span>
                HÌNH ẢNH
              </h2>

              {!actorData?.data.sub_img ||
              actorData.data.sub_img.length === 0 ? (
                <p className="text-md mt-4 text-center font-semibold text-white">
                  Đang cập nhật
                </p>
              ) : (
                <div className="mt-4 flex items-center justify-center">
                  <button
                    onClick={handlePrevious}
                    className="absolute left-0 rounded-full border p-2 text-white hover:bg-gray-600 disabled:opacity-50"
                    disabled={currentIndex === 0}
                  >
                    ‹-
                  </button>
                  <div className="flex gap-4">
                    {actorData?.data.sub_img &&
                      actorData?.data.sub_img
                        .slice(currentIndex, currentIndex + imagesPerSlide)
                        .map((src, index) => (
                          <img
                            key={index}
                            className="w-[190px] rounded-lg"
                            src={src}
                            alt={`Image ${currentIndex + index + 1}`}
                          />
                        ))}
                  </div>
                  <button
                    onClick={handleNext}
                    className="absolute right-0 rounded-full border p-2 text-white hover:bg-gray-600 disabled:opacity-50"
                    disabled={
                      currentIndex + imagesPerSlide >=
                      actorData?.data.sub_img.length
                    }
                  >
                    -›
                  </button>
                </div>
              )}
            </div>

            <div className="mt-4 w-full p-4 md:mt-0">
              <h2 className="border-b-2 border-gray-600 pb-2 text-2xl font-bold">
                <span className="mr-2 border-l-4 border-solid border-red-600"></span>
                PHIM ĐÃ THAM GIA
              </h2>
              {moviesData?.data.length === 0 ? (
                <p className="mt-4 text-gray-300">Đang cập nhật</p>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {moviesData?.data.map((movie) => (
                    <div
                      key={movie._id}
                      className="flex items-start rounded-lg p-4"
                    >
                      <Link to={"/cinema/movie/" + movie._id}>
                        <img
                          src={movie.img_video}
                          alt={movie.name}
                          className="w-42 h-28 rounded-md object-cover"
                        />
                      </Link>
                      <div className="ml-4 text-white">
                        <Link to={"/cinema/movie/" + movie._id}>
                          <h3 className="text-sm font-semibold">
                            {movie.name}
                          </h3>
                        </Link>
                        <p className="mt-2 text-sm text-gray-300">
                          {movie.release_date
                            ? formatDate(movie.release_date)
                            : "Đang cập nhật"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Tiểu sử */}
            <div className="p-4">
              <h2 className="border-b-2 border-gray-600 pb-2 text-2xl font-bold">
                <span className="mr-2 border-l-4 border-solid border-red-600"></span>
                TIỂU SỬ
              </h2>
              <p className="text-md mt-4 text-center font-semibold text-white">
                {actorData?.data.biography}
              </p>
            </div>
          </div>

          <div className='mt-4 w-full md:mt-0 md:w-[30%]'>
            <NowShowingMovies />
          </div>
         
        </div>
      </div>
    </section>
  );
};

export default Actordetail;
