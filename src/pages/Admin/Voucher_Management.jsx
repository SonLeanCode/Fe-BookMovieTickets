import { useState } from "react";
import { Button, Input } from "react-daisyui";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import Pagination from "../../components/Admin/Pagination";
import Toastify from "../../helper/Toastify";
import LoadingLocal from "../Loading/LoadingLocal";
import LoadingPage from "../Loading/LoadingSpinner";
import {
  useFindCodeVoucherQuery,
  useAddVoucherMutation,
  useDeleteVoucherMutation,
} from "../../services/Voucher/vouchers";
import { useGetAllRegionsQuery } from "../../services/Regions/regions.service";
import { formatDate } from "../../utils/formatDate";

const VoucherManagement = () => {
  const {
    data: voucher,
    isLoading: cinemaDataLoading,
    refetch,
  } = useFindCodeVoucherQuery(); // Updated query hook
  console.log(voucher);
  
  const { data: regions, isLoading: regionsLoading } = useGetAllRegionsQuery();
  const [loading, setLoading] = useState(false);
  const [selectedCinema, setSelectedcinema] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [voucherPerPage, setvoucherPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [addVoucher] = useAddVoucherMutation();

  const [deleteCinema] = useDeleteVoucherMutation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedvoucher, setSelectedvoucher] = useState([]);

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    discount_percent: "",
    valid_from: "",
    valid_until: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };


  const filteredvoucher = voucher?.data.filter((voucher) =>
    voucher?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil((filteredvoucher?.length || 0) / voucherPerPage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
  
      // Tạo FormData để gửi dữ liệu bao gồm file ảnh
      const data = new FormData();
      data.append("name", formData.name);
      data.append("code", formData.code);
      data.append("discount_percent", formData.discount_percent);
      data.append("valid_from", formData.valid_from);
      data.append("valid_until", formData.valid_until);
  
      // Chỉ thêm ảnh nếu nó có giá trị
      if (formData.img) {
        data.append("img", formData.img); 
      }
  
      // Gọi API để tạo voucher mới
      const result = await addVoucher(data).unwrap(); // unwrap để bắt lỗi khi có lỗi xảy ra
      console.log("Result from API:", result); // Kiểm tra kết quả từ API
  
      if (result?.success) {
        Toastify("Voucher đã được thêm!", 200); // Thông báo thành công
        refetch(); // Thực hiện lại refetch nếu cần thiết
        handleCloseModal(); // Đóng modal sau khi hoàn thành
      } else {
        Toastify("Có lỗi khi thêm voucher. Vui lòng thử lại.", 3000); // Thông báo lỗi nếu có
      }
    } catch (error) {
      console.error("Có lỗi khi thực hiện thao tác:", error);
      Toastify("Có lỗi khi thêm voucher. Vui lòng thử lại.", 3000); // Thông báo lỗi cho người dùng
    } finally {
      setLoading(false); // Đảm bảo setLoading luôn được gọi sau khi xong
    }
  };
  
  

  const handleDeletecinema = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa voucher này?")) {
      try {
        setLoading(true);
        await deleteCinema(id).unwrap();
        refetch();
        Toastify("voucher đã được xóa:", 200);
      } catch (error) {
        console.error("Có lỗi khi xóa rạp:", error);
        Toastify("Có lỗi xảy ra! Vui lòng thử lại.", 400);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteSelectedvoucher = async () => {
    if (selectedvoucher.length === 0) {
      Toastify("Vui lòng chọn ít nhất một rạp để xóa!", 400);
      return;
    }

    if (window.confirm("Bạn có chắc chắn muốn xóa những rạp đã chọn?")) {
      try {
        setLoading(true);
        await Promise.all(
          selectedvoucher.map((id) => deleteCinema(id).unwrap()),
        );
        refetch();
        Toastify("Các rạp đã được xóa:", 200);
        setSelectedvoucher([]);
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
    setFormData({  
      code: "",
      name: "",
      discount_percent: "",
      valid_from: "",
      valid_until: "", });
  };

  const handlevoucherPerPageChange = (e) => {
    setvoucherPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlevoucherelect = (id) => {
    setSelectedvoucher((prev) =>
      prev.includes(id)
        ? prev.filter((cinemaId) => cinemaId !== id)
        : [...prev, id],
    );
  };

  const paginatedvoucher = filteredvoucher?.slice(
    (currentPage - 1) * voucherPerPage,
    currentPage * voucherPerPage,
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
          + Thêm voucher
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
            value={voucherPerPage}
            onChange={handlevoucherPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span className="mx-2 text-gray-400">mục</span>
          {selectedvoucher?.length > 0 && (
            <div className="mx-2 flex items-center">
              <p className="mr-4 text-lg font-semibold">
                {`' `}Đã chọn {selectedvoucher.length} mục{` '`}
              </p>
              <Button
                className="rounded-md bg-blue-500 p-2 hover:bg-blue-600"
                onClick={handleDeleteSelectedvoucher}
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
                    setSelectedvoucher(
                      e.target.checked
                        ? paginatedvoucher.map((cinema) => cinema._id)
                        : [],
                    )
                  }
                  checked={
                    paginatedvoucher?.length > 0 &&
                    selectedvoucher.length === paginatedvoucher.length
                  }
                  className="ml-4 cursor-pointer appearance-none rounded bg-[#111111] checked:bg-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-white">Ảnh</th>
              <th className="px-4 py-3 text-left text-white">Mã</th>
              <th className="px-4 py-3 text-left text-white">Tên</th>
              <th className="px-4 py-3 text-left text-white">Giảm giá</th>
              <th className="px-4 py-3 text-center text-white">Hạn sử dụng</th>
              <th className="px-4 py-3 text-center text-white">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-black text-gray-400">
            {paginatedvoucher?.length > 0 ? (
              paginatedvoucher?.map((voucher) => (
                <tr key={voucher._id}>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      checked={selectedvoucher.includes(voucher?._id)}
                      onChange={() => handlevoucherelect(voucher?._id)}
                      className="ml-4 cursor-pointer appearance-none rounded bg-[#111111] checked:bg-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2"><img className="w-10" src={voucher?.img} alt="" /></td>
                  <td className="px-4 py-2">{voucher?.code}</td>

                  <td className="px-4 py-2">{voucher?.name}</td>
                  <td className="px-4 py-2">{voucher?.discount_percent}%</td>
                  <td className="px-4 py-2 text-center">{formatDate(voucher?.valid_until)} - {formatDate(voucher?.valid_until)}</td>
                  <td className="px-4 py-2 text-center">
                    
                    <Button
                      className="mr-1 rounded-sm bg-[#ff2727] p-2 text-white"
                      onClick={() => handleDeletecinema(voucher?._id)}
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
                {selectedCinema ? "Chỉnh sửa rạp" : "Thêm voucher"}
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
                <label className="absolute -top-3 left-3 bg-white px-2 text-sm font-medium text-green-800">
                  Mã
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="relative">
                <label className="absolute -top-3 left-3 bg-white px-2 text-sm font-medium text-blue-800">
                  Tên voucher:
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
                  Ảnh :
                </label>
                <input
                  type="file"
                  name="img"
                  onChange={(e) =>
                    setFormData({ ...formData, img: e.target.files[0] })
                  }
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              
              <div className="relative">
                <label className="absolute -top-3 left-3 bg-white px-2 text-sm font-medium text-green-800">
                  Giảm giá
                </label>
                <input
                  type="text"
                  name="discount_percent"
                  value={formData.discount_percent}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="relative">
                <label className="absolute -top-3 left-3 bg-white px-2 text-sm font-medium text-green-800">
                  ngày hiệu lực
                </label>
                <input
                  type="date"
                  name="valid_from"
                  value={formData.valid_from}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="relative">
                <label className="absolute -top-3 left-3 bg-white px-2 text-sm font-medium text-green-800">
                  ngày hết hạn
                </label>
                <input
                  type="date"
                  name="valid_until"
                  value={formData.valid_until}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-lg border border-gray-300 p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
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

export default VoucherManagement;
