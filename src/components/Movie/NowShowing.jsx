import { Link } from 'react-router-dom';

const NowShowing = () => {
  return (
    <div className="md:col-span-1">
      <h2 className="mb-6 text-2xl font-bold text-gray-200">
        <span className="text-red-500">|</span> Phim đang chiếu
      </h2>
      <div className="space-y-6">
        <div className="group relative overflow-hidden rounded-lg shadow-lg">
          <img
            src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-750_1723544376869.jpg"
            alt="item"
            className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Link
              to="/detail"
              className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
            >
              Mua vé <i className="fas fa-ticket-alt ml-2"></i>
            </Link>
          </div>
          <div className="absolute bottom-4 left-4 rounded-lg bg-orange-600 px-3 py-1 text-white">
            T18
          </div>
          <div className="absolute bottom-4 right-4 text-yellow-400">
            ★★★★☆
          </div>
        </div>
        <div className="text-center text-gray-200">Tên phim</div>
      </div>
    </div>
  );
};

export default NowShowing;
