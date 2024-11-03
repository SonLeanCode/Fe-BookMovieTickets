import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import {
  useGetSeatsByRoomQuery,
  useAddSeatMutation,
  useAddSeatsInRowMutation,
  useUpdateSeatPricesMutation,
  useDeleteSeatMutation,
} from "../../services/Seat/seat.serviecs";
import Pagination from "../../components/Admin/Pagination";
import Toastify from "../../helper/Toastify";
import SeatDisplay from "../../components/Seat/SeatDisplay";
import { Input } from "react-daisyui";
import { formatCurrency } from "../../utils/formatCurrency";

const Seat_Management = () => {
  const { roomId } = useParams();
  const { data: seats, refetch: refetchSeats } = useGetSeatsByRoomQuery(roomId);
  const [addSeat] = useAddSeatMutation();
  const [addSeatsInRow] = useAddSeatsInRowMutation();
  const [updateSeatPrices] = useUpdateSeatPricesMutation();
  const [seatsPerPage, setSeatsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteSeat] = useDeleteSeatMutation();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOpenSeatAdd, setIsOpenSeatAdd] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [newSeat, setNewSeat] = useState({
    room_id: roomId, // Ensure room_id is initialized
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
      [name]: name === "seatCount" ? Number(value) : value, // Convert seatCount to number
    }));
  };

  const filteredSeats = seats?.filter((seat) => {
    const seatIdentifier = `${seat.row}${seat.seat_number}`;
    return seatIdentifier.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil((filteredSeats?.length || 0) / seatsPerPage);

  const handleSeatsPerPageChange = (e) => setSeatsPerPage(e.target.value);
  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleSeatSelect = (seatId) => {
    setSelectedSeats((prevSelected) =>
      prevSelected.includes(seatId)
        ? prevSelected.filter((id) => id !== seatId)
        : [...prevSelected, seatId],
    );
  };

  const handleAddSeats = async () => {
    const { row, seatCount, seatType, basePrice } = newSeat;
    try {
      // Prepare price variations based on the base price
      const priceVariations = [
        { day_type: "weekday", price: basePrice },
        { day_type: "weekend", price: basePrice * 1.2 },
        { day_type: "holiday", price: basePrice * 1.5 },
      ];

      // Send request with all necessary information
      const res = await addSeatsInRow({
        room_id: roomId, // Use room_id from params
        row,
        seatCount,
        seat_type: seatType,
        base_price: basePrice,
        price_variations: priceVariations,
      });
      Toastify(res.messeges, res.status);
      refetchSeats();
      // Reset form after adding seats
      setNewSeat({
        room_id: roomId, // Reset to the current room_id
        row: "",
        seatType: "Single",
        basePrice: 10000,
        priceVariations: [],
        status: "available",
      });
      setIsModalVisible(false);
    } catch (error) {
      console.error(error); // Check for errors
    }
  };

  const handleAddSingleSeat = async () => {
    const { row, seatType, seat_number, basePrice } = newSeat;

    try {
      const priceVariations = [
        { day_type: "weekday", price: basePrice },
        { day_type: "weekend", price: basePrice * 1.2 },
        { day_type: "holiday", price: basePrice * 1.5 },
      ];

      const res = await addSeat({
        room_id: roomId,
        row,
        seat_number,
        seat_type: seatType,
        base_price: basePrice,
        price_variations: priceVariations,
      });

      Toastify(res.data.message, res.data.status);
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

      setIsOpenSeatAdd(false);
    } catch (error) {
      Toastify("Có lỗi xảy ra khi thêm ghế:", 400);
      console.error(error); // Check for errors
    }
  };

  const handleDeleteSeat = async (seatId) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa ghế này không?",
    );
    if (!isConfirmed) return;

    try {
      await deleteSeat(seatId);
      Toastify("Xóa ghế thành công", 200);
      refetchSeats();
    } catch (error) {
      console.error("Lỗi khi xóa ghế:", error);
      Toastify("Xóa ghế thất bại", 400, "error");
    }
  };

  // Hàm xóa nhiều ghế với xác nhận
  const handleDeleteSelectedSeats = async () => {
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa các ghế đã chọn không?",
    );
    if (!isConfirmed) return;

    try {
      for (const seatId of selectedSeats) {
        await deleteSeat(seatId);
      }
      setSelectedSeats([]);
      Toastify("Xóa các ghế thành công", 200);
      refetchSeats();
    } catch (error) {
      console.error("Lỗi khi xóa các ghế:", error);
      Toastify("Xóa các ghế thất bại", 400, "error");
    }
  };

  const paginatedSeats = filteredSeats?.slice(
    (currentPage - 1) * seatsPerPage,
    currentPage * seatsPerPage,
  );

  return (
    <div className="ml-64 mt-8 bg-[#111111] p-6 text-white">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-bold">Quản lý danh sách phòng chiếu</h3>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <label htmlFor="entries" className="mr-2 text-gray-400">
            Hiển thị
          </label>
          <select
            id="entries"
            className="rounded-md bg-[#2d2d2d] p-2 text-white"
            value={seatsPerPage}
            onChange={handleSeatsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span className="mx-2 text-gray-400">mục</span>
          {selectedSeats.length > 0 && (
            <div className="mx-2 flex items-center">
              <p className="mr-4 text-lg font-semibold">
                {"'"} Đã chọn {selectedSeats.length} mục {"'"}
              </p>
              <button
                className="rounded-md bg-blue-500 p-2 hover:bg-blue-600"
                onClick={handleDeleteSelectedSeats}
              >
                <FaTrash />
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center">
          <button
            onClick={() => setIsOpen(true)}
            className="mr-4 flex items-center rounded-md bg-[#33e24a] px-4 py-2 text-white hover:bg-green-400 focus:outline-none"
          >
            <MdDashboard className="h-5 w-5" /> {/* Biểu tượng quản lý */}
          </button>
          <h2>Tìm kiếm:</h2>
          <AiOutlineSearch className="relative left-[12.5rem] size-5" />
          <Input
            type="text"
            placeholder="Search..."
            className="rounded-md bg-[#2d2d2d] p-2 text-white"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="rounded-lg shadow-lg">
        <table className="w-full border-separate border-spacing-y-2 border-[#111111]">
          <thead className="bg-[#2d2d2d]">
            <tr>
              <th className="px-4 py-3 text-left text-white">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedSeats(
                      e.target.checked ? seats.map((seat) => seat._id) : [],
                    )
                  }
                  checked={
                    seats?.length > 0 && selectedSeats.length === seats.length
                  }
                  className="ml-4 cursor-pointer appearance-none rounded bg-[#111111] checked:bg-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-white">Số ghế</th>
              <th className="px-4 py-3 text-left text-white">Loại ghế</th>
              <th className="px-4 py-3 text-left text-white">Trạng thái</th>
              <th className="px-4 py-3 text-left text-white">Giá</th>
              <th className="px-4 py-3 text-center text-white">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-black text-gray-400">
            {paginatedSeats?.map((seat) => (
              <tr key={seat._id}>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedSeats.includes(seat._id)}
                    onChange={() => handleSeatSelect(seat._id)}
                    className="ml-4 cursor-pointer appearance-none rounded bg-[#111111] checked:bg-blue-500"
                  />
                </td>
                <td className="px-4 py-2">
                  {seat.row}
                  {seat.seat_number}
                </td>
                <td className="px-4 py-2">{seat.seat_type}</td>
                <td className="px-4 py-2">{seat.status}</td>
                <td className="px-4 py-2">{formatCurrency(seat.base_price)}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="mr-1 rounded-sm bg-[#1fff01] p-2 text-white"
                    onClick={() => handleEditSeat(seat._id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="rounded-sm bg-[#ff2727] p-2 text-white"
                    onClick={() => handleDeleteSeat(seat._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <SeatDisplay seatsData={seats} />
      {isModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-[#2d2d2d] p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Thêm Ghế</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddSeats(newSeat);
              }}
            >
              {/* Hàng ghế */}
              <label htmlFor="row">Hàng Ghế:</label>
              <input
                type="text"
                name="row"
                value={newSeat.row}
                onChange={handleChange}
                placeholder="Nhập hàng ghế"
                className="mb-4 mt-2 w-full rounded-md bg-[#2d2d2d] text-white"
                required
              />

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
                {/* Thêm các loại ghế khác nếu cần */}
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
                  onClick={() => setIsModalVisible(false)}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="rounded-lg bg-transparent p-6 shadow-lg">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <button
                onClick={() => setIsOpenSeatAdd(true)}
                className="block rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Thêm một ghế
              </button>
              <button
                onClick={() => setIsModalVisible(true)}
                className="block rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Thêm nhiều ghế
              </button>
              <button
                onClick={() => console.log("Cập nhật ghế")}
                className="block rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Cập nhật ghế
              </button>
              <button
                onClick={() => console.log("Cập nhật giá")}
                className="block rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Cập nhật giá
              </button>
            </div>
          </div>
        </div>
      )}

      {isOpenSeatAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-[#2d2d2d] p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Thêm Ghế</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddSingleSeat(newSeat);
              }}
            >
              {/* Hàng ghế */}
              <label htmlFor="row">Hàng Ghế:</label>
              <input
                type="text"
                name="row"
                value={newSeat.row}
                onChange={handleChange}
                placeholder="Nhập hàng ghế (ví dụ: A, B, C)"
                className="mb-4 mt-2 w-full rounded-md bg-[#2d2d2d] text-white"
                required
              />

              {/* Số ghế */}
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
                  onClick={() => setIsOpenSeatAdd(false)}
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Seat_Management;
