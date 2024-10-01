import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Movie, Genre, Actor, Movie_Genre, Movie_Actor, Region, Cinema, Showtime  } from './api/movies';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [genres, setGenres] = useState([]);
  const [actors, setActors] = useState([]);
  const [dates, setDates] = useState([]);
  const [regions, setRegions] = useState([]);
  const [selectedRegionId, setSelectedRegionId] = useState('');
  const [cinemas, setCinemas] = useState([]);
  const [selectedCinemaId, setSelectedCinemaId] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  useEffect(() => {
    const fetchMovieDetail = async () => {
      const movieData = await Movie();
      const selectedMovie = movieData.find((m) => m.id === parseInt(id));
      setMovie(selectedMovie);

      // Fetch genres and actors
      const genreData = await Genre();
      const actorData = await Actor();
      const movieGenreData = await Movie_Genre();
      const movieActorData = await Movie_Actor();

      // Find genres for the selected movie
      const movieGenres = movieGenreData
        .filter(mg => mg.movie_id === selectedMovie.id)
        .map(mg => genreData.find(g => g.id === mg.genre_id));

      setGenres(movieGenres);

      // Find actors for the selected movie
      const movieActors = movieActorData
        .filter(ma => ma.movie_id === selectedMovie.id)
        .map(ma => actorData.find(a => a.id === ma.actor_id));

      setActors(movieActors);
    };

    fetchMovieDetail();
  }, [id]);

  useEffect(() => {
    // Generate upcoming dates
    const today = new Date();
    const upcomingDates = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      return date.toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric' });
    });
    setDates(upcomingDates);
  }, []);

  useEffect(() => {
    const fetchRegions = async () => {
      const regionData = await Region();
      setRegions(regionData);
    };

    fetchRegions();
  }, []);

  const handleRegionChange = async (event) => {
    const regionId = event.target.value;
    setSelectedRegionId(regionId);
    
    // Fetch cinemas based on the selected region
    const cinemaData = await Cinema();
    const filteredCinemas = cinemaData.filter(cinema => cinema.region_id === parseInt(regionId));
    setCinemas(filteredCinemas);
  };

  const handleCinemaClick = async (cinemaId) => {
    setSelectedCinemaId(cinemaId); // Set the selected cinema
    const fetchedShowtimes = await Showtime(cinemaId, id); // Fetch showtimes for selected cinema and movie
    setShowtimes(fetchedShowtimes); // Set showtimes in state
    console.log(fetchedShowtimes)
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4 mt-32">
      <h1 className="text-2xl font-bold mb-4">{movie.title}</h1>
      <img src={movie.image_url} alt={movie.title} className="w-full h-96 object-cover rounded" />
      <p className="mt-4">{movie.description}</p>
      <p className="mt-2"><strong>Ngày phát hành:</strong> {movie.release_date}</p>
      <p className="mt-2"><strong>Thời gian:</strong> {movie.duration} phút</p>

      <h2 className="mt-4 text-lg font-semibold">Thể loại:</h2>
      <ul className="list-disc pl-5">
        {genres.map((genre) => (
          <li key={genre.id}>{genre.name}</li>
        ))}
      </ul>

      <h2 className="mt-4 text-lg font-semibold">Diễn viên:</h2>
      <ul className="list-disc pl-5">
        {actors.map((actor) => (
          <li key={actor.id}>{actor.name}</li>
        ))}
      </ul>

      <h2 className="mt-4 text-lg font-semibold">Ngày:</h2>
      <ul className="list-disc pl-5">
        {dates.map((date, index) => (
          <li key={index}>{date}</li>
        ))}
      </ul>

      <h2 className="mt-4 text-lg font-semibold">Chọn khu vực:</h2>
      <select value={selectedRegionId} onChange={handleRegionChange} className="mb-4 p-2 border rounded">
        <option value="">Chọn khu vực</option>
        {regions.map(region => (
          <option key={region.id} value={region.id}>{region.name}</option>
        ))}
      </select>

      {selectedRegionId && (
        <>
          <h2 className="mt-4 text-lg font-semibold">Rạp phim:</h2>
          <ul className="list-disc pl-5">
          {cinemas.map((cinema) => (
              <li key={cinema.id}>
                <button onClick={() => handleCinemaClick(cinema.id)} className="text-blue-500 underline">
                  {cinema.name} - {cinema.address}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

    {selectedCinemaId && showtimes.length > 0 && (
        <>
          <h2 className="mt-4 text-lg font-semibold">Suất chiếu:</h2>
          <ul className="list-disc pl-5">
            {showtimes.map((showtime) => (
              <li key={showtime.id}>
                {new Date(showtime.start_time).toLocaleTimeString('vi-VN', { hour: 'numeric', minute: 'numeric', hour12: false })} - 
                {new Date(showtime.end_time).toLocaleTimeString('vi-VN', { hour: 'numeric', minute: 'numeric', hour12: false })}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default MovieDetail;
