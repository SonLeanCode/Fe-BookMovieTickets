import { useState, useEffect } from "react";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
} from "react-icons/fa";
import LoadingLocal from "../Loading/LoadingLocal";
import { formatShowDate2 } from "../../utils/formatShowDate";
import { formatShowtime } from "../../utils/formatShowtime";
import { useGetAllRegionsQuery } from "../../services/Regions/regions.service";
import {
  useGetMoviesByRegionQuery,
  useGetShowDatesByMovieQuery,
  useFilterShowtimesQuery,
  useGetCinemasWithShowtimesByMovieAndRegionQuery,
} from "../../services/Showtimes/showtimes.serviecs";

const BuyTickets = () => {
  const { data: regionsData, isLoading: regionsLoading } =
    useGetAllRegionsQuery();
  const [isAreaOpen, setAreaOpen] = useState(false);
  const [isMovieOpen, setMovieOpen] = useState(false);
  const [isShowtimeOpen, setShowtimeOpen] = useState(false);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");

  const { data: showtimesData, isLoading: showtimesLoading } =
    useGetMoviesByRegionQuery(selectedArea ? selectedArea._id : null);

  const { data: showDates, isLoading: datesLoading } =
    useGetShowDatesByMovieQuery(selectedMovie?._id);

  const { data: cinemas, isLoading: cinemasLoading } =
    useGetCinemasWithShowtimesByMovieAndRegionQuery({
      movieId: selectedMovie ? selectedMovie?._id : null,
      regionId: selectedArea ? selectedArea._id : null,
    });

  const { data: filteredShowtimes, isLoading: loadingShowtimes } =
    useFilterShowtimesQuery({
      movieId: selectedMovie ? selectedMovie?._id : null,
      date: selectedDate,
      cinemaId: selectedCinema,
    });

  console.log(filteredShowtimes);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleCinemaSelect = (event) => {
    setSelectedCinema(event.target.value);
  };

  useEffect(() => {
    if (showDates?.data.length > 0) {
      setSelectedDate(showDates.data[0]);
    }
  }, [showDates]);

  const handleAreaSelect = (area) => {
    // Xoá dữ liệu khu vực và phim đã chọn trong localStorage
    localStorage.removeItem("selectedArea");
    localStorage.removeItem("selectedMovie");
    localStorage.removeItem("selectedShowtime");
  
    // Đặt lại các trạng thái
    setSelectedArea(area);  // Cập nhật khu vực đã chọn
    setSelectedMovie(null);  // Đặt lại phim đã chọn về null
    setSelectedShowtime(null);  // Đặt lại suất chiếu đã chọn về null
  
    // Điều chỉnh trạng thái mở/đóng
    setAreaOpen(false);
    setMovieOpen(true);  // Mở chọn phim khi chọn khu vực
    setShowtimeOpen(false);  // Đóng chọn suất chiếu khi chọn khu vực
  
    // Lưu lại khu vực đã chọn vào localStorage
    localStorage.setItem("selectedArea", JSON.stringify(area));
  };

  const handleMovieSelect = (movieTitle) => {
    setSelectedMovie(movieTitle);
    setMovieOpen(false);
    setShowtimeOpen(true); // Mở chọn suất chiếu khi chọn phim
    localStorage.setItem("selectedMovie", JSON.stringify(movieTitle));
  };

  const handleShowtimeSelect = (showtime) => {
    setSelectedShowtime(showtime);
    setShowtimeOpen(false);
    localStorage.setItem("selectedShowtime", JSON.stringify(showtime));
  };

  if (
    showtimesLoading ||
    regionsLoading ||
    datesLoading ||
    loadingShowtimes ||
    cinemasLoading
  ) {
    return <LoadingLocal />;
  }

  return (
    <div className="mt-28">
      <div className="mx-auto flex w-[90%]">
        {/* Left Column - 70% */}
        <div className="w-[70%] bg-[#111111] p-4 mr-8 mb-10 text-white">
          {/* Choose Area */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-white">
              Chọn khu vực :
            </h2>
            <div className="mb-6">
              <button
                onClick={() => setAreaOpen(!isAreaOpen)}
                className="flex w-full items-center justify-between rounded bg-white px-4 py-2 text-left text-black"
              >
                Chọn vị trí {selectedArea ? " - " + selectedArea?.name : ""}
                {isAreaOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isAreaOpen && (
                <div className="mt-4 flex flex-wrap justify-center gap-4">
                  {regionsData?.data.map((area) => (
                    <button
                      key={area._id}
                      onClick={() => handleAreaSelect(area)}
                      className="rounded bg-white px-4 py-2 text-black hover:bg-blue-500 hover:text-white"
                    >
                      {area.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Choose Movie */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-white">Chọn phim :</h2>
            <div className="mb-6">
              <button
                onClick={() => setMovieOpen(!isMovieOpen)}
                className="flex w-full items-center justify-between rounded bg-white px-4 py-2 text-left text-black"
              >
                Chọn phim {selectedMovie ? " - " + selectedMovie?.name : ""}
                {isMovieOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isMovieOpen && (
                <div className="mt-4 flex flex-wrap justify-center gap-8">
                  {selectedArea ? (
                    showtimesData?.data.map((movieTitle) => (
                      <div
                        key={movieTitle?._id}
                        className="flex w-1/5 flex-col items-start hover:cursor-pointer"
                        onClick={() => handleMovieSelect(movieTitle)}
                      >
                        <img
                          src={movieTitle?.img}
                          alt={movieTitle?.name}
                          className="h-50 mb-2 w-full rounded object-cover"
                        />
                        <span>{movieTitle?.name}</span>
                      </div>
                    ))
                  ) : (
                    <p className="mt-4 text-white">Vui lòng chọn khu vực</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Choose Showtime */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-white">Chọn suất :</h2>
            <div className="mb-6">
              <button
                onClick={() => setShowtimeOpen(!isShowtimeOpen)}
                className="flex w-full items-center justify-between rounded bg-white px-4 py-2 text-left text-black"
              >
                Chọn suất chiếu
                {isShowtimeOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isShowtimeOpen && (
                <div className="mt-4 flex flex-col space-y-2">
                  {/* Hiển thị các ngày chiếu và chọn rạp nằm cùng một hàng */}
                  <div className="flex items-center justify-between">
                    <div className="flex w-full space-x-3 overflow-x-auto">
                      <button
                        className="flex-shrink-0 rounded bg-gray-300 p-2 text-black"
                        onClick={() => scrollDays("left")}
                      >
                        <FaChevronLeft />
                      </button>
                      <div className="flex space-x-3 scroll-smooth">
                        {showDates?.data.map((date, index) => (
                          <button
                            key={index}
                            onClick={() => handleDateSelect(date)}
                            className={`w-[100px] rounded px-2 py-2 ${
                              selectedDate === date
                                ? "bg-blue-500 text-white"
                                : "bg-white text-black"
                            }`}
                          >
                            {formatShowDate2(date)}
                          </button>
                        ))}
                      </div>
                      <button
                        className="flex-shrink-0 rounded bg-gray-300 p-2 text-black"
                        onClick={() => scrollDays("right")}
                      >
                        <FaChevronRight />
                      </button>
                    </div>

                    {/* Dropdown chọn rạp */}
                    <div className="ml-4">
                      <select
                        id="cinema-select"
                        value={selectedCinema}
                        onChange={handleCinemaSelect}
                        className="mt-1 block w-[200px] rounded-md border-gray-300 bg-white text-black shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                      >
                        <option value="" disabled>
                          Chọn một rạp
                        </option>
                        {cinemas?.data.map((cinema, index) => (
                          <option key={index} value={cinema._id}>
                            {cinema?.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Hiển thị các suất chiếu */}
                  {filteredShowtimes?.data?.map((showtimes, index) => (
                    <div key={index} className="rounded p-4">
                      <div className="flex items-center">
                        <div>
                          <h1 className="text-2xl font-semibold">
                            {showtimes?.cinemaName}
                          </h1>
                          {/* Hiển thị danh sách các phòng chiếu */}
                          <p className="text-sm">
                            {showtimes?.rooms.map((room) => (
                              <span key={room.roomId} className="block">
                                {room.roomName}
                              </span>
                            ))}
                          </p>
                        </div>
                        <div className="ml-2 flex space-x-3">
                          {/* Lặp qua các suất chiếu trong từng phòng chiếu */}
                          {showtimes?.rooms.map((room) =>
                            room?.showtimes.map((showtime) => (
                              <button
                                key={showtime._id}
                                onClick={() =>
                                  handleShowtimeSelect(showtime._id)
                                }
                                className="rounded bg-gray-700 px-4 py-2 text-white hover:bg-red-500"
                              >
                                {/* Hiển thị thời gian bắt đầu của suất chiếu */}
                                {formatShowtime(showtime.start_time,showtime.end_time)}
                              </button>
                            )),
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - 30% */}
        <div className="w-[30%] text-black">
          <div>
            <div className="rounded border-t-8 border-red-600 bg-white">
              <div className="mx-2 mt-2 flex border-b-2 border-dashed border-gray-500 p-2">
                <img
                  src={
                    selectedMovie?.img ||
                    "https://www.galaxycine.vn/_next/static/media/img-blank.bb695736.svg"
                  }
                  alt={""}
                  className="mr-4 w-32 rounded object-cover"
                />
                <div>
                  <p className="text-lg">
                    <span className="font-semibold">
                      {selectedMovie?.name || "Vui lòng chọn phim để tiếp tục"}
                    </span>
                  </p>
                  {selectedMovie && (
                    <p className="mt-4 text-sm">
                      <span className="">
                        {"Phụ đề: " + selectedMovie.subtitles || ""}
                      </span>{" "}
                      {"- "}
                      <span className="mr-2 rounded-full bg-red-500 p-1 px-2 font-bold text-white">
                        {selectedMovie.age_limit || 0}+
                      </span>
                    </p>
                  )}
                </div>
              </div>
              <div className="flex justify-between p-2">
                <h2 className="text-base font-semibold">Tổng cộng</h2>
                <span className="text-primary inline-block font-bold text-red-600">
                  0&nbsp;₫
                </span>
              </div>
              <div className="mt-10 flex justify-between p-2">
                <button className="mr-2 w-1/2 rounded-md bg-gray-300 p-2 text-black">
                  Quay lại
                </button>
                <button className="w-1/2 rounded-md bg-red-600 p-2 text-white">
                  Tiếp tục
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BuyTickets;
