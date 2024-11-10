import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const SeatSelection = ({ seatsData, onSeatSelect, resetSeats }) => {
  const [selectedSeats, setSelectedSeats] = useState([]); // Trạng thái ghế đã chọn

  // Khi prop resetSeats thay đổi (tức là khu vực, phim, suất chiếu đã thay đổi)
  useEffect(() => {
    if (resetSeats) {
      setSelectedSeats([]); // Reset ghế đã chọn
    }
  }, [resetSeats]); // Khi resetSeats thay đổi, reset selectedSeats

  const handleSeatClick = (seat) => {
    const seatIndex = selectedSeats.findIndex(
      (selectedSeat) => selectedSeat._id === seat._id,
    );

    let updatedSeats;
    if (seatIndex >= 0) {
      // Bỏ chọn ghế nếu đã được chọn
      updatedSeats = [...selectedSeats];
      updatedSeats.splice(seatIndex, 1);
    } else {
      // Chọn ghế
      updatedSeats = [...selectedSeats, seat];
    }

    setSelectedSeats(updatedSeats);

    // Gọi hàm onSeatSelect để gửi danh sách ghế đã chọn lên component cha
    onSeatSelect(updatedSeats);
  };

  const getSeatClass = (seat) => {
    const baseClass = `w-10 h-10 rounded-lg font-bold text-white`;
    const selectedClass = selectedSeats.some(
        (selectedSeat) => selectedSeat._id === seat._id
      )
        ? "border-4 border-white"
        : "";

    if (seat.status === "booked") {
      return `${baseClass} bg-gray-600  ${selectedClass}`;
    } else if (seat.status === "unavailable") {
      return `${baseClass} border-4 border-white relative  ${selectedClass}`;
    }

    switch (seat.seat_type) {
      case "VIP":
        return `${baseClass} bg-yellow-300  ${selectedClass}`;
      case "Sweetbox":
        return `${baseClass} bg-red-500 w-20  ${selectedClass}`;
      default:
        return `${baseClass} bg-indigo-600  ${selectedClass}`;
    }
  };

  // Lọc các ghế Sweetbox
  const sweetboxSeats = seatsData?.filter(
    (seat) => seat.seat_type === "Sweetbox",
  );

  // Lọc các ghế bình thường
  const normalSeats = seatsData?.filter(
    (seat) => seat.seat_type !== "Sweetbox",
  );

  const rows = Array.from(new Set(normalSeats?.map((seat) => seat.row))).sort();
  const seatNumbers = Array.from(
    new Set(normalSeats?.map((seat) => seat.seat_number)),
  ).sort((a, b) => a - b);

  return (
    <div className="mt-4 flex flex-col items-center rounded-lg bg-black p-4">
      <div className="mx-auto h-2 w-[50%] bg-orange-500"></div>
      <div className="font-bold">Màn hình</div>
      {/* Hiển thị các ghế bình thường */}
      <div className="mt-10 flex flex-col items-center">
        <div className="flex flex-row">
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

                return (
                  <div key={`${row}${seatNum}`} className="flex justify-center">
                    <button
                      className={`mx-1 my-1 ${getSeatClass(seat)} ${seat?.status === "unavailable" ? "button-unavailable" : ""} h-10`}
                      onClick={() => handleSeatClick(seat)}
                      disabled={
                        seat.status === "booked" ||
                        seat.status === "unavailable"
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

      <div className="flex flex-col items-center">
        <div className="flex flex-row">
          {sweetboxSeats?.map((seat) => (
            <button
              key={seat._id}
              className={`mx-1 my-1 rounded-lg font-bold text-white ${getSeatClass(seat)} ${seat.status === "booked" ? "cursor-not-allowed bg-gray-600" : seat.status === "unavailable" ? "button-unavailable-sweetbox" : ""} h-10`}
              onClick={() => handleSeatClick(seat)}
              disabled={
                seat.status === "booked" || seat.status === "unavailable"
              }
            >
              {`${seat.row}${seat.seat_number}`}
            </button>
          ))}
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
  seatsData: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      row: PropTypes.string.isRequired,
      seat_number: PropTypes.string.isRequired,
      seat_type: PropTypes.oneOf(["Single", "Sweetbox", "VIP", "Double"])
        .isRequired,
      status: PropTypes.oneOf(["available", "booked", "unavailable"])
        .isRequired,
    }),
  ).isRequired,
  onSeatSelect: PropTypes.func.isRequired, // Function to handle seat selection
  resetSeats: PropTypes.bool.isRequired, // Prop to trigger seat reset
};

export default SeatSelection;
