import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaClock,
  FaMapMarkerAlt,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { useGetShowtimesByMovieQuery } from "../../services/Showtimes/showtimes.serviecs";
import {
  useAddOrUpdateRatingMutation,
  useGetRatingsByMovieQuery,
} from "../../services/Rating/rating.serviecs";
import {
  useGetMovieByIdQuery,
  useIncreaseMovieViewsMutation,
} from "../../services/Movies/movies.services";
import { formatDate } from "../../utils/formatDate";
import notfound_img from "../../assets/img/404/not_found_img.jpg";
import VideoPlayer from "../../components/Movie/VideoPlayer";
import NowShowingMovies from "../Actor/NowShowingMovies";
import CommentsSection from "../../components/Movie/CommentsSection";
import LoadingLocal from "../Loading/LoadingLocal";
import { formatShowtime } from "../../utils/formatShowtime";
import { skipToken } from "@reduxjs/toolkit/query";
import { useNavigate } from "react-router-dom";


const MovieDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isRatingMode, setIsRatingMode] = useState(false); // Quản lý chế độ hiển thị
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const [addRating] = useAddOrUpdateRatingMutation();

  const {
    data: movieData,
    isLoading: movieDataLoading,
    refetch: movieRefetch,
  } = useGetMovieByIdQuery(id);

  const {
    data: showtimeMovieData,
    isLoading: showtimeMovieLoading,
  } = useGetShowtimesByMovieQuery(id);
  
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedCinema, setSelectedCinema] = useState("all");
  const [regions, setRegions] = useState([]);
  const [cinemas, setCinemas] = useState([]);
  const [filteredShowtimes, setFilteredShowtimes] = useState([]);
  const [showDates, setShowDates] = useState([]);

  useEffect(() => {
    if (!showtimeMovieData) return;

    // Set regions and cinemas based on the data
    const regionsData = showtimeMovieData?.data;
    setRegions(regionsData);
    const cinemasData = regionsData?.flatMap((region) =>
      region.cinemas.map((cinema) => ({
        ...cinema, // Các thông tin của rạp
      })),
    );
    setCinemas(cinemasData);
    const showDatesSet = new Set();
    regionsData?.forEach((region) => {
      region.cinemas.forEach((cinema) => {
        cinema.rooms.forEach((room) => {
          room.showtimes.forEach((showtime) => {
            const date = new Date(showtime.start_time);
            // Lấy ngày theo múi giờ địa phương
            const localDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
            showDatesSet.add(localDate);
          });
        });
      });
    });
    // Chuyển Set sang Array và sắp xếp tăng dần theo ngày
    const showDatesArray = Array.from(showDatesSet).sort(
      (a, b) => new Date(a) - new Date(b),
    );
    const allShowDates = [...showDatesArray];
    setShowDates(allShowDates);

    // Lọc ngày gần nhất
    if (allShowDates.length > 0) {
      setSelectedDate(allShowDates[0]); // Chọn ngày gần nhất mặc định
    }
  }, [showtimeMovieData]);

  useEffect(() => {
    // Khi selectedDate, selectedRegion, hoặc selectedCinema thay đổi, gọi filterShowtimes
    filterShowtimes(selectedDate, selectedRegion, selectedCinema);
  }, [selectedDate, selectedRegion, selectedCinema]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleRegionSelect = (event) => {
    const selectedRegionId = event.target.value;
    setSelectedRegion(selectedRegionId);
  
    // Cập nhật lại danh sách các rạp dựa trên khu vực đã chọn
    if (selectedRegionId === "all") {
      // Khi chọn "all", lấy tất cả các rạp từ tất cả các khu vực
      const allCinemas = regions.flatMap((region) => region.cinemas);
      setCinemas(allCinemas);
    } else {
      // Khi chọn khu vực cụ thể, chỉ lấy các rạp trong khu vực đó
      const selectedRegionData = regions.find(region => region._id === selectedRegionId);
      setCinemas(selectedRegionData ? selectedRegionData.cinemas : []);
    }
  
    // Đặt lại rạp đã chọn về "all" khi thay đổi khu vực
    setSelectedCinema("all");
  
    // Lọc lại suất chiếu theo ngày, khu vực và rạp (nếu có)
    filterShowtimes(selectedDate, selectedRegionId, "all");
  };

  const handleCinemaSelect = (event) => {
    const selectedCinemaId = event.target.value;
    setSelectedCinema(selectedCinemaId);

    // Nếu chọn "all", không lọc theo rạp mà chỉ lọc theo khu vực và ngày
    if (selectedCinemaId === "all") {
      filterShowtimes(selectedDate, selectedRegion, selectedCinemaId); // Lọc theo khu vực và ngày
    } else {
      // Nếu có chọn rạp, lọc theo khu vực, rạp và ngày
      filterShowtimes(selectedDate, selectedRegion, selectedCinemaId);
    }
  };
  const filterShowtimes = (date, region, cinema) => {
    const filtered = regions.flatMap((regionData) => {
      // Lọc theo khu vực (region)
      if (region !== "all" && region !== regionData._id) return []; // Nếu không khớp khu vực, bỏ qua

      return regionData.cinemas
        .filter((cinemaData) => {
          // Lọc theo rạp (cinema)
          if (cinema !== "all" && cinema !== cinemaData._id) return false;
          return true;
        })
        .map((cinemaData) => {
          return {
            cinemaId: cinemaData._id,
            cinemaName: cinemaData.name,
            address: cinemaData.address,
            rooms: cinemaData.rooms.map((room) => {
              return {
                roomId: room._id,
                roomName: room.name,
                showtimes: room.showtimes.filter((showtime) => {
                  // Chuyển đổi showtime.start_time về định dạng ngày trong múi giờ địa phương
                  const showtimeDate = new Date(showtime.start_time);
                  const showtimeFormatted =
                    showtimeDate.toLocaleDateString("vi-VN"); // Múi giờ Việt Nam

                  // Chuyển đổi date chọn vào về định dạng ngày trong múi giờ địa phương
                  const selectedDate = new Date(date);
                  const selectedDateFormatted =
                    selectedDate.toLocaleDateString("vi-VN"); // Múi giờ Việt Nam

                  return showtimeFormatted === selectedDateFormatted;
                }),
              };
            }),
          };
        });
    });
    setFilteredShowtimes(filtered);
  };

  const [increaseViews] = useIncreaseMovieViewsMutation();

  const handleShowtimeSelect = (showtime, room, cinema) => {
    // Xóa các ghế đã chọn trước đó
    localStorage.removeItem("selectedSeats");

    // Lưu thông tin vào localStorage
    localStorage.setItem("selectedMovie", JSON.stringify(movieData?.data));
    localStorage.setItem("selectedRoom", JSON.stringify(room));
    localStorage.setItem("selectedCinema", JSON.stringify(cinema));
    localStorage.setItem("selectedShowtime", JSON.stringify(showtime));

    // Chuyển hướng tới trang đặt vé
    navigate("/cinema/buy-tickets");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      increaseViews(id);
    }, 30000); // Gọi API sau 30 giây

    return () => clearTimeout(timer); // Xóa timer nếu người dùng rời khỏi trang
  }, [id, increaseViews]);

  const {
    data: ratingData,
    isLoading: ratingLoaing,
    refetch: ratingRefetch,
  } = useGetRatingsByMovieQuery(movieData?.data._id || skipToken);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleStarClick = async (rating) => {
    if (user) {
      setSelectedRating(rating);
      setIsRatingMode(false);
      await addRating({
        movieId: movieData?.data._id,
        userId: user?._id,
        rating,
      });
      movieRefetch();
      ratingRefetch();
    } else {
      alert("Vui lòng đăng nhập để đánh giá");
      setIsRatingMode(false);
    }
  };

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
            {movieData?.data?.actors.map((actor) => (
              <div
                key={actor._id}
                className="mr-8 w-32 flex-col items-center text-center"
              >
                <img
                  src={actor.feature_img || notfound_img}
                  alt={actor.name}
                  className="h-32 w-32 rounded-full"
                />
                <span className="mt-4">{actor.name}</span>
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

  if (movieDataLoading || ratingLoaing || showtimeMovieLoading) {
    return <LoadingLocal />;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Show video */}
      <VideoPlayer
        urlvideo={movieData?.data.url_video}
        urlvideo_img={movieData?.data.img_video}
      />

      <div className="mx-0 grid max-w-[85rem] grid-cols-1 gap-10 py-6 pt-0 md:mx-20 md:grid-cols-4 md:pt-2">
        {/* left session */}
        <div className="flex flex-col space-y-6 md:col-span-3">
          {/* Movie Detail */}
          <div className="flex items-start space-x-6">
            <img
              src={movieData?.data.img}
              alt={movieData?.data.name}
              className="z-40 -mt-32 hidden w-[350px] rounded-lg object-cover shadow-lg md:block md:h-[493px]"
            />
            <div className="w-full">
              <div className="flex items-end justify-between">
                <h1 className="mb-2 text-3xl font-bold uppercase text-white md:mb-0">
                  {movieData?.data.name}
                </h1>
              </div>
              <div className="mb-4 flex items-center">
                {isRatingMode ? (
                  <div className="flex items-center">
                    {[...Array(10)].map((_, index) => {
                      const starIndex = index + 1;
                      return (
                        <svg
                          key={starIndex}
                          className={`h-6 w-6 cursor-pointer ${
                            starIndex <= (hoveredStar || selectedRating)
                              ? "text-yellow-300"
                              : "text-gray-400"
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                          onMouseEnter={() => setHoveredStar(starIndex)}
                          onMouseLeave={() => setHoveredStar(0)}
                          onClick={() => handleStarClick(starIndex)}
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      );
                    })}
                  </div>
                ) : (
                  <div
                    className="flex cursor-pointer items-center"
                    onClick={() => setIsRatingMode(true)} // Chuyển sang chế độ chọn sao
                  >
                    <svg
                      className="me-1 h-4 w-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <p className="mb-3 text-xl font-bold text-white md:mb-0">
                      {movieData?.data.averageRating || 0}
                    </p>
                    <span className="ml-2 text-sm font-medium text-gray-300">
                      ({ratingData?.length || 0} lượt đánh giá)
                    </span>
                  </div>
                )}
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

              <div className="mt-5 flex flex-wrap items-center gap-5 text-base text-gray-300 md:text-sm">
                <div className="flex items-center">
                  <FaClock className="mr-2 text-white" />
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

              <div className="mt-3 text-base text-gray-300">
                <div className="mt-2">
                  <span className="text-white">
                    {" "}
                    Nhà sản xuất : {movieData?.data.producer}{" "}
                  </span>
                </div>
                <div className="mt-4">
                  <span className="text-white">Thể Loại: </span>
                  {movieData?.data?.genres.map((genre) => {
                    return (
                      <Link
                        to={"/cinema/genrefilm/" + genre._id}
                        key={genre._id}
                        className="ml-3 rounded border border-gray-700 px-2 py-1 text-white hover:bg-gray-700"
                      >
                        {genre.name}
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-4">
                  <span className="text-white">Đạo diễn:</span>
                  <button className="ml-3 rounded border border-gray-700 px-2 py-1 text-white hover:bg-gray-700">
                    {movieData?.data.director}
                  </button>
                </div>
                <div className="mt-2 flex items-center md:mt-4">
                  <span className="mr-2 w-[5.5rem] text-white md:w-auto">
                    Diễn viên:
                  </span>
                  <div className="mt-2 flex flex-wrap gap-2 md:mt-0">
                    {movieData?.data?.actors.map((actor) => {
                      return (
                        <Link
                          to={"/cinema/actor/" + actor._id}
                          key={actor._id}
                          className="rounded border border-gray-700 px-2 py-1 text-white hover:bg-gray-700"
                        >
                          {actor.name}
                        </Link>
                      );
                    })}
                    {movieData?.data?.actors.length > 3 && (
                      <span className="rounded border border-gray-700 px-2 py-1 text-white">
                        + {movieData?.data?.actors.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* nội dung  */}
          <div className="px-5 sm:hidden">
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
          <div className="mt-4 px-5 md:px-0">
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`tab-content ${activeTab === tab.id ? "block" : "hidden"}`}
              >
                {tab.content}
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col space-y-2">
            <div className="flex items-center justify-between">
              {showDates.length > 0 && (
                <div className="flex w-full justify-between">
                  <div className="flex w-full space-x-3 overflow-x-auto">
                    <button className="flex-shrink-0 rounded bg-gray-300 p-2 text-black">
                      <FaChevronLeft />
                    </button>
                    <div className="flex space-x-3 scroll-smooth">
                      {showDates.map((date, index) => {
                        const dateObj = new Date(date); // Tạo đối tượng Date từ chuỗi `YYYY-MM-DD`
                        const dayOfWeek = dateObj.toLocaleDateString("vi-VN", {
                          weekday: "long",
                        });
                        const formattedDate = dateObj.toLocaleDateString(
                          "vi-VN",
                          { day: "2-digit", month: "2-digit" },
                        );
                        const displayText = `${dayOfWeek}`;
                        const displayDate = `${formattedDate}`;

                        return (
                          <button
                            key={index}
                            onClick={() => handleDateSelect(date)}
                            className={`w-[100px] rounded px-2 py-2 ${selectedDate === date ? "bg-blue-500 text-white" : "bg-white text-black"}`}
                          >
                            <p>{displayText}</p>
                            <p>{displayDate}</p>
                          </button>
                        );
                      })}
                    </div>
                    <button className="flex-shrink-0 rounded bg-gray-300 p-2 text-black">
                      <FaChevronRight />
                    </button>
                  </div>

                  {/* Dropdown cho khu vực */}
                  <div className="ml-4">
                    <select
                      id="region-select"
                      value={selectedRegion}
                      onChange={handleRegionSelect}
                      className="mt-1 block w-[200px] rounded-md border-gray-300 bg-white text-black shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    >
                      <option value="all">Tất cả khu vực</option>
                      {regions.map((region, index) => (
                        <option key={index} value={region._id}>
                          {region.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Dropdown cho rạp */}
                  <div className="ml-4">
                    <select
                      id="cinema-select"
                      value={selectedCinema}
                      onChange={handleCinemaSelect}
                      className="mt-1 block w-[200px] rounded-md border-gray-300 bg-white text-black shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                    >
                      <option value="all">Tất cả các rạp</option>
                      {cinemas?.map((cinema, index) => (
                        <option key={index} value={cinema._id}>
                          {cinema.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}
            </div>

            {/* Kiểm tra nếu không có suất chiếu */}
            {filteredShowtimes?.length > 0 ? (
              filteredShowtimes?.map(
                (cinema) =>
                  // Kiểm tra nếu rạp có phòng có suất chiếu
                  cinema?.rooms?.some((room) => room?.showtimes?.length > 0) ? (
                    <div key={cinema.cinemaId} className="mb-6 rounded p-4">
                      {/* Tên rạp */}
                      <h1 className="mb-2 text-2xl font-semibold">
                        {cinema.cinemaName}
                      </h1>

                      {/* Các phòng */}
                      <div className="space-y-4">
                        {cinema?.rooms?.map(
                          (room) =>
                            // Kiểm tra nếu phòng có suất chiếu
                            room?.showtimes?.length > 0 && (
                              <div
                                key={room?.roomId}
                                className="flex flex-col items-start md:flex-row md:items-center"
                              >
                                {/* Tên phòng */}
                                <div className="w-1/7 mb-2 mr-4 min-w-[90px] text-left md:mb-0">
                                  <p className="text-sm font-medium">
                                    {room?.roomName}
                                  </p>
                                </div>

                                {/* Suất chiếu */}
                                <div className="flex flex-1 flex-wrap items-center justify-start">
                                  {room?.showtimes?.map((showtime) => (
                                    <button
                                      key={showtime._id}
                                      onClick={() =>
                                        handleShowtimeSelect(
                                          showtime,
                                          room,
                                          cinema,
                                        )
                                      }
                                      className="mr-4 mt-2 rounded bg-white px-4 py-2 text-black hover:bg-red-500 hover:text-white"
                                    >
                                      {formatShowtime(
                                        showtime.start_time,
                                        showtime.end_time,
                                      )}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            ),
                        )}
                      </div>
                    </div>
                  ) : null, // Không hiển thị rạp nếu không có phòng có suất chiếu
              )
            ) : (
              <div className="mt-4 text-center text-white">
                Phim hiện chưa có suất chiếu nào
              </div>
            )}
          </div>
          {/* bình luận  */}
          <CommentsSection movieId={id} />
        </div>
        {/*  right session */}
        <NowShowingMovies />
      </div>
    </div>
  );
};

export default MovieDetailPage;
