import {useState} from 'react';
import LoadingLocal from "../Loading/LoadingLocal";
import {useGetAllCinemasQuery, useGetCinemasByRegionIdQuery} from '../../services/Cinema/cinema.service';
import {useGetAllRegionsQuery} from '../../services/Regions/regions.service'; // Import hook lấy khu vực
import { useTranslation } from 'react-i18next';
const CheapTicket = () => {
    const { t } = useTranslation();
    const [currentPage, setCurrentPage] = useState(1);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedRegionId, setSelectedRegionId] = useState(null); // Trạng thái khu vực được chọn
    const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái modal
    const [selectedCinema, setSelectedCinema] = useState(null); // Thông tin rạp được chọn

    // Lấy danh sách khu vực
    const {data: regionsData, error: regionsError, isLoading: regionsLoading} = useGetAllRegionsQuery();

    // Lấy danh sách rạp phim theo khu vực đã chọn, nếu không có thì lấy tất cả
    const {data: cinemasData, error: cinemasError, isLoading: cinemasLoading} = selectedRegionId
        ? useGetCinemasByRegionIdQuery(selectedRegionId)
        : useGetAllCinemasQuery();

    // Kiểm tra trạng thái tải dữ liệu và lỗi
    if (cinemasLoading || regionsLoading) {
        return <LoadingLocal/>;
    }

    if (cinemasError) {
        return <div>Error fetching cinemas: {cinemasError.message}</div>;
    }

    if (regionsError) {
        return <div>Error fetching regions: {regionsError.message}</div>;
    }

    // Danh sách các rạp từ API
    const cinemas = cinemasData
        ?.data || [];
    const regions = regionsData
        ?.data || [];
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
        <div className="relative bg-black text-white shadow-lg w-full">
            <div className="relative w-full">
                <img
                    src="https://diadiemvietnam.vn/wp-content/uploads/2022/10/rap-chieu-phim-hai-duong.jpg"
                    alt="Hệ thống rạp"
                    className="w-full h-[700px] object-cover sm:h-[400px] md:h-[500px]"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h2
                        className="text-4xl text-center sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wider drop-shadow-lg">
                        {t("Trải nghiệm điện ảnh tuyệt vời")} 
                    </h2>
                </div>
            </div>


            <div className="w-11/12 mx-auto mt-4">
                {/* Chọn lọc khu vực - Hiển thị trên cùng khi màn hình <= 430px */}
                <div className="flex sm:hidden mb-4">
                    <h3
                        className="text-xl font-semibold cursor-pointer select-none truncate w-full"
                        onClick={toggleMenu}>
                        | {t("Khu vực của chúng tôi")} {isMenuOpen ? '▲' : '▼'}
                    </h3>
                    <div
                        className={`transition-all duration-500 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden w-full`}>
                        <ul className="mt-2">
                            {
                                regions.length > 0
                                    ? (regions.map(region => (
                                        <li key={region._id} className="bg-gray-600 p-2 rounded-md mb-2 hover:bg-gray-500 cursor-pointer transition-all duration-300" onClick={() => handleRegionChange(region._id)}>
                                            {region.name}
                                        </li>
                                    )))
                                    : (<div className="text-center"> {t("Không có khu vực nào để hiển thị")}</div>)
                            }
                        </ul>
                    </div>
                </div>

                {/* Layout chính với 2 cột */}
                <div className="flex flex-col sm:flex-row">
                    {/* Cột bên trái (80%) */}
                    <div className="w-full sm:w-8/12">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {
                                currentCinemas.length > 0
                                    ? (currentCinemas.map((cinema) => (
                                        <div
                                            key={cinema._id}
                                            className="bg-gray-700 p-4 rounded-lg flex flex-col items-center">
                                            <img
                                                src={cinema.img || 'https://via.placeholder.com/150'}
                                                alt={cinema.name}
                                                className="w-full h-72 object-cover hover:cursor-pointer rounded-md"/>
                                            <h3 className="text-center font-bold mt-2">{cinema.name}</h3>
                                            <div className="mt-2 flex space-x-2">
                                                <button className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded flex items-center" onClick={() => openModal(cinema)}>
                                                    {t("Thông tin chi tiết")}
                                                    <i className="fas fa-info-circle ml-2"></i>
                                                </button>
                                                <button
                                                    className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded flex items-center">
                                                    {t("Chia sẻ")} 
                                                    <i className="fas fa-share ml-2"></i>
                                                </button>
                                            </div>
                                        </div>
                                    )))
                                    : (<div className="text-center">{t("Không có rạp nào để hiển thị")}</div>)
                            }
                        </div>

                        {/* Phân trang */}
                        <div className="mt-4 p-3 flex justify-center space-x-2">
                            {
                                Array.from({
                                    length: totalPages
                                }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                        className={`px-3 py-1 rounded ${
                                            currentPage === index + 1
                                                ? 'bg-red-500 text-white'
                                                : 'bg-gray-500 text-white hover:bg-gray-600'}`}>
                                        {index + 1}
                                    </button>
                                ))
                            }
                        </div>
                    </div>

                    {/* Cột bên phải (20%) */}
                    <div className="hidden sm:block w-full sm:w-4/12 pl-0 sm:pl-4 mt-4 sm:mt-0">
                        <h3
                            className="text-xl font-semibold cursor-pointer select-none truncate"
                            onClick={toggleMenu}>
                            | {t("Khu vực của chúng tôi")} {isMenuOpen ? '▲' : '▼'}
                        </h3>
                        <div
                            className={`transition-all duration-500 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                            <ul className="mr-2">
                                {
                                    regions.length > 0
                                        ? (regions.map(region => (
                                            <li key={region._id} className="bg-gray-600 p-2 rounded-md mb-2 hover:bg-gray-500 cursor-pointer transition-all duration-300" onClick={() => handleRegionChange(region._id)}>
                                                {region.name}
                                            </li>
                                        )))
                                        : (<div className="text-center"> {t("Không có khu vực nào để hiển thị")}</div>)
                                }
                            </ul>
                        </div>
                    </div>
                </div>
            </div>




            
            {isModalOpen && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 transition-opacity duration-300 ease-in-out">
                <div className="bg-gradient-to-br from-slate-950 to-red-950 p-8 rounded-lg w-11/12 max-w-3xl shadow-lg transform transition-transform duration-300 ease-in-out scale-100">
                  <h3 className="text-4xl font-bold  text-center mb-4">{selectedCinema?.name}</h3>
                  <img
                    src={selectedCinema?.img || 'https://via.placeholder.com/150'}
                    alt={selectedCinema?.name}
                    className="w-full h-64 object-cover rounded-md"
                  />

                  <div className="mt-2 w-full text-gray-300 flex items-center">
                    <i className="fas fa-map-marker-alt mr-2"></i>
                    <strong>{t("Địa chỉ")}: </strong> {selectedCinema?.address || 'Không có địa chỉ.'}
                  </div>

                  <div className="mt-2 text-gray-300 flex items-center">
                    <i className="fas fa-info-circle mr-2"></i>
                    <strong>{t("Thông tin rạp")}: </strong> {selectedCinema?.info || 'Không có thông tin.'}
                  </div>

                  <div className="mt-4 flex justify-between bg-black p-4 rounded-md">
                    <div className="flex-1 text-center">
                      <h4 className="text-xl font-semibold text-white"> {t("Phòng VIP")}</h4>
                      <p className="mt-2 text-gray-300">
                        <strong>{t("Số phòng")}:</strong> {selectedCinema?.vipRoomCount || 0} phòng
                      </p>
                      <p className="text-gray-300">
                        <strong>{t("Số ghế")}:</strong> {selectedCinema?.vipSeatCount || 0} ghế
                      </p>
                    </div>
                    <div className="flex-1 border-l border-gray-500 pl-4 text-center">
                      <h4 className="text-xl font-semibold text-white">{t("Phòng Thường")}</h4>
                      <p className="mt-2 text-gray-300">
                        <strong>{t("Số phòng")}:</strong> {selectedCinema?.regularRoomCount || 0} phòng
                      </p>
                      <p className="text-gray-300">
                        <strong>{("Số ghế")}:</strong> {selectedCinema?.regularSeatCount || 0} ghế
                      </p>
                    </div>
                  </div>

                  <div className="mt-2 text-gray-300 flex items-center">
                    <i className="fas fa-tv mr-2"></i>
                    <strong>{t("Loại màn hình")} :</strong> {selectedCinema?.screenType || 'Không có thông tin.'}
                  </div>

                  <button
                    className="mt-6 w-full font-bold bg-red-500 text-white px-6 py-3 rounded hover:bg-red-600 transition duration-300 transform hover:scale-105"
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
