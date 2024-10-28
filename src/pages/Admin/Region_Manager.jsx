import { useState } from "react";
import { Button, Input } from "react-daisyui";
import {
  useGetAllRegionsQuery,
  useAddRegionMutation,
  useUpdateRegionMutation,
  useDeleteRegionMutation,
} from "../../services/Regions/regions.service"; // Updated service import
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import Pagination from "../../components/Admin/Pagination";
import Toastify from "../../helper/Toastify";
import LoadingLocal from "../Loading/LoadingLocal";
import LoadingPage from "../Loading/LoadingSpinner";
import { Link } from "react-router-dom";

const Region_Management = () => {
  const {
    data: regions,
    isLoading: regionDataLoading,
    refetch,
  } = useGetAllRegionsQuery(); // Updated query hook
  const [loading, setLoading] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [regionsPerPage, setRegionsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [addRegion] = useAddRegionMutation();
  const [updateRegion] = useUpdateRegionMutation();
  const [deleteRegion] = useDeleteRegionMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState([]);

  const filteredRegions = regions?.data.filter((region) =>
    region.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil((filteredRegions?.length || 0) / regionsPerPage);

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      if (formData.id) {
        await updateRegion({ id: formData.id, updatedData: formData }).unwrap();
        Toastify("Vùng đã được cập nhật:", 200);
      } else {
        await addRegion(formData).unwrap();
        Toastify("Vùng mới đã được thêm:", 200);
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

  const handleEditRegion = (id) => {
    const regionToEdit = regions?.data.find((region) => region._id === id);
    setSelectedRegion(regionToEdit);
    setIsModalVisible(true);
  };

  const handleDeleteRegion = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa vùng này?")) {
      try {
        setLoading(true);
        await deleteRegion(id).unwrap();
        refetch();
        Toastify("Vùng đã được xóa:", 200);
      } catch (error) {
        console.error("Có lỗi khi xóa vùng:", error);
        Toastify("Có lỗi xảy ra! Vui lòng thử lại.", 400);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteSelectedRegions = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa những vùng đã chọn?")) {
      try {
        setLoading(true);
        await Promise.all(
          selectedRegions.map((id) => deleteRegion(id).unwrap()),
        );
        refetch();
        Toastify("Các vùng đã được xóa:", 200);
        setSelectedRegions([]);
      } catch (error) {
        console.error("Có lỗi khi xóa vùng:", error);
        Toastify("Có lỗi xảy ra! Vui lòng thử lại.", 400);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedRegion(null);
  };

  const handleRegionsPerPageChange = (e) => {
    setRegionsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleRegionSelect = (id) => {
    setSelectedRegions((prev) =>
      prev.includes(id)
        ? prev.filter((regionId) => regionId !== id)
        : [...prev, id],
    );
  };

  const paginatedRegions = filteredRegions?.slice(
    (currentPage - 1) * regionsPerPage,
    currentPage * regionsPerPage,
  );

  if (regionDataLoading) {
    return <LoadingLocal />;
  }
  if (loading) {
    return <LoadingPage loading={loading} />;
  }

  return (
    <div className="ml-64 mt-8 bg-[#111111] p-6 text-white">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-bold">Quản lý danh sách vùng</h3>
        <Button
          className="flex rounded-md bg-red-600 p-2 hover:bg-red-700 hover:brightness-125"
          onClick={() => setIsModalVisible(true)}
        >
          + Thêm vùng
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
            value={regionsPerPage}
            onChange={handleRegionsPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span className="mx-2 text-gray-400">mục</span>
          {selectedRegions.length > 0 && (
            <div className="mx-2 flex items-center">
              <p className="mr-4 text-lg font-semibold">
                {`' `}Đã chọn {selectedRegions.length} mục{` '`}
              </p>
              <Button
                className="rounded-md bg-blue-500 p-2 hover:bg-blue-600"
                onClick={handleDeleteSelectedRegions}
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
                    setSelectedRegions(
                      e.target.checked
                        ? paginatedRegions.map((region) => region._id)
                        : [],
                    )
                  }
                  checked={
                    paginatedRegions?.length > 0 &&
                    selectedRegions.length === paginatedRegions.length
                  }
                  className="ml-4 cursor-pointer appearance-none rounded bg-[#111111] checked:bg-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-white">Vùng</th>
              <th className="px-4 py-3 text-center text-white">Hành động</th>
              <th className="px-4 py-3 text-center text-white"></th>
            </tr>
          </thead>
          <tbody className="bg-black text-gray-400">
            {paginatedRegions?.map((region) => (
              <tr key={region._id}>
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedRegions.includes(region._id)}
                    onChange={() => handleRegionSelect(region._id)}
                    className="ml-4 cursor-pointer appearance-none rounded bg-[#111111] checked:bg-blue-500"
                  />
                </td>
                <td className="px-4 py-2">{region.name}</td>
                <td className="px-4 py-2 text-center">
                  <Button
                    className="mr-1 rounded-sm bg-[#1fff01] p-2 text-white"
                    onClick={() => handleEditRegion(region._id)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    className="mr-1 rounded-sm bg-[#ff2727] p-2 text-white"
                    onClick={() => handleDeleteRegion(region._id)}
                  >
                    <FaTrash />
                  </Button>
                </td>
                <td className="font-bold text-blue-500">
                  <Link to={"/admin/region/" + region._id}> Xem các rạp</Link>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* Add/Edit Region Modal */}
      {isModalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-lg rounded-lg bg-white p-6 text-black">
            <h3 className="mb-4 text-2xl font-bold">
              {selectedRegion ? "Chỉnh sửa vùng" : "Thêm vùng"}
            </h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = {
                  id: selectedRegion?._id,
                  name: e.target.name.value,
                };
                handleSubmit(formData);
              }}
            >
              <label className="mb-2 block">Tên vùng:</label>
              <input
                type="text"
                name="name"
                defaultValue={selectedRegion ? selectedRegion.name : ""}
                required
                className="mb-4 w-full rounded border border-gray-300 p-2"
              />
              <div className="flex justify-end">
                <Button
                  className="mr-2 rounded-md bg-red-600 p-2 hover:bg-red-700"
                  type="button"
                  onClick={handleCloseModal}
                >
                  Hủy
                </Button>
                <Button className="rounded-md bg-blue-500 p-2 text-white">
                  {selectedRegion ? "Cập nhật" : "Thêm"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Region_Management;
