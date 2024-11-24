import React from 'react';

const goodMovieTheMonth = () => {
  const movies = [
    {
      id: 1,
      title: 'Phim A',
      image: 'https://via.placeholder.com/200x300',
      ticketsSold: 1000,
    },
    {
      id: 2,
      title: 'Phim B',
      image: 'https://via.placeholder.com/200x300',
      ticketsSold: 850,
    },
    {
      id: 3,
      title: 'Phim C',
      image: 'https://via.placeholder.com/200x300',
      ticketsSold: 700,
    },
  ];

  // Sắp xếp danh sách phim theo số vé bán được
  const sortedMovies = movies.sort((a, b) => b.ticketsSold - a.ticketsSold);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-red-600 mb-10">
          Phim Hay Trong Tháng
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedMovies.map((movie, index) => (
            <div
              key={movie.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition-transform duration-300"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {movie.title}
                </h2>
                <p className="text-sm text-gray-500">
                  Số vé bán ra: {movie.ticketsSold}
                </p>
                {index === 0 && (
                  <span className="inline-block mt-2 px-3 py-1 bg-red-600 text-white text-xs font-semibold rounded-full">
                    Phim bán chạy nhất
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default goodMovieTheMonth;
