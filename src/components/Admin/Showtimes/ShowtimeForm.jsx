import { useState, useEffect } from 'react';
import { useGetAllMoviesQuery } from '../../../services/Movies/movies.services';
import { useGetAllRoomsQuery } from '../../../services/Room/room.service';
import PropTypes from 'prop-types';
const ShowtimeForm = ({ showtimeData, onSubmit, onCancel, isVisible }) => {
  const [formData, setFormData] = useState({
    movie_id: '',
    room_id: '',
    start_time: '',
    end_time: '',
  });

  // Fetch movies and rooms data using the hooks
  const { data: moviesData, isLoading: moviesLoading } = useGetAllMoviesQuery();
  const { data: roomsData, isLoading: roomsLoading } = useGetAllRoomsQuery();

  // Populate form data when editing an existing showtime
  useEffect(() => {
    if (showtimeData) {
      setFormData({
        movie_id: showtimeData || '',
        room_id: showtimeData|| '',
        start_time: showtimeData || '',
        end_time: showtimeData || '',
      });
    }
  }, [showtimeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Call the parent submit handler with form data
  };

  if (!isVisible) return null; // Don't render the form if it's not visible

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
      <div className="bg-[#202020] rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">
          {showtimeData ? 'Edit Showtime' : 'Add Showtime'}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white ">Movie:</label>
            <select
              name="movie"
              value={formData.movie}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-black"
              required
            >
              <option value="">Select a movie</option>
              {moviesLoading ? (
                <option>Loading movies...</option>
              ) : (
                moviesData?.data.map((movie) => (
                  <option key={movie._id} value={movie._id}>
                    {movie.name}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-white">Room:</label>
            <select
              name="room"
              value={formData.room}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-black"
              required
            >
              <option value="">Select a room</option>
              {roomsLoading ? (
                <option>Loading rooms...</option>
              ) : (
                roomsData?.data.map((room) => (
                  <option key={room._id} value={room._id}>
                    {room.name}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-white">Start Time:</label>
            <input
              type="datetime-local"
              name="start_time"
              value={formData.start_time}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-black"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white">End Time:</label>
            <input
              type="datetime-local"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-black"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md"
            >
              {showtimeData ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

ShowtimeForm.propTypes = {
  showtimeData: PropTypes.shape({
    movie_id: PropTypes.string,
    room_id: PropTypes.string,
    start_time: PropTypes.string,
    end_time: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isVisible: PropTypes.bool.isRequired,
};

export default ShowtimeForm;
