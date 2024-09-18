import { useState, useRef, useEffect } from "react";
import { Button, Card, Carousel } from "react-daisyui";
import { FaCalendarAlt, FaArrowLeft, FaArrowRight, FaHeart } from "react-icons/fa";
import "./Home.css";

const Home = () => {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [showTitle, setShowTitle] = useState(false);
  const movieContainerRef = useRef(null);

  const banners = [
    {
      id: 1,
      image: "https://assets.nflxext.com/ffe/siteui/vlv3/85ff76db-39e5-423a-afbc-97d3e74db71b/null/VN-en-20240909-TRIFECTA-perspective_5d4963ce-7ce5-4965-a588-be03ddb229dd_large.jpg",
      title: "Phim ảnh, chương trình truyền hình cùng rất nhiều nội dung khác không giới hạn!",
      subtitle: "Giá chỉ từ 50.000 VNĐ - 90.000 VNĐ"
    }
  ];

  const movies = [
    { id: 1, views: 10, name: "Inception", image: "https://m.media-amazon.com/images/M/MV5BMjExMjkwNTQ0Nl5BMl5BanBnXkFtZTcwNTY0OTk1Mw@@._V1_.jpg", rating: "8.8" },
    { id: 2, views: 9, name: "The Dark Knight", image: "https://cms-assets.webediamovies.pro/cdn-cgi/image/dpr=1,fit=scale-down,gravity=auto,metadata=none,quality=85,width=2500/production/4756/da6d320019b0cffcb187e7a20bf9cdcb.jpg", rating: "9.0" },
    { id: 3, views: 10, name: "Interstellar", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS9maE7-yWPpULS8xay8yVKGnVZctnXkOXMg&s", rating: "8.6" },
    { id: 4, views: 10, name: "Pulp Fiction", image: "https://www.theoriginalunderground.com/cdn/shop/products/pulp-fiction-film-poster-print-281196_1024x.jpg?v=1661524235", rating: "8.9" },
    { id: 5, views: 10, name: "The Matrix", image: "https://m.media-amazon.com/images/I/613ypTLZHsL._AC_UF894,1000_QL80_.jpg", rating: "8.7" },
    { id: 6, views: 9, name: "The Matrix", image: "https://m.media-amazon.com/images/I/613ypTLZHsL._AC_UF894,1000_QL80_.jpg", rating: "8.7" },
    { id: 7, views: 9, name: "The Matrix", image: "https://m.media-amazon.com/images/I/613ypTLZHsL._AC_UF894,1000_QL80_.jpg", rating: "8.7" },
    { id: 8, views: 9, name: "The Matrix", image: "https://m.media-amazon.com/images/I/613ypTLZHsL._AC_UF894,1000_QL80_.jpg", rating: "8.7" },
    { id: 9, views: 9, name: "The Matrix", image: "https://m.media-amazon.com/images/I/613ypTLZHsL._AC_UF894,1000_QL80_.jpg", rating: "8.7" },
    { id: 10, views: 9, name: "The Matrix", image: "https://m.media-amazon.com/images/I/613ypTLZHsL._AC_UF894,1000_QL80_.jpg", rating: "8.7" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 3000);

    setTimeout(() => {
      setShowTitle(true);
    }, 1000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const scrollLeft = () => {
    if (movieContainerRef.current) {
      movieContainerRef.current.scrollBy({ left: -1500, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (movieContainerRef.current) {
      movieContainerRef.current.scrollBy({ left: 1500, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-black text-gray-100">
      <main className= "bg-black">

        <section className="mb-12 relative bg-black">
          <Carousel className="w-full h-screen bg-black">
            {banners.map((banner, index) => (
              <Carousel.Item key={banner.id} className={currentBannerIndex === index ? 'block' : 'hidden'}>
                <div className="relative w-full h-full">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
                    <h2 className={`text-6xl font-bold text-white ${showTitle ? 'slide-up' : ''} max-w-4xl`}>
                      {banner.title}
                    </h2>
                    <p className={`text-xl font-bold text-gray-300 mt-4 ${showTitle ? 'slide-up' : ''}`}>
                      {banner.subtitle}
                    </p>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </section>


        <section className="movie-section">
          <h3 className="text-5xl font-bold mb-6 mx-10">| Xu hướng hiện nay</h3>
          <div className="container mx-auto px-4 relative">
            <button className="navigation-button left" onClick={scrollLeft}>
              <FaArrowLeft />
            </button>
            <button className="navigation-button right" onClick={scrollRight}>
              <FaArrowRight />
            </button>
            <div className="movie-container" ref={movieContainerRef}>
              {movies.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <img
                    src={movie.image}
                    alt={movie.name}
                    className="rounded-t-lg w-full h-[400px] object-cover"
                  />
                  <div className="overlay">
                    <div className="overlay-content">
                      <h4 className="movie-name">{movie.name}</h4>
                      <p className="movie-rating">Đánh giá: {movie.rating}</p>
                      Yêu thích <button className="overlay-favorite">
                         <FaHeart />
                      </button>
                      <div className="button-container">
                        <button className="overlay-button"><i className="fas fa-video"></i> Trailer</button>
                        <button className="overlay-button">Mua vé <i className="fas fa-arrow-right"></i> </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="section-divider-animation"></div>


        <section className="top-movie-section my-6">
          <h3 className="text-5xl font-bold mb-6 mx-10">Được đánh giá cao</h3>
          <p className="hot-monthly-movies">Hot trong tháng</p>
          <div className="top-movie-container">
            {movies.map((movie) => (
              <div key={movie.id} className="top-movie-card">
                <img
                  src={movie.image}
                  alt={movie.name}
                  className="rounded-t-lg object-cover"
                />
                <div className="overlay">
                  <div className="overlay-content">
                    <h4 className="movie-name">{movie.name}</h4>
                    <p className="movie-rating">Đánh giá: {movie.rating}</p>
                    Yêu thích <button className="overlay-favorite">
                      <FaHeart />
                    </button>
                    <div className="button-container">
                      <button className="overlay-button"><i className="fas fa-video"></i> Trailer</button>
                      <button className="overlay-button">Mua vé <i className="fas fa-arrow-right"></i></button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
            

        <section className="member-section">
          <div className="member-background">
            <h1>Chương trình thành viên</h1>
            <h2>Đăng ký thành viên để nhận nhiều ưu đãi hấp dẫn</h2>
            <div className="cards-container">
              <div className="member-card">
                <img src="https://api-website.cinestar.com.vn/media/wysiwyg/CMSPage/Member/Desktop519x282_CMember.webp" alt="Thành viên mới" />
                <h2>Thành viên mới</h2>
                <p>Thẻ có nhiều ưu đãi cho thành viên mới</p>
                <button>Tìm hiểu ngay</button>
              </div>
              <div className="member-card">
                <img src="https://api-website.cinestar.com.vn/media/wysiwyg/CMSPage/Member/c-vip.webp" alt="Thành viên Vip" />
                <h2>Thành viên Vip</h2>
                <p>Thẻ Vip sở hữu nhiều ưu đãi độc quyền</p>
                <button>Tìm hiểu ngay</button>
              </div>
            </div>
          </div>
        </section>



      </main>
    </div>
  );
};

export default Home;
