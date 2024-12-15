import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useGetAllMoviesQuery } from '../../../services/Movies/movies.services';
import { useGetAllRoomsQuery } from '../../../services/Room/room.service';

const ShowtimeForm = ({ showtimeData, onSubmit, onCancel, isVisible }) => {
  const [formData, setFormData] = useState({
    movie_id: '',
    room_id: '',
    start_time: '',
    end_time: '',
  });

  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedCinema, setSelectedCinema] = useState('');
  
  const { data: moviesData, isLoading: moviesLoading } = useGetAllMoviesQuery();
  const { data: roomsData } = useGetAllRoomsQuery();

  const regions = [
    ...new Set(roomsData?.data.map((room) => room.cinema_id.region_id.name)),
  ];

  const cinemas = roomsData?.data.filter(
    (room) => room.cinema_id.region_id.name === selectedRegion
  );

  const filteredRooms = cinemas?.filter(
    (room) => room.cinema_id.name === selectedCinema
  );

  useEffect(() => {
    if (showtimeData) {
      setFormData({
        movie_id: showtimeData.movie_id || '',
        room_id: showtimeData.room_id || '',
        start_time: showtimeData.start_time || '',
        end_time: showtimeData.end_time || '',
      });
    }
  }, [showtimeData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  
    // Tự động cập nhật `end_time` khi `start_time` thay đổi
    if (name === 'start_time' && formData.movie_id) {
      const selectedMovie = moviesData?.data.find(
        (movie) => movie._id === formData.movie_id
      );
      if (selectedMovie?.duration) {
        const startTime = new Date(value);
        const endTime = new Date(startTime.getTime() + selectedMovie.duration * 60000); // `duration` tính bằng phút
  
        // Chuyển đổi `endTime` sang định dạng datetime-local
        const localEndTime = `${endTime.getFullYear()}-${String(
          endTime.getMonth() + 1
        ).padStart(2, '0')}-${String(endTime.getDate()).padStart(2, '0')}T${String(
          endTime.getHours()
        ).padStart(2, '0')}:${String(endTime.getMinutes()).padStart(2, '0')}`;
  
        setFormData((prev) => ({
          ...prev,
          end_time: localEndTime, // Định dạng datetime-local
        }));
      }
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Call the parent submit handler with form data
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
      <div className="bg-[#202020] rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">
          {showtimeData ? 'Edit Showtime' : 'Add Showtime'}
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Movie Selector */}
          <div className="mb-4">
            <label className="block text-white">Movie:</label>
            <select
              name="movie_id"
              value={formData.movie_id}
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
                    {movie.name} (Duration: {movie.duration} mins)
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Region Selector */}
          <div className="mb-4">
            <label className="block text-white">Region:</label>
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-black"
            >
              <option value="">Select a region</option>
              {regions.map((region, index) => (
                <option key={index} value={region}>
                  {region}
                </option>
              ))}
            </select>
          </div>

          {/* Cinema Selector */}
          <div className="mb-4">
            <label className="block text-white">Cinema:</label>
            <select
              value={selectedCinema}
              onChange={(e) => setSelectedCinema(e.target.value)}
              className="w-full px-3 py-2 border rounded-md text-black"
              disabled={!selectedRegion}
            >
              <option value="">Select a cinema</option>
              {cinemas?.map((room) => (
                <option key={room.cinema_id._id} value={room.cinema_id.name}>
                  {room.cinema_id.name}
                </option>
              ))}
            </select>
          </div>

          {/* Room Selector */}
          <div className="mb-4">
            <label className="block text-white">Room:</label>
            <select
              name="room_id"
              value={formData.room_id}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-black"
              disabled={!selectedCinema}
              required
            >
              <option value="">Select a room</option>
              {filteredRooms?.map((room) => (
                <option key={room._id} value={room._id}>
                  {room.name}
                </option>
              ))}
            </select>
          </div>

          {/* Start Time */}
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

          {/* End Time */}
          <div className="mb-4">
            <label className="block text-white">End Time:</label>
            <input
              type="datetime-local"
              name="end_time"
              value={formData.end_time}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md text-black"
              readOnly
              required
            />
          </div>

          {/* Buttons */}
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
