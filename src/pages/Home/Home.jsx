import { useState, useEffect } from "react";
import { Button, Input, Card, Carousel } from "react-daisyui";
import { FaCalendarAlt, FaClock, FaTicketAlt } from "react-icons/fa";

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const movies = [
    { id: 1, title: "Inception", image: "https://m.media-amazon.com/images/M/MV5BMjExMjkwNTQ0Nl5BMl5BanBnXkFtZTcwNTY0OTk1Mw@@._V1_.jpg", rating: "8.8" },
    { id: 2, title: "The Dark Knight", image: "https://cms-assets.webediamovies.pro/cdn-cgi/image/dpr=1,fit=scale-down,gravity=auto,metadata=none,quality=85,width=2500/production/4756/da6d320019b0cffcb187e7a20bf9cdcb.jpg", rating: "9.0" },
    { id: 3, title: "Interstellar", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS9maE7-yWPpULS8xay8yVKGnVZctnXkOXMg&s", rating: "8.6" },
    { id: 4, title: "Pulp Fiction", image: "https://www.theoriginalunderground.com/cdn/shop/products/pulp-fiction-film-poster-print-281196_1024x.jpg?v=1661524235", rating: "8.9" },
    { id: 5, title: "The Matrix", image: "https://m.media-amazon.com/images/I/613ypTLZHsL._AC_UF894,1000_QL80_.jpg", rating: "8.7" },
  ];

  const banners = [
    { id: 1, image: "https://dianaurban.com/wp-content/uploads/2010/07/inception.jpg", title: "Now Showing: Inception" },
    { id: 2, image: "https://images.savoysystems.co.uk/MCB/223274.jpg", title: "Coming Soon: The Dark Knight" },
    { id: 3, image: "https://edgroom-blogs.s3.ap-south-1.amazonaws.com/202310071805064792540_38983_u23h.jpg", title: "Special Screening: Interstellar" },
  ];

  // Automatically change the carousel banner every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000); // 3000ms = 3 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <Carousel className="w-full max-w-5xl mx-auto">
            {banners.map((banner, index) => (
              <Carousel.Item key={banner.id} className={currentBannerIndex === index ? 'block' : 'hidden'}>
                <div className="relative h-[400px] w-full">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="rounded-lg w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h2 className="text-4xl font-bold text-white">{banner.title}</h2>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6">Mua vé nhanh</h2>
          <Card className="bg-gray-800 p-6">
            <form className="space-y-4">
              <div>
                <label htmlFor="movie" className="block text-sm font-medium text-gray-300">Select Movie</label>
                <select
                  id="movie"
                  className="w-full p-2 bg-gray-700 rounded-md"
                  onChange={(e) => setSelectedMovie(e.target.value)}
                >
                  <option value="">Choose a movie</option>
                  {movies.map((movie) => (
                    <option key={movie.id} value={movie.id}>
                      {movie.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-300">Date</label>
                  <Input type="date" id="date" className="bg-gray-700" />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-medium text-gray-300">Time</label>
                  <Input type="time" id="time" className="bg-gray-700" />
                  <FaClock />
                </div>
                <div>
                  <label htmlFor="tickets" className="block text-sm font-medium text-gray-300">Number of Tickets</label>
                  <Input type="number" id="tickets" min="1" className="bg-gray-700" />
                </div>
              </div>
              <Button className="w-full">
                <FaTicketAlt className="mr-2 h-4 w-4" /> Purchase Tickets
              </Button>
            </form>
          </Card>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6">Đang chiếu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <Card key={movie.id} className="bg-gray-800">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="rounded-t-lg w-full h-[400px] object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-bold">{movie.title}</h3>
                  <p className="text-sm text-gray-400">Rating: {movie.rating}/10</p>
                </div>
                <Button variant="outline" className="w-full">
                  <FaCalendarAlt className="mr-2 h-4 w-4" /> View Showtimes
                </Button>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2023 CineMax. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
