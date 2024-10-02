import { useState } from 'react';
import { FaStar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
// , FaSmile

const MovieDetailPage = () => {
  const [newComment, setNewComment] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  
  const movieDetails = {
    title: "Inception",
    image: "https://m.media-amazon.com/images/M/MV5BMjExMjkwNTQ0Nl5BMl5BanBnXkFtZTcwNTY0OTk1Mw@@._V1_.jpg",
    rating: "8.8",
    duration: "180 phút",
    genre: "Hành động",
    director: "Christopher Nolan",
    cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
    country: "Mỹ",
    noidung: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
  };

  // Danh sách bình luận (mẫu)
  const [comments, setComments] = useState([
    {
      user: "User1",
      content: "Phim hay quá! Mình rất thích!",
      time: "2 giờ trước",
    },
    {
      user: "User2",
      content: "Nội dung rất thú vị, diễn xuất xuất sắc.",
      time: "1 giờ trước",
    },
  ]);

  // Danh sách phim đang chiếu
  const currentlyShowingMovies = [
    {
      title: "Movie 1",
      image: "https://ss-images.saostar.vn/2023/6/13/pc/1686674614600/saostar-ja7wasperc5pq01h.png",
    },
    {
      title: "Movie 2",
      image: "https://toquoc.mediacdn.vn/thumb_w/640/280518851207290880/2023/6/9/fs0obfgx0amlstl-copy-1686280044314175990691.jpeg",
    },
    {
      title: "Movie 3",
      image: "https://i.ytimg.com/vi/DkNym1I7Mok/maxresdefault.jpg",
    },
  ];

  // const emojis = ['😊', '😂', '😍', '😢', '😡', '👍', '👎'];

  const handleCommentSubmit = () => {
    if (newComment.trim() !== '') {
      const newCommentObj = {
        user: "Bạn", // Hoặc tên người dùng hiện tại
        content: `${selectedEmoji ? selectedEmoji : ''} ${newComment}`,
        time: "Vừa xong", // Có thể thay đổi thành thời gian thực tế
      };
      setComments([...comments, newCommentObj]);
      setNewComment('');
      setSelectedEmoji(null); // Reset emoji sau khi gửi
    }
  };

  const handleCancel = () => {
    setNewComment('');
    setSelectedEmoji(null);
  };

  // const selectEmoji = (emoji) => {
  //   setSelectedEmoji(emoji);
  // };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative w-full mb-8 mt-[110px]">
        <div className="relative w-full h-[600px]">
          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg border border-gray-600"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Movie Trailer"
            style={{ pointerEvents: 'none' }}
          ></iframe>
        </div>
      </div>
      <div className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-10 gap-4">
        <div className="col-span-7 flex flex-col">
          <div className="flex mb-4">
            <img
              src={movieDetails.image}
              alt={movieDetails.title}
              className="md:h-[450px] w-[350px] rounded-lg shadow-lg object-cover"
              style={{ marginTop: '-15%', zIndex: 49, pointerEvents: 'none' }}
            />
            <div className="ml-4 flex flex-col justify-between h-full">
              <div>
                <h1 className="text-4xl font-bold mb-2">{movieDetails.title}</h1>
                <div className="flex items-center mb-2">Đánh giá:
                  <FaStar className="text-yellow-400 mr-1" />
                  <span className="text-lg">{movieDetails.rating}/10</span>
                </div>
                <div className="flex items-center space-x-4 mb-2">
                  <span>Thể loại: {movieDetails.genre}</span>
                </div>
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center"><br />
                    <FaClock className="mr-1" />
                    <span>Thời lượng: {movieDetails.duration}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4 mb-2">
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-1" />
                    <span>Quốc gia: {movieDetails.country}</span>
                  </div>
                </div>
                <h2 className="text-2xl font-semibold mb-2">Đạo diễn: {movieDetails.director}</h2>
                <h3 className="text-1xl font-semibold mb-2">Diễn viên: {movieDetails.cast}</h3>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg mt-4 flex flex-col h-full" style={{ boxShadow: '0 0 1px rgba(255, 255, 255, 0.5)', backgroundColor: 'transparent' }}>
            <h2 className="text-2xl font-bold mb-2">| Nội dung:</h2>
            <p className="text-lg">{movieDetails.noidung}</p>
          </div>
        </div>

        {/* Right Section (3 columns) */}
        <div className="col-span-3">
          <h2 className="text-2xl font-bold mb-4 text-gray-200">| Phim đang chiếu</h2>
          {/* Box for currently showing movies */}
          <div className="flex flex-col space-y-4">
            {currentlyShowingMovies.map((movie, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full rounded-lg object-cover mb-2"
                />
                <h3 className="text-lg text-left font-semibold">{movie.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Bình luận</h2>
        
        {/* Input comment section */}
        <div className="mt-4">
          <div className="flex items-center">
            {/* <span
                className="text-gray-400 mr-2 cursor-pointer"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)} // Toggle menu biểu tượng cảm xúc
              >
                {selectedEmoji ? selectedEmoji : <FaSmile />}
            </span> */}
            
            <textarea
              className="w-full p-2 rounded-md bg-gray-700 text-white"
              rows="1"
              placeholder="Viết cảm nhận khi sử dụng dịch vụ của chúng tôi ..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
          </div>
          <div className="flex justify-end mt-2">
            <button 
              className="bg-red-500 text-white py-2 px-4 rounded-md mr-2" 
              onClick={handleCommentSubmit}>
              Hủy
            </button>
            <button 
              className="bg-green-500 text-white py-2 px-4 rounded-md"
              onClick={handleCancel}>
              Gửi
            </button>
          </div>
        </div>

        

        <div className="flex flex-col space-y-4 mt-4">
          {comments.map((comment, index) => (
            <div key={index} className="border-b border-gray-700 pb-2 flex justify-between items-start">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <h3 className="font-semibold mr-2">{comment.user}</h3>
                  <span className="text-gray-500 text-sm">{comment.time}</span>
                </div>
                <p className="text-gray-400">{comment.content}</p>
              </div>
              <button className="text-red-500 mt-1">❌</button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default MovieDetailPage;
