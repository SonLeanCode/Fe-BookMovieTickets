import { useState, useEffect } from "react";
import { useGetMovieByIdQuery } from "../../services/Movies/movies.services";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import LoadingLocal from "../Loading/LoadingLocal";

import { useGetAllRegionsQuery } from "../../services/Regions/regions.service";
import { useGetShowtimesByRegionQuery } from "../../services/Showtimes/showtimes.serviecs";

const BuyTickets = () => {
  const { data: regionsData, isLoading: regionsLoading } =
    useGetAllRegionsQuery();

  const [isAreaOpen, setAreaOpen] = useState(false);
  const [isMovieOpen, setMovieOpen] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [discountCode, setDiscountCode] = useState(null); // State to store discount code
  const [selectedArea, setSelectedArea] = useState(null); // State to store selected area
  const [selectedMovie, setSelectedMovie] = useState(null); // State to store selected movie

  const { data: showtimesData, isLoading: showtimesLoading } =
  useGetShowtimesByRegionQuery(selectedArea ? selectedArea._id : null);

  const seatPrice = 65000; // Price per seat
  const totalPrice = selectedSeats.length * seatPrice;

  useEffect(() => {
    // Get discount code from localStorage
    const storedDiscountCode = localStorage.getItem("discountCode");
    if (storedDiscountCode) {
      setDiscountCode(storedDiscountCode);
    }
  }, []);

  if (showtimesLoading || regionsLoading) {
    return <LoadingLocal />; // Or your preferred loading indicator
  }

  const handleAreaSelect = (area) => {
    setSelectedArea(area);
    setAreaOpen(false);
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setMovieOpen(false);
  };

  const toggleSeat = (seatNumber) => {
    setSelectedSeats((prev) =>
      prev.includes(seatNumber)
        ? prev.filter((seat) => seat !== seatNumber)
        : [...prev, seatNumber],
    );
  };

  return (
    <div className="mt-28">
      <div className="mx-auto flex w-[90%]">
        {/* Left Column - 70% */}
        <div className="w-[70%] bg-black p-4 text-white">
          {/* Choose Area */}
          <h2 className="mb-4 text-xl font-bold text-red-500">Chọn khu vực</h2>
          <div className="mb-6">
            <button
              onClick={() => setAreaOpen(!isAreaOpen)}
              className="flex w-full items-center justify-between rounded bg-gray-700 px-4 py-2 text-left text-white hover:bg-red-500"
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
                    className="rounded bg-gray-700 px-4 py-2 text-white hover:bg-red-500"
                  >
                    {area.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Choose Movie */}
          <h2 className="mb-4 text-xl font-bold text-red-500">Chọn phim</h2>
          <div className="mb-6">
            <button
              onClick={() => setMovieOpen(!isMovieOpen)}
              className="flex w-full items-center justify-between rounded bg-gray-700 px-4 py-2 text-left text-white hover:bg-red-500"
            >
              Chọn phim
              {isMovieOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isMovieOpen && (
              <div className="mt-4 flex flex-wrap justify-center gap-8">
                {selectedArea ? (
                  showtimesData?.data.map((movieTitle) => (
                    <div
                      key={movieTitle?.movie_id._id}
                      className="flex w-1/5 flex-col items-start hover:cursor-pointer"
                      onClick={() => handleMovieSelect(movieTitle)}
                    >
                      <img
                        src={movieTitle?.movie_id.img}
                        alt={movieTitle?.movie_id.name}
                        className="h-50 mb-2 w-full rounded object-cover"
                      />
                      <span>{movieTitle?.movie_id.name}</span>
                    </div>
                  ))
                ) : (
                  <p className="mt-4 text-white">Vui lòng chọn khu vực</p>
                )}
              </div>
            )}
          </div>

          {/* Choose Showtime */}
          <h2 className="mb-4 text-xl font-bold text-red-500">Chọn xuất</h2>
          <div className="mb-6">
            <div className="relative mb-4 flex justify-between">
              <button
                onClick={() => {
                  const scrollContainer = document.getElementById("dayScroll");
                  scrollContainer.scrollBy({ left: -100, behavior: "smooth" });
                }}
                className="absolute left-0 z-10 mt-5 rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
              >
                &lt;
              </button>

              <div
                id="dayScroll"
                className="absolute left-[5%] flex max-w-[calc(90%/2)] space-x-4 overflow-x-hidden"
              >
                {[
                  "Thứ 2",
                  "Thứ 3",
                  "Thứ 4",
                  "Thứ 5",
                  "Thứ 6",
                  "Thứ 7",
                  "Chủ nhật",
                ].map((day, index) => (
                  <button
                    key={index}
                    className="rounded bg-gray-700 px-5 py-2 text-white hover:bg-red-500"
                  >
                    {day}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  const scrollContainer = document.getElementById("dayScroll");
                  scrollContainer.scrollBy({ left: 100, behavior: "smooth" });
                }}
                className="absolute right-[45%] z-10 mt-5 rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
              >
                &gt;
              </button>
              <div className="absolute right-5 mb-4 ml-4">
                <h3 className="w-100 text-lg font-bold text-white">
                  | Chọn rạp
                </h3>
                <select className="w-[300px] rounded bg-gray-700 px-4 py-2 text-white">
                  <option>Tất cả các rạp</option>
                  <option>Rạp 1</option>
                  <option>Rạp 2</option>
                  <option>Rạp 3</option>
                  <option>Rạp 4</option>
                  <option>Rạp 5</option>
                </select>
              </div>
            </div>
            {/* Display Cinema and Showtimes */}
            <div className="mt-20">
              <hr />
              <div className="mt-2 flex flex-col space-y-2">
                {["ST-FLIX", "ST-FLIX", "ST-FLIX"].map((cinema, index) => (
                  <div key={index} className="rounded p-4">
                    <div className="flex items-center">
                      <div>
                        <h1 className="text-2xl font-semibold">{cinema}</h1>
                        <p className="text-sm">Phụ đề: Tiếng Việt</p>
                      </div>
                      <div className="ml-2 flex space-x-3">
                        {["10:00 AM", "1:00 PM"].map((time, timeIndex) => (
                          <button
                            key={timeIndex}
                            onClick={() => setSelectedShowtime(time)}
                            className="rounded bg-gray-700 px-4 py-2 text-white hover:bg-red-500"
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Choose Seats */}
          <h2 className="mb-4 mt-4 text-xl font-bold text-red-500">
            Chọn chỗ ngồi
          </h2>
          <div className="flex flex-col items-center">
            {Array.from({ length: 11 }, (_, rowIndex) => (
              <div key={rowIndex} className="mb-2 flex items-center">
                <div className="mr-2 p-2 text-white">
                  {String.fromCharCode(75 - rowIndex)}
                </div>
                <div className="grid grid-cols-12 gap-2">
                  {Array.from({ length: 12 }, (_, index) => (
                    <button
                      key={index}
                      className={`rounded px-2 py-1 hover:bg-red-500 ${selectedSeats.includes(index + 1) ? "bg-red-500" : "bg-gray-700 text-white"}`}
                      onClick={() => toggleSeat(index + 1)}
                      disabled={selectedSeats.includes(index + 1)} // Disable already selected seats
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                <div className="mr-2 p-2 text-white">
                  {String.fromCharCode(75 - rowIndex)}
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col items-center">
            <p className="">Màn hình</p>
          </div>
          <hr></hr>
        </div>

        {/* Right Column - 30% */}
        {/* <div className="w-[30%] text-black">
          {movie ? (
            <div className="h-[35%] rounded bg-white p-2">
              <div className="mb-4 flex">
                <img
                  src={movie?.data.img}
                  alt={movie?.data.name}
                  className="mr-4 w-32 rounded object-cover"
                />
                <div>
                  <h1 className="text-3xl font-semibold">{movie?.data.name}</h1>
                  <p className="py-5 text-sm">
                    <span className="font-semibold">
                      {movie?.data.subtitles}
                    </span>{" "}
                    -
                    <span className="rounded-sm bg-orange-600 p-2 text-lg text-white">
                      {movie?.data.age_limit}
                    </span>
                  </p>
                  <div className="py-2">
                    <label
                      htmlFor="voucher"
                      className="text-sm font-bold text-red-700"
                    >
                      Chọn voucher:
                    </label>
                    <select
                      id="voucher"
                      className="ml-2 rounded border p-1 text-sm"
                    >
                      <option value="none">Không chọn</option>
                      <option value="discount10">{discountCode}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="py-5">
                <h1 className="text-xl font-bold">ST-FLIX Tân Bình</h1>
                <h2 className="text-base">
                  Xuất: <span className="font-semibold">10:00 Am</span> -{" "}
                  <span className="font-semibold">Thứ 2</span>{" "}
                </h2>
                <hr />
              </div>
              <div className="flex py-1">
                <div className="flex flex-col">
                  <h1 className="text-sm">x2</h1>
                  <h2 className="text-base">
                    Ghế: <span className="font-semibold">K3</span>
                  </h2>
                </div>
                <p className="ml-52 self-end text-lg font-semibold">
                  65.000 VNĐ
                </p>
              </div>
              <hr />
              <div className="ml-36 mt-4">
                <p className="text-xl font-semibold text-red-600">
                  Tổng tiền: <span className="font-bold">100,000 VNĐ</span>
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-300">Loading movie details...</p>
          )}
          <div className="flex justify-between pt-5">
            <h1 className="w-[50%] text-center text-3xl text-orange-600">
              Quay lại
            </h1>
            <h1 className="rounded-md bg-orange-600 px-10 py-2 text-3xl text-white">
              Tiếp tục
            </h1>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default BuyTickets;
