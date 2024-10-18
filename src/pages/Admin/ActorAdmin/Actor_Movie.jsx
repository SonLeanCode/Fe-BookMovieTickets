import { useState } from 'react';
import {
  useAddActorsToMovieMutation,
  useRemoveActorFromMovieMutation,
  useGetAllActorMoviesQuery,
} from '../../../services/Actor/actor_movies.service';
import { useGetAllActorsQuery } from '../../../services/Actor/actor.service';
import { useGetAllMoviesQuery } from '../../../services/Movies/movies.services';

const Actor_Movie = () => {
  const { data: actorMovieData, isLoading: actorMovieLoading, refetch, error: actorMovieError } = useGetAllActorMoviesQuery();
  const { data: actorsData, isLoading: actorLoading } = useGetAllActorsQuery();
  const { data: moviesData, isLoading: movieLoading } = useGetAllMoviesQuery();

  const [addActorsToMovie] = useAddActorsToMovieMutation();
  const [removeActorFromMovie] = useRemoveActorFromMovieMutation();
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [selectedActors, setSelectedActors] = useState([]);

  const handleAddActorsToMovie = async () => {
    if (!selectedMovieId || selectedActors.length === 0) {
      console.error('No movie selected or no actors selected');
      return;
    }

    try {
      await addActorsToMovie({ movieId: selectedMovieId, actorIds: selectedActors }).unwrap();
      setSelectedActors([]); // Reset selection after adding
      refetch();
    } catch (err) {
      console.error('Failed to add actors to movie: ', err);
    }
  };

  const handleRemoveActorFromBox = (actorId) => {
    setSelectedActors((prevSelected) =>
      prevSelected.includes(actorId)
        ? prevSelected.filter((id) => id !== actorId) // Remove actorId if it exists
        : prevSelected // Keep it as is if not found
    );
  };

  const handleRemoveActorFromMovie = async (movieId, actorId) => {
    if (!movieId || !actorId) return; // Ensure both IDs are present
    try {
      await removeActorFromMovie({ movieId, actorId }).unwrap();
      setSelectedActors((prev) => prev.filter((id) => id !== actorId));
      refetch();
    } catch (err) {
      console.error('Failed to remove actor from movie: ', err);
    }
  };

  const handleActorChange = (actorId) => {
    setSelectedActors((prevSelected) =>
      prevSelected.includes(actorId)
        ? prevSelected.filter((id) => id !== actorId) // Remove actorId if it exists
        : [...prevSelected, actorId] // Add actorId if it doesn't exist
    );
  };

  if (actorLoading || movieLoading || actorMovieLoading) {
    return <div>Loading data, please wait...</div>;
  }

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Quản Lý Diễn Viên Phim</h1>

      {/* Movie Selection */}
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

      {/* Add Actors to Movie */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Thêm Diễn Viên vào Phim</h2>
        <div className="mt-2">
          {actorsData?.map((actor) => (
            <div key={actor._id} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`actor-${actor._id}`}
                value={actor._id}
                checked={selectedActors.includes(actor._id)}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleActorChange(actor._id);
                  } else {
                    handleRemoveActorFromBox(actor._id);
                  }
                }}
                className="mr-2"
              />
              <label htmlFor={`actor-${actor._id}`}>{actor.name}</label>
            </div>
          ))}
        </div>
        <button
          onClick={handleAddActorsToMovie}
          className="mt-2 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Thêm Diễn Viên
        </button>
      </div>

      {/* Display Actor-Movie Relationships */}
      <div>
        <h2 className="text-xl font-semibold">Tất Cả Các Mối Quan Hệ Diễn Viên-Phim</h2>
        {actorMovieError && <div className="text-red-500">Failed to load actor-movie relationships: {actorMovieError.message}</div>}
        <ul className="list-disc pl-5">
          {actorMovieData?.actorMovies.map((item) => (
            <li key={item._id} className="flex justify-between items-center mb-2">
              Phim: {item?.movie_id?.name} - Diễn viên: {item?.actor_id?.name}
              <div>
                <button
                  onClick={() => handleRemoveActorFromMovie(item.movie_id._id, item.actor_id._id)}
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

export default Actor_Movie;
