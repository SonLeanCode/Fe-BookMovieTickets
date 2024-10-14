import { useState } from 'react';
import { Link } from "react-router-dom";
import { FaStar, FaClock, FaMapMarkerAlt, FaQuoteLeft , FaTicketAlt } from 'react-icons/fa';


const MovieDetailPage = () => {
  const [newComment, setNewComment] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const movieDetails = {
      "_id": {
        "$oid": "670750c1514ae3f24c2463fa"
      },
      "image": "https://i.pinimg.com/564x/d1/34/48/d13448402555953b83d51f82d67e466a.jpg",
      "nameMovie": "Stardust",
      "description": "Một chàng trai trẻ đi vào một thế giới thần tiên để tìm kiếm một ngôi sao đã rơi, và phát hiện ra nhiều điều kỳ diệu.",
      "director": "Matthew Vaughn",
      "price": "68000",
      "actor": "Charlie Cox , SupperLater",
      "producer": "Matthew Vaughn",
      "rating": "7.7/10",
      "genre": "Hành động , Kịch tính",
      "duration": "127 phút",
      "title": "Stardust",
      "agebig": "16+",
      "country": "Mỹ",
      "quote": "Vietsub",
      "release_date": {
        "$date": "2024-10-12T00:00:00.000Z"
      },
      "__v": 0,
      "hotdeal": "2",
    
    noidung: (
      <>
        Stardust là một bộ phim khoa học viễn tưởng đầy kịch tính do Christopher Nolan đạo diễn.
        Câu chuyện xoay quanh Dom Cobb, một kẻ đánh cắp những bí mật quan trọng từ những giấc mơ của người khác.
        <br /> <br />
        Cobb là một chuyên gia trong lĩnh vực 'xâm nhập giấc mơ', nơi mà con người có thể bước vào thế giới tâm trí của nhau.
        Tuy nhiên, cuộc sống của anh bị đảo lộn khi một tổ chức bí mật buộc anh phải thực hiện một nhiệm vụ khó khăn nhất:
        thay vì đánh cắp một ý tưởng, anh phải cấy ghép một ý tưởng vào tâm trí của một CEO lớn.
        <br /> <br />
        Cobb cùng với nhóm đồng đội của mình phải đối mặt với những thử thách khắc nghiệt trong các giấc mơ đa tầng,
        nơi mà thời gian và không gian trở nên méo mó.
        <br /> <br />
        Họ phải chiến đấu không chỉ với kẻ thù bên ngoài mà còn với những cơn ác mộng từ chính quá khứ của Cobb.
        <br />
        'Inception' không chỉ là một hành trình ly kỳ và mạo hiểm, mà còn là một cuộc khám phá sâu sắc về tình yêu,
        sự mất mát và những rào cản mà con người tự đặt ra cho chính mình.
      </>
    ),
  };

  // Danh sách bình luận (mẫu)
  const [comments, setComments] = useState([
    {
      user: "Xuân Ca",
      content: "Phim hay quá! Mình rất thích!",
      time: "2 giờ trước",
      avatar:"https://i.pinimg.com/564x/ac/9e/3d/ac9e3d7c0f10c0689299701c709c2582.jpg"
    },
    {
      user: "Khúc Thị Hương",
      content: "Nội dung rất thú vị, diễn xuất xuất sắc.",
      time: "1 giờ trước",
      avatar:"https://i.pinimg.com/564x/25/0f/58/250f584d1f12e823d2cc9a4f82d22883.jpg"
    },
  ]);


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


  // chuyển tab  
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Nội dung', content: movieDetails.noidung },
    { id: 'dashboard', label: 'Nhân vật', content: 
    <>
      <div className="producer">
        <strong className='text-xl'>Tác giả : </strong><span className='underline'>{movieDetails.producer}</span>
      </div>
      <div className="actor mt-4"> 
        <strong className='text-xl'>Diễn viên: </strong>
        {movieDetails.actor.split(' , ').map((acto , index)=>{
          return <>
             <span key={index} className='underline pr-3'>{acto}</span>
          </>
        })}
      </div>
      <div className="director mt-4">
        <strong className='text-xl'>Đạo diễn : </strong><span className='underline'>{movieDetails.director}</span>
      </div>
    </>
       },
    {
      id: 'settings', label: 'Hình ảnh', content:
        <>
          <strong>Thêm ảnh hoặc bất cứ thứ gì</strong>
          <img src="https://i.pinimg.com/564x/d4/6a/f9/d46af97765da77d5d04a0ed33a8c3f31.jpg" alt="" />
        </>
    },
    {
      id: 'invoice', label: 'Săn mã giảm ', content:
        <>
          <h1 className='text-xl uppercase text-center'>Không có đâu lêu lêu</h1>
          <div className='flex'>
            <img className='w-56 mx-auto' src="https://i.pinimg.com/564x/bd/e9/11/bde9119315ada284d54c1c8c50e8b348.jpg" alt="" />
            <img className='w-56 mx-auto' src="https://i.pinimg.com/originals/87/14/4c/87144ca098dad9be40e44907bce4cee3.gif" alt="" />
          </div>
        </>
    },
  ];

  return (

    <div className="min-h-screen bg-black text-white">

      {/* show video  */}
      <div className="relative w-full mb-8">
        <div className="relative w-full h-[600px]">

          <iframe
            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg border border-gray-600"
            src="https://www.youtube.com/embed/Jk8smmU-uPk?si=WXsKmBWueQT7RbPJ"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>

        </div>
      </div>

      {/* show film detail  */}
      <div className="max-w-[85rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 py-6 pt-2">

        {/* Film detail left */}
        <div className="md:col-span-3 flex flex-col space-y-6">

          {/* introduce film  */}
          <div className="flex items-start space-x-6">
            <img
              src={movieDetails.image}
              alt={movieDetails.title}
              className="md:h-[450px] w-[350px] rounded-lg shadow-lg object-cover -mt-32 z-10"
            />
            <div className='w-full'>

              <div className="flex justify-between items-end">
                <h1 className="text-4xl font-bold uppercase text-gray-200">{movieDetails.title}</h1>


                <div class="flex items-center">
                  <svg class="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                  </svg>
                  <p class="ms-2 text-sm font-bold text-white dark:text-white">{movieDetails.rating}</p>
                  <span class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                  <a href="#" class="text-sm font-medium text-white underline hover:no-underline dark:text-white">73 lượt đánh giá</a>
                </div>

              </div>

              <div className="age mb-2 text-gray-400 text-sm mt-2">
                <span className='bg-green-500 p-1 text-white px-2 rounded-full mr-2'>{movieDetails.agebig}</span>Phim được phổ biến từ người xem {movieDetails.agebig} tuổi trở lên
              </div>

            
              <div className='mb-4 mt-6'>
                <span>{movieDetails.description}</span>
              </div>

           
            

              <div className="flex items-end gap-5 text-sm text-gray-400">
                  <div className="flex items-center">
                    <FaClock className="mr-1 text-white" />
                    <span>{movieDetails.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="mr-1 text-white" />
                    <span>Quốc gia: {movieDetails.country}</span>
                  </div>
                  <div className="flex items-center">
                    <FaQuoteLeft className="mr-1 text-white" />
                    <span> Thuyết minh : {movieDetails.quote}</span>
                  </div>
              </div>


              <div className=" mt-3 text-sm text-gray-400">
                  <div>

                  <span className='text-white'> Thể Loại : </span>
                    {
                      movieDetails.genre.split(' , ').map((cate, index) => {
                        return <span key={index} className='border-b border-gray-700 ml-3'> {cate}</span>
                      })
                    }
                    
                  </div>
                  <br />
                <div>
                    <span className='text-white'> Diễn viên : </span>
                    {
                      movieDetails.actor.split(' , ').map((cate, index) => {
                        return <span key={index} className='border-b border-gray-700 ml-3'> {cate}</span>
                      })
                    }
                </div>

              </div>

              <div className="price-product mt-5 flex">
      <span className="relative group text-xl text-red-600 border p-2 bg-white rounded font-semibold cursor-pointer flex gap-2 justify-center items-center overflow-hidden">
        <FaTicketAlt />
        {/* Hiển thị giá mặc định */}
        <span className="group-hover:translate-x-full transition-transform duration-500 ease-in-out">
          {movieDetails.price} VND
        </span>
        {/* Hiển thị chữ "Mua ngay" khi hover với hiệu ứng từ phải sang trái */}
        <span className="absolute inset-0 bg-black text-white flex items-center justify-center translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
          Mua ngay
        </span>
      </span>
    </div>


           
            </div>
          </div>


          {/* nội dung  */}

          <div class="sm:hidden">
            <label for="tabs" class="sr-only">Select your country</label>
            <select
              id="tabs"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => setActiveTab(e.target.value)}
            >
              {tabs.map(tab => (
                <option key={tab.id} value={tab.id}>{tab.label}</option>
              ))}
            </select>
          </div>

          <ul class="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
            {tabs.map(tab => (
              <li key={tab.id} className="w-full focus-within:z-10">
                <button
                  className={`inline-block w-full p-4 bg-gray-900 border-r border-gray-700 dark:hover:text-white dark:bg-gray-800 ${activeTab === tab.id ? ' text-white font-semibold uppercase' : 'bg-gray text-gray-500'} border-b-0 border-gray-100`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-4">
            {tabs.map(tab => (
              <div key={tab.id} className={`tab-content ${activeTab === tab.id ? 'block' : 'hidden'}`}>
                {tab.content}
              </div>
            ))}
          </div>


          {/* bình luận  */}
          <div className="max-w-6xl py-5">
            <h2 className="text-2xl font-bold mb-4">Bình luận</h2>

            {/* ghi bình luận  */}
            <form>
              <label for="chat" class="sr-only">Your message</label>
              <div class="flex items-center px-3 py-2 rounded-lg bg-gray-900 dark:bg-slate-950">
                <button type="button" class="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:bg-g">
                  <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                    <path fill="currentColor" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                  </svg>
                  <span class="sr-only">Upload image</span>
                </button>
                <button type="button" class="p-2 text-gray-500 rounded-lg cursor-pointer  hover:bg-gray-00 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                  <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.408 7.5h.01m-6.876 0h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM4.6 11a5.5 5.5 0 0 0 10.81 0H4.6Z" />
                  </svg>
                  <span class="sr-only">Add emoji</span>
                </button>
                <textarea id="chat" rows="1" class="block mx-4 p-2.5 w-full text-sm text-white bg-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Your message..."></textarea>
                <button type="submit" class="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer dark:text-blue-500 dark:hover:bg-gray-600">
                  <svg class="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                    <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
                  </svg>
                  <span class="sr-only">Send message</span>
                </button>
              </div>
            </form>


            {/* bình luận người dùng  */}

            <div>
              {comments.map((comment, index) => (
                  <div className="flex items-start gap-2.5 mt-5" key={index}>
                  {/* <img class="w-8 h-8 rounded-full" alt="Jese image"> */}
                  <img className='w-14 h-12 rounded-full' src={comment.avatar}  alt="" />
                  <div class="flex flex-col gap-1 w-full">
                    <div class="flex items-center space-x-2 rtl:space-x-reverse">
                      <span class="text-sm font-semibold text-white dark:text-white">{comment.user} </span>
                      <span class="text-sm font-normal text-gray-500 dark:text-gray-400">{comment.time} </span>
                    </div>
                    <div class="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-900  rounded-e-xl rounded-es-xl dark:bg-gray-700">
                      <p class="text-sm font-normal text-white dark:text-white"> {comment.content} </p>
                    </div>
                    {/* <span class="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span> */}
                  </div>
                  <button id="dropdownMenuIconButton" data-dropdown-toggle="dropdownDots" data-dropdown-placement="bottom-start" class="inline-flex self-center items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-900 rounded-lg  focus:outline-none dark:text-white dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600" type="button">
                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                      <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                    </svg>
                  </button>
                  <div id="dropdownDots" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600">
                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconButton">
                      <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Reply</a>
                      </li>
                      <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Forward</a>
                      </li>
                      <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Copy</a>
                      </li>
                      <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                      </li>
                      <li>
                        <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delete</a>
                      </li>
                    </ul>
                  </div>
                </div>
              ))}
            </div>




          </div>

        </div>

        {/* Film detail right */}
        <div className='md:col-span-1'>
          <h2 className="text-2xl font-bold text-gray-200 mb-6">  <span className='text-red-500'>|</span> Phim đang chiếu</h2>
          <div className="space-y-6">
            <div className="group relative overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-750_1723544376869.jpg"
                alt="item"
                className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link to="/detail" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">Mua vé <i className="ml-2 fas fa-ticket-alt"></i></Link>
              </div>
              <div className="absolute bottom-4 left-4 bg-orange-600 text-white px-3 py-1 rounded-lg">T18</div>
              <div className="absolute bottom-4 right-4 text-yellow-400">★★★★☆</div>
            </div>
            <div className="text-gray-200 text-center">Tên phim</div>
          </div>
          
        </div>

      </div>

    </div>
  );
};

export default MovieDetailPage;
