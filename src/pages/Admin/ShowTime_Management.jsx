import { useState } from "react";
import { Button, Input } from "react-daisyui";
import { 
    useGetAllShowtimesQuery,
    useCreateShowtimeMutation,
    useUpdateShowtimeMutation,
    useDeleteShowtimeMutation, } from "../../services/Showtimes/showtimes.serviecs";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import Pagination from "../../components/Admin/Pagination";
import Toastify from "../../helper/Toastify";
import LoadingLocal from "../Loading/LoadingLocal";
import LoadingPage from "../Loading/LoadingSpinner";
import ShowtimeForm from "../../components/Admin/Showtimes/ShowtimeForm";
import { formatTime } from "../../utils/formatTime";
import { formatShowtime } from "../../utils/formatShowtime";
import { formatShowDate } from "../../utils/formatShowDate";

const ShowTime_Management = () => {
  const {
    data: showtimeData,
    isLoading: showtimeDataLoading,
    refetch,
  } = useGetAllShowtimesQuery();
  // Khai báo các state
  const [loading, setLoading] = useState(false);
  const [selectedShowtimes, setSelectedShowtimes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showtimesPerPage, setShowtimesPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedShowtime, setSelectedShowtime] = useState(null);

  // Khai báo mutations
  const [addShowtime] = useCreateShowtimeMutation();
  const [updateShowtime] = useUpdateShowtimeMutation();
  const [deleteShowtime] = useDeleteShowtimeMutation();

  // Lọc theo từ khóa tìm kiếm
//   const filteredMovies = showtimeData?.data?.filter((showtime) =>
//     showtime.name.toLowerCase().includes(searchTerm.toLowerCase()),
//   );

  const totalPages = Math.ceil((showtimeData?.data.length || 0) / showtimesPerPage);

  const handleOpenModal = (movie) => {
    setSelectedShowtime(movie);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedShowtime(null);
  };

  const handleSubmit = async (formData, isEdit) => {
    try {
      setLoading(true); // Bắt đầu trạng thái loading
  
      if (isEdit) {
        // Cập nhật suất chiếu đã có
        await updateShowtime({
          id: formData.id, // Đảm bảo lấy đúng ID
          updatedData: {
            movie_id: formData.movie,
            room_id: formData.room,
            start_time: formData.start_time,
            end_time: formData.end_time,
          },
        }).unwrap();
  
        // Làm mới dữ liệu và thông báo thành công
        Toastify("Suất chiếu đã được cập nhật thành công.", 200);
      } else {
        // Thêm suất chiếu mới
        await addShowtime({
          movie_id: formData.movie,
          room_id: formData.room,
          start_time: formData.start_time,
          end_time: formData.end_time,
        }).unwrap();
  
        // Làm mới dữ liệu và thông báo thành công
        Toastify("Suất chiếu mới đã được thêm thành công.", 200);
      }
      refetch()
      // Đóng modal sau khi thao tác thành công
      handleCloseModal();
    } catch (error) {
      console.error("Có lỗi xảy ra trong quá trình thao tác:", error);
      Toastify("Có lỗi xảy ra! Vui lòng thử lại.", 400);
    } finally {
      setLoading(false); // Kết thúc trạng thái loading
    }
  };

  const handleEditMovie = (id) => {
    const movieToEdit = showtimeData?.data.find((movie) => movie._id === id);
    handleOpenModal(movieToEdit);
  };

  const handleDeleteMovie = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phim này?")) {
      try {
        setLoading(true);
        await deleteShowtime(id).unwrap();
        refetch();
        Toastify("Phim đã được xóa:", 200);
      } catch (error) {
        console.error("Có lỗi khi xóa phim:", error);
        Toastify("Có lỗi xảy ra! Vui lòng thử lại.", 400);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSelectMovie = (id) => {
    setSelectedShowtimes((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((movieId) => movieId !== id)
        : [...prevSelected, id],
    );
  };

  const handleDeleteSelectedMovies = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa các phim đã chọn?")) {
      try {
        await Promise.all(selectedShowtimes.map((id) => deleteShowtime(id).unwrap()));
        refetch();
        Toastify("Đã xóa các phim:", 200);
        setSelectedShowtimes([]);
      } catch (error) {
        Toastify("Có lỗi khi xóa các phim:", 400);
      }
    }
  };

  const handleMoviesPerPageChange = (e) => {
    setShowtimesPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const paginatedShowtimes = showtimeData?.data?.slice(
    (currentPage - 1) * showtimesPerPage,
    currentPage * showtimesPerPage,
  );
  if (showtimeDataLoading ) {
    return <LoadingLocal />;
  }
  if (loading) {
    return <LoadingPage loading={loading} />;
  }

  return (
    <div className="ml-64 mt-8 bg-[#111111] p-6 text-white">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">
          Quản lý suất chiếu phim
        </h3>
        <Button
          className="flex rounded-md bg-red-600 p-2 text-white hover:bg-red-700 hover:brightness-125"
          onClick={() => handleOpenModal()}
        >
          + Tạo suất chiếu
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
            value={showtimesPerPage}
            onChange={handleMoviesPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span className="mx-2 text-gray-400">mục</span>
          {selectedShowtimes?.length > 0 && (
            <div className="mx-2 flex items-center">
              <p className="mr-4 text-lg font-semibold">
                {`' `}Đã chọn {selectedShowtimes?.length} mục{` '`}
              </p>
              <Button
                className="rounded-md bg-blue-500 p-2 hover:bg-blue-600"
                onClick={handleDeleteSelectedMovies}
              >
                <FaTrash />
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center">
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
                    setSelectedShowtimes(
                      e.target.checked
                        ? paginatedShowtimes.map((movie) => movie._id)
                        : [],
                    )
                  }
                  checked={
                    paginatedShowtimes?.length > 0 &&
                    selectedShowtimes?.length === paginatedShowtimes?.length
                  }
                  className="ml-4 cursor-pointer appearance-none rounded bg-[#111111] checked:bg-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-white">Phim</th>
              <th className="px-4 py-3 text-left text-white">Phòng</th>
              <th className="px-4 py-3 text-left text-white">Địa chỉ</th>
              <th className="px-4 py-3 text-left text-white">Suất chiếu</th>
              <th className="px-4 py-3 text-left text-white">Ngày chiếu</th>
              <th className="px-4 py-3 text-left text-white">Trạng thái</th>
              <th className="px-4 py-3 text-center text-white">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-black text-gray-400">
          {paginatedShowtimes ? (
            paginatedShowtimes?.map((showtime) => (
              <tr key={showtime._id}>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    onChange={() => handleSelectMovie(showtime?._id)}
                    checked={selectedShowtimes.includes(showtime?._id)}
                    className="ml-4 cursor-pointer appearance-none rounded bg-[#111111] checked:bg-blue-500"
                  />
                </td>
                <td className="px-2 py-2">
                  <div className="flex">
                    <img
                      src={showtime?.movie_id?.img}
                      alt={showtime?.movie_id?.name}
                      className="w-[70px]"
                    />
                    <div className="ml-2">
                      <h2 className="text-md font-medium text-white">
                        {showtime?.movie_id?.name}
                      </h2>
                      <p className="mt-1 text-xs">{showtime?.movie_id?.duration} phút</p>
                      <p className="mt-8 text-sm">
                        ({showtime?.movie_id?.country} - {showtime?.movie_id?.subtitles})
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-2 py-2 text-center">
                    {showtime?.room_id?.name}
                </td>
                <td className="w-[20%] px-4 py-2">
                {showtime?.room_id?.cinema_id?.address}
                </td>
                <td className="px-6 w-[15%] py-2">{formatShowtime(showtime?.start_time, showtime?.end_time)}</td>
                <td className="px-4 py-2 text-center">
                    {formatShowDate(showtime?.start_time, showtime?.end_time)}
                </td>
                <td className="px-4 py-2 text-center">
                    {formatTime(showtime?.start_time, showtime?.end_time)}
                </td>
                <td className="px-4 py-2 text-center">
                  <Button
                    className="mr-1 rounded-sm bg-[#1fff01] p-2 text-white"
                    onClick={() => handleEditMovie(showtime?._id)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    className="rounded-sm bg-[#ff2727] p-2 text-white"
                    onClick={() => handleDeleteMovie(showtime?._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))):(
              <tr>
              <td colSpan="6" className="text-center p-4">
                Hiện tại chưa có suất chiếu nào.
              </td>
            </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
      <ShowtimeForm
        showtimeData={selectedShowtime}
        onSubmit={handleSubmit}
        onCancel={handleCloseModal}
        isVisible={isModalVisible}
      />
    </div>
  );
};

export default ShowTime_Management;
