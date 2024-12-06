import { useParams } from "react-router-dom";
import { useState } from "react";
// import AddMultipleSeatsModal from "../../components/Seat/AddMultipleSeatsModal";
import SeatDisplay from "../../components/Seat/SeatDisplay";
import {
  useGetSeatsByRoomIdQuery,
  useRemoveSeatFromRoomLayoutMutation,
  useAddSeatToRoomLayoutMutation,
  useAddMultipleSeatsToRoomLayoutMutation,
} from "../../services/Room/roomlayout.service";
import LoadingLocal from "../Loading/LoadingLocal";
import Toastify from "../../helper/Toastify";
import { MdDashboard } from "react-icons/md";
import SEATTYPE from "../../constants/seatTypeConstants";

const RoomLayout = () => {
  const { roomId } = useParams();
  const {
    data: seats,
    isLoading: seatsLoading,
    refetch: refetchSeats,
  } = useGetSeatsByRoomIdQuery(roomId);
  const [deleteSeat] = useRemoveSeatFromRoomLayoutMutation();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenSeatAdd, setIsOpenSeatAdd] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addSeatToRoomLayout] = useAddSeatToRoomLayoutMutation();
  const [addMultipleSeatsToRoomLayout] =
    useAddMultipleSeatsToRoomLayoutMutation();
  const [newSeat, setNewSeat] = useState({
    row: "",
    seat_number: "",
    seat_type: SEATTYPE.STANDARD, // Mặc định là ghế tiêu chuẩn
  });
  const [newSeats, setNewSeats] = useState([
    { row: "", seat_number: "", seat_type: SEATTYPE.STANDARD },
  ]);

  console.log(newSeat)

  const handleAddSingleSeat = async (e) => {
    e.preventDefault();
    try {
      const { seat_type, row, seat_number } = newSeat;
      console.log(roomId);
      await addSeatToRoomLayout({
        roomId,
        row,
        seat_number,
        seat_type, // Đổi key từ seatType thành seat_type
      });
      Toastify("Thêm ghế thành công", 200);
      setNewSeat({
        row: "",
        seat_number: "",
        seat_type: SEATTYPE.STANDARD, // Mặc định là ghế tiêu chuẩn
      })
      refetchSeats();
      setIsOpenSeatAdd(false); // Đóng modal thêm ghế
    } catch (error) {
      console.error("Lỗi khi thêm ghế:", error);
      Toastify("Thêm ghế thất bại", 400, "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewSeat((prevSeat) => ({
      ...prevSeat,
      [name]: value,
    }));
  };

  const handleAddMultipleSeats = async (e) => {
    e.preventDefault();
    try {
      const { row, seat_number, seat_type } = newSeats[0];
  
      if (isNaN(seat_number) || seat_number <= 0) {
        Toastify("Số ghế phải là số dương", 400, "error");
        return;
      }
  
      // Tạo mảng ghế từ 1 đến seatCount
      const seatsToAdd = Array.from({ length: seat_number }, (_, index) => ({
        row,
        seat_number: (index + 1).toString(), // Ghế từ 1 đến seatCount
        seat_type,
      }));
  
      // Gọi API thêm ghế
      await addMultipleSeatsToRoomLayout({
        roomId,
        seats: seatsToAdd,
      });
      setNewSeats([ { row: "", seat_number: "", seat_type: SEATTYPE.STANDARD }])
      Toastify("Thêm nhiều ghế thành công", 200);
      refetchSeats();
      setIsModalVisible(false); // Đóng modal thêm ghế
    } catch (error) {
      console.error("Lỗi khi thêm nhiều ghế:", error);
      Toastify("Thêm nhiều ghế thất bại", 400, "error");
    }
  };
  

  const handleMultipleSeatsChange = (e) => {
    const { name, value } = e.target;
    setNewSeats((prevSeats) => {
      const updatedSeats = [...prevSeats];
      updatedSeats[0][name] = value; // Cập nhật trường trong seat đầu tiên
      return updatedSeats;
    });
  };

  const handleDeleteSeat = async (seatId) => {
    console.log(seatId, roomId)
    const isConfirmed = window.confirm(
      "Bạn có chắc chắn muốn xóa ghế này không?",
    );
    if (!isConfirmed) return;
    try {
      await deleteSeat({roomId, seatId});
      Toastify("Xóa ghế thành công", 200);
      refetchSeats();
    } catch (error) {
      console.error("Lỗi khi xóa ghế:", error);
      Toastify("Xóa ghế thất bại", 400, "error");
    }
  };

  if (seatsLoading) {
    return <LoadingLocal />;
  }
  return (
    <div className="ml-64 mt-8 bg-[#111111] p-6 text-white">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-bold">Bố cục phòng chiếu</h3>
        <button
          onClick={() => setIsOpen(true)}
          className="mr-4 flex items-center rounded-md bg-[#33e24a] px-4 py-2 text-white hover:bg-green-400 focus:outline-none"
        >
          <MdDashboard className="h-5 w-5" /> {/* Biểu tượng quản lý */}
        </button>
      </div>

      <SeatDisplay
        seatsData={seats}
        refetchSeats={refetchSeats}
        handleDeleteSeat={handleDeleteSeat}
      />

      {/* {isModalVisible && (
        <AddMultipleSeatsModal
          roomId={roomId}
          onAddSeat={addSeatsInRow}
          refetchSeats={refetchSeats}
          setIsOpen={setIsModalVisible}
        />
      )} */}

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
              {/* <button
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
              </button> */}
            </div>
          </div>
        </div>
      )}
      {isOpenSeatAdd && (
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

              <label htmlFor="seat_type">Loại Ghế:</label>
              <select
                name="seat_type"
                value={newSeat.seat_type}
                onChange={handleChange}
                className="mb-4 mt-2 w-full rounded-md bg-[#2d2d2d] text-white"
                required
              >
                <option value={SEATTYPE.STANDARD}>Ghế Thường</option>
                <option value={SEATTYPE.VIP}>Ghế VIP</option>
                <option value={SEATTYPE.SWEETBOX}>Ghế Đôi</option>
              </select>

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
      )}

      {isModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-[#2d2d2d] p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Thêm Nhiều Ghế</h2>
            <form onSubmit={handleAddMultipleSeats}>
              <label htmlFor="row">Hàng Ghế:</label>
              <input
                type="text"
                name="row"
                value={newSeats[0]?.row || ""}
                onChange={(e) => handleMultipleSeatsChange(e, "row")}
                placeholder="Nhập hàng ghế (ví dụ: A)"
                className="mb-4 mt-2 w-full rounded-md bg-[#2d2d2d] text-white"
                required
              />

              <label htmlFor="seat_number">
                Số Ghế:
              </label>
              <input
                type="number"
                name="seat_number"
                value={newSeats[0]?.seat_number || ""}
                onChange={(e) => handleMultipleSeatsChange(e, "seat_number")}
                placeholder="Nhập số ghế (ví dụ: 1, 2, 3)"
                className="mb-4 mt-2 w-full rounded-md bg-[#2d2d2d] text-white"
                required
              />

              <label htmlFor="seat_type">Loại Ghế:</label>
              <select
                name="seat_type"
                value={newSeats[0]?.seat_type || ""}
                onChange={(e) => handleMultipleSeatsChange(e, "seat_type")}
                className="mb-4 mt-2 w-full rounded-md bg-[#2d2d2d] text-white"
                required
              >
                <option value={SEATTYPE.STANDARD}>Ghế Thường</option>
                <option value={SEATTYPE.VIP}>Ghế VIP</option>
                <option value={SEATTYPE.SWEETBOX}>Ghế Đôi</option>
              </select>

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
    </div>
  );
};

export default RoomLayout;
