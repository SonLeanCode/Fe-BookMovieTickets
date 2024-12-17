import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import SEATTYPE from "../../constants/seatTypeConstants";
import {
  useAddSeatStatusesMutation,
  useDeleteSeatStatusMutation,
  useRemoveSeatStatusMutation,
} from "../../services/Showtimes/showtimes.serviecs";
import { useGetShowtimesByIdQuery } from "../../services/Showtimes/showtimes.serviecs";
import LoadingLocal from "../../pages/Loading/LoadingLocal";
import { io } from "socket.io-client";
const SeatSelection = ({
  showtime,
  seatsData,
  selectedSeats,
  onSeatSelect,
}) => {
  const {
    data: showtimeData,
    isLoading: showtimeLoading,
    refetch,
  } = useGetShowtimesByIdQuery(showtime?._id);
  const socketRef = useRef(null);
  const [addSeatStatus] = useAddSeatStatusesMutation();
  const [deleteSeatStatus] = useDeleteSeatStatusMutation();
  const [removeSeatStatus] = useRemoveSeatStatusMutation();
  const userlocal = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (showtime?._id) {
      refetch(); // Re-fetch showtime data
    }
  }, [showtime, refetch]);

  useEffect(() => {
    socketRef.current = io("http://localhost:4003", { autoConnect: true });
    socketRef.current.connect();

    // Lắng nghe sự kiện 'selectSeat'
    socketRef.current.on("selectSeat", () => {
      console.log("Received selectSeat event, refetching data...");
      refetch();
    });

    // Cleanup khi component unmount
  }, [refetch]);

  const handleSeatTimeoutCheck = async (seatStatusId) => {
    try {
      setTimeout(async () => {
        const response = await removeSeatStatus(seatStatusId).unwrap();

        if (response.message) {
          console.log(`Seat Status Timeout: ${response.message}`);
          socketRef.current.emit("selectSeat");
        }
      }, 30000); // 30 giây
    } catch (error) {
      console.error("Error in seat timeout check:", error);
    }
  };

  const handleSeatClick = async (seat) => {
    try {
      if (!userlocal) {
        alert("Vui lòng đăng nhập để chọn ghế");
        return;
      }

      const seatIndex = selectedSeats.findIndex(
        (selectedSeat) => selectedSeat._id === seat._id,
      );

      let updatedSeats;

      if (seatIndex >= 0) {
        // Bỏ chọn ghế nếu đã được chọn
        updatedSeats = [...selectedSeats];
        updatedSeats.splice(seatIndex, 1);

        // Gọi API để xoá trạng thái ghế
        const response = await deleteSeatStatus({
          showtimeId: showtimeData?.data?._id,
          seatId: seat._id,
          user_id: userlocal._id,
        }).unwrap();

        if (response) {
          // Phát sự kiện tới server
          socketRef.current.emit("selectSeat");
          console.log("Seat deselected:", response);
        }
      } else {
        // Chọn ghế
        updatedSeats = [...selectedSeats, seat];

        // Gọi API để thêm trạng thái ghế với trạng thái "locked"
        const seatStatuses = [
          {
            seat_id: seat._id,
            status: "locked",
          },
        ];

        const response = await addSeatStatus({
          showtimeId: showtimeData?.data?._id,
          seatStatuses,
          user_id: userlocal._id,
        }).unwrap();

        if (response) {
          // Phát sự kiện tới server
          socketRef.current.emit("selectSeat");
          // Kiểm tra trạng thái ghế sau 30 giây
          response?.data?.seat_statuses?.forEach((seatStatus) => {
            handleSeatTimeoutCheck(seatStatus._id);
          });
        }
      }

      // Cập nhật danh sách ghế đã chọn lên component cha
      onSeatSelect(updatedSeats);

      // Refetch dữ liệu sau 35 giây
      setTimeout(() => {
        refetch();
      }, 35000);
    } catch (error) {
      console.error("Có lỗi xảy ra khi cập nhật trạng thái ghế:", error);
    }
  };

  const getSeatClass = (seat, showtime) => {
    const baseClass = `w-10 h-10 rounded-lg font-bold text-white`;

    // Kiểm tra nếu ghế được chọn
    const selectedClass = selectedSeats.some(
      (selectedSeat) => selectedSeat._id === seat._id,
    )
      ? "border-4 border-white"
      : "";

    // Kiểm tra nếu `showtime` và `seat_statuses` tồn tại
    const isBooked = showtime?.seat_statuses?.some(
      (statusSeat) =>
        statusSeat.seat_id === seat._id && statusSeat.status === "booked",
    );

    if (isBooked) {
      return `${baseClass} bg-gray-600 ${selectedClass}`;
    }

    // Kiểm tra nếu `showtime` và `seat_statuses` tồn tại
    const isSelect = showtime?.seat_statuses?.some(
      (statusSeat) =>
        statusSeat.seat_id === seat._id && statusSeat.status === "locked",
    );

    if (isSelect) {
      return `${baseClass} bg-gray-800 ${selectedClass}`;
    }

    // Nếu ghế có trạng thái "unavailable"
    if (seat.status === "unavailable") {
      return `${baseClass} border-4 border-white relative ${selectedClass}`;
    }

    // Kiểm tra loại ghế và áp dụng lớp thích hợp
    switch (seat.seat_type) {
      case SEATTYPE.VIP:
        return `${baseClass} bg-yellow-300 ${selectedClass}`;
      case SEATTYPE.SWEETBOX:
        return `${baseClass} bg-red-500 w-20 ${selectedClass}`;
      default:
        return `${baseClass} bg-indigo-600 ${selectedClass}`;
    }
  };

  // Lọc các ghế Sweetbox
  const sweetboxSeats = seatsData?.filter(
    (seat) => seat.seat_type === SEATTYPE.SWEETBOX,
  );

  // Lọc các ghế bình thường
  const normalSeats = seatsData?.filter(
    (seat) => seat.seat_type !== SEATTYPE.SWEETBOX,
  );

  const rows = Array.from(new Set(normalSeats?.map((seat) => seat.row))).sort();
  const seatNumbers = Array.from(
    new Set(normalSeats?.map((seat) => seat.seat_number)),
  ).sort((a, b) => a - b);

  if (showtimeLoading) {
    return <LoadingLocal />;
  }

  return (
    <div className="mt-4 flex w-full flex-col items-center rounded-lg bg-black p-4">
      <div className="mx-auto h-2 w-[50%] bg-orange-500"></div>
      <div className="font-bold">Màn hình</div>
      {/* Hiển thị các ghế bình thường */}
      <div className="mt-10 flex flex-col items-center">
        <div className="flex flex-row justify-center">
          {seatNumbers?.map((seatNum) => (
            <div key={seatNum} className="flex flex-col">
              {rows.map((row) => {
                const seat = normalSeats.find(
                  (seat) => seat.row === row && seat.seat_number === seatNum,
                );

                if (!seat) {
                  return (
                    <div
                      key={`${row}${seatNum}`}
                      className="mx-1 my-1 h-10 w-10 bg-transparent"
                    ></div>
                  );
                }

                // Lấy thông tin ghế bị khóa và user_id của người khóa
                const lockedByUser = showtimeData?.data?.seat_statuses?.find(
                  (statusSeat) =>
                    statusSeat.seat_id === seat._id &&
                    statusSeat.status === "locked",
                );

                return (
                  <div key={`${row}${seatNum}`} className="flex justify-center">
                    <button
                      className={`mx-1 my-1 ${getSeatClass(seat, showtimeData?.data)} ${
                        seat?.status === "unavailable"
                          ? "button-unavailable"
                          : ""
                      } h-10`}
                      onClick={() => handleSeatClick(seat)}
                      disabled={
                        // Ghế "unavailable"
                        seat.status === "unavailable" ||
                        // Ghế đã được đặt
                        showtimeData?.data?.seat_statuses?.some(
                          (statusSeat) =>
                            statusSeat.seat_id === seat._id &&
                            statusSeat.status === "booked",
                        ) ||
                        // Ghế bị khóa và user không khớp
                        (lockedByUser &&
                          lockedByUser?.user_id !== userlocal?._id)
                      }
                    >
                      {`${seat.row}${seat.seat_number}`}
                    </button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col flex-wrap items-center">
        <div className="flex flex-row flex-wrap justify-center">
          {sweetboxSeats?.length > 0 && (
            <div className={`relative mb-2 flex flex-col justify-center`}>
              {Object.entries(
                sweetboxSeats
                  .sort((a, b) => a.row.localeCompare(b.row)) // Sắp xếp ghế theo row
                  .reduce((acc, seat) => {
                    // Nhóm ghế theo row
                    acc[seat.row] = acc[seat.row] || [];
                    acc[seat.row].push(seat);
                    return acc;
                  }, {}),
              ).map(([row, seats]) => (
                <div key={row} className="flex justify-center">
                  {seats.map((seat) => {
                    // Kiểm tra ghế bị khóa và user_id của người khóa
                    const lockedByUser =
                      showtimeData?.data?.seat_statuses?.find(
                        (statusSeat) =>
                          statusSeat.seat_id === seat._id &&
                          statusSeat.status === "locked",
                      );

                    return (
                      <div
                        key={`${seat.row}${seat.seat_number}`}
                        className="relative"
                      >
                        <button
                          className={`mx-1 my-1 rounded-lg font-bold w-20 text-white ${getSeatClass(seat, showtimeData?.data)} ${
                            seat.status === "booked"
                              ? "cursor-not-allowed bg-gray-600"
                              : ""
                          } h-10`}
                          onClick={() => handleSeatClick(seat)}
                          disabled={
                            // Ghế đã đặt
                            seat.status === "booked" ||
                            // Ghế bị khóa bởi người khác
                            (lockedByUser &&
                              lockedByUser?.user_id !== userlocal?._id)
                          }
                        >
                          {`${seat.row}${seat.seat_number}`}
                        </button>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-4 flex">
        <div className="mx-2">
          <div className="mb-1 flex items-center">
            <span className="mr-2 block h-4 w-4 bg-red-500"></span>
            <span>Ghế Sweetbox</span>
          </div>
          <div className="mb-1 flex items-center">
            <span className="mr-2 block h-4 w-4 bg-yellow-300"></span>
            <span>Ghế VIP</span>
          </div>
          <div className="mb-1 flex items-center">
            <span className="mr-2 block h-4 w-4 bg-gray-800"></span>
            <span>Ghế đã được chọn</span>
          </div>
        </div>
        <div className="mx-2">
          <div className="mb-1 flex items-center">
            <span className="mr-2 block h-4 w-4 bg-indigo-800"></span>
            <span>Ghế thường</span>
          </div>
          <div className="mb-1 flex items-center">
            <span className="mr-2 block h-4 w-4 bg-gray-600"></span>
            <span>Ghế đã đặt</span>
          </div>
          <div className="mb-1 flex items-center">
            <button className="button-unavailable relative mr-2 h-4 w-4 border-2 border-white"></button>
            <span className="text-white">Ghế không khả dụng</span>
          </div>
        </div>
      </div>
    </div>
  );
};

SeatSelection.propTypes = {
  showtime: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    start_time: PropTypes.string.isRequired,
    end_time: PropTypes.string.isRequired,
    seat_statuses: PropTypes.arrayOf(
      PropTypes.shape({
        seat_id: PropTypes.string.isRequired,
        status: PropTypes.oneOf(["booked", "locked"]),
      }),
    ),
    created_at: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
  }).isRequired,
  seatsData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      row: PropTypes.string.isRequired,
      seat_number: PropTypes.number.isRequired,
      seat_type: PropTypes.number.isRequired,
      status: PropTypes.oneOf(["available", "booked", "unavailable"])
        .isRequired,
    }),
  ).isRequired,
  onSeatSelect: PropTypes.func.isRequired, // Function to handle seat selection
  selectedSeats: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default SeatSelection;
