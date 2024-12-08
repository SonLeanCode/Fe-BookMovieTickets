import { useState } from "react";
import { useParams } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { MdDashboard } from "react-icons/md";
import {
  useGetSeatsByRoomQuery,
  useAddSeatMutation,
  useAddSeatsInRowMutation,
  useDeleteSeatMutation,
} from "../../services/Seat/seat.serviecs";
import Pagination from "../../components/Admin/Pagination";
import Toastify from "../../helper/Toastify";
import SeatDisplay from "../../components/Seat/SeatDisplay";
import { Input } from "react-daisyui";
import { formatCurrency } from "../../utils/formatCurrency";
import AddSeatModal from "../../components/Seat/AddSeatModal";
import AddMultipleSeatsModal from "../../components/Seat/AddMultipleSeatsModal";
import LoadingLocal from "../Loading/LoadingLocal";
import { getPriceByDayType } from "../../utils/getPriceByDayType";
import UpdateSeatPricesModal from "../../components/Seat/UpdateSeatPricesModal";
import UpdateAllSeatPricesModal from "../../components/Seat/UpdateAllSeatPricesModal";

const Seat_Management = () => {
  const { roomId } = useParams();
  const {
    data: seats,
    isLoading: seatsLoading,
    refetch: refetchSeats,
  } = useGetSeatsByRoomQuery(roomId);
  const [addSeat] = useAddSeatMutation();
  const [addSeatsInRow] = useAddSeatsInRowMutation();
  const [isLoading, setIsLoading] = useState(false);
  const [seatsPerPage, setSeatsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteSeat] = useDeleteSeatMutation();

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isOpenSeatAdd, setIsOpenSeatAdd] = useState(false);
  const [isOpenPricesModal, setIsOpenPricesModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenAllSeatModal, setIsOpenAllSeatModal] = useState(false);
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

  const handleDeleteSeat = async (seatId) => {
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa ghế này không?",
    );
    if (!isConfirmed) return;
    setIsLoading(true);
    try {
      await deleteSeat(seatId);
      Toastify("Xóa ghế thành công", 200);
      refetchSeats();
      setIsLoading(false);
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
    setIsLoading(true);
    try {
      for (const seatId of selectedSeats) {
        await deleteSeat(seatId);
      }
      setSelectedSeats([]);
      Toastify("Xóa các ghế thành công", 200);
      refetchSeats();
      setIsLoading(false);
    } catch (error) {
      console.error("Lỗi khi xóa các ghế:", error);
      Toastify("Xóa các ghế thất bại", 400, "error");
    }
  };

  const paginatedSeats = filteredSeats?.slice(
    (currentPage - 1) * seatsPerPage,
    currentPage * seatsPerPage,
  );

  if (seatsLoading || isLoading) {
    return <LoadingLocal />;
  }

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
              <th className="px-4 py-3 text-left text-white">Giá Gốc</th>
              <th className="px-4 py-3 text-left text-white">Giá Cuối Tuần</th>
              <th className="px-4 py-3 text-left text-white">Giá Ngày Lễ</th>
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
                <td className="px-4 py-2">
                  {getPriceByDayType(seat.price_variations, "weekend")}
                </td>
                <td className="px-4 py-2">
                  {getPriceByDayType(seat.price_variations, "holiday")}
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="mr-1 rounded-sm bg-[#1fff01] p-2 text-white"
                    // onClick={() => handleEditSeat(seat._id)}
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

      <SeatDisplay seatsData={seats} refetchSeats={refetchSeats} handleDeleteSeat={handleDeleteSeat}/>

      {isModalVisible && (
        <AddMultipleSeatsModal
          roomId={roomId}
          onAddSeat={addSeatsInRow}
          refetchSeats={refetchSeats}
          setIsOpen={setIsModalVisible}
        />
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
                Thêm ghế
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
                onClick={() => setIsOpenPricesModal(true)}
                className="block rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Cập nhật giá
              </button>
              <button
                onClick={() => setIsOpenAllSeatModal(true)}
                className="block rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Giá tất cả phòng
              </button>
            </div>
          </div>
        </div>
      )}

      {isOpenSeatAdd && (
        <AddSeatModal
          roomId={roomId}
          onAddSeat={addSeat}
          refetchSeats={refetchSeats}
          setIsOpen={setIsOpenSeatAdd}
        />
      )}

      {isOpenPricesModal && (
        <UpdateSeatPricesModal
          isOpen={setIsOpenPricesModal}
          onClose={() => setIsOpenPricesModal(false)}
          roomId={roomId}
          refetchSeats={refetchSeats}
        />
      )}
      {isOpenAllSeatModal && (
        <UpdateAllSeatPricesModal
          isOpen={setIsOpenAllSeatModal}
          onClose={() => setIsOpenAllSeatModal(false)}
          refetchSeats={refetchSeats}
        />
      )}
    </div>
  );
};

export default Seat_Management;
