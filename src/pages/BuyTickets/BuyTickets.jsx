import { useState } from 'react';
// Import icon từ thư viện react-icons
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const BuyTickets = () => {
    const [isAreaOpen, setAreaOpen] = useState(false);
    const [isMovieOpen, setMovieOpen] = useState(false);
    

    return (
        <div className='mt-28'>
            <div className="flex w-[90%] mx-auto">
                {/* Cột bên trái - chiếm 70% */}
                <div className="w-[70%] bg-black text-white p-4">

                    {/* Chọn khu vực */}
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
                                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">TP Hồ Chí Minh</button>
                                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">Hà Nội</button>
                                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">Đà Nẵng</button>
                                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">Bà Rịa - Vũng Tàu</button>
                                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">Hải Phòng</button>
                                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">Bến Tre</button>
                                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">Hội An</button>
                                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">Khánh Hòa</button>
                                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">Nghệ An</button>
                                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">Quy Nhơn</button>
                                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">Đà Lạt</button>
                            </div>
                        )}
                    </div>

                    {/* Chọn phim */}
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
                                <div className="flex flex-col hover:cursor-pointer items-start w-1/5">
                                    <img
                                        src="https://cdn.galaxycine.vn/media/2024/10/2/the-wild-robot-500_1727843731507.jpg"
                                        alt="Phim 1"
                                        className="w-full h-50 object-cover rounded mb-2"
                                    />
                                    <span>Phim 1</span>
                                </div>
                                <div className="flex flex-col hover:cursor-pointer items-start w-1/5">
                                    <img
                                        src="https://cdn.galaxycine.vn/media/2024/10/2/the-wild-robot-500_1727843731507.jpg"
                                        alt="Phim 2"
                                        className="w-full h-50 object-cover rounded mb-2"
                                    />
                                    <span>Phim 2</span>
                                </div>
                                <div className="flex flex-col hover:cursor-pointer items-start w-1/5">
                                    <img
                                        src="https://cdn.galaxycine.vn/media/2024/10/2/the-wild-robot-500_1727843731507.jpg"
                                        alt="Phim 3"
                                        className="w-full h-50 object-cover rounded mb-2"
                                    />
                                    <span>Phim 3</span>
                                </div>
                                <div className="flex flex-col hover:cursor-pointer items-start w-1/5">
                                    <img
                                        src="https://cdn.galaxycine.vn/media/2024/10/2/the-wild-robot-500_1727843731507.jpg"
                                        alt="Phim 4"
                                        className="w-full h-50 object-cover rounded mb-2"
                                    />
                                    <span>Phim 4</span>
                                </div>
                                <div className="flex flex-col hover:cursor-pointer items-start w-1/5">
                                    <img
                                        src="https://cdn.galaxycine.vn/media/2024/10/2/the-wild-robot-500_1727843731507.jpg"
                                        alt="Phim 5"
                                        className="w-full h-50 object-cover rounded mb-2"
                                    />
                                    <span>Phim 5</span>
                                </div>
                                <div className="flex flex-col hover:cursor-pointer items-start w-1/5">
                                    <img
                                        src="https://cdn.galaxycine.vn/media/2024/10/2/the-wild-robot-500_1727843731507.jpg"
                                        alt="Phim 5"
                                        className="w-full h-50 object-cover rounded mb-2"
                                    />
                                    <span>Phim 5</span>
                                </div>
                                <div className="flex flex-col hover:cursor-pointer items-start w-1/5">
                                    <img
                                        src="https://cdn.galaxycine.vn/media/2024/10/2/the-wild-robot-500_1727843731507.jpg"
                                        alt="Phim 5"
                                        className="w-full h-50 object-cover rounded mb-2"
                                    />
                                    <span>Phim 5</span>
                                </div>
                                <div className="flex flex-col hover:cursor-pointer items-start w-1/5">
                                    <img
                                        src="https://cdn.galaxycine.vn/media/2024/10/2/the-wild-robot-500_1727843731507.jpg"
                                        alt="Phim 5"
                                        className="w-full h-50 object-cover rounded mb-2"
                                    />
                                    <span>Phim 5</span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Chọn xuất */}
                    <h2 className="text-xl font-bold mb-4 text-red-500">Chọn xuất</h2>
                    <div className="mb-6">
                        {/* Chọn ngày và chọn rạp */}
                    <div className="flex justify-between mb-4 relative">
                        {/* Nút cuộn trái */}
                        <button
                            onClick={() => {
                                const scrollContainer = document.getElementById("dayScroll");
                                scrollContainer.scrollBy({ left: -100, behavior: "smooth" });
                            }}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 absolute mt-5 left-0 z-10"
                        >
                            &lt;
                        </button>

                        {/* Chọn ngày */}
                        <div
                            id="dayScroll"
                            className="flex absolute left-[5%] space-x-4 overflow-x-hidden max-w-[calc(90%/2)]"
                        >
                            {["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"].map((day, index) => (
                                <button key={index} className="bg-gray-700 text-white px-5 py-2 rounded  hover:bg-red-500">
                                    {day}
                                </button>
                            ))}
                        </div>

                        {/* Nút cuộn phải */}
                        <button
                            onClick={() => {
                                const scrollContainer = document.getElementById("dayScroll");
                                scrollContainer.scrollBy({ left: 100, behavior: "smooth" });
                            }}
                            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 absolute mt-5 right-[45%] z-10"
                        >
                            &gt;
                        </button>

                        {/* Chọn rạp */}
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


    {/* Hiển thị danh sách rạp và suất chiếu */}
    <div className="mt-20">
    <hr />
        <div className="flex flex-col space-y-2 mt-2">
            <div className="p-4 rounded">
                <div className="flex items-center">
                    <div>
                        <h1 className="font-semibold text-2xl ">ST-FLIX </h1>
                        <p className="text-sm">Phụ đề: Tiếng Việt</p>
                    </div>
                    <div className="flex space-x-3 ml-2">
                        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">10:00 AM</button>
                        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">1:00 PM</button>
                        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">10:00 AM</button>
                        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">1:00 PM</button>
                    </div>
                </div>
            </div> <hr />
        
            <div className="p-4 rounded">
                <div className="flex items-center">
                    <div>
                        <h1 className="font-semibold text-2xl ">ST-FLIX </h1>
                        <p className="text-sm">Phụ đề: Tiếng Anh</p>
                    </div>
                    <div className="flex space-x-3 ml-2">
                        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">10:30 AM</button>
                        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">1:30 PM</button>
                        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">2:00 PM</button>
                    </div>
                </div>
            </div> <hr />

            <div className="p-4 rounded">
                <div className="flex  items-center">
                    <div>
                        <h1 className="font-semibold text-2xl ">ST-FLIX </h1>
                        <p className="text-sm">Phụ đề: Tiếng Việt</p>
                    </div>
                    <div className="flex space-x-3 ml-2">
                        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">11:00 AM</button>
                        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">2:00 PM</button>
                    </div>
                </div>
            </div> <hr />
            <div className="p-4 rounded">
                <div className="flex  items-center">
                    <div>
                        <h1 className="font-semibold text-2xl ">ST-FLIX </h1>
                        <p className="text-sm">Phụ đề: Tiếng Việt</p>
                    </div>
                    <div className="flex space-x-3 ml-2">
                        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">11:00 AM</button>
                        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">2:00 PM</button>
                        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">2:00 PM</button>
                    </div>
                </div>
            </div> <hr />
            <div className="p-4 rounded">
                <div className="flex  items-center">
                    <div>
                        <h1 className="font-semibold text-2xl ">ST-FLIX </h1>
                        <p className="text-sm">Phụ đề: Tiếng Việt</p>
                    </div>
                    <div className="flex space-x-3 ml-2">
                        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">11:00 AM</button>
                        <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-red-500">2:00 PM</button>
                    </div>
                </div>
            </div> <hr />
            {/* Thêm các rạp khác nếu cần */}
        </div>
    </div>



                    </div>
                            
                    {/* Chọn chỗ ngồi */}
                    <h2 className="text-xl font-bold mb-4 text-red-500 mt-4">Chọn chỗ ngồi</h2>
                    <div className="flex flex-col items-center">
                        {/* Các hàng ghế */}
                        {Array.from({ length: 11 }, (_, rowIndex) => (
                            <div key={rowIndex} className="flex items-center mb-2">
                                {/* Chữ cái ở bên trái */}
                                <div className="text-white p-1 mr-2">{String.fromCharCode(75 - rowIndex)} </div> {/* K = 75, J = 74,..., A = 65 */}

                                {/* Ghế trải theo hàng ngang */}
                                <div className="grid grid-cols-12 gap-2">
                                    {Array.from({ length: 12 }, (_, index) => (
                                        <button key={index} className="bg-gray-700 text-white px-2 py-1 rounded hover:bg-red-500">
                                            {index + 1}
                                        </button>
                                    ))}
                                </div>

                                <div className="text-white p-2 mr-5">{String.fromCharCode(75 - rowIndex)} </div> {/* K = 75, J = 74,..., A = 65 */}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center mt-4">
                        <div className="text-sm flex text-white">Màn hình</div>
                    </div>
                    <hr className="my-4 flex ml-44 border-gray-500 w-[59%] " /> 
                    <div className="flex justify-center mt-4">
                        <div className="text-sm p-2 text-white"><span className="bg-gray-700 px-3 py-1 rounded"></span>Còn trống</div>
                        <div className="text-sm p-2 text-white"><span className="bg-red-500 px-3 py-1 rounded"></span>Đã bán </div>
                    </div>
                </div>

                {/* Cột bên phải - chiếm 30% */}
                <div className="w-[30%] text-black bg-white rounded h-[30%] p-2">
                    <div>
                        <div className="flex mb-4">
                            <img src="https://media.molistar.com/thumb_w/editors/2024/01/16/phuong-anh-dao-hi_680.jpg" alt="Tên phim" className="w-40 h-[10%] object-cover rounded mr-4" />
                            <div>
                                <h1 className="text-3xl font-semibold">Mai</h1>
                                <p className="text-sm">Phụ đề: <span className="font-semibold">Tiếng Việt</span></p>
                            </div>
                        </div>
                        <div className='py-2'>
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
                            <p className="text-red-600 font-semibold text-xl ">Tổng tiền: <span className="font-bold">100,000 VNĐ</span></p>
                        </div>
                    </div>
                </div>
                <div className='mt-[33%] ml-[-7%]'>
                    <button className="bg-red-500 text-white font-bold py-2 px-4 rounded shadow-lg hover:bg-red-600 transition duration-300 ease-in-out">
                        Tiếp tục
                    </button>
                </div>
            </div>
        </div>
    )
}

export default BuyTickets;
