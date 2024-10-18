import PropTypes from 'prop-types';

const MovieList = ({ movies, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Director</th>
            <th>Producer</th>
            <th>Rating</th>
            <th>Duration</th>
            <th>Release Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.name}</td>
              <td>
                <img src={movie.img} alt={movie.name} className="w-20" />
              </td>
              <td>{movie.description.substring(0, 70) + '...'}</td>
              <td>{movie.director}</td>
              <td>{movie.producer}</td>
              <td>{movie.rating}</td>
              <td>{movie.duration}</td>
              <td>{new Date(movie.release_date).toLocaleDateString()}</td>
              <td>
                <button onClick={() => onEdit(movie)} className="btn btn-warning mr-2">Edit</button>
                <button onClick={() => onDelete(movie._id)} className="btn btn-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// Định nghĩa PropTypes cho MovieList
MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      img: PropTypes.string,
      description: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      producer: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
      duration: PropTypes.string.isRequired,
      release_date: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MovieList;
