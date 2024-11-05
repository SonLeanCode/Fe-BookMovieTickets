import { useState } from "react";
import PropTypes from "prop-types";
import Toastify from "../../helper/Toastify";
import LoadingLocal from "../../pages/Loading/LoadingLocal";

const AddSeatModal = ({ roomId, onAddSeat, refetchSeats, setIsOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [newSeat, setNewSeat] = useState({
    room_id: roomId,
    row: "",
    seatCount: 1,
    seat_number: null,
    seatType: "Single",
    basePrice: 10000,
    priceVariations: [],
    status: "available",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSeat((prev) => ({
      ...prev,
      [name]: name === "seatCount" ? Number(value) : value,
    }));
  };

  const handleAddSingleSeat = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const { row, seatType, seat_number, basePrice } = newSeat;

    try {
      const priceVariations = [
        { day_type: "weekend", price: basePrice * 1.2 },
        { day_type: "holiday", price: basePrice * 1.5 },
      ];

      const res = await onAddSeat({
        room_id: roomId,
        row,
        seat_number,
        seat_type: seatType,
        base_price: basePrice,
        price_variations: priceVariations,
      });

      refetchSeats();
      setNewSeat({
        room_id: roomId,
        row: "",
        seatCount: 1,
        seat_number: null,
        seatType: "Single",
        basePrice: 10000,
        priceVariations: [],
        status: "available",
      });
      setTimeout(() => {
        Toastify(res.data.message, res.data.status);
        setIsOpen(false);
        setIsLoading(false);
      }, 1000); // Close modal after adding seat successfully
    } catch (error) {
      console.error("Có lỗi xảy ra khi thêm ghế:", error);
    }
  };

  if (isLoading) {
    return <LoadingLocal />;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="rounded-lg bg-[#2d2d2d] p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Thêm Ghế</h2>
        <form onSubmit={handleAddSingleSeat}>
          <label htmlFor="row">Hàng Ghế:</label>
          <select
            name="row"
            value={newSeat.row}
            onChange={handleChange}
            className="mb-4 mt-2 w-full rounded-md bg-[#2d2d2d] text-white"
            required
          >
            <option value="">Chọn hàng ghế</option>
            {Array.from({ length: 26 }, (_, i) => (
              <option key={i} value={String.fromCharCode(65 + i)}>
                {String.fromCharCode(65 + i)}
              </option>
            ))}
          </select>

          <label htmlFor="seat_number">Số Ghế:</label>
          <input
            type="number"
            name="seat_number"
            value={newSeat.seat_number}
            onChange={handleChange}
            min="1"
            placeholder="Nhập số ghế (ví dụ: 1, 2, 3)"
            className="mb-4 mt-2 w-full rounded-md bg-[#2d2d2d] text-white"
            required
          />

          <label htmlFor="seatType">Loại Ghế:</label>
          <select
            name="seatType"
            value={newSeat.seatType}
            onChange={handleChange}
            className="mb-4 mt-2 w-full rounded-md bg-[#2d2d2d] text-white"
            required
          >
            <option value="Single">Ghế Thường</option>
            <option value="Sweetbox">Ghế Đôi</option>
            <option value="VIP">Ghế VIP</option>
          </select>

          <label htmlFor="basePrice">Giá Cơ Bản:</label>
          <input
            type="number"
            name="basePrice"
            value={newSeat.basePrice}
            onChange={handleChange}
            placeholder="Nhập giá cơ bản (ví dụ: 100000)"
            className="mb-4 mt-2 w-full rounded-md bg-[#2d2d2d] text-white"
            required
          />

          <div className="flex justify-between">
            <button
              type="submit"
              className="mr-2 rounded-md bg-[#0728dd] p-2 text-white"
            >
              Thêm
            </button>
            <button
              type="button"
              className="rounded-md bg-red-600 p-2 text-white"
              onClick={() => setIsOpen(false)}
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

AddSeatModal.propTypes = {
  roomId: PropTypes.string.isRequired,
  onAddSeat: PropTypes.func.isRequired,
  refetchSeats: PropTypes.func.isRequired,
  setIsOpen: PropTypes.func.isRequired,
};

export default AddSeatModal;
