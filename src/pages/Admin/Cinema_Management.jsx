import { useState } from "react";
import { Button, Input } from "react-daisyui";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import Pagination from "../../components/Admin/Pagination";
import Toastify from "../../helper/Toastify";
import LoadingLocal from "../Loading/LoadingLocal";
import LoadingPage from "../Loading/LoadingSpinner";
import {
  useGetAllCinemasQuery,
  useAddCinemaMutation,
  useUpdateCinemaMutation,
  useDeleteCinemaMutation,
} from "../../services/Cinema/cinema.service";
import { useGetAllRegionsQuery } from "../../services/Regions/regions.service";

const Cinema_Management = () => {
  const {
    data: cinemas,
    isLoading: cinemaDataLoading,
    refetch,
  } = useGetAllCinemasQuery(); // Updated query hook
  const { data: regions, isLoading: regionsLoading } = useGetAllRegionsQuery();
  const [loading, setLoading] = useState(false);
  const [selectedCinema, setSelectedcinema] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [cinemasPerPage, setcinemasPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [addCinema] = useAddCinemaMutation();
  const [updateCinema] = useUpdateCinemaMutation();
  const [deleteCinema] = useDeleteCinemaMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCinemas, setSelectedcinemas] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    region_id: "",
  });
  console.log(formData);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const regionOptions =
    regions?.data.map((region) => ({
      value: region._id,
      label: region.name,
    })) || [];

  const filteredcinemas = cinemas?.data.filter((cinema) =>
    cinema?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil((filteredcinemas?.length || 0) / cinemasPerPage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      if (!formData.name || !formData.address || !formData.region_id) {
        Toastify("Vui lòng điền đầy đủ thông tin rạp!", 400);
        setLoading(false);
        return;
      }

      // Tạo FormData để gửi dữ liệu bao gồm file ảnh
      const data = new FormData();
      data.append("name", formData.name);
      data.append("address", formData.address);
      data.append("region_id", formData.region_id);
      if (formData.image) {
        data.append("image", formData.image); // Chỉ thêm nếu ảnh được chọn
      }

      if (selectedCinema) {
        // Update cinema
        await updateCinema({
          id: selectedCinema?._id,
          updatedData: data,
        }).unwrap();
        Toastify("Rạp đã được cập nhật!", 200);
      } else {
        // Add new cinema
        await addCinema(data).unwrap();
        Toastify("Rạp mới đã được thêm!", 200);
      }

      refetch();
      handleCloseModal();
    } catch (error) {
      console.error("Có lỗi khi thực hiện thao tác:", error);
      Toastify(error?.data?.message || "Có lỗi xảy ra! Vui lòng thử lại.", 400);
    } finally {
      setLoading(false);
    }
  };

  const handleEditcinema = (id) => {
    const cinemaToEdit = cinemas?.data.find((cinema) => cinema._id === id);
    setSelectedcinema(cinemaToEdit);
    setFormData({
      name: cinemaToEdit.name,
      address: cinemaToEdit.address,
      region_id: cinemaToEdit.region_id,
    });
    setIsModalVisible(true);
  };

  const handleDeletecinema = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa rạp này?")) {
      try {
        setLoading(true);
        await deleteCinema(id).unwrap();
        refetch();
        Toastify("rạp đã được xóa:", 200);
      } catch (error) {
        console.error("Có lỗi khi xóa rạp:", error);
        Toastify("Có lỗi xảy ra! Vui lòng thử lại.", 400);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteSelectedcinemas = async () => {
    if (selectedCinemas.length === 0) {
      Toastify("Vui lòng chọn ít nhất một rạp để xóa!", 400);
      return;
    }

    if (window.confirm("Bạn có chắc chắn muốn xóa những rạp đã chọn?")) {
      try {
        setLoading(true);
        await Promise.all(
          selectedCinemas.map((id) => deleteCinema(id).unwrap()),
        );
        refetch();
        Toastify("Các rạp đã được xóa:", 200);
        setSelectedcinemas([]);
      } catch (error) {
        console.error("Có lỗi khi xóa rạp:", error);
        Toastify("Có lỗi xảy ra! Vui lòng thử lại.", 400);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedcinema(null);
    setFormData({ name: "", address: "", region_id: "" }); // Clear form data
  };

  const handleCinemasPerPageChange = (e) => {
    setcinemasPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCinemaSelect = (id) => {
    setSelectedcinemas((prev) =>
      prev.includes(id)
        ? prev.filter((cinemaId) => cinemaId !== id)
        : [...prev, id],
    );
  };

  const paginatedcinemas = filteredcinemas?.slice(
    (currentPage - 1) * cinemasPerPage,
    currentPage * cinemasPerPage,
  );

  if (cinemaDataLoading || regionsLoading) {
    return <LoadingLocal />;
  }
  if (loading) {
    return <LoadingPage loading={loading} />;
  }

  return (
    <div className="ml-64 mt-8 bg-[#111111] p-6 text-white">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-bold">Quản lý danh sách rạp</h3>
        <Button
          className="flex rounded-md bg-red-600 p-2 hover:bg-red-700 hover:brightness-125"
          onClick={() => setIsModalVisible(true)}
        >
          + Thêm rạp
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
            value={cinemasPerPage}
            onChange={handleCinemasPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span className="mx-2 text-gray-400">mục</span>
          {selectedCinemas?.length > 0 && (
            <div className="mx-2 flex items-center">
              <p className="mr-4 text-lg font-semibold">
                {`' `}Đã chọn {selectedCinemas.length} mục{` '`}
              </p>
              <Button
                className="rounded-md bg-blue-500 p-2 hover:bg-blue-600"
                onClick={handleDeleteSelectedcinemas}
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
              <th className="px-4 py-3 text-left text-white">
                <input
                  type="checkbox"
                  onChange={(e) =>
                    setSelectedcinemas(
                      e.target.checked
                        ? paginatedcinemas.map((cinema) => cinema._id)
                        : [],
                    )
                  }
                  checked={
                    paginatedcinemas?.length > 0 &&
                    selectedCinemas.length === paginatedcinemas.length
                  }
                  className="ml-4 cursor-pointer appearance-none rounded bg-[#111111] checked:bg-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-white">Ảnh rạp</th>
              <th className="px-4 py-3 text-left text-white">Tên rạp</th>
              <th className="px-4 py-3 text-left text-white">Địa chỉ</th>
              <th className="px-4 py-3 text-center text-white">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-black text-gray-400">
            {paginatedcinemas?.length > 0 ? (
              paginatedcinemas?.map((cinema) => (
                <tr key={cinema._id}>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedCinemas.includes(cinema?._id)}
                      onChange={() => handleCinemaSelect(cinema?._id)}
                      className="ml-4 cursor-pointer appearance-none rounded bg-[#111111] checked:bg-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2"><img className="w-32" src={cinema?.image} alt="" /></td>
                  <td className="px-4 py-2">{cinema?.name}</td>
                  <td className="px-4 py-2">{cinema?.address}</td>
                  <td className="px-4 py-2 text-center">
                    <Button
                      className="mr-1 rounded-sm bg-[#1fff01] p-2 text-white"
                      onClick={() => handleEditcinema(cinema?._id)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      className="mr-1 rounded-sm bg-[#ff2727] p-2 text-white"
                      onClick={() => handleDeletecinema(cinema?._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-4 py-2 text-center text-gray-500">
                  Hiện tại chưa có rạp nào!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* Add/Edit cinema Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 transition-opacity duration-300 ease-in-out">
          <div className="w-full max-w-5xl transform rounded-xl bg-white p-10 text-black shadow-2xl transition-transform duration-300 ease-in-out">
            <div className="mb-8 flex items-center justify-between">
              <h3 className="text-3xl font-semibold text-gray-800">
                {selectedCinema ? "Chỉnh sửa rạp" : "Thêm rạp"}
              </h3>
              <button
                onClick={() => handleCloseModal()}
                className="text-2xl text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
            >
              <div className="relative">
                <label className="absolute -top-3 left-3 bg-white px-2 text-sm font-medium text-blue-800">
                  Tên rạp:
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="relative">
                <label className="absolute -top-3 left-3 bg-white px-2 text-sm font-medium text-yellow-800">
                  Ảnh rạp:
                </label>
                <input
                  type="file"
                  name="image"
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.files[0] })
                  }
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="relative">
                <label className="absolute -top-3 left-3 bg-white px-2 text-sm font-medium text-green-800">
                  Địa chỉ:
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div className="relative">
                <label className="absolute -top-3 left-3 bg-white px-2 text-sm font-medium text-purple-800">
                  Khu vực:
                </label>
                <select
                  name="region_id"
                  value={formData.region_id}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  <option value="">Chọn khu vực</option>
                  {regionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-8 flex justify-end space-x-4 md:col-span-2">
                <button
                  type="button"
                  onClick={() => handleCloseModal()}
                  className="rounded-md bg-gray-300 px-6 py-2 text-gray-700 transition duration-300 ease-in-out hover:bg-gray-400"
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-blue-500 px-6 py-2 text-white transition duration-300 ease-in-out hover:bg-blue-600"
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cinema_Management;
