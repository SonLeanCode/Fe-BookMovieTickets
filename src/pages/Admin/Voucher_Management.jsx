import { useState } from "react";
import { Button, Input } from "react-daisyui";
import {
  useFindCodeVoucherQuery,
  useCreateVoucherMutation,
  useDeleteVoucherMutation,
} from "../../services/Voucher/vouchers";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import Pagination from "../../components/Admin/Pagination";
import Toastify from "../../helper/Toastify";
import LoadingLocal from "../Loading/LoadingLocal";

const VoucherManagement = () => {
  const {
    data: vouchers,
    isLoading: voucherDataLoading,
    refetch,
  } = useFindCodeVoucherQuery();
  console.log("data voucher", vouchers);

  const [loading, setLoading] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [vouchersPerPage, setVouchersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [addVoucher] = useCreateVoucherMutation();
  const [deleteVoucher] = useDeleteVoucherMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);


  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    // Tạo FormData để gửi dữ liệu
    const formData = new FormData();
  
    // Lấy dữ liệu từ form
    const formElements = event.target.elements;
    console.log("Dữ liệu gửi lên API:", formData);
    formData.append("code", formElements.code.value);
    formData.append("name", formElements.name.value);
    formData.append(
      "discount_percent",
      parseFloat(formElements.discount_percent.value)
    );
    formData.append("valid_from", formElements.valid_from.value);
    formData.append("valid_until", formElements.valid_until.value);
  
    // Nếu có file ảnh, thêm vào FormData
    if (selectedFile) {
      formData.append("img", selectedFile);
    }
  
    try {
      // Gửi yêu cầu thêm voucher mới
      await addVoucher(formData).unwrap();
      alert("Thêm voucher mới thành công!");
  
      // Đóng modal sau khi thêm thành công
      handleCloseModal();
      refetch(); // Làm mới danh sách voucher
    } catch (error) {
      console.error("Lỗi khi gửi dữ liệu:", error);
      alert("Đã xảy ra lỗi. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };
  

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Lấy file từ input
    if (file) {
      setSelectedFile(file); // Cập nhật file vào state
    }
  };

  const filteredVouchers = vouchers?.data.filter(
    (voucher) =>
      voucher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      voucher.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil((filteredVouchers?.length || 0) / vouchersPerPage);


  const handleEditVoucher = (id) => {
    const voucherToEdit = vouchers?.data.find((voucher) => voucher._id === id);
    setSelectedVoucher(voucherToEdit);
    setIsModalVisible(true);
  };

  const handleDeleteVoucher = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa voucher này?")) {
      try {
        setLoading(true);
        await deleteVoucher(id).unwrap();
        refetch();
        Toastify("Voucher đã được xóa", 200);
      } catch (error) {
        console.error("Có lỗi khi xóa voucher:", error);
        Toastify("Có lỗi xảy ra! Vui lòng thử lại.", 400);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedVoucher(null);
    setImgFile(null); // Reset ảnh sau khi đóng modal
  };

  const handleVouchersPerPageChange = (e) => {
    setVouchersPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };



  const paginatedVouchers = filteredVouchers?.slice(
    (currentPage - 1) * vouchersPerPage,
    currentPage * vouchersPerPage
  );


  if (voucherDataLoading) {
    return <LoadingLocal />;
  }

  // if (!vouchers?.data || vouchers?.data.length === 0) {
  //   return <div className="text-white">Không có voucher nào để hiển thị.</div>;
  // }

  return (
    <div className="ml-64 mt-8 bg-[#111111] p-6 text-white">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-bold">Quản lý Voucher</h3>
        <Button
          className="flex rounded-md bg-red-600 p-2 text-white hover:bg-red-700 hover:brightness-125"
          onClick={() => setIsModalVisible(true)}
        >
          + Thêm Voucher
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
            value={vouchersPerPage}
            onChange={handleVouchersPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span className="mx-2 text-gray-400">mục</span>
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
              <th className="px-4 py-3 text-center text-white">Hình ảnh</th>
              <th className="px-4 py-3 text-left text-white">Mã Voucher</th>
              <th className="px-4 py-3 text-left text-white">Tên Voucher</th>
              <th className="px-4 py-3 text-center text-white">Giảm giá (%)</th>
              <th className="px-4 py-3 text-center text-white">Ngày bắt đầu</th>
              <th className="px-4 py-3 text-center text-white">Ngày kết thúc</th>
              <th className="px-4 py-3 text-center text-white">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-black text-gray-400">
            {paginatedVouchers?.map((voucher) => (
              <tr key={voucher._id}>
                <td className="px-4 py-2 text-center">
                  <img
                    src={voucher.img}
                    alt={voucher.name}
                    className="h-12 w-12 object-cover m-auto"
                  />
                </td>
                <td className="px-4 py-2">{voucher.code}</td>
                <td className="px-4 py-2">{voucher.name}</td>
                <td className="px-4 py-2 text-center">{voucher.discount_percent}%</td>
                <td className="px-4 py-2 text-center">{voucher.valid_from}</td>
                <td className="px-4 py-2 text-center">{voucher.valid_until}</td>
                <td className="px-4 py-2 text-center">
                  <Button
                    className="mr-1 rounded-sm bg-[#1fff01] p-2 text-white"
                    onClick={() => handleEditVoucher(voucher._id)}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    className="mr-1 rounded-sm bg-[#ff2727] p-2 text-white"
                    onClick={() => handleDeleteVoucher(voucher._id)}
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
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />

      {/* Add/Edit Voucher Modal */}
      <div className={`modal ${isModalVisible ? "modal-open" : ""}`}>
      <div className="modal-box">
        <h2 className="text-xl font-bold">{selectedVoucher ? "Cập nhật Voucher" : "Thêm Voucher"}</h2>
        <form onSubmit={handleFormSubmit}>
          {/* Mã Voucher */}
          <label className="mb-2 block text-black">Mã Voucher:</label>
          <input
            type="text"
            name="code"
            defaultValue={selectedVoucher?.code || ""}
            required
            className="mb-4 w-full rounded border text-black border-gray-300 p-2"
          />

          {/* Tên Voucher */}
          <label className="mb-2 block text-black">Tên Voucher:</label>
          <input
            type="text"
            name="name"
            defaultValue={selectedVoucher?.name || ""}
            required
            className="mb-4 w-full rounded border text-black border-gray-300 p-2"
          />

          {/* Giảm giá */}
          <label className="mb-2 block text-black">Giảm giá (%):</label>
          <input
            type="number"
            name="discount_percent"
            defaultValue={selectedVoucher?.discount_percent || ""}
            required
            className="mb-4 w-full rounded text-black border border-gray-300 p-2"
          />

          {/* Ngày bắt đầu */}
          <label className="mb-2 block text-black">Ngày bắt đầu:</label>
          <input
            type="date"
            name="valid_from"
            defaultValue={selectedVoucher?.valid_from || ""}
            required
            className="mb-4 w-full rounded text-black border border-gray-300 p-2"
          />

          {/* Ngày kết thúc */}
          <label className="mb-2 block text-black">Ngày kết thúc:</label>
          <input
            type="date"
            name="valid_until"
            defaultValue={selectedVoucher?.valid_until || ""}
            required
            className="mb-4 w-full rounded text-black border border-gray-300 p-2"
          />

          {/* File hình ảnh */}
          <div className="mb-4">
            <label className="mb-2 block text-black">Chọn hình ảnh tải lên:</label>
            <input
              type="file"
              name="img"
              accept="image/*"
              onChange={handleFileChange}
              className="p-2 text-sm text-white bg-gray-700 rounded"
            />
          </div>

          {/* Nút hành động */}
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 rounded-md bg-red-600 p-2 hover:bg-red-700 text-white"
              onClick={handleCloseModal}
              disabled={loading}
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-500 p-2 text-white"
              disabled={loading}
            >
              {loading ? "Đang xử lý..." : selectedVoucher ? "Cập nhật" : "Thêm"}
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default VoucherManagement;
