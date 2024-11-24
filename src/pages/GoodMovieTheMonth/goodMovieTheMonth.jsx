import React from 'react';
import NowShowingMovies from '../Actor/NowShowingMovies';

const MoviePage = () => {
  const topMovies = [
    {
      id: 1,
      name: 'Phim A',
      thumbnail: 'https://via.placeholder.com/255x170',
      description: 'Phim hay trong tháng với số lượng vé bán cao nhất.',
      views: 1200,
    },
    {
      id: 2,
      name: 'Phim B',
      thumbnail: 'https://via.placeholder.com/255x170',
      description: 'Một bộ phim nổi bật trong tháng.',
      views: 950,
    },
  ];

  return (
    <section className="flex justify-center bg-black">
      <div className="mx-24 w-11/12">
        <div className="mt-32 my-4 flex flex-col md:flex-row">
          {/* Phim Hay Trong Tháng */}
          <div className="mr-2 md:w-8/12 text-white">
            <div className="relative">
            <h2 className="text-3xl p-2 font-extrabold text-white tracking-wide uppercase">
                | Phim Hay Trong Tháng
              </h2>
              {/* Gạch dưới full chiều rộng */}
              <div className="absolute bottom-0  left-9 w-96 h-1 bg-red-500"></div>
            </div>

            {topMovies.map((movie) => (
              <div
                className="flex items-start rounded-sm bg-gray-900 p-4 mb-4"
                style={{ backgroundColor: '#181818' }}
                key={movie.id}
              >
                <div className="flex-shrink-0">
                  <img
                    src={movie.thumbnail}
                    alt={movie.name}
                    className="rounded-md"
                    style={{ width: '255px', height: '170px' }}
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <h2 className="text-lg font-semibold">{movie.name}</h2>
                  <div className="my-2 flex items-center">
                    <button
                      className="rounded px-2 text-white"
                      style={{ backgroundColor: '#4080ff' }}
                    >
                      <i className="fa-regular fa-thumbs-up"></i> Thích
                    </button>
                    <div className="ml-4 rounded-sm bg-gray-200 px-2 text-black">
                      <i className="fa-solid fa-eye"></i> {movie.views}
                    </div>
                  </div>
                  <p className="text-gray-300">{movie.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Phim Đang Chiếu */}
          <div className='mt-20'></div>
          <NowShowingMovies />
        </div>
      </div>
    </section>
  );
};

export default MoviePage;
