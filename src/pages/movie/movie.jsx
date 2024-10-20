import { Link } from "react-router-dom";

const Movie = () => {
    return (
        <>
            <div className="flex justify-center bg-black">
                <div className="w-full">
                    <div className="flex justify-center items-center font-sans mx-auto mt-0">
                        <div className="w-4/5 mt-28 pt-2 text-center font-semibold text-2xl md:text-3xl text-gray-300 border-b border-white">
                            <div className="inline-flex items-center">
                                <strong className="text-orange-600 px-2">|</strong>Phim
                            </div>
                            <div className="flex justify-center items-center space-x-2 md:space-x-4 my-2 text-lg md:text-xl">
                                <Link className="text-orange-600 cursor-pointer">Đang chiếu</Link>
                                <Link className="text-white cursor-pointer">Sắp chiếu</Link>
                                <Link className="text-white cursor-pointer">Phim Imax</Link>
                            </div>
                        </div>
                    </div>
                    
                    {/* Movie Grid */}
                    <div className="w-4/5 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                        {/* Movie Card */}
                        {[1, 2, 3, 4, 5].map((movie, index) => (
                            <div key={index} className="group w-full">
                                <div className="relative flex flex-col items-center my-2">
                                    <img src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg" alt="item" className="w-full h-auto" />
                                    <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <Link to="/cinema/detail" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">
                                            Mua vé <i className="ml-1 fas fa-ticket-alt"></i>
                                        </Link>
                                    </div>
                                    <div className="absolute bottom-0 right-0 bg-orange-600 text-white px-2 py-1">T18</div>
                                    <div className="absolute bottom-14 right-2 text-yellow-400">★★★★☆</div>
                                </div>
                                <div className="text-white text-center mt-2 text-sm md:text-base">Tên phim</div>
                            </div>
                        ))}
                    </div>

                    {/* Now Showing Section */}
                    <div className="flex flex-col w-4/5 justify-center m-auto text-white py-5 px-5">
                        <div className="w-full py-8 text-center font-semibold text-2xl md:text-3xl text-gray-300">
                            Phim đang chiếu
                        </div>

                        {[1, 2, 3].map((item, index) => (
                            <div key={index} className="text-sm md:text-base mt-4">
                                <div className="flex items-center space-x-2 font-bold">
                                    <div>1. Làm Giàu Với Ma</div>
                                    <div>– Kinh dị, Hài</div>
                                    <div>– 30.08</div>
                                </div>
                                <div className="mt-2">
                                    Làm Giàu Với Ma là tác phẩm đánh dấu sự trở lại của NSUT Hoài Linh sau thời gian dài vắng bóng trên màn ảnh rộng. Phim mang đề tài hài tâm linh được đạo diễn bởi Trung Lùn, cùng với sự tham gia của nam chính nghìn tỷ Tuấn Trần, bên cạnh đó còn có sự góp mặt của NSƯT Hữu Châu, Lê Giang, Diệp Bảo Ngọc,…
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Movie;
