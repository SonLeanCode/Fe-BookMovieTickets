// MovieList.jsx
import { useEffect, useState } from 'react';
import { Movie } from './api/movies';
import { useNavigate } from 'react-router-dom';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const movieData = await Movie();
      setMovies(movieData);
    };
    fetchMovies();
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/movies/${movieId}`); // Chuyển đến trang chi tiết phim
  };

  return (
    <div className="container mx-auto p-4 mt-32">
      <h1 className="text-2xl font-bold mb-4">Danh Sách Phim</h1>
      <div className="grid grid-cols-2 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="border rounded-lg p-4 cursor-pointer hover:shadow-lg"
            onClick={() => handleMovieClick(movie.id)}
          >
            <img src={movie.image_url} alt={movie.title} className="w-full h-48 object-cover rounded" />
            <h2 className="text-xl font-semibold mt-2">{movie.title}</h2>
            <p>{movie.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieList;
