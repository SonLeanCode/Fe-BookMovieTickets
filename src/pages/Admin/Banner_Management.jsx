import { useState } from "react";
import { Button, Input } from "react-daisyui";
import {
  useGetBannersQuery,
  useDeleteBannerMutation,
} from "../../services/Banner/banner.service";
import { formatDate } from "../../utils/formatDate";
import { FaEdit, FaTrash } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import Pagination from "../../components/Admin/Pagination";
import Toastify from "../../helper/Toastify";
import LoadingLocal from "../Loading/LoadingLocal";
import LoadingPage from "../Loading/LoadingSpinner";
import BannerForm from "../../components/Admin/Banner/BannerForm";

const Banner_Management = () => {
  const {
    data: banner,
    isLoading: bannerDataLoading,
    refetch,
  } = useGetBannersQuery();
  // Khai báo các state
  const [loading, setLoading] = useState(false);
  const [selectedBanners, setSelectedBanners] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [bannerPerPage, setBannerPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);

  // Khai báo mutations
  const [deleteBanner] = useDeleteBannerMutation();

  // Lọc phim theo từ khóa tìm kiếm
  const filteredBanner = banner?.data?.filter((movie) =>
    movie?.movie_id?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil((filteredBanner?.length || 0) / bannerPerPage);

  const handleOpenModal = (banner) => {
    setSelectedBanner(banner);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedBanner(null);
  };


  const handleEditBanner = (id) => {
    const bannerToEdit = banner?.data.find((banner) => banner._id === id);
    handleOpenModal(bannerToEdit);
  };

  const handleDeleteBanner = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa phim này?")) {
      try {
        setLoading(true);
        await deleteBanner(id).unwrap();
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

  const handleSelectBanner = (id) => {
    setSelectedBanners((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((bannerId) => bannerId !== id)
        : [...prevSelected, id],
    );
  };

  const handleDeleteSelectedMovies = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa các phim đã chọn?")) {
      try {
        await Promise.all(
          selectedBanners.map((id) => deleteBanner(id).unwrap()),
        );
        refetch();
        Toastify("Đã xóa các phim:", 200);
        setSelectedBanners([]);
      } catch (error) {
        Toastify("Có lỗi khi xóa các phim:", 400);
      }
    }
  };

  const handleBannerPerPageChange = (e) => {
    setBannerPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const paginatedBanner = filteredBanner?.slice(
    (currentPage - 1) * bannerPerPage,
    currentPage * bannerPerPage,
  );

  console.log(banner);

  if (bannerDataLoading) {
    return <LoadingLocal />;
  }
  if (loading) {
    return <LoadingPage loading={loading} />;
  }

  return (
    <div className="ml-64 mt-8 bg-[#111111] p-6 text-white">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-white">
          Quản lý danh sách banner
        </h3>
        <Button
          className="flex rounded-md bg-red-600 p-2 text-white hover:bg-red-700 hover:brightness-125"
          onClick={() => handleOpenModal()}
        >
          + Thêm banner
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
            value={bannerPerPage}
            onChange={handleBannerPerPageChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <span className="mx-2 text-gray-400">mục</span>
          {selectedBanners.length > 0 && (
            <div className="mx-2 flex items-center">
              <p className="mr-4 text-lg font-semibold">
                {`' `}Đã chọn {selectedBanners.length} mục{` '`}
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
                    setSelectedBanners(
                      e.target.checked
                        ? paginatedBanner.map((banner) => banner._id)
                        : [],
                    )
                  }
                  checked={
                    paginatedBanner?.length > 0 &&
                    selectedBanners.length === paginatedBanner.length
                  }
                  className="ml-4 cursor-pointer appearance-none rounded bg-[#111111] checked:bg-blue-500"
                />
              </th>
              <th className="px-4 py-3 text-left text-white">Phim</th>
              <th className="px-4 py-3 text-left text-white">Banner</th>
              <th className="px-4 py-3 text-left text-white">Mô tả</th>
              <th className="px-4 py-3 text-center text-white">
                Ngày khởi chiếu
              </th>
              <th className="px-4 py-3 text-center text-white">Hành động</th>
            </tr>
          </thead>
          <tbody className="bg-black text-gray-400">
            {paginatedBanner ? (
              paginatedBanner?.map((banner) => (
                <tr key={banner?._id}>
                  <td className="px-4 py-2">
                    <input
                      type="checkbox"
                      onChange={() => handleSelectBanner(banner?._id)}
                      checked={selectedBanners.includes(banner?._id)}
                      className="ml-4 cursor-pointer appearance-none rounded bg-[#111111] checked:bg-blue-500"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex">
                      <img
                        src={banner?.movie_id?.img}
                        alt={banner?.movie_id?.name}
                        className="w-[70px]"
                      />
                      <div className="ml-2">
                        <h2 className="text-md font-medium text-white">
                          {banner?.movie_id?.name}
                        </h2>
                        <p className="mt-1 text-xs">
                          {banner?.movie_id?.duration} phút
                        </p>
                        <p className="mt-8 text-sm">
                          ({banner?.movie_id?.country} -{" "}
                          {banner?.movie_id?.subtitles})
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="w-[20%] px-4 py-2">
                    <img
                      src={banner?.img}
                      alt={banner?.movie_id?.name}
                      className="w-[300px]"
                    />
                  </td>
                  <td className="w-[20%] px-4 py-2">
                    {banner?.movie_id?.description?.slice(0, 50) + "..."}
                  </td>
                  <td className="px-4 py-2 text-center">
                    {formatDate(banner?.movie_id?.release_date)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <Button
                      className="mr-1 rounded-sm bg-[#1fff01] p-2 text-white"
                      onClick={() => handleEditBanner(banner?._id)}
                    >
                      <FaEdit />
                    </Button>
                    <Button
                      className="rounded-sm bg-[#ff2727] p-2 text-white"
                      onClick={() => handleDeleteBanner(banner?._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center">
                  Hiện tại chưa có banner nào.
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
      <BannerForm
        banner={selectedBanner} // Dữ liệu banner cần sửa nếu có
        isModalVisible={isModalVisible}
        onClose={handleCloseModal}
        refetch={refetch}
      />
    </div>
  );
};

export default Banner_Management;
