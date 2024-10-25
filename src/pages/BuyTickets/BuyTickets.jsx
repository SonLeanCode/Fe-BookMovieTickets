import { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { useGetMovieByIdQuery } from "../../services/Movies/movies.services";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import LoadingLocal from "../Loading/LoadingLocal";

const BuyTickets = () => {
    const { id } = useParams();
    const [isAreaOpen, setAreaOpen] = useState(false);
    const [isMovieOpen, setMovieOpen] = useState(false);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [discountCode, setDiscountCode] = useState(null); // State để lưu mã giảm giá
    const { data: movie, isLoading: movieLoading } = useGetMovieByIdQuery(id);

    const seatPrice = 65000; // Price per seat
    const totalPrice = selectedSeats.length * seatPrice;

    useEffect(() => {
        // Lấy mã giảm giá từ localStorage
        const storedDiscountCode = localStorage.getItem('discountCode');
        if (storedDiscountCode) {
            setDiscountCode(storedDiscountCode);
        }
    }, []);

    if (movieLoading) {
        return <LoadingLocal />; // Or your preferred loading indicator
    }

    const handleAreaSelect = (area) => {
        setSelectedArea(area);
        setAreaOpen(false);
    };

    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie);
        setMovieOpen(false);
    };

    const toggleSeat = (seatNumber) => {
        setSelectedSeats((prev) =>
            prev.includes(seatNumber) ? prev.filter(seat => seat !== seatNumber) : [...prev, seatNumber]
        );
    };

    return (
        <div className='mt-28'>
            <div className="flex w-[90%] mx-auto">
                {/* Left Column - 70% */}
                <div className="w-[70%] bg-black text-white p-4">
                    {/* Choose Area */}
                    <h2 className="text-xl font-bold mb-4 text-red-500">Chọn khu vực</h2>
                    <div className="mb-6">
                        <button
                            onClick={() => setAreaOpen(!isAreaOpen)}
                            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500 w-full text-left flex items-center justify-between"
                        >
                            Chọn khu vực
                            {isAreaOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                        {isAreaOpen && (
                            <div className="flex flex-wrap justify-center gap-4 mt-4">
                                {['TP Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng', 'Bà Rịa - Vũng Tàu', 'Hải Phòng', 'Bến Tre', 'Hội An', 'Khánh Hòa', 'Nghệ An', 'Quy Nhơn', 'Đà Lạt'].map(area => (
                                    <button key={area} onClick={() => handleAreaSelect(area)} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">
                                        {area}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Choose Movie */}
                    <h2 className="text-xl font-bold mb-4 text-red-500">Chọn phim</h2>
                    <div className="mb-6">
                        <button
                            onClick={() => setMovieOpen(!isMovieOpen)}
                            className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500 w-full text-left flex items-center justify-between"
                        >
                            Chọn phim
                            {isMovieOpen ? <FaChevronUp /> : <FaChevronDown />}
                        </button>
                        {isMovieOpen && (
                            <div className="flex flex-wrap justify-center gap-8 mt-4">
                                {['Phim 1', 'Phim 2', 'Phim 3', 'Phim 4', 'Phim 5'].map((movieTitle, index) => (
                                    <div key={index} className="flex flex-col hover:cursor-pointer items-start w-1/5" onClick={() => handleMovieSelect(movieTitle)}>
                                        <img
                                            src="https://cdn.galaxycine.vn/media/2024/10/2/the-wild-robot-500_1727843731507.jpg"
                                            alt={movieTitle}
                                            className="w-full h-50 object-cover rounded mb-2"
                                        />
                                        <span>{movieTitle}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Choose Showtime */}
                    <h2 className="text-xl font-bold mb-4 text-red-500">Chọn xuất</h2>
                    <div className="mb-6">
                        <div className="flex justify-between mb-4 relative">
                            <button
                                onClick={() => {
                                    const scrollContainer = document.getElementById("dayScroll");
                                    scrollContainer.scrollBy({ left: -100, behavior: "smooth" });
                                }}
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 absolute mt-5 left-0 z-10"
                            >
                                &lt;
                            </button>

                            <div
                                id="dayScroll"
                                className="flex absolute left-[5%] space-x-4 overflow-x-hidden max-w-[calc(90%/2)]"
                            >
                                {["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"].map((day, index) => (
                                    <button key={index} className="bg-gray-700 text-white px-5 py-2 rounded hover:bg-red-500">
                                        {day}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={() => {
                                    const scrollContainer = document.getElementById("dayScroll");
                                    scrollContainer.scrollBy({ left: 100, behavior: "smooth" });
                                }}
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 absolute mt-5 right-[45%] z-10"
                            >
                                &gt;
                            </button>
                            <div className="absolute right-5 mb-4 ml-4">
                                <h3 className="text-lg w-100 font-bold text-white">| Chọn rạp</h3>
                                <select className="bg-gray-700 text-white rounded px-4 py-2 w-[300px]">
                                    <option>Tất cả các rạp</option>
                                    <option>Rạp 1</option>
                                    <option>Rạp 2</option>
                                    <option>Rạp 3</option>
                                    <option>Rạp 4</option>
                                    <option>Rạp 5</option>
                                </select>
                            </div>

                        </div>
                        {/* Display Cinema and Showtimes */}
                        <div className="mt-20">
                            <hr />
                            <div className="flex flex-col space-y-2 mt-2">
                                {['ST-FLIX', 'ST-FLIX', 'ST-FLIX'].map((cinema, index) => (
                                    <div key={index} className="p-4 rounded">
                                        <div className="flex items-center">
                                            <div>
                                                <h1 className="font-semibold text-2xl">{cinema}</h1>
                                                <p className="text-sm">Phụ đề: Tiếng Việt</p>
                                            </div>
                                            <div className="flex space-x-3 ml-2">
                                                {['10:00 AM', '1:00 PM'].map((time, timeIndex) => (
                                                    <button key={timeIndex} onClick={() => setSelectedShowtime(time)} className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Choose Seats */}
                    <h2 className="text-xl font-bold mb-4 text-red-500 mt-4">Chọn chỗ ngồi</h2>
                    <div className="flex flex-col items-center">
                        {Array.from({ length: 11 }, (_, rowIndex) => (
                            <div key={rowIndex} className="flex items-center mb-2">
                                <div className="text-white p-2 mr-2">{String.fromCharCode(75 - rowIndex)}</div>
                                    <div className="grid grid-cols-12 gap-2">
                                        {Array.from({ length: 12 }, (_, index) => (
                                            <button
                                                key={index}
                                                className={`px-2 py-1 rounded hover:bg-red-500 ${selectedSeats.includes(index + 1) ? 'bg-red-500' : 'bg-gray-700 text-white'}`}
                                                onClick={() => toggleSeat(index + 1)}
                                                disabled={selectedSeats.includes(index + 1)} // Disable already selected seats
                                            >
                                                {index + 1}
                                            </button>
                                        ))}
                                    </div>
                                <div className="text-white p-2 mr-2">{String.fromCharCode(75 - rowIndex)}</div>                            
                            </div>
                        ))}
                    </div>
                    <div className='flex flex-col items-center'>
                        <p className=''>Màn hình</p>
                    </div>
                    <hr></hr>
                </div>

                {/* Right Column - 30% */}
                <div className="w-[30%] text-black">
                    {movie ? (
                        <div className="bg-white rounded h-[35%] p-2">
                            <div className="flex mb-4">
                                <img src={movie?.data.img} alt={movie?.data.name} className="w-32 object-cover rounded mr-4" />
                                <div>
                                    <h1 className="text-3xl font-semibold">{movie?.data.name}</h1>
                                    <p className="text-sm py-5">
                                        <span className="font-semibold">{movie?.data.subtitles}</span> - 
                                        <span className="bg-orange-600 p-2 rounded-sm text-white text-lg">{movie?.data.age_limit}</span>
                                    </p>
                                    {/* Chọn voucher */}
                                    <div className="py-2">
                                        <label htmlFor="voucher" className="text-sm text-red-700 font-bold">Chọn voucher:</label>
                                        <select id="voucher" className="ml-2 p-1 border rounded text-sm">
                                            <option value="none">Không chọn</option>
                                            <option value="discount10">{discountCode}</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="py-5">
                                <h1 className="text-xl font-bold">ST-FLIX Tân Bình</h1>
                                <h2 className="text-base">Xuất: <span className="font-semibold">10:00 Am</span> - <span className="font-semibold">Thứ 2</span> </h2>
                                <hr />
                            </div>
                            <div className="flex py-1">
                                <div className="flex flex-col">
                                    <h1 className="text-sm">x2</h1>
                                    <h2 className="text-base">Ghế: <span className="font-semibold">K3</span></h2>
                                </div>
                                <p className="text-lg font-semibold ml-52 self-end">65.000 VNĐ</p>
                            </div>
                            <hr />
                            <div className="mt-4 ml-36">
                                <p className="text-red-600 font-semibold text-xl">Tổng tiền: <span className="font-bold">100,000 VNĐ</span></p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-300">Loading movie details...</p>
                    )}
                    <div className="flex justify-between pt-5">
                        <h1 className="text-orange-600 text-3xl text-center w-[50%]">Quay lại</h1>
                        <h1 className="text-white text-3xl bg-orange-600 px-10 py-2 rounded-md">Tiếp tục</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuyTickets;
