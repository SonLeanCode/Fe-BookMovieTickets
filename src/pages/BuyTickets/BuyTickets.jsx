import { useState, useEffect, useRef } from "react";
import {
  FaChevronDown,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
} from "react-icons/fa";
import LoadingLocal from "../Loading/LoadingLocal";
import { formatShowDate3 } from "../../utils/formatShowDate";
import { formatShowtime } from "../../utils/formatShowtime";
import { useGetDataWithShowtimesQuery } from "../../services/Showtimes/showtimes.serviecs";
import { useGetSeatsByRoomQuery } from "../../services/Seat/seat.serviecs";
import SeatSelection from "../../components/Seat/SeatSelection";
import { formatCurrency } from "../../utils/formatCurrency";
import { useCreateTicketMutation } from "../../services/Ticket/ticket.serviecs";
import { useAddSeatStatusesMutation, useGetShowtimesByIdQuery } from "../../services/Showtimes/showtimes.serviecs";
import {
  usePaymentMomoMutation,
  useCreatePaymentMutation,
} from "../../services/payment/Payment.services";
import { useGetVoucherUserQuery } from "../../services/Voucher/voucher.service";
import { useEmailSendMutation } from "../../services/Email/email.service";
import { v4 as uuidv4 } from "uuid";
import Toastify from "../../helper/Toastify";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { skipToken } from "@reduxjs/toolkit/query";

const BuyTickets = () => {
  const { t } = useTranslation();
  const {
    data: dataByShowtimes,
    isLoading: dataByShowtimesLoading,
    refetch: dataRefetch,
  } = useGetDataWithShowtimesQuery();
  const userData = JSON.parse(localStorage.getItem("user"));
  const { data: codeVoucherUser } = useGetVoucherUserQuery(userData?._id);
  const hasRun = useRef(false);
  const [isAreaOpen, setAreaOpen] = useState(false);
  const [isMovieOpen, setMovieOpen] = useState(false);
  const [isShowtimeOpen, setShowtimeOpen] = useState(false);
  const [isSeatOpen, setSeatOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedCinema, setSelectedCinema] = useState("");
  const [selectedCinemaName, setSelectedCinemaName] = useState("");
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isContinueClicked, setIsContinueClicked] = useState(false);

  const [showDates, setShowDates] = useState([]); // Danh sách ngày chiếu
  const [cinemas, setCinemas] = useState([]); // Danh sách rạp chiếu
  const [filteredShowtimes, setFilteredShowtimes] = useState([]);
  // Lấy totalAmount từ localStorage khi component được tải
  const [paymentMomo, { isLoading, isError, error }] = usePaymentMomoMutation();

  const navigate = useNavigate();

  const { data: seatsData, isLoading: seatsLoading } = useGetSeatsByRoomQuery(
    selectedRoom?.roomId || skipToken,
  );

  const {data: showtimeData, isLoading: showtimeLoading, refetch: refetchShowTime } = useGetShowtimesByIdQuery(selectedShowtime?._id || skipToken)
  useEffect(() => {
    // Kiểm tra xem selectedShowtime có tồn tại trong localStorage không
    const storedShowtime = localStorage.getItem("selectedShowtime");
    const storeRoom = localStorage.getItem("selectedRoom");
    const storeMovie = localStorage.getItem("selectedMovie");
    const storeCinema = localStorage.getItem("selectedCinema");
    if (storedShowtime) {
      // Nếu có, parse dữ liệu và set vào state
      setSelectedShowtime(JSON.parse(storedShowtime));
      setSelectedRoom(JSON.parse(storeRoom));
      setSelectedMovie(JSON.parse(storeMovie));
      setSelectedCinemaName(JSON.parse(storeCinema));
      setSeatOpen(!isSeatOpen);
    }
  }, []);

  const [addTicket] = useCreateTicketMutation();
  const [addSeatStatus] = useAddSeatStatusesMutation();
  const [addPayment] = useCreatePaymentMutation();
  const [emailSend] = useEmailSendMutation();

  //api  momo
  const handleMomo = async () => {
    const amount = localStorage.getItem("totalAmount");
    if (!amount) {
      alert("Số tiền không hợp lệ!");
      return;
    }
    try {
      const response = await paymentMomo({ amount });
      if (response.data && response.data.payUrl) {
        // Chuyển hướng người dùng đến trang thanh toán MoMo
        window.location.href = response.data.payUrl;
      } else {
        console.error("Lỗi từ MoMo:", response.data);
        alert("Có lỗi xảy ra khi tạo giao dịch. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Thanh toán MoMo thất bại:", error);
      alert("Có lỗi xảy ra khi tạo giao dịch. Vui lòng thử lại!");
    }
  };

   const handlePayment = async () => {
    // Lấy các tham số từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const partnerCode = urlParams.get("partnerCode");
    const amount = parseInt(urlParams.get("amount"));
    const resultCode = urlParams.get("resultCode");
    const responseTime = urlParams.get("responseTime");
    // const message = urlParams.get("message");
    // Kiểm tra kết quả thanh toán
    if (resultCode === "0") {
      const paymentMethod = partnerCode; // Vì đây là MoMo, phương thức thanh toán sẽ là MoMo
      const totalAmount = amount;
      const paymentDate = new Date(parseInt(responseTime)).toLocaleString(); // Chuyển thời gian sang dạng chuỗi
      // Tạo paymentData với các tham số từ URL
     const dataMomo =  await handleAddTicket(paymentMethod, totalAmount, paymentDate);
     console.log('datamMOMO',dataMomo)
      
    } else {
      alert("Thanh toán không thành công. Vui lòng thử lại!");
    }
  };

  useEffect(() => {
    // Chỉ chạy hàm handlePayment nếu chưa chạy
    if (!hasRun.current && window.location.search.includes("partnerCode")) {
      hasRun.current = true; // Đánh dấu đã chạy
      handlePayment();
    }
  }, []);

  useEffect(() => {
    if (selectedMovie && showDates.length > 0) {
      const nearestDate = showDates[0];
      setSelectedDate(nearestDate);

      const filteredData = filterShowtimesByMovieAndDate(
        selectedMovie._id,
        nearestDate,
      );
      setFilteredShowtimes(filteredData);
    }
  }, [selectedMovie, showDates]);

  useEffect(() => {
    if (selectedMovie && showDates.length > 0) {
      const filtered = filterShowtimesByMovieAndDate(
        selectedMovie._id,
        selectedDate,
      );
      setFilteredShowtimes(filtered);
    }
  }, [selectedCinema]);

  const handleSeat = () => {
    refetchShowTime(); // Lấy lại dữ liệu mới nhất
    const seatStatus = showtimeData?.data?.seat_statuses; // Danh sách trạng thái ghế
    const seats = selectedSeats; // Các ghế được chọn
    const userId = userData._id; // ID của người dùng hiện tại
  
    if (!seatStatus || seatStatus.length === 0) {
      console.error("Không có thông tin trạng thái ghế.");
      alert("Giao dịch thất bại: Không có thông tin trạng thái ghế.");
      window.location.reload(); // Reload lại trang
      return;
    }
  
    for (const seat of seats) {
      const statusInfo = seatStatus.find((status) => status.seat_id === seat._id);
  
      if (!statusInfo) {
        console.log(`Ghế ${seat.row}${seat.seat_number} không có trạng thái cụ thể, cho phép tiếp tục.`);
        continue; // Nếu ghế không có trạng thái cụ thể, cho phép tiếp tục
      }
  
      if (statusInfo.status === "booked") {
        console.log(`Ghế ${seat.row}${seat.seat_number} đã được đặt, không thể chọn.`);
        alert(`Giao dịch thất bại: Ghế ${seat.row}${seat.seat_number} đã được đặt.`);
        window.location.reload(); // Reload lại trang
        return;
      }
  
      if (statusInfo.status === "locked" && statusInfo.user_id !== userId) {
        console.log(`Ghế ${seat.row}${seat.seat_number} đã bị khóa bởi người dùng khác, không thể chọn.`);
        alert(`Giao dịch thất bại: Ghế ${seat.row}${seat.seat_number} đã bị khóa bởi người dùng khác.`);
        window.location.reload(); // Reload lại trang
        return;
      }
  
      if (statusInfo.status === "locked" && statusInfo.user_id === userId) {
        console.log(`Ghế ${seat.row}${seat.seat_number} đã bị khóa bởi bạn, cho phép tiếp tục.`);
        continue; // Nếu ghế bị khóa bởi người dùng hiện tại, cho phép tiếp tục
      }
    }
  
    console.log("Tất cả các ghế được chọn đều hợp lệ, tiếp tục thực hiện.");
    handleMomo(); // Gọi tới hàm xử lý thanh toán nếu tất cả các ghế hợp lệ
  };
  

 

  const generateInvoiceCode = () => {
    const uniqueId = uuidv4().split("-")[0]; // Tạo mã duy nhất từ uuid
    return `MMT-${uniqueId.toUpperCase()}`;
  };

  const getSeatNumbers = (seats) => {
    return seats.map((seat) => `${seat.row}${seat.seat_number}`).join(", ");
  };

  const handleAddTicket = async (paymentMethod, totalAmount, paymentDate) => {
    // Lấy dữ liệu từ localStorage
    const selectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));
    const selectedShowtime = JSON.parse(
      localStorage.getItem("selectedShowtime"),
    );

    const selectedRoom = JSON.parse(localStorage.getItem("selectedRoom"));
    const selectedCinema = JSON.parse(localStorage.getItem("selectedCinema"));
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    const getUser = JSON.parse(localStorage.getItem("user"));
    const totalPrice = JSON.parse(localStorage.getItem("totalAmount"));
    const ticketData = {
      invoice_code: generateInvoiceCode(),
      name_movie: selectedMovie.name,
      subtitles: selectedMovie.subtitles,
      age_limit: selectedMovie.age_limit || 0,
      seat_number: getSeatNumbers(selectedSeats), // Nếu danh sách ghế là mảng, nối thành chuỗi
      room_name: selectedRoom.roomName,
      cinema_name: selectedCinema.cinemaName,
      address_cinema: selectedCinema.address,
      showtime:
        formatShowtime(selectedShowtime.start_time, selectedShowtime.end_time) +
        " - " +
        formatShowDate3(selectedShowtime.start_time),
      price: totalPrice,
      voucher_name: selectedShowtime.voucher_name || null, // Nếu có voucher
      voucher_percent: selectedShowtime.voucher_percent || 0,
      showtime_id: selectedShowtime._id,
      user_id: getUser._id,
    };

    const seatStatuses = selectedSeats.map((seat) => ({
      seat_id: seat._id, // ID của ghế
      status: "booked", // Trạng thái đặt
    }));

    const emailData = {
      email: getUser.email,
      ticketCode: ticketData.invoice_code,
      movieName: ticketData.name_movie,
      showTime: ticketData.showtime,
      seat: ticketData.seat_number,
    };

    try {
      const response = await addTicket(ticketData).unwrap();
      if (response) {
        const paymentData = {
          ticket_id: response.data._id,
          payment_method: paymentMethod,
          total_amount: totalAmount,
          payment_date: paymentDate,
        };
        await addPayment(paymentData).unwrap();
      }
      await addSeatStatus({
        showtimeId: selectedShowtime._id,
        seatStatuses,
        user_id: getUser?._id,
      }).unwrap();
      Toastify("Thanh toán thành công", 200);
      emailSend(emailData);
      localStorage.removeItem("selectedArea");
      localStorage.removeItem("selectedMovie");
      localStorage.removeItem("selectedShowtime");
      localStorage.removeItem("selectedSeats");
      dataRefetch();
      navigate("/cinema");
      console.log("Ticket added successfully:", response);
    } catch (error) {
      console.error("Failed to add ticket:", error);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (selectedMovie) {
      const filteredData = filterShowtimesByMovieAndDate(
        selectedMovie._id,
        date,
      );
      setFilteredShowtimes(filteredData);
    }
  };

  const handleCinemaSelect = (event) => {
    const value = event.target.value;
    setSelectedCinema(value === "all" ? "" : value);
  };

  const filterDataBySelectedMovie = (movieId) => {
    if (!selectedArea || !selectedArea.cinemas) return;

    const filteredCinemas = [];
    const showDatesSet = new Set();

    selectedArea.cinemas.forEach((cinema) => {
      const roomsWithShowtimes = cinema.rooms.filter((room) =>
        room.showtimes.some((showtime) => showtime.movie._id === movieId),
      );

      if (roomsWithShowtimes.length > 0) {
        filteredCinemas.push({
          ...cinema,
          rooms: roomsWithShowtimes,
        });

        roomsWithShowtimes.forEach((room) =>
          room.showtimes.forEach((showtime) => {
            if (showtime.movie._id === movieId) {
              const date = new Date(showtime.start_time);

              // Lấy ngày theo múi giờ địa phương
              const localDate = `${date.getFullYear()}-${String(
                date.getMonth() + 1,
              ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

              showDatesSet.add(localDate);
            }
          }),
        );
      }
    });

    // Chuyển Set sang Array và sắp xếp tăng dần theo ngày
    const showDatesArray = Array.from(showDatesSet).sort(
      (a, b) => new Date(a) - new Date(b),
    );

    // Cập nhật trạng thái
    setShowDates(showDatesArray); // Trả về định dạng `YYYY-MM-DD`
    setCinemas(filteredCinemas);
  };

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
    filterDataBySelectedMovie(movieTitle._id);
    setMovieOpen(false);
    setShowtimeOpen(true); // Mở chọn suất chiếu khi chọn phim
    setSelectedSeats([]); // Reset ghế đã chọn về mảng rỗng
    const nearestDate = showDates.length > 0 ? showDates[0] : null;

    if (nearestDate) {
      setSelectedDate(nearestDate);
      const filteredData = filterShowtimesByMovieAndDate(
        movieTitle._id,
        nearestDate,
      );
      setFilteredShowtimes(filteredData);
    }
    localStorage.setItem("selectedMovie", JSON.stringify(movieTitle));
  };

  const handleShowtimeSelect = (showtime, room, cinema) => {
    localStorage.removeItem("selectedSeats");
    setSeatOpen(!isSeatOpen);
    setSelectedRoom(room);
    setSelectedShowtime(showtime);
    setSelectedCinemaName(cinema);
    localStorage.setItem("selectedRoom", JSON.stringify(room));
    localStorage.setItem("selectedCinema", JSON.stringify(cinema));
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

  const filterShowtimesByMovieAndDate = (movieId, date) => {
    if (!selectedArea || !selectedArea.cinemas) return [];

    // Nếu có rạp đã chọn, lọc theo rạp đó
    return selectedArea.cinemas.flatMap((cinema) => {
      if (selectedCinema && cinema._id !== selectedCinema) {
        return [];
      }

      const roomsWithShowtimes = cinema.rooms.flatMap((room) => {
        const filteredShowtimes = room.showtimes.filter((showtime) => {
          const showtimeDate = new Date(showtime.start_time);

          // Lấy ngày theo múi giờ địa phương
          const localDate = `${showtimeDate.getFullYear()}-${String(
            showtimeDate.getMonth() + 1,
          ).padStart(
            2,
            "0",
          )}-${String(showtimeDate.getDate()).padStart(2, "0")}`;

          return showtime.movie._id === movieId && localDate === date;
        });

        if (filteredShowtimes.length > 0) {
          return {
            roomId: room._id,
            roomName: room.name,
            showtimes: filteredShowtimes,
          };
        }

        return [];
      });

      if (roomsWithShowtimes.length > 0) {
        return {
          cinemaName: cinema.name,
          cinemaId: cinema._id,
          address: cinema.address,
          rooms: roomsWithShowtimes,
        };
      }

      return [];
    });
  };

  const handleContinue = () => {
    setIsContinueClicked(true);
  };

  if (seatsLoading || dataByShowtimesLoading || showtimeLoading) {
    return <LoadingLocal />;
  }

  return (
    <div className="mx-12 bg-black pt-28">
      <div className="mx-auto flex w-[100%]">
        {/* Left Column - 70% */}
        <div
          className={`mb-10 mr-4 w-[70%] bg-[#111111] p-4 text-white transition-opacity duration-500 ${
            isContinueClicked ? "hidden" : ""
          }`}
        >
          {/* Choose Area */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-white">
              {t("Chọn khu vực")}:
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
                {t("Chọn vị trí")}{" "}
                {selectedArea ? " - " + selectedArea?.name : ""}
                {isAreaOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isAreaOpen && (
                <div className="mt-4 flex flex-wrap justify-center gap-4">
                  {dataByShowtimes?.data.map((area) => (
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
            <h2 className="mb-4 text-xl font-bold text-white">
              {t("Chọn phim")}:
            </h2>
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
                {t("Chọn phim")}{" "}
                {selectedMovie ? " - " + selectedMovie?.name : ""}
                {isMovieOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isMovieOpen && (
                <div className="mt-4 flex flex-wrap justify-center gap-8">
                  {selectedArea ? (
                    // Lấy tất cả suất chiếu từ các rạp và phòng chiếu
                    selectedArea.cinemas
                      .flatMap((cinema) =>
                        cinema.rooms.flatMap((room) =>
                          room.showtimes.map((showtime) => showtime.movie),
                        ),
                      )
                      // Loại bỏ các bộ phim trùng lặp bằng cách sử dụng reduce
                      .reduce((uniqueMovies, movie) => {
                        // Kiểm tra bộ phim đã tồn tại trong danh sách chưa
                        const movieExists = uniqueMovies.some(
                          (m) => m._id === movie._id,
                        );

                        // Nếu chưa có, thêm vào danh sách
                        if (!movieExists) {
                          uniqueMovies.push(movie);
                        }

                        return uniqueMovies;
                      }, [])
                      .map((movie) => (
                        <div
                          key={movie._id}
                          className="flex w-1/5 flex-col items-start hover:cursor-pointer"
                          onClick={() => handleMovieSelect(movie)}
                        >
                          <img
                            src={movie.img}
                            alt={movie.name}
                            className="h-50 mb-2 w-full rounded object-cover"
                          />
                          <span>{movie.name}</span>
                        </div>
                      ))
                  ) : (
                    <p className="mt-4 text-white">
                      {t("Vui lòng chọn khu vực")}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Choose Showtime */}
          <div>
            <h2 className="mb-4 text-xl font-bold text-white">
              {t("Chọn suất")}:
            </h2>
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
                {t("Chọn suất chiếu")}
                {isShowtimeOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {isShowtimeOpen && (
                <div className="mt-4 flex flex-col space-y-2">
                  <div className="flex items-center justify-between">
                    {showDates?.length > 0 && (
                      <div className="flex w-full justify-between">
                        <div className="flex w-full space-x-3 overflow-x-auto">
                          <button className="flex-shrink-0 rounded bg-gray-300 p-2 text-black">
                            <FaChevronLeft />
                          </button>
                          <div className="flex space-x-3 scroll-smooth">
                            {showDates.map((date, index) => {
                              // Chuyển đổi định dạng ngày
                              const dateObj = new Date(date); // Tạo đối tượng Date từ chuỗi `YYYY-MM-DD`
                              const dayOfWeek = dateObj.toLocaleDateString(
                                "vi-VN",
                                { weekday: "long" },
                              );
                              const formattedDate = dateObj.toLocaleDateString(
                                "vi-VN",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                },
                              );
                              const displayDate = `${formattedDate}`;
                              const displayText = `${dayOfWeek}`;
                              return (
                                <button
                                  key={index}
                                  onClick={() => handleDateSelect(date)}
                                  className={`w-[100px] rounded px-2 py-2 ${
                                    selectedDate === date
                                      ? "bg-blue-500 text-white"
                                      : "bg-white text-black"
                                  }`}
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
                                {cinema?.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Kiểm tra nếu không có suất chiếu */}
                  {filteredShowtimes.length > 0 ? (
                    filteredShowtimes.map((cinema) => (
                      <div key={cinema.cinemaId} className="mb-6 rounded p-4">
                        {/* Tên rạp */}
                        <h1 className="mb-2 text-2xl font-semibold">
                          {cinema.cinemaName}
                        </h1>
                        {/* Các phòng */}
                        <div className="space-y-4">
                          {cinema.rooms.map((room) => (
                            <div
                              key={room.roomId}
                              className="flex flex-col items-start md:flex-row md:items-center"
                            >
                              {/* Tên phòng */}
                              <div className="w-1/7 mb-2 mr-4 min-w-[90px] text-left md:mb-0">
                                <p className="text-sm font-medium">
                                  {room.roomName}
                                </p>
                              </div>
                              {/* Suất chiếu */}
                              <div className="flex flex-1 flex-wrap items-center justify-start">
                                {room.showtimes.map((showtime) => (
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
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="mt-4 text-center text-white">
                      {t("Không có suất chiếu nào trong ngày đã chọn")}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mb-6 w-full">
            <h2 className="mb-4 text-xl font-bold text-white">
              {t("Chọn ghế")}:
            </h2>
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
              {t("Chọn ghế")}
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
                  {t("Vui lòng chọn suất chiếu")}.
                </div>
              ))}
          </div>
        </div>

        {/* Right Column - 30% */}
        <div
          className={`mb-8 w-[30%] text-black transition-transform duration-[5000ms] ${
            isContinueClicked ? "mr-8" : ""
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
                          t("Vui lòng chọn phim để tiếp tục")}
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
                        {selectedCinemaName?.cinemaName}
                      </h2>
                      {"-"}
                      <span className="ml-2">{selectedRoom?.roomName}</span>
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

              <div className="mx-2 p-2">
                <div className="flex justify-between">
                  <h2 className="text-base font-semibold">{t("Tổng cộng")}</h2>
                  <span className="text-primary inline-block font-bold">
                    {selectedSeats && selectedSeats.length > 0
                      ? (() => {
                          const total = selectedSeats.reduce(
                            (sum, seat) => sum + seat.base_price,
                            0,
                          );

                          // Nếu có voucher, áp dụng giảm giá
                          const discountedTotal = selectedVoucher
                            ? total -
                              (total * selectedVoucher.discount_percent) / 100
                            : total;

                          // Lưu tổng tiền vào localStorage
                          localStorage.setItem("totalAmount", discountedTotal);

                          return (
                            <span>
                              {selectedVoucher && total !== discountedTotal && (
                                <span className="mr-2 text-gray-500 line-through">
                                  {formatCurrency(total)}
                                </span>
                              )}
                              <span className="text-red-600">
                                {formatCurrency(discountedTotal)}
                              </span>
                            </span>
                          );
                        })()
                      : `0 VNĐ`}
                  </span>
                </div>
                {selectedVoucher && (
                  <span className="flex justify-between">
                    <h2>Đã áp dụng mã</h2>
                    <p>{selectedVoucher?.name}</p>
                  </span>
                )}
              </div>
              <div className="mt-10 flex justify-between p-2">
                <button
                  onClick={() => setIsContinueClicked(false)}
                  className={`mr-2 w-1/2 rounded-md bg-gray-300 p-2 text-black ${
                    !isContinueClicked ? "cursor-not-allowed opacity-50" : ""
                  }`}
                  disabled={!isContinueClicked}
                >
                  {t("Quay lại")}
                </button>
                {!isContinueClicked ? (
                  <button
                    onClick={handleContinue}
                    className={`w-1/2 rounded-md bg-red-600 p-2 text-white ${
                      selectedSeats.length === 0
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                    disabled={selectedSeats.length === 0}
                  >
                    {t("Thanh toán")}
                  </button>
                ) : (
                  <button
                    onClick={handleAddTicket}
                    className="w-1/2 rounded-md bg-red-600 p-2 text-white"
                    disabled
                  >
                    Xác nhận
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className={`mb-8 transition-opacity duration-500 ${
            isContinueClicked ? "w-[70%] opacity-100" : "hidden"
          } relative bg-[#111111] p-4 text-white`}
        >
          <div className="flex w-full flex-col items-center gap-4 rounded-lg bg-gray-100 p-4 shadow-md sm:flex-row sm:justify-between">
            <p className="text-sm text-gray-700 sm:text-base">
              {selectedVoucher
                ? selectedVoucher.name
                : "Hiện chưa có mã giảm giá nào"}
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors duration-300 hover:bg-blue-600"
            >
              Chọn mã giảm giá
            </button>
          </div>
          <div className="mt-2">
            <img
              src="/src/assets/momo2.jpg"
              alt="MoMo Payment"
              className="mx-auto mb-4 h-[300px] w-[700px]"
            />
            <div className="mb-4">
              <p className="text-center">
                Chúc mừng bạn đã chọn vé! Vui lòng làm theo hướng dẫn để hoàn
                tất giao dịch.
              </p>
              <p className="text-center">
                Mô tả: Thanh toán vé xem phim qua ví MoMo.
              </p>
            </div>
            <button
              onClick={handleSeat}
              className="mx-auto block rounded bg-blue-500 px-4 py-2 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Đang xử lý..." : "Thanh toán MoMo"}
            </button>
            {isError && (
              <div className="mt-2 text-center text-red-500">
                {error.message || "Có lỗi xảy ra khi thực hiện thanh toán."}
              </div>
            )}
            <div className="mt-2 text-center text-sm text-gray-400">
              <p>Bước 1: Nhấn vào nút Thanh toán MoMo.</p>
              <p>
                Bước 2: Quét mã QR hoặc đăng nhập ví MoMo để hoàn tất giao dịch.
              </p>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-11/12 max-w-md rounded-lg bg-white p-6 shadow-lg">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                  Nhập mã giảm giá
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 transition-colors duration-200 hover:text-gray-600"
                >
                  ✖
                </button>
              </div>

              {/* Input Section */}
              <div className="mt-4 flex">
                <input
                  type="text"
                  placeholder="Nhập mã giảm giá..."
                  className="flex-1 rounded-l-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
                <button className="rounded-r-lg bg-blue-500 px-4 py-2 font-medium text-white transition-colors duration-300 hover:bg-blue-600">
                  Áp dụng
                </button>
              </div>
              <div className="">
                {codeVoucherUser?.data?.length > 0 ? (
                  codeVoucherUser?.data?.map((voucher) => (
                    <div
                      key={voucher._id}
                      className="mt-6 flex justify-between"
                    >
                      <div className="flex">
                        <img
                          src={voucher?.idVoucher?.img}
                          alt={voucher?.idVoucher?.name || "Voucher"}
                          className="mr-2 h-20 w-20 rounded"
                        />
                        <div>
                          <p className="font-semibold">
                            {voucher?.idVoucher?.name}
                          </p>
                          <p className="text-gray-600">
                            {" "}
                            Mã: {voucher?.idVoucher?.code}
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          setSelectedVoucher(voucher?.idVoucher);
                          setIsModalOpen(false);
                        }}
                        className="p-2 font-bold text-blue-600"
                      >
                        Chọn
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="mt-6 text-center text-gray-500">
                    Hiện chưa có mã giảm giá nào
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default BuyTickets;
