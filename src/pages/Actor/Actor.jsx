import { Link } from "react-router-dom";

const Actor = () => {
  return (
    <section className="flex justify-center bg-black">
      <div className="w-11/12 mx-auto">
        <div className="bg-gray-900 p-4 rounded-lg mt-28" style={{ backgroundColor: '#181818' }}>
          <h2 className="text-white text-2xl font-semibold font-roboto pb-2">
            <span className="text-red-600 ">|</span> DIỄN VIÊN
          </h2>
          <div className="flex">
            <select className="bg-gray-900 text-white border border-white rounded-md p-2 ml-4 mr-4">
              <option>Quốc Gia</option>
              <option>Việt Nam</option>
              <option>Hàn Quốc</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col md:flex-row my-4">
          <div className="text-white mr-2 flex-1">
            <div className="flex items-start p-4 rounded-sm bg-gray-900" style={{ backgroundColor: '#181818' }}>
              <div className="flex-shrink-0">
                <img
                  src="https://cdn.galaxycine.vn/media/c/h/chris-ngang_1.jpg"
                  alt="Margot Robbie"
                  className="rounded-md"
                  style={{ width: '255px', height: '170px' }}
                />
              </div>
              <div className="ml-4 flex-1 flex flex-col">
                <h2 className="text-lg font-semibold">Margot Robbie</h2>
                <div className="flex items-center my-2">
                  <button className="text-white hover:bg-yellow-400 px-2 py-1 rounded" style={{ backgroundColor: '#4080ff' }}>
                    <i className="fa-regular fa-thumbs-up"></i> Thích
                  </button>
                  <div className="ml-4 text-black px-2 bg-gray-200 rounded-sm">
                    <i className="fa-solid fa-eye"></i> 324524290
                  </div>
                </div>
                <p className="text-gray-300">
                  Đương nhiên, có nhân sắc chẳng bao giờ là đủ để đảm bảo cho chiếc vé thành công tại Hollywood, Margot còn phải cố gắng nhiều. Nhưng hiện nay nàng xứng đáng được coi là minh tinh hàng A!
                </p>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[30%] mt-4 md:mt-0">
            <h2 className="text-white text-2xl font-semibold font-roboto text-center mb-3">Phim đang chiếu</h2>
            <div className="group ml-6">
              <div className="relative flex flex-col items-center flex-grow flex-shrink-0 my-2">
                <img src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-750_1723544376869.jpg" alt="item" className="w-full h-auto" />
                <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link to="/detail" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">Mua vé</Link>
                </div>
                <div className="absolute bottom-0 right-0 bg-orange-600 text-white px-2 py-1">T18</div>
                <div className="absolute bottom-14 right-2 text-yellow-400">★★★★☆</div>
              </div>
              <div className="text-white text-center">Tên phim</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Actor;
