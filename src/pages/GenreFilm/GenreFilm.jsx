import React, { useState } from 'react';

// Dữ liệu mẫu cho các phim
const movies = [
    { title: "Movie 1", img: "https://i.pinimg.com/564x/9a/c1/53/9ac153e27a2d7e3de90dee8a2dd6a65c.jpg", times: ["10:00", "12:00","15:00", "21:00"], date: "2024-11-01", genre: "Kinh dị" },
    { title: "Movie 2", img: "https://i.pinimg.com/564x/b7/5c/05/b75c05b58b2de2c08517ee090023cc00.jpg", times: ["11:00", "13:00"], date: "2024-11-02", genre: "Hài hước" },
    { title: "Movie 3", img: "https://i.pinimg.com/564x/3b/f8/03/3bf803e74d899589e602cf394f87f79f.jpg", times: ["14:00", "16:00" , "22:00"], date: "2024-11-01", genre: "Hành động" },
    { title: "Movie 4", img: "https://i.pinimg.com/564x/19/30/3d/19303d8c25dd471b6248fba7f966e864.jpg", times: ["15:00", "17:00" , "19:00" , "23:00"], date: "2024-11-03", genre: "Thú vị" },
    { title: "Movie 5", img: "https://i.pinimg.com/564x/9f/63/f5/9f63f576fad19b0b9684a42649b41d21.jpg", times: ["16:00", "18:00"], date: "2024-11-01", genre: "Kinh dị" },
    { title: "Movie 6", img: "https://i.pinimg.com/564x/40/ea/99/40ea995387781695a0e84851bcd69b78.jpg", times: ["17:00", "19:00" , "19:00" , "23:00"], date: "2024-11-02", genre: "Hành động" },
    { title: "Movie 7", img: "https://i.pinimg.com/564x/b5/d1/13/b5d11396db264db72dd29affed392813.jpg", times: ["18:00", "20:00" , "19:00" , "23:00"], date: "2024-11-03", genre: "Hài hước" },
    { title: "Movie 8", img: "https://i.pinimg.com/564x/b3/da/6c/b3da6c61f387e12ada45eb885552f00d.jpg", times: ["19:00", "21:00" , "19:00" , "23:00"], date: "2024-11-02", genre: "Hấp dẫn" },
    { title: "Movie 9", img: "https://i.pinimg.com/564x/9a/c1/53/9ac153e27a2d7e3de90dee8a2dd6a65c.jpg", times: ["10:00", "12:00"], date: "2024-11-01", genre: "Kinh dị" },
    { title: "Movie 10", img: "https://i.pinimg.com/564x/b7/5c/05/b75c05b58b2de2c08517ee090023cc00.jpg", times: ["11:00", "13:00" , "19:00" , "23:00"], date: "2024-11-02", genre: "Hài hước" },
    { title: "Movie 11", img: "https://i.pinimg.com/564x/3b/f8/03/3bf803e74d899589e602cf394f87f79f.jpg", times: ["14:00", "16:00"], date: "2024-11-01", genre: "Hành động" },
    { title: "Movie 12", img: "https://i.pinimg.com/564x/19/30/3d/19303d8c25dd471b6248fba7f966e864.jpg", times: ["15:00", "17:00" , "19:00" , "23:00"], date: "2024-11-03", genre: "Thú vị" },
    { title: "Movie 13", img: "https://i.pinimg.com/564x/9f/63/f5/9f63f576fad19b0b9684a42649b41d21.jpg", times: ["16:00", "18:00" , "19:00" , "23:00"], date: "2024-11-01", genre: "Kinh dị" },
    { title: "Movie 14", img: "https://i.pinimg.com/564x/40/ea/99/40ea995387781695a0e84851bcd69b78.jpg", times: ["17:00", "19:00"], date: "2024-11-02", genre: "Hành động" },
    { title: "Movie 15", img: "https://i.pinimg.com/564x/b5/d1/13/b5d11396db264db72dd29affed392813.jpg", times: ["18:00", "20:00" , "19:00" , "23:00"], date: "2024-11-03", genre: "Hài hước" },
    { title: "Movie 16", img: "https://i.pinimg.com/564x/b3/da/6c/b3da6c61f387e12ada45eb885552f00d.jpg", times: ["19:00", "21:00"], date: "2024-11-02", genre: "Hấp dẫn" },
];


const MovieList = () => {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [visibleCount, setVisibleCount] = useState(4); // Số lượng phim hiển thị ban đầu

    // Hàm để lọc phim theo ngày và thể loại
    const filteredMovies = movies.filter(movie => {
        const dateMatch = selectedDate ? movie.date === selectedDate : true;
        const genreMatch = selectedGenre ? movie.genre === selectedGenre : true;
        return dateMatch && genreMatch;
    });

    // Danh sách thể loại
    const genres = [...new Set(movies.map(movie => movie.genre))];

    // Hàm để xử lý sự kiện khi nhấn "Xem thêm"
    const handleShowMore = () => {
        setVisibleCount(prevCount => prevCount + 4); // Tăng số lượng phim hiển thị thêm 4
    };

    return (
        <div className="bg-gray-900 text-white pt-7 p-[4.5rem] mt-28">
            <div className="filter flex justify-between">
                <div className="menuleft flex gap-10 text-center justify-start align-text-top content-center mb-6">
                    <h2 className="text-2xl font-bold uppercase border-l-2 flex items-center pl-2 border-red-500"> Tất cả</h2>

                    {/* Lọc theo ngày */}
                    <div className='bg-white rounded flex justify-center items-center w-36 px-2'>
                        <label htmlFor="date" className="mr-2 text-black">Chọn ngày</label>
                        <input
                            type="date"
                            id="date"
                            value={selectedDate}
                            onChange={e => setSelectedDate(e.target.value)}
                            className="bg-transparent w-5 p-0 border-0 text-black rounded cursor-pointer"
                        />
                    </div>

                    {/* Lọc theo thể loại */}
                    <div>
                        <select
                            id="genre"
                            value={selectedGenre}
                            onChange={e => setSelectedGenre(e.target.value)}
                            className="bg-white text-black w-36 p-2 rounded"
                        >
                            <option value="">Thể loại</option>
                            {genres.map((genre, index) => (
                                <option key={index} value={genre}>{genre}</option>
                            ))}
                        </select>
                    </div>

                   
                </div>
                <div className="menuright">
                    <form className="flex items-center max-w-lg mx-auto">
                        <label htmlFor="voice-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 21 21">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.15 5.6h.01m3.337 1.913h.01m-6.979 0h.01M5.541 11h.01M15 15h2.706a1.957 1.957 0 0 0 1.883-1.325A9 9 0 1 0 2.043 11.89 9.1 9.1 0 0 0 7.2 19.1a8.62 8.62 0 0 0 3.769.9A2.013 2.013 0 0 0 13 18v-.857A2.034 2.034 0 0 1 15 15Z" />
                                </svg>
                            </div>
                            <input type="text" id="voice-search" className="border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 bg-transparent dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tìm phim ..." required />
                            <button type="button" className="absolute inset-y-0 end-0 flex items-center pe-3">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z" />
                                </svg>
                            </button>
                        </div>
                        <button type="submit" className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white focus:outline-none">
                            <svg className="w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>

            <div className="thanhngang h-px bg-slate-400 mb-6"></div>
            
             {/* Movie Grid */}
            <div className="grid grid-cols-4 gap-4">
                {filteredMovies.slice(0, visibleCount).map((movie, index) => (
                    <div key={index} className="overflow-hidden">
                        <img
                            src={movie.img} 
                            alt={movie.title} 
                            className="w-full h-3/4 object-cover hover:scale-105 translate-transfrom duration-300 hover:opacity-50"   
                        />
                        <div className="p-4">
                            <h3 className="text-lg text-center font-semibold">{movie.title}</h3>
                            <div className="flex space-x-4 mt-5">
                                {movie.times.map((time, idx) => (
                                    <span key={idx} className="bg-neutral-600 hover:bg-red-500 rounded-full px-3 py-1 text-sm">
                                        {time}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="xemthem flex justify-between items-center">
                <div className="thanhngang h-px bg-slate-400 w-3/4 mr-5"></div>

                <button 
                    className="bg-red-500 text-white py-2 px-4 w-1/4 rounded-full hover:bg-red-600"
                    onClick={handleShowMore} // Gọi hàm khi bấm nút
                >
                    Xem thêm
                </button>
            </div>
        </div>
    );
}

export default MovieList;
