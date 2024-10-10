import React, { Component } from 'react';
import { FaHeart } from 'react-icons/fa'; // Import FaHeart
import { Link } from 'react-router-dom'; // Import Link if using react-router

class MovieTicketBlog extends Component {

    movies = [
        {
            id: 1,
            views: 10,
            name: "Inception",
            image:
              "https://m.media-amazon.com/images/M/MV5BMjExMjkwNTQ0Nl5BMl5BanBnXkFtZTcwNTY0OTk1Mw@@._V1_.jpg",
            rating: "8.8",
          },
          {
            id: 2,
            views: 9,
            name: "The Dark Knight",
            image:
              "https://cms-assets.webediamovies.pro/cdn-cgi/image/dpr=1,fit=scale-down,gravity=auto,metadata=none,quality=85,width=2500/production/4756/da6d320019b0cffcb187e7a20bf9cdcb.jpg",
            rating: "9.0",
          },
          {
            id: 3,
            views: 10,
            name: "Interstellar",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS9maE7-yWPpULS8xay8yVKGnVZctnXkOXMg&s",
            rating: "8.6",
          },
          {
            id: 4,
            views: 10,
            name: "Pulp Fiction",
            image:
              "https://www.theoriginalunderground.com/cdn/shop/products/pulp-fiction-film-poster-print-281196_1024x.jpg?v=1661524235",
            rating: "8.9",
          },
      ];

    render() {
        return (
            <>
                <div className="flex mt-10 p-10">
                    <div className="w-2/3">
                        <div className="p-8">
                            <div>
                                <div className="mb-4">
                                    <h5 className="text-sm uppercase opacity-50">Sự kiện</h5>
                                    <h2 className="text-2xl">Mua 1 Vé Tặng Một Vé</h2>
                                </div>
                                <div className="h-px bg-gray-300"></div>
                                <div className="mt-4">
                                    <strong>Một trải nghiệm điện ảnh tuyệt vời đang chờ đón bạn:</strong>
                                    <p className="pt-3">
                                        Hãy sẵn sàng cho một cuộc phiêu lưu điện ảnh độc đáo! Dù là bộ phim bom tấn mới nhất hay một bộ phim độc lập, hệ thống đặt vé tiên tiến của chúng tôi cho phép bạn dễ dàng đặt vé phim yêu thích tại địa điểm và thời gian phù hợp.
                                    </p>
                                    <p className="mt-3">
                                        Với số lượng người xem phim ngày càng tăng, chúng tôi cam kết mang lại cho bạn một buổi xem phim suôn sẻ và thoải mái nhất có thể. Trải nghiệm ghế ngồi cao cấp, lựa chọn đồ ăn nhẹ và hệ thống đặt vé không rắc rối - tất cả chỉ trong một nơi!
                                    </p>
                                    <strong className="mt-4 block">Tại sao chọn mua vé tại chúng tôi?</strong>
                                    <p className="pt-3">
                                        Chúng tôi hợp tác với các rạp chiếu hàng đầu để mang đến cho bạn những ưu đãi độc quyền, đảm bảo bạn có được chỗ ngồi tốt nhất với mức giá ưu đãi nhất. Nền tảng thân thiện với người dùng của chúng tôi giúp bạn dễ dàng tìm kiếm lịch chiếu phim, đặt vé và thậm chí là đặt trước đồ ăn nhẹ để có trải nghiệm trọn vẹn.
                                    </p>
                                </div>
                                <div className="mt-8">
                                    <img src="https://i.pinimg.com/564x/49/93/8f/49938f03151c676d858df393433ae933.jpg" alt="Rạp chiếu phim" className="w-full h-auto" />
                                </div>
                                <div className="mt-4">
                                    <strong>Đặt vé ngay hôm nay!</strong>
                                    <p className="pt-3">
                                        Sẵn sàng đắm chìm vào thế giới điện ảnh chưa? Khám phá lịch chiếu phim và giữ chỗ ngay chỉ với vài cú nhấp chuột. Không cần xếp hàng chờ đợi, không lo lắng vào phút chót – chỉ cần ngồi lại, thư giãn và thưởng thức bộ phim.
                                    </p>
                                    <p className="mt-3">
                                        Từ những bộ phim hành động kịch tính đến các bộ phim tình cảm ấm áp, chúng tôi có một loạt các bộ phim phong phú để phù hợp với mọi sở thích. Đặt vé ngay bây giờ để tham gia vào phép màu điện ảnh.
                                    </p>
                                    <strong className="mt-4 block">Ưu đãi và khuyến mãi đặc biệt:</strong>
                                    <p className="pt-3">
                                        Đừng bỏ lỡ các khuyến mãi độc quyền của chúng tôi! Từ giảm giá khi đặt vé sớm đến các gói combo vé và đồ ăn nhẹ, chúng tôi có thứ gì đó dành cho mọi người yêu thích phim.
                                    </p>
                                </div>
                                <div className="flex flex-col items-center mt-8">
                                    <div className="h-px bg-gray-300 w-full"></div>
                                    <ul className="flex space-x-4 mt-2">
                                        <li className="text-gray-500"><i className="fab fa-facebook"></i></li>
                                        <li className="text-gray-500"><i className="fab fa-instagram"></i></li>
                                        <li className="text-gray-500"><i className="fab fa-tiktok"></i></li>
                                    </ul>
                                </div>
                                <div className="text-center mt-10">
                                    <div className="text-uppercase">
                                        <span className='text-slate-400'>_ VÉ XEM PHIM _</span>
                                        <h2 className="mt-2 text-2xl uppercase font-medium">Bộ phim được yêu thích</h2>
                                    </div>
                                    <div className="mt-5 flex h-64 justify-between">
                                        {this.movies.map((movie) => (
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
                                                            <button className="overlay-favorite">
                                                                <FaHeart />
                                                            </button>
                                                            <div className="button-container flex flex-col space-y-1">
                                                                <Link to="/cinema/detail" className="overlay-btn-xh w-38 text-white text-center py-2">
                                                                Trailer <i className="ml-1 fas fa-video"></i>
                                                                </Link>
                                                                <Link to="/" className="overlay-btn-xh w-38 text-white text-center py-2">
                                                                Mua vé <i className="ml-1 fas fa-ticket-alt"></i>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    </div>

                    <div className="w-1/3 mt-10 pl-4">
                        <h5>Các Sự kiện cùng chủ đề</h5>
                        <div className="h-px bg-gray-300 my-4 opacity-25"></div>
                        <div>
                            <div className="flex items-center mb-2">
                                <img src="https://i.pinimg.com/564x/03/a6/a6/03a6a6eab429e0feff108c32d19fc2ac.jpg" alt="" className="rounded-2 mr-2" width="60px" height="60px" />
                                <h6>Khuyến mãi đặc biệt cho phim Johnny Depp</h6>
                            </div>
                            <div className="flex items-center mb-2">
                                <img src="https://i.pinimg.com/564x/65/45/9d/65459d98d1185663df3401e64ec60a0e.jpg" alt="" className="rounded-2 mr-2" width="60px" height="60px" />
                                <h6>Ưu đãi 30% cho combo bắp nước với Emma Watson</h6>
                            </div>
                            <div className="flex items-center mb-2">
                                <img src="https://i.pinimg.com/564x/9e/27/00/9e2700be9b04805c7017d9695a9dd111.jpg" alt="" className="rounded-2 mr-2" width="60px" height="60px" />
                                <h6>Tặng vé miễn phí cho phim Robert Downey Jr.</h6>
                            </div>
                            <div className="flex items-center mb-2">
                                <img src="https://i.pinimg.com/736x/93/09/0f/93090f65a27924397b98cc1f44bc8b3d.jpg" alt="" className="rounded-2 mr-2" width="60px" height="60px" />
                                <h6>Mua 1 tặng 1 vé cho Robert Downey Jr.</h6>
                            </div>
                        </div>

                        <h5 className="mt-4">Bài viết mới nhất</h5>
                        <div className="h-px bg-gray-300 my-4 opacity-25"></div>
                        <div>
                            <div className="flex items-center mb-2">
                                <img src="https://i.pinimg.com/564x/2e/fe/d5/2efed50584cdf7379b9614e42a9882f2.jpg" alt="" className="rounded-2 mr-2" width="60px" height="60px" />
                                <h6>Ưu đãi vé xem phim đặc biệt sớm</h6>
                            </div>
                            <div className="flex items-center mb-2">
                                <img src="https://i.pinimg.com/564x/e0/5c/01/e05c015e48fff20ff1aab63541f91c57.jpg" alt="" className="rounded-2 mr-2" width="60px" height="60px" />
                                <h6>Hướng dẫn đặt trước đồ ăn nhẹ với vé</h6>
                            </div>
                            <div className="flex items-center mb-2">
                                <img src="https://i.pinimg.com/564x/77/5e/38/775e38ded6abd4bebd0311b72416983f.jpg" alt="" className="rounded-2 mr-2" width="60px" height="60px" />
                                <h6>Rạp chiếu tốt nhất cho trải nghiệm sang trọng</h6>
                            </div>
                            <div className="flex items-center mb-2">
                                <img src="https://i.pinimg.com/564x/63/03/ea/6303ead9fcba8cd3fdb5ea74f098799b.jpg" alt="" className="rounded-2 mr-2" width="60px" height="60px" />
                                <h6>Công nghệ điện ảnh mới trong năm 2024</h6>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export default MovieTicketBlog;
