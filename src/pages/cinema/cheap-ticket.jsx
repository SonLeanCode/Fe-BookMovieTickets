import React, { useState } from 'react';

const CheapTicket = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Trạng thái ẩn/hiện danh mục

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Thay đổi trạng thái khi bấm
  };

  // Danh sách các rạp
  const cinemas = [
    { id: 1, name: 'Rạp Phim 1', img: 'https://quangcaongoaitroi.com/wp-content/uploads/2020/02/quang-cao-tai-rap-chieu-phim-5-768x510.jpg' },
    { id: 2, name: 'Rạp Phim 2', img: 'https://quangcaongoaitroi.com/wp-content/uploads/2020/02/quang-cao-tai-rap-chieu-phim-5-768x510.jpg' },
    { id: 3, name: 'Rạp Phim 3', img: 'https://quangcaongoaitroi.com/wp-content/uploads/2020/02/quang-cao-tai-rap-chieu-phim-5-768x510.jpg' },
    { id: 4, name: 'Rạp Phim 4', img: 'https://quangcaongoaitroi.com/wp-content/uploads/2020/02/quang-cao-tai-rap-chieu-phim-5-768x510.jpg' },
    { id: 5, name: 'Rạp Phim 5', img: 'https://quangcaongoaitroi.com/wp-content/uploads/2020/02/quang-cao-tai-rap-chieu-phim-5-768x510.jpg' },
    { id: 6, name: 'Rạp Phim 6', img: 'https://quangcaongoaitroi.com/wp-content/uploads/2020/02/quang-cao-tai-rap-chieu-phim-5-768x510.jpg' },
    { id: 7, name: 'Rạp Phim 7', img: 'https://quangcaongoaitroi.com/wp-content/uploads/2020/02/quang-cao-tai-rap-chieu-phim-5-768x510.jpg' },
    { id: 8, name: 'Rạp Phim 8', img: 'https://quangcaongoaitroi.com/wp-content/uploads/2020/02/quang-cao-tai-rap-chieu-phim-5-768x510.jpg' },
    { id: 9, name: 'Rạp Phim 9', img: 'https://quangcaongoaitroi.com/wp-content/uploads/2020/02/quang-cao-tai-rap-chieu-phim-5-768x510.jpg' },
    { id: 10, name: 'Rạp Phim 10', img: 'https://quangcaongoaitroi.com/wp-content/uploads/2020/02/quang-cao-tai-rap-chieu-phim-5-768x510.jpg' },
    { id: 11, name: 'Rạp Phim 11', img: 'https://quangcaongoaitroi.com/wp-content/uploads/2020/02/quang-cao-tai-rap-chieu-phim-5-768x510.jpg' },
    { id: 12, name: 'Rạp Phim 12', img: 'https://quangcaongoaitroi.com/wp-content/uploads/2020/02/quang-cao-tai-rap-chieu-phim-5-768x510.jpg' },
    { id: 13, name: 'Rạp Phim 13', img: 'https://quangcaongoaitroi.com/wp-content/uploads/2020/02/quang-cao-tai-rap-chieu-phim-5-768x510.jpg' },
    { id: 14, name: 'Rạp Phim 14', img: 'https://quangcaongoaitroi.com/wp-content/uploads/2020/02/quang-cao-tai-rap-chieu-phim-5-768x510.jpg' },
    { id: 14, name: 'Rạp Phim 15', img: 'https://quangcaongoaitroi.com/wp-content/uploads/2020/02/quang-cao-tai-rap-chieu-phim-5-768x510.jpg' },
  ];

  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(cinemas.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCinemas = cinemas.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="relative text-white shadow-lg w-full">

      <div className="relative w-full">
        <img
            src="https://diadiemvietnam.vn/wp-content/uploads/2022/10/rap-chieu-phim-hai-duong.jpg"
            alt="Hệ thống rạp"
            className="w-full h-[600px] object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-6xl font-bold text-white uppercase tracking-wider drop-shadow-lg">
            Trải nghiệm điện ảnh tuyệt vời
            </h2>
        </div>
     </div>

      <div className="flex w-11/12 mx-auto mt-4">
        {/* Cột bên trái (80%) */}
        <div className="w-8/12">
          <div className="grid grid-cols-2 gap-4">
            {currentCinemas.map((cinema) => (
              <div key={cinema.id} className="bg-gray-700 p-4 rounded-lg flex flex-col items-center">
                <img 
                  src={cinema.img} 
                  alt={cinema.name} 
                  className="w-full h-72 object-cover hover:cursor-pointer rounded-md"
                />
                <h3 className="text-center font-bold mt-2">{cinema.name}</h3>
                <div className="mt-2 flex space-x-2">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white px-2 py-1 rounded flex items-center">
                        Thông tin chi tiết
                        <i className="fas fa-info-circle ml-2"></i>
                    </button>

                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded flex items-center">
                        Chia sẻ
                        <i className="fas fa-share ml-2"></i> 
                    </button>
                </div>
              </div>
            ))}
          </div>

          {/* Phân trang */}
          <div className="mt-4 p-3 flex justify-center space-x-2">
            {Array.from({ length: totalPages }, (_, index) => (
              <button 
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === index + 1
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-500 text-white hover:bg-gray-600'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Cột bên phải (20%) */}
        <div className="w-4/12 pl-4">
          <h3 
            className="text-xl font-semibold cursor-pointer select-none"
            onClick={toggleMenu} // Thêm sự kiện khi bấm vào tiêu đề
          >
            | Các rạp của chúng tôi {isMenuOpen ? '▲' : '▼'}
          </h3>
          <div className={`transition-all duration-500 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
            <ul className="mt-2">
              <li className="bg-gray-600 p-2 rounded-md mb-2 hover:bg-gray-500 cursor-pointer transition-all duration-300">Rạp A</li>
              <li className="bg-gray-600 p-2 rounded-md mb-2 hover:bg-gray-500 cursor-pointer transition-all duration-300">Rạp B</li>
              <li className="bg-gray-600 p-2 rounded-md mb-2 hover:bg-gray-500 cursor-pointer transition-all duration-300">Rạp C</li>
              <li className="bg-gray-600 p-2 rounded-md mb-2 hover:bg-gray-500 cursor-pointer transition-all duration-300">Rạp D</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheapTicket;
