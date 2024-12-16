import { useState } from "react";
import LoadingLocal from "../Loading/LoadingLocal";
import {
  useGetAllCinemasQuery,
  useGetCinemasByRegionIdQuery,
} from "../../services/Cinema/cinema.service";
import { useGetAllRegionsQuery } from "../../services/Regions/regions.service"; // Import hook lấy khu vực
import { useTranslation } from "react-i18next";
const CheapTicket = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [selectedRegionId, setSelectedRegionId] = useState(null); // Trạng thái khu vực được chọn
  const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái modal
  const [selectedCinema, setSelectedCinema] = useState(null); // Thông tin rạp được chọn

  // Lấy danh sách khu vực
  const {
    data: regionsData,
    error: regionsError,
    isLoading: regionsLoading,
  } = useGetAllRegionsQuery();

  const {
    data: cinemasByRegionData,
    isLoading: cinemasByRegionLoading,
    error: cinemasByRegionError,
  } = useGetCinemasByRegionIdQuery(selectedRegionId, {
    skip: !selectedRegionId, // Nếu không có selectedRegionId, thì skip hook này
  });

  const {
    data: allCinemasData,
    isLoading: allCinemasLoading,
    error: allCinemasError,
  } = useGetAllCinemasQuery({
    skip: selectedRegionId, // Nếu có selectedRegionId thì skip hook này
  });

  const cinemasData = selectedRegionId ? cinemasByRegionData : allCinemasData;
  const cinemasLoading = selectedRegionId
    ? cinemasByRegionLoading
    : allCinemasLoading;
  const cinemasError = selectedRegionId
    ? cinemasByRegionError
    : allCinemasError;

  // Kiểm tra trạng thái tải dữ liệu và lỗi
  if (cinemasLoading || regionsLoading) {
    return <LoadingLocal />;
  }

  if (cinemasError) {
    return <div>Error fetching cinemas: {cinemasError.message}</div>;
  }

  if (regionsError) {
    return <div>Error fetching regions: {regionsError.message}</div>;
  }

  // Danh sách các rạp từ API
  const cinemas = cinemasData?.data || [];
  const regions = regionsData?.data || [];
  const itemsPerPage = 6;

  const totalPages = Math.ceil(cinemas.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCinemas = cinemas.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleRegionChange = (regionId) => {
    setSelectedRegionId(regionId);
    setCurrentPage(1); // Reset trang về 1 khi thay đổi khu vực
  };

  const openModal = (cinema) => {
    setSelectedCinema(cinema);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCinema(null);
  };

  return (
    <div className="relative w-full bg-black text-white shadow-lg">
      <div className="relative w-full">
        <img
          src="https://diadiemvietnam.vn/wp-content/uploads/2022/10/rap-chieu-phim-hai-duong.jpg"
          alt="Hệ thống rạp"
          className="h-[700px] w-full object-cover sm:h-[400px] md:h-[500px]"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-center text-4xl font-bold uppercase tracking-wider text-white drop-shadow-lg sm:text-3xl md:text-5xl lg:text-6xl">
            {t("Trải nghiệm điện ảnh tuyệt vời")}
          </h2>
        </div>
      </div>

      <div className="mx-auto mt-4 w-11/12">
        {/* Chọn lọc khu vực - Hiển thị trên cùng khi màn hình <= 430px */}
        <div className="mb-4 flex sm:hidden">
          <h3
            className="w-full cursor-pointer select-none truncate text-xl font-semibold"
            onClick={toggleMenu}
          >
            | {t("Khu vực của chúng tôi")} {isMenuOpen ? "▲" : "▼"}
          </h3>
          <div
            className={`transition-all duration-500 ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} w-full overflow-hidden`}
          >
            <ul className="mt-2">
              {regions.length > 0 ? (
                regions.map((region) => (
                  <li
                    key={region._id}
                    className="mb-2 cursor-pointer rounded-md bg-gray-600 p-2 transition-all duration-300 hover:bg-gray-500"
                    onClick={() => handleRegionChange(region._id)}
                  >
                    {region.name}
                  </li>
                ))
              ) : (
                <div className="text-center">
                  {" "}
                  {t("Không có khu vực nào để hiển thị")}
                </div>
              )}
            </ul>
          </div>
        </div>

        {/* Layout chính với 2 cột */}
        <div className="flex flex-col sm:flex-row">
          {/* Cột bên trái (80%) */}
          <div className="w-full sm:w-8/12">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {currentCinemas.length > 0 ? (
                currentCinemas.map((cinema) => (
                  <div
                    key={cinema._id}
                    className="flex flex-col items-center rounded-lg bg-gray-700 p-4"
                  >
                    <img
                      src={cinema.image || "https://via.placeholder.com/150"}
                      alt={cinema.name}
                      className="h-72 w-full rounded-md object-cover hover:cursor-pointer"
                    />
                    <h3 className="mt-2 text-center font-bold">
                      {cinema.name}
                    </h3>
                    <div className="mt-2 flex space-x-2">
                      <button
                        className="flex items-center rounded bg-orange-500 px-2 py-1 text-white hover:bg-orange-600"
                        onClick={() => openModal(cinema)}
                      >
                        {t("Thông tin chi tiết")}
                        <i className="fas fa-info-circle ml-2"></i>
                      </button>
                      <button className="flex items-center rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600">
                        {t("Chia sẻ")}
                        <i className="fas fa-share ml-2"></i>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center">
                  {t("Không có rạp nào để hiển thị")}
                </div>
              )}
            </div>

            {/* Phân trang */}
            <div className="mt-4 flex justify-center space-x-2 p-3">
              {Array.from(
                {
                  length: totalPages,
                },
                (_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`rounded px-3 py-1 ${
                      currentPage === index + 1
                        ? "bg-red-500 text-white"
                        : "bg-gray-500 text-white hover:bg-gray-600"
                    }`}
                  >
                    {index + 1}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Cột bên phải (20%) */}
          <div className="mt-4 hidden w-full pl-0 sm:mt-0 sm:block sm:w-4/12 sm:pl-4">
            <h3
              className="cursor-pointer select-none truncate text-xl font-semibold"
              onClick={toggleMenu}
            >
              | {t("Khu vực của chúng tôi")} {isMenuOpen ? "▲" : "▼"}
            </h3>
            <div
              className={`transition-all duration-500 ${isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
            >
              <ul className="mr-2">
                {regions.length > 0 ? (
                  regions?.map((region) => (
                    <li
                      key={region?._id}
                      className="mb-2 cursor-pointer rounded-md bg-gray-600 p-2 transition-all duration-300 hover:bg-gray-500"
                      onClick={() => handleRegionChange(region?._id)}
                    >
                      {region?.name}
                    </li>
                  ))
                ) : (
                  <div className="text-center">
                    {" "}
                    {t("Không có khu vực nào để hiển thị")}
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 transition-opacity duration-300 ease-in-out">
          <div className="w-11/12  max-w-4xl scale-100 transform rounded-lg bg-gradient-to-br from-slate-950 to-red-950 p-8 shadow-lg transition-transform duration-300 ease-in-out">
            <h3 className="mb-4 text-center text-4xl font-bold">
              {selectedCinema?.name}
            </h3>
            <img
              src={selectedCinema?.image || "https://via.placeholder.com/150"}
              alt={selectedCinema?.name}
              className="h-72 w-full rounded-md object-cover"
            />
            <div className="mt-2 flex w-full items-center text-gray-300">
              <i className="fas fa-map-marker-alt mr-2"></i>
              <strong>{t("Địa chỉ")} </strong>{" "}
              {selectedCinema?.address || "Không có địa chỉ."}
            </div>
            <button
              className="mt-6 w-full transform rounded bg-red-500 px-6 py-3 font-bold text-white transition duration-300 hover:scale-105 hover:bg-red-600"
              onClick={closeModal} // Đóng modal
            >
              {t("Đóng")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheapTicket;
