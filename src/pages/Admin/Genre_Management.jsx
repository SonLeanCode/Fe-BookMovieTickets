import { useState } from "react";
import { Button, Input } from "react-daisyui";
import {
  useGetAllGenresQuery,
  useAddGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
} from "../../services/Genre/genre.service";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import Pagination from "../../components/Admin/Pagination";
import Toastify from "../../helper/Toastify";
import LoadingLocal from "../Loading/LoadingLocal";
import LoadingPage from "../Loading/LoadingSpinner";

const Genre_Management = () => {
  const {
    data: genres,
    isLoading: genreDataLoading,
    refetch,
  } = useGetAllGenresQuery();
  const [loading, setLoading] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [genresPerPage, setGenresPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [addGenre] = useAddGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const filteredGenres = genres?.data.filter((genre) =>
    genre.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil((filteredGenres?.length || 0) / genresPerPage);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      if (formData.id) {
        await updateGenre({ id: formData.id, updatedData: formData }).unwrap();
        Toastify("Thể loại đã được cập nhật:", 200);
      } else {
        await addGenre(formData).unwrap();
        Toastify("Thể loại mới đã được thêm:", 200);
      }
      refetch();
      handleCloseModal();
    } catch (error) {
      console.error("Có lỗi khi thực hiện thao tác:", error);
      Toastify("Có lỗi xảy ra! Vui lòng thử lại.", 400);
    } finally {
      setLoading(false);
    }
  };

  const handleEditGenre = (id) => {
    const genreToEdit = genres?.data.find((genre) => genre._id === id);
    setSelectedGenre(genreToEdit);
    setIsModalVisible(true);
  };

  const handleDeleteGenre = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa thể loại này?")) {
      try {
        setLoading(true);
        await deleteGenre(id).unwrap();
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

  const handleDeleteSelectedGenres = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa những thể loại đã chọn?")) {
      try {
        setLoading(true);
        await Promise.all(selectedGenres.map((id) => deleteGenre(id).unwrap()));
        refetch();
        Toastify("Các thể loại đã được xóa:", 200);
        setSelectedGenres([]);
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
    setSelectedGenre(null);
  };

  const handleGenresPerPageChange = (e) => {
    setGenresPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleGenreSelect = (id) => {
    setSelectedGenres((prev) =>
      prev.includes(id)
        ? prev.filter((genreId) => genreId !== id)
        : [...prev, id],
    );
  };

  const paginatedGenres = filteredGenres?.slice(
    (currentPage - 1) * genresPerPage,
    currentPage * genresPerPage,
  );

  if (genreDataLoading) {
    return <LoadingLocal />;
  }
  if (loading) {
    return <LoadingPage loading={loading} />;
  }

  return (
    <div className="ml-64 mt-8 bg-[#111111] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-bold">Quản lý danh sách thể loại</h3>
        <Button
          className="flex rounded-md bg-red-600 p-2 hover:bg-red-700 hover:brightness-125"
          onClick={() => setIsModalVisible(true)}
        >
          + Thêm thể loại
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
            value={genresPerPage}
            onChange={handleGenresPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span className="mx-2 text-gray-400">mục</span>
          {selectedGenres.length > 0 && (
            <div className="mx-2 flex items-center">
              <p className="mr-4 text-lg font-semibold">
                {`' `}Đã chọn {selectedGenres.length} mục{` '`}
              </p>
              <Button
                className="rounded-md bg-blue-500 p-2 hover:bg-blue-600"
                onClick={handleDeleteSelectedGenres}
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
              <th className="px-4 py-3 text-white text-left">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedGenres(
                      e.target.checked
                        ? paginatedGenres.map((movie) => movie._id)
                        : [],
                    )
                  }
                  checked={
                    paginatedGenres?.length > 0 &&
                    selectedGenres.length === paginatedGenres.length
                  }
                  className="ml-4 cursor-pointer appearance-none rounded bg-[#111111] checked:bg-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-white">Thể loại</th>
              <th className="px-4 py-3 text-center text-white">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-black text-gray-400">
            {paginatedGenres?.map((genre) => (
              <tr key={genre._id}>
                <td className="px-4 py-2 ">
                  <input
                    type="checkbox"
                    checked={selectedGenres.includes(genre._id)}
                    onChange={() => handleGenreSelect(genre._id)}
                    className="ml-4 cursor-pointer appearance-none rounded bg-[#111111] checked:bg-blue-500"
                  />
                </td>
                <td className="px-4 py-2">{genre.name}</td>
                <td className="px-4 py-2 text-center">
                  <Button
                    className="mr-1 rounded-sm bg-[#1fff01] p-2 text-white"
                    onClick={() => handleEditGenre(genre._id)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    className="rounded-sm bg-[#ff2727] p-2 text-white"
                    onClick={() => handleDeleteGenre(genre._id)}
                  >
                    <FaTrash />
                  </Button>
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

      {/* Custom Modal for Add/Edit Genre */}
      {isModalVisible && (
        <div onClick={handleCloseModal} className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-[#2d2d2d] p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">
              {selectedGenre ? "Chỉnh sửa thể loại" : "Thêm thể loại"}
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit({
                  name: e.target.name.value,
                  id: selectedGenre?._id || null,
                });
              }}
            >
              <Input
                type="text"
                name="name"
                defaultValue={selectedGenre?.name || ""}
                placeholder="Tên thể loại"
                className="mb-4 rounded-md bg-[#2d2d2d] text-white"
                required
              />
              <div className="flex justify-between">
                <Button type="submit" className="mr-2 rounded-md bg-[#0728dd] p-2">
                  {selectedGenre ? "Cập nhật" : "Thêm"}
                </Button>
                <Button
                  type="button"
                  className="rounded-md bg-red-600 p-2"
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

export default Genre_Management;
