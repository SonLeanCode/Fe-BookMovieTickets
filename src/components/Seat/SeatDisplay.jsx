import PropTypes from "prop-types";
import { useState } from "react";
import { FaEdit, FaTrash, FaDollarSign } from "react-icons/fa";
import { useUpdateSeatStatusMutation } from "../../services/Seat/seat.serviecs";
import Toastify from "../../helper/Toastify";

const SeatDisplay = ({ seatsData, refetchSeats, handleDeleteSeat }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [updateSeatStatus] = useUpdateSeatStatusMutation();

  const toggleSubMenu = () => {
    setShowSubMenu((prev) => !prev);
  };

  const handleUpdateSeatStatus = async (seatId, newStatus) => {
    try {
      const res = await updateSeatStatus({ seatId, newStatus }).unwrap();
      Toastify(res.message, res.status);
      setShowSubMenu(false);
      setSelectedSeat(false);
      refetchSeats();
      console.log("Trạng thái ghế đã được cập nhật thành công.");
    } catch (error) {
      console.error("Lỗi khi cập nhật trạng thái ghế:", error);
      Toastify(error.message, error.status);
    }
  };

  const getSeatClass = (seat) => {
    const baseClass = `w-10 h-10 rounded-lg font-bold text-white`;
    const selectedClass =
      selectedSeat?._id === seat._id ? "border-4 border-white" : "";

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

  const rows = Array.from(new Set(seatsData?.map((seat) => seat.row))).sort();
  const seatNumbers = Array.from(
    new Set(seatsData?.map((seat) => seat.seat_number)),
  ).sort((a, b) => a - b);

  const sweetboxSeats = seatsData?.filter(
    (seat) => seat.seat_type === "Sweetbox",
  );
  const otherSeats = seatsData?.filter((seat) => seat.seat_type !== "Sweetbox");

  const handleSeatClick = (seat) => {
    setSelectedSeat(selectedSeat?._id === seat?._id ? null : seat);
  };

  return (
    <div className="mt-4 flex flex-col items-center rounded-lg bg-black p-4">
      <div className="mx-auto h-2 w-[50%] bg-orange-500"></div>
      <div className="font-bold">Màn hình</div>
      <div className="mt-10 flex flex-col items-center">
        <div className="flex flex-row">
          {seatNumbers?.map((seatNum) => (
            <div key={seatNum} className="flex flex-col">
              {rows.map((row) => {
                const seat = otherSeats.find(
                  (seat) => seat.row === row && seat.seat_number === seatNum,
                );
                return seat ? ( // Chỉ hiển thị nút nếu seat tồn tại
                  <div key={`${row}${seatNum}`} className="relative">
                    <button
                      className={`mx-1 my-1 ${getSeatClass(seat)} ${seat?.status === "unavailable" ? "button-unavailable" : ""} h-10`}
                      onClick={() => handleSeatClick(seat)}
                    >
                      {`${seat.row}${seat.seat_number}`}
                    </button>
                    {selectedSeat?._id === seat?._id && (
                      <div className="absolute -top-32 left-10 z-50 mt-2 w-48 rounded border border-gray-500 bg-black shadow-lg">
                        <div className="text-white">
                          <button
                            className="flex w-full items-center border-b-[1px] border-gray-700 px-2 py-2 text-left hover:bg-gray-800"
                            onClick={toggleSubMenu}
                          >
                            <span>Cập nhật trạng thái</span>
                            <FaEdit className="ml-auto text-white" />
                          </button>
                          {showSubMenu && (
                            <div className="absolute -top-[92px] left-full mt-2 rounded border border-gray-500 bg-black shadow-lg">
                              <button
                                onClick={() =>
                                  handleUpdateSeatStatus(
                                    selectedSeat._id,
                                    "booked",
                                  )
                                }
                                className="flex w-full items-center border-b-[1px] border-gray-700 px-2 py-2 text-left hover:bg-gray-700"
                              >
                                Booked
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateSeatStatus(
                                    selectedSeat._id,
                                    "available",
                                  )
                                }
                                className="flex w-full items-center border-b-[1px] border-gray-700 px-2 py-2 text-left hover:bg-gray-700"
                              >
                                Available
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateSeatStatus(
                                    selectedSeat._id,
                                    "unavailable",
                                  )
                                }
                                className="flex w-full items-center px-2 py-2 text-left hover:bg-gray-700"
                              >
                                Unavailable
                              </button>
                            </div>
                          )}
                          <button className="flex w-full items-center border-b-[1px] border-gray-700 px-2 py-2 text-left hover:bg-gray-800">
                            <span>Cập nhật giá ghế</span>
                            <FaDollarSign className="ml-auto text-white" />
                          </button>
                          <button
                            onClick={() => handleDeleteSeat(selectedSeat._id)}
                            className="flex w-full items-center border-gray-700 px-2 py-2 text-left hover:bg-gray-800"
                          >
                            <span>Xoá</span>
                            <FaTrash className="ml-auto text-white" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div
                    key={`${row}${seatNum}`}
                    className="mx-1 my-1 h-10 w-10 bg-transparent"
                  ></div> // Giữ khoảng trống cho các vị trí không có ghế
                );
              })}
            </div>
          ))}
        </div>
        {sweetboxSeats?.length > 0 && (
          <div className="relative -top-12 mb-2 flex justify-center">
            {sweetboxSeats.map((seat) => (
              <div key={`${seat.row}${seat.seat_number}`} className="relative">
                <button
                  className={`mx-1 my-1 rounded-lg font-bold text-white ${getSeatClass(seat)} ${seat.status === "booked" ? "cursor-not-allowed bg-gray-600" : seat.status === "unavailable" ? "button-unavailable-sweetbox" : ""} h-10`}
                  
                  onClick={() => handleSeatClick(seat)}
                >
                  {`${seat.row}${seat.seat_number}`}
                </button>
                {selectedSeat?._id === seat?._id && (
                  <div className="absolute -top-32 left-10 z-50 mt-2 w-48 rounded border border-gray-500 bg-black shadow-lg">
                    <div className="text-white">
                      <button
                        className="flex w-full items-center border-b-[1px] border-gray-700 px-2 py-2 text-left hover:bg-gray-800"
                        onClick={toggleSubMenu}
                      >
                        <span>Cập nhật trạng thái</span>
                        <FaEdit className="ml-auto text-white" />
                      </button>
                      {showSubMenu && (
                        <div className="absolute -top-[92px] left-full mt-2 rounded border border-gray-500 bg-black shadow-lg">
                          <button
                            onClick={() =>
                              handleUpdateSeatStatus(selectedSeat._id, "booked")
                            }
                            className="flex w-full items-center border-b-[1px] border-gray-700 px-2 py-2 text-left hover:bg-gray-700"
                          >
                            Booked
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateSeatStatus(
                                selectedSeat._id,
                                "available",
                              )
                            }
                            className="flex w-full items-center border-b-[1px] border-gray-700 px-2 py-2 text-left hover:bg-gray-700"
                          >
                            Available
                          </button>
                          <button
                            onClick={() =>
                              handleUpdateSeatStatus(
                                selectedSeat._id,
                                "unavailable",
                              )
                            }
                            className="flex w-full items-center px-2 py-2 text-left hover:bg-gray-700"
                          >
                            Unavailable
                          </button>
                        </div>
                      )}
                      <button className="flex w-full items-center border-b-[1px] border-gray-700 px-2 py-2 text-left hover:bg-gray-800">
                        <span>Cập nhật giá ghế</span>
                        <FaDollarSign className="ml-auto text-white" />
                      </button>
                      <button className="flex w-full items-center border-gray-700 px-2 py-2 text-left hover:bg-gray-800">
                        <span>Xoá</span>
                        <FaTrash className="ml-auto text-white" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
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
  refetchSeats: PropTypes.func.isRequired,
  handleDeleteSeat: PropTypes.func.isRequired,
};

export default SeatDisplay;
