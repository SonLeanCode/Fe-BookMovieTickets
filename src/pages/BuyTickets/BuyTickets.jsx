import { useState, useEffect } from "react";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
} from "react-icons/fa";
import LoadingLocal from "../Loading/LoadingLocal";
import { formatShowDate2, formatShowDate3 } from "../../utils/formatShowDate";
import { formatShowtime } from "../../utils/formatShowtime";
import { useGetAllRegionsQuery } from "../../services/Regions/regions.service";
import {
  useGetMoviesByRegionQuery,
  useGetShowDatesByMovieQuery,
  useFilterShowtimesQuery,
  useGetCinemasWithShowtimesByMovieAndRegionQuery,
} from "../../services/Showtimes/showtimes.serviecs";
import { useGetSeatsByRoomQuery } from "../../services/Seat/seat.serviecs";
import SeatSelection from "../../components/Seat/SeatSelection";
import { formatCurrency } from "../../utils/formatCurrency";
import { useCreateTicketMutation } from "../../services/Ticket/ticket.serviecs";
import { useAddSeatStatusesMutation } from "../../services/Showtimes/showtimes.serviecs";
import { usePaymentMomoMutation } from "../../services/payment/Payment.services"
import { v4 as uuidv4 } from "uuid";
import Toastify from "../../helper/Toastify";
import { useNavigate } from 'react-router-dom';

const BuyTickets = () => {
  const { data: regionsData, isLoading: regionsLoading } =
    useGetAllRegionsQuery();
  const [isAreaOpen, setAreaOpen] = useState(false);
  const [isMovieOpen, setMovieOpen] = useState(false);
  const [isShowtimeOpen, setShowtimeOpen] = useState(false);
  const [isSeatOpen, setSeatOpen] = useState(false);

  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isContinueClicked, setIsContinueClicked] = useState(false);

  // Lấy totalAmount từ localStorage khi component được tải
  const [paymentMomo, { isLoading, isError, error }] = usePaymentMomoMutation();



  //api  momo 
  const handlePayment = async () => {
    const amount = localStorage.getItem('totalAmount');
    if (!amount) {
      alert('Số tiền không hợp lệ!');
      return;
    }
    try {
      const response = await paymentMomo({ amount })
      if (response.data && response.data.payUrl) {
        console.log(response.data)
        // Chuyển hướng người dùng đến trang thanh toán MoMo
        window.location.href = response.data.payUrl;
      } else {
        console.error('Lỗi từ MoMo:', response.data);
        alert('Có lỗi xảy ra khi tạo giao dịch. Vui lòng thử lại!');
      }
    } catch (error) {
      console.error('Thanh toán MoMo thất bại:', error);
      alert('Có lỗi xảy ra khi tạo giao dịch. Vui lòng thử lại!')
    }
  }
  const navigate = useNavigate();
  const { data: showtimesData, isLoading: showtimesLoading, refetch: refetchShowtime } =
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
      cinemaId: selectedCinema || "",
    });

  const { data: seatsData, isLoading: seatsLoading } = useGetSeatsByRoomQuery(
    selectedShowtime ? selectedShowtime?.room_id._id : null,
  );

  const [addTicket] = useCreateTicketMutation();
  const [addSeatStatus] = useAddSeatStatusesMutation();

  const generateInvoiceCode = () => {
    const uniqueId = uuidv4().split("-")[0]; // Tạo mã duy nhất từ uuid
    return `MMT-${uniqueId.toUpperCase()}`;
  };

  const getSeatNumbers = (seats) => {
    return seats.map((seat) => `${seat.row}${seat.seat_number}`).join(", ");
  };

  const handleAddTicket = async () => {
    // Lấy dữ liệu từ localStorage
    const selectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));
    const selectedShowtime = JSON.parse(localStorage.getItem("selectedShowtime"));
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    const getUser = JSON.parse(localStorage.getItem("user"));

    const ticketData = {
      invoice_code: generateInvoiceCode(),
      name_movie: selectedMovie.name,
      subtitles: selectedMovie.subtitles,
      age_limit: selectedMovie.age_limit || 0,
      seat_number: getSeatNumbers(selectedSeats), // Nếu danh sách ghế là mảng, nối thành chuỗi
      room_name: selectedShowtime.room_id.name,
      cinema_name: selectedShowtime.room_id.cinema_id.name,
      address_cinema: selectedShowtime.room_id.cinema_id.address,
      showtime:
        formatShowtime(selectedShowtime.start_time, selectedShowtime.end_time) +
        " - " +
        formatShowDate3(selectedShowtime.start_time),
      price: selectedSeats.reduce((sum, seat) => sum + seat.base_price, 0),
      voucher_name: selectedShowtime.voucher_name || null, // Nếu có voucher
      voucher_percent: selectedShowtime.voucher_percent || 0,
      showtime_id: selectedShowtime._id,
      user_id: getUser._id,
    };

    const seatStatuses = selectedSeats.map(seat => ({
      seat_id: seat._id,  // ID của ghế
      status: "booked"    // Trạng thái đặt
    }));

    try {
      const response = await addTicket(ticketData).unwrap();
      await addSeatStatus({ showtimeId: selectedShowtime._id, seatStatuses }).unwrap();
      refetchShowtime()
      Toastify("Thanh toán thành công", 200)
      navigate('/cinema');
      console.log("Ticket added successfully:", response);
    } catch (error) {
      console.error("Failed to add ticket:", error);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const handleCinemaSelect = (event) => {
    const value = event.target.value;
    setSelectedCinema(value);

    if (value === "all") {
      setSelectedCinema("");
    } else {
      setSelectedCinema(value);
    }
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
    localStorage.removeItem("selectedSeats");
    // Đặt lại các trạng thái
    setSelectedArea(area); // Cập nhật khu vực đã chọn
    setSelectedMovie(null); // Đặt lại phim đã chọn về null
    setSelectedShowtime(null); // Đặt lại suất chiếu đã chọn về null
    setSelectedSeats([]); // Reset ghế đã chọn về mảng rỗng
    // Điều chỉnh trạng thái mở/đóng
    setAreaOpen(false);
    setMovieOpen(true); // Mở chọn phim khi chọn khu vực
    setShowtimeOpen(false); // Đóng chọn suất chiếu khi chọn khu vực

    // Lưu lại khu vực đã chọn vào localStorage
    localStorage.setItem("selectedArea", JSON.stringify(area));
  };

  const handleMovieSelect = (movieTitle) => {
    localStorage.removeItem("selectedSeats");

    setSelectedMovie(movieTitle);
    setMovieOpen(false);
    setShowtimeOpen(true); // Mở chọn suất chiếu khi chọn phim
    setSelectedSeats([]); // Reset ghế đã chọn về mảng rỗng
    localStorage.setItem("selectedMovie", JSON.stringify(movieTitle));
  };

  const handleShowtimeSelect = (showtime) => {
    localStorage.removeItem("selectedSeats");
    setSeatOpen(!isSeatOpen);
    setSelectedShowtime(showtime);
    setShowtimeOpen(false);
    setSelectedSeats([]); // Reset ghế đã chọn về mảng rỗng
    localStorage.setItem("selectedShowtime", JSON.stringify(showtime));
  };

  const handleSeatSelect = (seats) => {
    setSelectedSeats(seats);
    localStorage.setItem("selectedSeats", JSON.stringify(seats));
  };

  const renderSelectedSeats = () => {
    // Nhóm ghế theo loại
    const seatGroups = selectedSeats.reduce((acc, seat) => {
      if (!acc[seat.seat_type]) {
        acc[seat.seat_type] = [];
      }
      acc[seat.seat_type].push(seat);
      return acc;
    }, {});

    return (
      <>
        {Object.keys(seatGroups).map((seatType) => {
          // Tạo chuỗi vị trí ghế, ví dụ: "A1, A2"
          const seatPositions = seatGroups[seatType]
            .map((seat) => `${seat.row}${seat.seat_number}`)
            .join(", ");

          // Tính tổng giá cho từng loại ghế
          const totalPrice = seatGroups[seatType].reduce(
            (sum, seat) => sum + seat.base_price,
            0,
          );

          return (
            <div key={seatType} className="my-2 flex justify-between p-2">
              <div>
                <div className="font-bold">
                  {seatGroups[seatType].length}x Ghế {seatType}
                </div>
                <div>Ghế: {seatPositions}</div>
              </div>
              <div>
                <div>{formatCurrency(totalPrice)} </div>
              </div>
            </div>
          );
        })}
      </>
    );
  };

  const handleContinue = () => {
    setIsContinueClicked(true);
  };

  if (
    showtimesLoading ||
    regionsLoading ||
    datesLoading ||
    loadingShowtimes ||
    cinemasLoading ||
    seatsLoading
  ) {
    return <LoadingLocal />;
  }

  return (
    <div className="bg-black pt-28">
      <div className="mx-auto flex w-[90%]">
        {/* Left Column - 70% */}
        <div
          className={`mb-10 mr-8 w-[70%] bg-[#111111] p-4 text-white transition-opacity duration-500 ${isContinueClicked ? "hidden" : ""
            }`}
        >
          {/* Choose Area */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-white">
              Chọn khu vực :
            </h2>
            <div className="mb-6">
              <button
                onClick={() => {
                  setAreaOpen(!isAreaOpen);
                  setMovieOpen(isMovieOpen ? !isMovieOpen : isMovieOpen);
                  setShowtimeOpen(
                    isShowtimeOpen ? !isShowtimeOpen : isShowtimeOpen,
                  );
                  setSeatOpen(isSeatOpen ? !isSeatOpen : isSeatOpen);
                }}
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
                onClick={() => {
                  setAreaOpen(isAreaOpen ? !isAreaOpen : isAreaOpen);
                  setShowtimeOpen(
                    isShowtimeOpen ? !isShowtimeOpen : isShowtimeOpen,
                  );
                  setSeatOpen(isSeatOpen ? !isSeatOpen : isSeatOpen);
                  setMovieOpen(!isMovieOpen);
                }}
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
            <h2 className="mb-4 text-xl font-bold text-white">Chọn suất:</h2>
            <div className="mb-6">
              <button
                onClick={() => {
                  setAreaOpen(isAreaOpen ? !isAreaOpen : isAreaOpen);
                  setSeatOpen(isSeatOpen ? !isSeatOpen : isSeatOpen);
                  setShowtimeOpen(!isShowtimeOpen);
                  setMovieOpen(isMovieOpen ? !isMovieOpen : isMovieOpen);
                }}
                className="flex w-full items-center justify-between rounded bg-white px-4 py-2 text-left text-black"
              >
                Chọn suất chiếu
                {isShowtimeOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isShowtimeOpen && (
                <div className="mt-4 flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    {filteredShowtimes?.data?.length > 0 && (
                      <div className="flex w-full justify-between">
                        <div className="flex w-full space-x-3 overflow-x-auto">
                          <button className="flex-shrink-0 rounded bg-gray-300 p-2 text-black">
                            <FaChevronLeft />
                          </button>
                          <div className="flex space-x-3 scroll-smooth">
                            {showDates?.data.map((date, index) => (
                              <button
                                key={index}
                                onClick={() => handleDateSelect(date)}
                                className={`w-[100px] rounded px-2 py-2 ${selectedDate === date
                                  ? "bg-blue-500 text-white"
                                  : "bg-white text-black"
                                  }`}
                              >
                                {formatShowDate2(date)}
                              </button>
                            ))}
                          </div>
                          <button className="flex-shrink-0 rounded bg-gray-300 p-2 text-black">
                            <FaChevronRight />
                          </button>
                        </div>

                        <div className="ml-4">
                          <select
                            id="cinema-select"
                            value={selectedCinema}
                            onChange={handleCinemaSelect}
                            className="mt-1 block w-[200px] rounded-md border-gray-300 bg-white text-black shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm"
                          >
                            <option value="all">Tất cả các rạp</option>
                            {cinemas?.data.map((cinema, index) => (
                              <option key={index} value={cinema._id}>
                                {cinema?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Kiểm tra nếu không có suất chiếu */}
                  {filteredShowtimes?.data?.length > 0 ? (
                    filteredShowtimes.data.map((showtimes, index) =>
                      showtimes?.rooms.map((room) => (
                        <div
                          key={`${index}-${room.roomId}`}
                          className="rounded p-4"
                        >
                          <div className="flex items-center">
                            <div>
                              <h1 className="text-2xl font-semibold">
                                {showtimes?.cinemaName}
                              </h1>
                              {/* Hiển thị danh sách các phòng chiếu */}
                              <p className="text-sm">
                                <span className="block">{room.roomName}</span>
                              </p>
                            </div>
                            <div className="ml-2 flex space-x-3">
                              {/* Lặp qua các suất chiếu trong từng phòng chiếu */}
                              {room?.showtimes.map((showtime) => (
                                <button
                                  key={showtime._id}
                                  onClick={() => handleShowtimeSelect(showtime)}
                                  className="ml-10 rounded bg-white px-4 py-2 text-black hover:bg-red-500 hover:text-white"
                                >
                                  {/* Hiển thị thời gian bắt đầu của suất chiếu */}
                                  {formatShowtime(
                                    showtime.start_time,
                                    showtime.end_time,
                                  )}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )),
                    )
                  ) : (
                    <div className="mt-4 text-center text-white">
                      Vui lòng chọn phim
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="mb-4 text-xl font-bold text-white">Chọn ghế :</h2>
            <button
              onClick={() => {
                setAreaOpen(isAreaOpen ? !isAreaOpen : isAreaOpen);
                setShowtimeOpen(
                  isShowtimeOpen ? !isShowtimeOpen : isShowtimeOpen,
                );
                setMovieOpen(isMovieOpen ? !isMovieOpen : isMovieOpen);
                setSeatOpen(!isSeatOpen);
              }}
              className="flex w-full items-center justify-between rounded bg-white px-4 py-2 text-left text-black"
            >
              Chọn ghế
              {isSeatOpen ? <FaChevronUp /> : <FaChevronDown />}
            </button>
            {isSeatOpen &&
              (seatsData && seatsData.length > 0 ? (
                <SeatSelection
                  showtime={selectedShowtime}
                  seatsData={seatsData}
                  selectedSeats={selectedSeats}
                  onSeatSelect={handleSeatSelect}
                />
              ) : (
                <div className="mt-4 text-center text-white">
                  Vui lòng chọn suất chiếu.
                </div>
              ))}
          </div>
        </div>

        {/* Right Column - 30% */}
        <div
          className={`mb-8 w-[30%] text-black transition-transform duration-[5000ms] ${isContinueClicked ? "mr-8" : ""
            }`}
        >
          <div>
            <div className="rounded border-t-8 border-red-600 bg-white">
              <div className="mx-2 mt-2 border-b-2 border-dashed border-gray-500 p-2">
                <div className="flex">
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
                        {selectedMovie?.name ||
                          "Vui lòng chọn phim để tiếp tục"}
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
                {selectedShowtime && (
                  <div>
                    <div className="mt-4 flex">
                      <h2 className="mr-2 font-bold">
                        {selectedShowtime?.room_id.cinema_id.name}
                      </h2>
                      {"-"}
                      <span className="ml-2">
                        {selectedShowtime?.room_id.name}
                      </span>
                    </div>
                    <div className="">
                      Suất:{" "}
                      <span className="mr-2 font-semibold">
                        {formatShowtime(
                          selectedShowtime.start_time,
                          selectedShowtime.end_time,
                        )}
                      </span>
                      {"-"}
                      <span className="ml-2">
                        {formatShowDate3(selectedShowtime.start_time)}
                      </span>
                    </div>
                  </div>
                )}
              </div>
              {selectedSeats && selectedSeats.length > 0 && (
                <div className="mx-2 border-b-2 border-dashed border-gray-500">
                  {renderSelectedSeats()}
                </div>
              )}

              <div className="mx-2 flex justify-between p-2">
                <h2 className="text-base font-semibold">Tổng cộng</h2>
                <span className="text-primary inline-block font-bold text-red-600">
                  {selectedSeats && selectedSeats.length > 0
                    ? `${formatCurrency(
                      selectedSeats.reduce((sum, seat) => {
                        const total = sum + seat.base_price;
                        // Lưu tổng tiền vào localStorage
                        localStorage.setItem('totalAmount', total);
                        return total;
                      }, 0)
                    )} `
                    : `0 VNĐ`}
                </span>
              </div>
              <div className="mt-10 flex justify-between p-2">
                <button
                  onClick={() => setIsContinueClicked(false)}
                  className={`mr-2 w-1/2 rounded-md bg-gray-300 p-2 text-black ${!isContinueClicked
                    ? "cursor-not-allowed opacity-50"
                    : ""
                    }`}
                  disabled={!isContinueClicked}
                >
                  Quay lại
                </button>
                {!isContinueClicked ? (
                  <button
                    onClick={handleContinue}
                    className={`w-1/2 rounded-md bg-red-600 p-2 text-white ${selectedSeats.length === 0
                      ? "cursor-not-allowed opacity-50"
                      : ""
                      }`}
                    disabled={selectedSeats.length === 0}
                  >
                    Thanh Toán
                  </button>
                ) : (
                  <button onClick={handleAddTicket} className="w-1/2 rounded-md bg-red-600 p-2 text-white">
                    Xác nhận
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`mb-8 transition-opacity duration-500 ${isContinueClicked ? "w-[70%] opacity-100" : "hidden"
            } bg-[#111111] p-4 text-white relative`}
        >
          <img
            src="/src/assets/momo2.jpg"
            alt="MoMo Payment"
            className="w-[700px] h-[300px] mx-auto mb-4"
          />
          <div className="mb-4">
            <p className="text-center">Chúc mừng bạn đã chọn vé! Vui lòng làm theo hướng dẫn để hoàn tất giao dịch.</p>
            <p className="text-center">Mô tả: Thanh toán vé xem phim qua ví MoMo.</p>


          </div>
          <button
            onClick={handlePayment}
            className="bg-blue-500 text-white px-4 py-2 rounded mx-auto block"
            disabled={isLoading}
          >
            {isLoading ? 'Đang xử lý...' : 'Thanh toán MoMo'}
          </button>
          {isError && (
            <div className="text-red-500 mt-2 text-center">
              {error.message || 'Có lỗi xảy ra khi thực hiện thanh toán.'}
            </div>
          )}
          <div className="text-sm text-gray-400 mt-2 text-center">
            <p>Bước 1: Nhấn vào nút Thanh toán MoMo.</p>
            <p>Bước 2: Quét mã QR hoặc đăng nhập ví MoMo để hoàn tất giao dịch.</p>
          </div>
        </div>


      </div>
    </div>
  );
};
export default BuyTickets;
