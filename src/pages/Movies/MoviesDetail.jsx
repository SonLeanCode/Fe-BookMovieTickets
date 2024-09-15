import { useState } from 'react';
import { FaStar, FaClock, FaMapMarkerAlt, FaTicketAlt } from 'react-icons/fa';
import { Select, Button, Card, Tabs } from 'react-daisyui';

const MovieDetailPage = () => {
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedTheater, setSelectedTheater] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const movieDetails = {
    title: "Inception",
    image: "https://m.media-amazon.com/images/M/MV5BMjExMjkwNTQ0Nl5BMl5BanBnXkFtZTcwNTY0OTk1Mw@@._V1_.jpg",
    rating: "8.8",
    duration: "2h 28min",
    genre: "Sci-Fi, Action, Adventure",
    director: "Christopher Nolan",
    cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
    synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  };

  const areas = ["Downtown", "Uptown", "Suburbs", "City Center"];
  const theaters = ["CineMax Downtown", "StarPlex Uptown", "MegaScreen Suburbs", "CentralCinema"];
  const dates = ["2023-06-15", "2023-06-16", "2023-06-17", "2023-06-18"];
  const times = ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM", "10:00 PM"];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Video Section */}
        <div className="mb-8">
          <div className="relative w-full h-0" style={{ paddingTop: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Thay thế với link video của bạn
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Movie Trailer"
            ></iframe>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <img
              src={movieDetails.image}
              alt={movieDetails.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{movieDetails.title}</h1>
            <div className="flex items-center mb-4">
              <FaStar className="text-yellow-400 mr-1" />
              <span className="text-lg">{movieDetails.rating}/10</span>
            </div>
            <p className="text-gray-400 mb-4">{movieDetails.genre}</p>
            <div className="flex items-center mb-4">
              <FaClock className="mr-2" />
              <span>{movieDetails.duration}</span>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Synopsis</h2>
            <p className="mb-4">{movieDetails.synopsis}</p>
            <h2 className="text-2xl font-semibold mb-2">Director</h2>
            <p className="mb-4">{movieDetails.director}</p>
            <h2 className="text-2xl font-semibold mb-2">Cast</h2>
            <p className="mb-4">{movieDetails.cast}</p>
          </div>
        </div>

        <Card className="mt-8 bg-gray-800">
          <Card.Body>
            <Card.Title tag="h2">Đặt Vé</Card.Title>
            <p>Select your preferred viewing options</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium mb-2">Chọn Khu vực</label>
                <Select 
                  color="ghost" 
                  className="w-full bg-gray-700"
                  onChange={(e) => setSelectedArea(e.target.value)}
                >
                  <Select.Option value="" disabled selected>Chọn Khu vực</Select.Option>
                  {areas.map((area) => (
                    <Select.Option key={area} value={area}>{area}</Select.Option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Chọn rạp chiếu phim</label>
                <Select 
                  color="ghost" 
                  className="w-full bg-gray-700"
                  onChange={(e) => setSelectedTheater(e.target.value)}
                >
                  <Select.Option value="" disabled selected>Chọn rạp chiếu phim</Select.Option>
                  {theaters.map((theater) => (
                    <Select.Option key={theater} value={theater}>{theater}</Select.Option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Chọn ngày</label>
                <Select 
                  color="ghost" 
                  className="w-full bg-gray-700"
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  <Select.Option value="" disabled selected>Chọn ngày</Select.Option>
                  {dates.map((date) => (
                    <Select.Option key={date} value={date}>
                      {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Chọn thời gian</label>
                <Select 
                  color="ghost" 
                  className="w-full bg-gray-700"
                  onChange={(e) => setSelectedTime(e.target.value)}
                >
                  <Select.Option value="" disabled selected>Chọn thời gian</Select.Option>
                  {times.map((time) => (
                    <Select.Option key={time} value={time}>{time}</Select.Option>
                  ))}
                </Select>
              </div>
            </div>
            <Button color="primary" className="w-full mt-6">
              <FaTicketAlt className="mr-2" />
              Đặt Ngay
            </Button>
          </Card.Body>
        </Card>

        <Card className="mt-8 bg-gray-800">
          <Card.Body>
            <Card.Title tag="h2">Suất Chiếu</Card.Title>
            <Tabs 
              className="mt-4" 
              variant="lifted"
              value={selectedDate || dates[0]}
              onChange={(value) => setSelectedDate(value)}
            >
              {dates.map((date) => (
                <Tabs.Tab 
                  key={date} 
                  value={date}
                  className="text-white"
                >
                  {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </Tabs.Tab>
              ))}
            </Tabs>
            <div className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {theaters.map((theater) => (
                  <Card key={theater} className="bg-gray-700">
                    <Card.Body>
                      <Card.Title tag="h3" className="text-lg">{theater}</Card.Title>
                      <p className="text-sm text-gray-400 flex items-center">
                        <FaMapMarkerAlt className="mr-1" />
                        {areas[theaters.indexOf(theater)]}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {times.map((time) => (
                          <Button 
                            key={time} 
                            color="ghost" 
                            size="sm"
                            className="border border-gray-600"
                          >
                            {time}
                          </Button>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                ))}
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default MovieDetailPage;
