import { useState } from "react";
import { Button, Input } from "react-daisyui";
import {
  useGetAllRoomsQuery,
  useAddRoomMutation,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} from "../../services/Room/room.service";
import { useGetAllCinemasQuery } from "../../services/Cinema/cinema.service";
import {
  useAddRoomLayoutMutation,
  useGetAllRoomLayoutsQuery,
} from "../../services/Room/roomlayout.service";
import { useCreateSeatsForRoomMutation } from "../../services/Seat/seat.serviecs";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import Pagination from "../../components/Admin/Pagination";
import Toastify from "../../helper/Toastify";
import LoadingLocal from "../Loading/LoadingLocal";
import LoadingPage from "../Loading/LoadingSpinner";
import { Link } from "react-router-dom";
import ROOMTYPE from "../../constants/roomTypeConstants";

const Room_Managerment = () => {
  const {
    data: rooms,
    isLoading: roomDataLoading,
    refetch,
  } = useGetAllRoomsQuery();
  const {
    data: roomlayout,
    isLoading: roomlayoutLoading,
    refetch: roomlayoutRefetch,
  } = useGetAllRoomLayoutsQuery();
  const { data: cinemas, isLoading: cinemaDataLoading } =
    useGetAllCinemasQuery();
  const [loading, setLoading] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage, setRoomsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [addRoom] = useAddRoomMutation();
  const [addRoomLayout] = useAddRoomLayoutMutation();
  const [updateRoom] = useUpdateRoomMutation();
  const [deleteRoom] = useDeleteRoomMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomType, setRoomType] = useState("");
  const [nameLayout, setNameLauout] = useState("");
  const [addSeatForRoom] = useCreateSeatsForRoomMutation()

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const openModal = () => {
    toggleMenu();
    setIsModalOpen(true);
  };
  const handleAddRoomLayout = async (e) => {
    e.preventDefault();

    // Kiểm tra nếu có dữ liệu hợp lệ
    if (!nameLayout || !roomType) {
      alert("Vui lòng điền đầy đủ thông tin tên và loại phòng.");
      return; // Nếu dữ liệu không hợp lệ, dừng hành động và không gửi đi
    }

    // Nếu dữ liệu hợp lệ, tiến hành tạo đối tượng gửi đi
    const newRoomLayout = {
      name: nameLayout, // Tên layout phòng
      room_type: roomType, // Loại phòng
    };

    // Gửi dữ liệu đến API
    const res = await addRoomLayout(newRoomLayout);
    console.log(res);
    const mess = res?.error?.data.message || res?.data?.message;
    const sta = res?.error?.status || res?.data?.status;
    Toastify(mess, sta);
    roomlayoutRefetch();
    setIsModalOpen(false);
  };

  const filteredRooms = rooms?.data.filter((room) =>
    room.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil((filteredRooms?.length || 0) / roomsPerPage);

  const handleSubmit = async (formData) => {
    try {
      if (formData.id) {
        await updateRoom({ id: formData.id, updatedData: formData }).unwrap();
        Toastify("Phòng đã được cập nhật:", 200);
      } else {
        const res = await addRoom(formData).unwrap();
        addSeatForRoom(res?.data?._id).unwrap();
        console.log("true")
        Toastify("Phòng mới đã được thêm:", 200);
      }
      refetch();
      handleCloseModal();
    } catch (error) {
      console.error("Có lỗi khi thực hiện thao tác:", error);
      Toastify("Có lỗi xảy ra! Vui lòng thử lại.", 400);
    }
  };

  const handleEditRoom = (id) => {
    const RoomToEdit = rooms?.data.find((Room) => Room._id === id);
    setSelectedRoom(RoomToEdit);
    setIsModalVisible(true);
  };

  const handleDeleteRoom = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thể loại này?")) {
      try {
        setLoading(true);
        await deleteRoom(id).unwrap();
        refetch();
        Toastify("Thể loại đã được xóa:", 200);
      } catch (error) {
        console.error("Có lỗi khi xóa thể loại:", error);
        Toastify("Có lỗi xảy ra! Vui lòng thử lại.", 400);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteSelectedRooms = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa những thể loại đã chọn?")) {
      try {
        setLoading(true);
        await Promise.all(selectedRooms.map((id) => deleteRoom(id).unwrap()));
        refetch();
        Toastify("Các thể loại đã được xóa:", 200);
        setSelectedRooms([]);
      } catch (error) {
        console.error("Có lỗi khi xóa thể loại:", error);
        Toastify("Có lỗi xảy ra! Vui lòng thử lại.", 400);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedRoom(null);
  };

  const handleRoomsPerPageChange = (e) => {
    setRoomsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleRoomselect = (id) => {
    setSelectedRooms((prev) =>
      prev.includes(id)
        ? prev.filter((RoomId) => RoomId !== id)
        : [...prev, id],
    );
  };

  const paginatedRooms = filteredRooms?.slice(
    (currentPage - 1) * roomsPerPage,
    currentPage * roomsPerPage,
  );

  if (roomDataLoading || cinemaDataLoading || roomlayoutLoading) {
    return <LoadingLocal />;
  }
  if (loading) {
    return <LoadingPage loading={loading} />;
  }

  return (
    <div className="ml-64 mt-8 bg-[#111111] p-6 text-white">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-bold">Quản lý danh sách phòng chiếu</h3>
        <Button
          className="flex rounded-md bg-red-600 p-2 text-white hover:bg-red-700 hover:brightness-125"
          onClick={() => setIsModalVisible(true)}
        >
          + Thêm phòng
        </Button>
      </div>

      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center">
          <label htmlFor="entries" className="mr-2 text-gray-400">
            Hiển thị
          </label>
          <select
            id="entries"
            className="rounded-md bg-[#2d2d2d] p-2 text-white"
            value={roomsPerPage}
            onChange={handleRoomsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span className="mx-2 text-gray-400">mục</span>
          {selectedRooms.length > 0 && (
            <div className="mx-2 flex items-center">
              <p className="mr-4 text-lg font-semibold">
                {`' `}Đã chọn {selectedRooms.length} mục{` '`}
              </p>
              <Button
                className="rounded-md bg-blue-500 p-2 hover:bg-blue-600"
                onClick={handleDeleteSelectedRooms}
              >
                <FaTrash />
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center">
          <div className="relative mr-4">
            <button
              onClick={toggleMenu}
              className="rounded-lg bg-[#431d9c] px-6 py-2 text-white shadow-lg transition-all duration-300 hover:bg-[#431d9cc0] focus:outline-none"
            >
              Bố cục phòng
            </button>

            {isOpen && (
              <div className="absolute z-10 mt-2 w-48 rounded-lg bg-gray-700 shadow-lg">
                <ul>
                  <li
                    onClick={openModal}
                    className="hidden cursor-pointer px-4 py-2 hover:bg-gray-300 hover:font-semibold hover:text-blue-600"
                  >
                    Tạo mới
                  </li>
                  {roomlayout?.data?.map((roomtype) => (
                    <li
                      key={roomtype._id}
                      className="cursor-pointer px-4 py-2 hover:bg-gray-300 hover:font-semibold hover:text-blue-600"
                    >
                      <Link to={"/admin/roomlayout/" + roomtype._id}>
                        {roomtype.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <h2>Tìm kiếm:</h2>
          <AiOutlineSearch className="relative left-[12.5rem] size-5" />
          <Input
            type="text"
            placeholder="Search..."
            className="rounded-md bg-[#2d2d2d] p-1 text-white"
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
                    setSelectedRooms(
                      e.target.checked
                        ? paginatedRooms.map((room) => room._id)
                        : [],
                    )
                  }
                  checked={
                    paginatedRooms?.length > 0 &&
                    selectedRooms.length === paginatedRooms.length
                  }
                  className="ml-4 cursor-pointer appearance-none rounded bg-[#111111] checked:bg-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-white">Tên phòng</th>
              <th className="px-4 py-3 text-left text-white">Loại phòng</th>
              <th className="px-4 py-3 text-left text-white">Rạp chiếu</th>
              <th className="px-4 py-3 text-center text-white">Hành động</th>
              <th className="px-4 py-3 text-center text-white"></th>
            </tr>
          </thead>
          <tbody className="bg-black text-gray-400">
            {paginatedRooms?.map((room) => (
              <tr key={room?._id}>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedRooms.includes(room?._id)}
                    onChange={() => handleRoomselect(room?._id)}
                    className="ml-4 cursor-pointer appearance-none rounded bg-[#111111] checked:bg-blue-500"
                  />
                </td>
                <td className="px-4 py-2">{room?.name}</td>
                <td className="px-4 py-2">
                  {room?.room_type == ROOMTYPE.IMAX
                    ? "IMAX"
                    : room?.room_type == ROOMTYPE.VIP
                      ? "VIP"
                      : "STANDARD"}
                </td>
                <td className="px-4 py-2">{room?.cinema_id?.name}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="mr-1 rounded-sm bg-[#1fff01] p-2 text-white"
                    onClick={() => handleEditRoom(room?._id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="rounded-sm bg-[#ff2727] p-2 text-white"
                    onClick={() => handleDeleteRoom(room?._id)}
                  >
                    <FaTrash />
                  </button>
                </td>
                <td className="px-4 py-2">
                  <Link
                    to={`/admin/rooms/` + room?._id + `/seats`}
                    className="font-bold text-yellow-300"
                  >
                    Quản Lý Ghế
                  </Link>
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
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-96 rounded-md bg-white p-6">
            <div className="flex justify-between">
              <h2 className="mb-4 text-xl font-semibold text-black">
                Tạo bố cục mới
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="right-2 top-2 text-black"
              >
                X
              </button>
            </div>

            <form onSubmit={handleAddRoomLayout}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tên loại
                </label>
                <input
                  type="text"
                  id="name"
                  value={nameLayout}
                  onChange={(e) => setNameLauout(e.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="roomType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Loại phòng
                </label>
                <select
                  id="roomType"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value)}
                  className="mt-2 w-full rounded-md border border-gray-300 px-4 py-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-600"
                  required
                >
                  <option value="">Chọn loại phòng</option>
                  <option value={ROOMTYPE.STANDARD}>Standard</option>
                  <option value={ROOMTYPE.VIP}>VIP</option>
                  <option value={ROOMTYPE.IMAX}>IMAX</option>
                </select>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* Custom Modal for Add/Edit Room */}
      {isModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-[#2d2d2d] p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">
              {selectedRoom ? "Chỉnh sửa phòng" : "Thêm phòng"}
            </h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit({
                  name: e.target.name.value,
                  cinema_id: e.target.cinema_id.value,
                  room_type: e.target.room_type.value,
                  id: selectedRoom?._id || null,
                });
              }}
            >
              {/* Tên phòng */}
              <label htmlFor="name">Tên Phòng :</label>
              <br />
              <Input
                type="text"
                name="name"
                defaultValue={selectedRoom?.name || ""}
                placeholder="Tên phòng"
                className="mb-4 mt-2 w-full rounded-md bg-[#2d2d2d] text-white"
                required
              />

              {/* Rạp chiếu */}
              <br />
              <label htmlFor="cinema_id">Rạp chiếu :</label>
              <select
                name="cinema_id"
                className="mb-4 mt-2 w-full rounded-md bg-[#2d2d2d] text-white"
                required
              >
                <option value="">Chọn rạp chiếu</option>
                {cinemas?.data.map((cinema) => (
                  <option key={cinema._id} value={cinema._id}>
                    {cinema.name}
                  </option>
                ))}
              </select>

              {/* Loại phòng */}
              <label htmlFor="room_type">Loại phòng :</label>
              <select
                name="room_type"
                defaultValue={selectedRoom?.room_type || "Standard"}
                className="mb-4 mt-2 w-full rounded-md bg-[#2d2d2d] text-white"
                required
              >
                <option value={ROOMTYPE.STANDARD}>Standard</option>
                <option value={ROOMTYPE.VIP}>VIP</option>
                <option value={ROOMTYPE.IMAX}>IMAX</option>
              </select>

              <div className="flex justify-between">
                <Button
                  type="submit"
                  className="mr-2 rounded-md bg-[#0728dd] p-2 text-white"
                >
                  {selectedRoom ? "Cập nhật" : "Thêm"}
                </Button>
                <Button
                  type="button"
                  className="rounded-md bg-red-600 p-2 text-white"
                  onClick={handleCloseModal}
                >
                  Hủy
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Room_Managerment;
