import { useState } from 'react';
import {
  useAddGenresToMovieMutation,
  useRemoveGenreFromMovieMutation,
  useGetAllMovieGenreQuery,
} from '../../../services/Genre/genre_movies.service';
import { useGetAllGenresQuery } from '../../../services/Genre/genre.service';
import { useGetAllMoviesQuery } from '../../../services/Movies/movies.services';

const Genre_Movie = () => {
  const { data: movieGenreData, isLoading: movieGenreLoading, refetch } = useGetAllMovieGenreQuery();
  const { data: genresData, isLoading: genreLoading } = useGetAllGenresQuery();
  const { data: moviesData, isLoading: movieLoading } = useGetAllMoviesQuery();

  const [addGenresToMovie] = useAddGenresToMovieMutation();
  const [removeGenreFromMovie] = useRemoveGenreFromMovieMutation();
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const handleAddGenresToMovie = async () => {
    if (!selectedMovieId || selectedGenres.length === 0) {
      console.error('No movie selected or no genres selected');
      return;
    }

    try {
      await addGenresToMovie({ movieId: selectedMovieId, genreIds: selectedGenres }).unwrap();
      setSelectedGenres([]); // Reset selection after adding
      refetch();
    } catch (err) {
      console.error('Failed to add genres to movie: ', err);
    }
  };

  const handleRemoveGenreFromBox = (genreId) => {
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(genreId)
        ? prevSelected.filter((id) => id !== genreId) // Remove genreId if it exists
        : prevSelected // Keep it as is if not found
    );
  };

  const handleRemoveGenreFromMovie = async (movieId, genreId) => {
    if (!movieId || !genreId) return; // Ensure both IDs are present
    try {
      await removeGenreFromMovie({ movieId, genreId }).unwrap();
      setSelectedGenres((prev) => prev.filter((id) => id !== genreId));
      refetch();
    } catch (err) {
      console.error('Failed to remove genre from movie: ', err);
    }
  };

  const handleGenreChange = (genreId) => {
    setSelectedGenres((prevSelected) =>
      prevSelected.includes(genreId)
        ? prevSelected.filter((id) => id !== genreId) // Remove genreId if it exists
        : [...prevSelected, genreId] // Add genreId if it doesn't exist
    );
  };

  if (genreLoading || movieLoading || movieGenreLoading) return <div>Loading...</div>;

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Quản Lý Thể Loại Phim</h1>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Chọn Phim</h2>
        <select
          onChange={(e) => setSelectedMovieId(e.target.value)}
          value={selectedMovieId || ''}
          className="mt-2 p-2 border border-gray-300 rounded w-full text-black"
        >
          <option value="">Chọn một bộ phim</option>
          {moviesData?.movies?.map((movie) => (
            <option key={movie._id} value={movie._id}>
              {movie.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <h2 className="text-xl font-semibold">Thêm Thể Loại vào Phim</h2>
        <div className="mt-2">
          {genresData?.genres?.map((genre) => (
            <div key={genre._id} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`genre-${genre._id}`}
                value={genre._id}
                checked={selectedGenres.includes(genre._id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleGenreChange(genre._id);
                  } else {
                    handleRemoveGenreFromBox(genre._id);
                  }
                }}
                className="mr-2"
              />
              <label htmlFor={`genre-${genre._id}`}>{genre.name}</label>
            </div>
          ))}
        </div>
        <button
          onClick={handleAddGenresToMovie}
          className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Thêm Thể Loại
        </button>
      </div>


      <div>
        <h2 className="text-xl font-semibold">Tất Cả Các Mối Quan Hệ Thể Loại-Phim</h2>
        <ul className="list-disc pl-5">
          {movieGenreData?.genres.map((item) => (
            <li key={item._id} className="flex justify-between items-center mb-2">
              Phim: {item?.movie_id?.name} - Thể loại: {item?.genre_id?.name}
              <div>
                <button
                  onClick={() => handleRemoveGenreFromMovie(item.movie_id._id, item.genre_id._id)}
                  className="ml-2 p-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Xoá
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Genre_Movie;
