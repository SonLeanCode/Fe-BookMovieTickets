import { useState } from "react";
import Toastify from "../../helper/Toastify";
import PropTypes from "prop-types";
import LoadingLocal from "../../pages/Loading/LoadingLocal";
const AddMultipleSeatsModal = ({
  roomId,
  onAddSeat,
  refetchSeats,
  setIsOpen,
}) => {
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

  const handleAddSeats = async () => {
    setIsLoading(true);
    const { row, seatCount, seatType, basePrice } = newSeat;
    try {
      // Prepare price variations based on the base price
      const priceVariations = [
        { day_type: "weekend", price: basePrice * 1.2 },
        { day_type: "holiday", price: basePrice * 1.5 },
      ];

      // Send request with all necessary information
      const res = await onAddSeat({
        room_id: roomId, // Use room_id from props
        row,
        seatCount,
        seat_type: seatType,
        base_price: basePrice,
        price_variations: priceVariations,
      });

      console.log(res, res.data.message, res.data.status);
      refetchSeats(); // Call to refetch the seats after adding

      // Reset form after adding seats
      setNewSeat({
        row: "",
        seatCount: 1,
        seatType: "Single",
        basePrice: 10000,
      });
      setTimeout(() => {
        Toastify(res.data.message, res.data.status);
        setIsOpen(false);
        setIsLoading(false);
      }, 1000); // Close modal after adding seat successfully
    } catch (error) {
      console.error(error); // Check for errors
    }
  };

  if (isLoading) {
    return <LoadingLocal />;
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="rounded-lg bg-[#2d2d2d] p-6 shadow-lg">
          <h2 className="mb-4 text-xl font-bold">Thêm Ghế</h2>
          <form onSubmit={handleAddSeats}>
            {/* Hàng ghế */}
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

            {/* Số lượng ghế */}
            <label htmlFor="seatCount">Số Lượng Ghế:</label>
            <input
              type="number"
              name="seatCount"
              value={newSeat.seatCount}
              onChange={handleChange}
              min="1"
              className="mb-4 mt-2 w-full rounded-md bg-[#2d2d2d] text-white"
              required
            />

            {/* Loại ghế */}
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

            {/* Giá cơ bản */}
            <label htmlFor="basePrice">Giá Cơ Bản:</label>
            <input
              type="number"
              name="basePrice"
              value={newSeat.basePrice}
              onChange={handleChange}
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
    </>
  );
};

AddMultipleSeatsModal.propTypes = {
  roomId: PropTypes.string.isRequired, // Assuming roomId is a string
  onAddSeat: PropTypes.func.isRequired, // Function to handle seat addition
  refetchSeats: PropTypes.func.isRequired, // Function to refetch seats after addition
  setIsOpen: PropTypes.func.isRequired, // Function to toggle modal visibility
};

export default AddMultipleSeatsModal;
