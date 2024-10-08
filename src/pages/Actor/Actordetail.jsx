import { Link } from "react-router-dom";
import { useState } from "react";

const Actordetail = () => {
    const images = [
        "https://cdn.galaxycine.vn/media/1/4/1425307280510.cached.jpg",
        "https://cdn.galaxycine.vn/media/m/a/margot-robbie.jpg",
        "https://cdn.galaxycine.vn/media/m/a/margot-robbie-hd-pictures.jpg",
        "https://cdn.galaxycine.vn/media/m/a/margot-robbie-hd-pictures.jpg",
        "https://cdn.galaxycine.vn/media/1/4/1425307280510.cached.jpg", // Repeat for testing
        "https://cdn.galaxycine.vn/media/m/a/margot-robbie.jpg",
        "https://cdn.galaxycine.vn/media/m/a/margot-robbie-hd-pictures.jpg",
      ];
    
      const [currentIndex, setCurrentIndex] = useState(0);
      const imagesPerSlide = 4; // Number of images to show at once
    
      // Handle "Next" button click
      const handleNext = () => {
        if (currentIndex + imagesPerSlide < images.length) {
          setCurrentIndex(currentIndex + imagesPerSlide);
        }
      };
    
      // Handle "Previous" button click
      const handlePrevious = () => {
        if (currentIndex - imagesPerSlide >= 0) {
          setCurrentIndex(currentIndex - imagesPerSlide);
        }
      };
  return (
    <section className="flex justify-center bg-black">
      <div className="w-11/12 mx-auto">
        <div className="flex flex-col md:flex-row my-4 mt-28">
          <div className="text-white mr-2 flex-1">
            <div className="flex items-start p-4 pt-10 rounded-sm bg-gray-900" style={{ backgroundColor: '#181818' }}>
              <div className="flex-shrink-0">
                <img
                  src="https://cdn.galaxycine.vn/media/5/2/5211964-margot-robbie-si-racconta-a-vogue-e-marie+(1).jpg"
                  alt="Margot Robbie"
                  className="rounded-md"
                  style={{ width: '255px', height: '384px' }}
                />
              </div>
              <div className="ml-4 flex-1 flex flex-col">
                <div className="flex ">
                    <p className="px-1 text-gray-200">Trang chủ</p>
                        <span className="text-gray-200 text-sm font-normal not-italic capitalize">/</span>
                    <p className="px-1 text-gray-200">Diễn viên</p>
                        <span className="text-gray-200 text-sm font-normal not-italic capitalize">/</span>
                    <p className="px-1">Margot Robbie</p>
                </div>
                <h2 className="text-4xl font-semibold text-gray-200">Margot Robbie</h2>
                <div className="flex items-center my-2">
                  <button className="text-white  px-2 rounded" style={{ backgroundColor: '#4080ff' }}>
                    <i className="fa-regular fa-thumbs-up"></i> Thích
                  </button>
                  <div className="ml-4 text-black px-2 bg-gray-200 rounded-sm">
                    <i className="fa-solid fa-eye"></i> 324524290
                  </div>
                </div>
                    <p className="text-gray-300">
                    Đương nhiên, có nhân sắc chẳng bao giờ là đủ để đảm bảo cho chiếc vé thành công tại Hollywood, Margot còn phải cố gắng nhiều. Nhưng hiện nay nàng xứng đáng được coi là minh tinh hàng A!
                    </p>
                    <ul className="mt-6 text-black-10 text-lg font-semibold not-italic">
                        <li className="mb-2">
                            <span className="text-gray-300">Ngày sinh: </span>
                            <span >02/07/1990</span>
                        </li>
                        <li className="mb-2">
                            <span className="text-gray-300">Chiều cao: </span>
                            <span >160 cm</span>
                        </li>
                        <li className="mb-2">
                            <span className="text-gray-300">Quốc tịch: </span>
                            <span >Úc</span>
                        </li>
                        

                    </ul>
              </div>
            </div>
            <div className="p-4 relative">
                <h2 className="text-2xl font-bold border-b-2 border-gray-600 pb-2">HÌNH ẢNH</h2>
                <div className="flex justify-center items-center mt-4">
                    <button
                        onClick={handlePrevious}
                        className="absolute left-0 p-2 text-white rounded-full px-3.5 border border-white hover:bg-gray-600 disabled:opacity-50"
                        disabled={currentIndex === 0}>
                        ‹-
                    </button>
                    <div className="flex gap-4">
                        {images.slice(currentIndex, currentIndex + imagesPerSlide).map((src, index) => (
                            <img key={index} className="rounded-lg w-[190px]" src={src} alt={`Image ${currentIndex + index + 1}`} />
                        ))}
                    </div>
                    <button onClick={handleNext} 
                        className="absolute right-0 p-2 text-white rounded-full px-3.5 border border-white hover:bg-gray-600 disabled:opacity-50" 
                        disabled={currentIndex + imagesPerSlide >= images.length}>
                        -›
                    </button>
                </div>
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

export default Actordetail;
