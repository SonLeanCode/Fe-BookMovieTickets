import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import NowShowingMovies from '../Actor/NowShowingMovies';
import { useGetVoucherQuery } from "../../services/Voucher/voucher.service";

const Voucher = () => { // Changed from 'voucher' to 'Voucher'
  const { t } = useTranslation();
  const { data: allvoucherData, error, isLoading } = useGetVoucherQuery();

  

  const [currentPage, setCurrentPage] = useState(1);
  const actorsPerPage = 9; // Hiển thị 9 diễn viên mỗi trang, 3 diễn viên mỗi hàng
  const vouchers = Array.isArray(allvoucherData?.data) ? allvoucherData.data : [];
  // Tính toán chỉ số bắt đầu và kết thúc cho diễn viên của trang hiện tại
  const indexOfLastActor = currentPage * actorsPerPage;
  const indexOfFirstActor = indexOfLastActor - actorsPerPage;
  const currentActors = vouchers.slice(indexOfFirstActor, indexOfLastActor);
console.log(currentActors);

  // Tính toán tổng số trang
  const totalPages = Math.ceil(vouchers.length / actorsPerPage);

  // Hàm điều hướng trang
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="flex justify-center bg-black">
      <div className="w-11/12 mx-auto">
        <div className="w-12/12 p-2 mt-28">
          <h2 className="text-white text-2xl font-semibold font-roboto pb-2 uppercase">
            <span className="text-red-600 ">|</span> {t("Sự kiện")}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row my-4">
        <div className="text-white mr-2 flex-1">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 p-2">
    {currentActors.map((actor, index) => (
      <div
        className="relative rounded-sm bg-gray-900 group"
        style={{ backgroundColor: '#181818' }}
        key={index}
      >
        <Link to="detail" className="block h-[380px] w-[300px]">
          <img
            src={actor.img}
            alt={actor.name}
            className="rounded-md w-full h-full object-cover"
          />
        </Link>

        {/* Phần nội dung hiển thị khi hover */}
        <div className="absolute inset-0 w-full h-full p-2 bg-black bg-opacity-70 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
          <a href={actor.link} className="text-gray-300 text-center">
            {actor.name}
          </a>
        </div>
      </div>
    ))}
  </div>

  {/* Phân trang */}
  <div className="flex justify-center my-4">
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i + 1}
        onClick={() => goToPage(i + 1)}
        className={`mx-2 px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-red-600' : 'bg-gray-700'}`}
      >
        {i + 1}
      </button>
    ))}
  </div>
</div>

          <div className='mt-4 w-full md:mt-0 md:w-[30%]'>
            <NowShowingMovies />
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default Voucher; // Changed from 'voucher' to 'Voucher'
