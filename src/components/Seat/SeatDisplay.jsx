import PropTypes from "prop-types";

const SeatDisplay = ({ seatsData }) => {
  // Hàm lấy class cho ghế
  const getSeatClass = (seat) => {
    switch (seat.seat_type) {
      case "VIP":
        return "bg-yellow-300";
      case "Sweetbox":
        return "bg-red-500 w-20"; // Ghế Sweetbox rộng gấp đôi
      case "Double":
        return "bg-blue-500";
      default:
        return "bg-green-500";
    }
  };

  // Lấy danh sách hàng và số ghế tối đa trong mỗi hàng
  const rows = Array.from(new Set(seatsData?.map((seat) => seat.row))).sort();
  const seatNumbers = Array.from(
    new Set(seatsData?.map((seat) => seat.seat_number)),
  ).sort((a, b) => a - b); // Sắp xếp số ghế

  // Tách Sweetbox ra khỏi ghế khác
  const sweetboxSeats = seatsData?.filter(
    (seat) => seat.seat_type === "Sweetbox",
  );
  const otherSeats = seatsData?.filter((seat) => seat.seat_type !== "Sweetbox");

  return (
    <div className="mt-4 flex flex-col items-center rounded-lg bg-black p-4">
      <div className="mx-auto h-2 w-[50%] bg-orange-500"></div>{" "}
      <div className="font-bold">Màn hình</div>
      {/* Màn hình nhỏ hơn */}
      <div className="mt-10 flex flex-col items-center">
        {/* Hiển thị ghế Sweetbox giữa */}
        <div className="flex flex-row">
          {seatNumbers?.map((seatNum) => (
            <div key={seatNum} className="flex flex-col">
              {/* Tạo một cột ghế cho mỗi số ghế */}
              {rows.map((row) => {
                const seat = otherSeats.find(
                  (seat) => seat.row === row && seat.seat_number === seatNum,
                );
                return (
                  <button
                    key={`${row}${seatNum}`}
                    className={`mx-1 my-1 w-10 rounded-lg font-bold text-white ${seat ? getSeatClass(seat) : "cursor-default bg-transparent"} ${
                      seat?.status === "booked"
                        ? "cursor-not-allowed bg-gray-600"
                        : seat?.status === "unavailable"
                          ? "line-through"
                          : ""
                    } h-10`}
                    disabled={
                      !seat ||
                      seat.status === "booked" ||
                      seat.status === "unavailable"
                    }
                  >
                    {seat ? `${seat.row}${seat.seat_number}` : ""}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        {sweetboxSeats?.length > 0 && (
          <div className="mb-2 flex justify-center relative -top-12">
            {sweetboxSeats.map((seat) => (
              <button
                key={`${seat.row}${seat.seat_number}`}
                className={`mx-1 my-1 rounded-lg font-bold text-white ${getSeatClass(seat)} ${seat.status === "booked" ? "cursor-not-allowed bg-gray-600" : seat.status === "unavailable" ? "line-through" : ""} h-10`}
                disabled={
                  seat.status === "booked" || seat.status === "unavailable"
                }
              >
                {`${seat.row}${seat.seat_number}`}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Ghi chú màu sắc */}
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
            <span className="mr-2 block h-4 w-4 bg-green-500"></span>
            <span>Ghế thường</span>
          </div>
          <div className="mb-1 flex items-center">
            <span className="mr-2 block h-4 w-4 bg-gray-600"></span>
            <span>Ghế đã đặt</span>
          </div>
          <div className="mb-1 flex items-center">
            <span className="relative mr-2 block h-4 w-4 border-2 border-white">
              {/* X mark for unavailable seat */}
              <span className="absolute left-0 top-0 flex h-full w-full items-center justify-center text-xl text-white">
                &#10006;
              </span>
            </span>
            <span className="text-white">Ghế không khả dụng</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Thêm kiểm tra kiểu cho props
SeatDisplay.propTypes = {
  seatsData: PropTypes.arrayOf(
    PropTypes.shape({
      row: PropTypes.string.isRequired,
      seat_number: PropTypes.string.isRequired,
      seat_type: PropTypes.oneOf(["Single", "Sweetbox", "VIP", "Double"])
        .isRequired,
      status: PropTypes.oneOf(["available", "booked", "unavailable"])
        .isRequired,
    }),
  ).isRequired,
};

export default SeatDisplay;
