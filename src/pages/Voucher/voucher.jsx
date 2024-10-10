import { Link } from "react-router-dom";
import { useState } from "react";

const voucher = () => {
  const actors = [
    { 
      name: "Johnny Depp", 
      img: "https://i.pinimg.com/564x/03/a6/a6/03a6a6eab429e0feff108c32d19fc2ac.jpg", 
      hoverText: "Khuyến mãi đặc biệt cho phim Johnny Depp", 
      link: "/cinema/voucher/detail" 
    },
    { 
      name: "Emma Watson", 
      img: "https://i.pinimg.com/564x/65/45/9d/65459d98d1185663df3401e64ec60a0e.jpg", 
      hoverText: "Ưu đãi 30% cho combo bắp nước với Emma Watson", 
      link: "/cinema/voucher/detail"     },
    { 
      name: "Robert Downey Jr.", 
      img: "https://i.pinimg.com/564x/9e/27/00/9e2700be9b04805c7017d9695a9dd111.jpg", 
      hoverText: "Tặng vé miễn phí cho phim Robert Downey Jr.", 
      link: "/cinema/voucher/detail"     },
    { 
      name: "Robert Downey Jr.", 
      img: "https://i.pinimg.com/736x/93/09/0f/93090f65a27924397b98cc1f44bc8b3d.jpg", 
      hoverText: "Mua 1 tặng 1 vé cho Robert Downey Jr.", 
      link: "/cinema/voucher/detail"     },
    { 
      name: "Robert Downey Jr.", 
      img: "https://cdn.galaxycine.vn/media/2024/8/29/500_1724920115124.jpg", 
      hoverText: "Giảm 50% vé cho phim mới của Robert Downey Jr.", 
      link: "/cinema/voucher/detail"     },
    { 
      name: "Margot Robbie", 
      img: "https://i.pinimg.com/736x/5f/7d/62/5f7d62ac169398dd60f7dcea64509eff.jpg",
      hoverText: "Khai Trương Rạp “Cung Đình” – Tặng 22000 Vé Miễn Phí", 
      link: "/cinema/detail/margot-robbie" 
    },
    { 
      name: "Brad Pitt", 
      img: "https://i.pinimg.com/564x/2e/fe/d5/2efed50584cdf7379b9614e42a9882f2.jpg",
      hoverText: "Khuyến mãi cho phim Brad Pitt", 
      link: "/cinema/voucher/detail"     },
    { 
      name: "Leonardo DiCaprio", 
      img: "https://i.pinimg.com/564x/e0/5c/01/e05c015e48fff20ff1aab63541f91c57.jpg",
      hoverText: "Ưu đãi đặc biệt cho phim Leonardo DiCaprio", 
      link: "/cinema/voucher/detail"     },
    { 
      name: "Angelina Jolie", 
      img: "https://i.pinimg.com/564x/77/5e/38/775e38ded6abd4bebd0311b72416983f.jpg",
      hoverText: "Giảm giá 30% cho combo bắp nước với Angelina Jolie", 
      link: "/cinema/voucher/detail"     },
    { 
      name: "Tom Cruise", 
      img: "https://i.pinimg.com/564x/63/03/ea/6303ead9fcba8cd3fdb5ea74f098799b.jpg",
      hoverText: "Vé 9K cho phim Tom Cruise", 
      link: "/cinema/voucher/detail"     }
    // Thêm diễn viên khác ở đây
  ];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [currentPage, setCurrentPage] = useState(1);
  const actorsPerPage = 9; // Hiển thị 9 diễn viên mỗi trang, 3 diễn viên mỗi hàng

  // Tính toán chỉ số bắt đầu và kết thúc cho diễn viên của trang hiện tại
  const indexOfLastActor = currentPage * actorsPerPage;
  const indexOfFirstActor = indexOfLastActor - actorsPerPage;
  const currentActors = actors.slice(indexOfFirstActor, indexOfLastActor);

  // Tính toán tổng số trang
  const totalPages = Math.ceil(actors.length / actorsPerPage);

  // Hàm điều hướng trang
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <section className="flex justify-center bg-black">
      <div className="w-11/12 mx-auto">
        <div className="bg-gray-900 w-11/12 mx-auto  p-4 rounded-lg mt-28" style={{ backgroundColor: 'black' }}>
          <h2 className="text-white text-2xl font-semibold font-roboto pb-2 uppercase">
            <span className="text-red-600 ">|</span> Sự kiện
          </h2>
        </div>

        <div className="flex flex-col md:flex-row my-4">
          <div className="text-white mr-2 flex-1">
          <div className="flex flex-wrap justify-center gap-5" >
                {currentActors.map((actor, index) => (
                    <div
                    className="relative rounded-sm bg-gray-900 group"
                    style={{ width: '255px', height: '380px', backgroundColor: '#181818' }} // Đặt kích thước cố định
                    key={index}
                    >
                    <Link to="detail" className="block h-full">
                        <img
                        src={actor.img}
                        alt={actor.name}
                        className="rounded-md w-full h-full object-cover" // Đảm bảo ảnh chiếm hết không gian và giữ tỉ lệ
                        />
                    </Link>

                    {/* Phần nội dung hiển thị khi hover */}
                    <div className="absolute inset-0 w-full h-full p-2 bg-black bg-opacity-70 text-white opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                        <a href={actor.link} className="text-gray-300 text-center">
                            {actor.hoverText}
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

          <div className="w-full md:w-[30%] mt-4 md:mt-0">
                <h2 className="text-white text-2xl font-semibold font-roboto text-center mb-3">Phim đang chiếu</h2>
                <div className="group ml-6">
                <div className="relative flex flex-col items-center flex-grow flex-shrink-0 my-2">
                    <img src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-750_1723544376869.jpg" alt="item" className="w-full h-auto" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link to="/cinema/buy-tickets" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">Mua vé <i className="ml-1 fas fa-ticket-alt"></i></Link>
                    </div>
                    <div className="absolute bottom-0 right-0 bg-orange-600 text-white px-2 py-1">T18</div>
                    <div className="absolute bottom-14 right-2 text-yellow-400">★★★★☆</div>
                </div>
                <div className="text-white ">Tên phim</div>
                </div>
                <div className="group ml-6">
                <div className="relative flex flex-col items-center flex-grow flex-shrink-0 my-2">
                    <img src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-750_1723544376869.jpg" alt="item" className="w-full h-auto" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link to="/cinema/buy-tickets" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">Mua vé <i className="ml-1 fas fa-ticket-alt"></i></Link>
                    </div>
                    <div className="absolute bottom-0 right-0 bg-orange-600 text-white px-2 py-1">T18</div>
                    <div className="absolute bottom-14 right-2 text-yellow-400">★★★★☆</div>
                </div>
                <div className="text-white ">Tên phim</div>
                </div>
                <div className="group ml-6">
                <div className="relative flex flex-col items-center flex-grow flex-shrink-0 my-2">
                    <img src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-750_1723544376869.jpg" alt="item" className="w-full h-auto" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Link to="/cinema/buy-tickets" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">Mua vé <i className="ml-1 fas fa-ticket-alt"></i></Link>
                    </div>
                    <div className="absolute bottom-0 right-0 bg-orange-600 text-white px-2 py-1">T18</div>
                    <div className="absolute bottom-14 right-2 text-yellow-400">★★★★☆</div>
                </div>
                <div className="text-white ">Tên phim</div>
                </div>
                <h2 className="text-orange-600 mt-5 text-center text-lg  font-roboto right-0 rounded-sm border border-orange-600 p-2 ml-auto w-48">
                    <Link to="/cinema/movie">Xem thêm</Link>
                    </h2>
            </div>
        </div>
      </div>
    </section>
  );
};

export default voucher;
