import { Link } from "react-router-dom";

const Movie = () => {
    return (
        <>
            <div className="flex justify-c  enter bg-black">
                <div className="w-full">
                    <div className="flex justify-center items-center font-sans mx-auto mt-0">
                        <div className="w-4/5 mt-28 pt-2 text-center font-semibold text-3xl text-gray-300 border-b border-white">
                            <div className="inline-flex items-center">
                                <strong className="text-orange-600 px-2">|</strong>Phim
                            </div>
                            <div className="flex justify-center items-center space-x-4 my-2 text-xl ">
                                <Link className="text-orange-600 cursor-pointer">Đang chiếu</Link>
                                <Link className="text-white cursor-pointer">Sắp chiếu</Link>
                                <Link className="text-white cursor-pointer">Phim IMAX</Link>
                            </div>
                        </div>
                    </div>
                    <div className="w-4/5 mx-auto flex flex-wrap justify-between gap-x-2.5 mt-4">
                        <div className="group w-[23%] max-w-[23%]">
                            <div className="relative flex flex-col items-center  flex-grow flex-shrink-0 my-2">
                                <img src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg" alt="item" className="w-full h-auto" />
                                <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Link to="/detail" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">Mua vé</Link>
                                </div>
                                <div className="absolute bottom-0 right-0 bg-orange-600 text-white px-2 py-1">T18</div>
                                <div className="absolute bottom-14 right-2 text-yellow-400">★★★★☆</div>
                            </div>
                            <div className=" text-white">Tên phim</div>
                        </div>
                        <div className="group w-[23%] max-w-[23%]">
                            <div className="relative flex flex-col items-center  flex-grow flex-shrink-0 my-2">
                                <img src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg" alt="item" className="w-full h-auto" />
                                <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Link to="/detail" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">Mua vé</Link>
                                </div>
                                <div className="absolute bottom-0 right-0 bg-orange-600 text-white px-2 py-1">T18</div>
                                <div className="absolute bottom-14 right-2 text-yellow-400">★★★★☆</div>
                            </div>
                            <div className=" text-white">Tên phim</div>
                        </div>
                        <div className="group w-[23%] max-w-[23%]">
                            <div className="relative flex flex-col items-center  flex-grow flex-shrink-0 my-2">
                                <img src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg" alt="item" className="w-full h-auto" />
                                <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Link to="/detail" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">Mua vé</Link>
                                </div>
                                <div className="absolute bottom-0 right-0 bg-orange-600 text-white px-2 py-1">T18</div>
                                <div className="absolute bottom-14 right-2 text-yellow-400">★★★★☆</div>
                            </div>
                            <div className=" text-white">Tên phim</div>
                        </div>
                        <div className="group w-[23%] max-w-[23%]">
                            <div className="relative flex flex-col items-center  flex-grow flex-shrink-0 my-2">
                                <img src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg" alt="item" className="w-full h-auto" />
                                <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Link to="/detail" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">Mua vé</Link>
                                </div>
                                <div className="absolute bottom-0 right-0 bg-orange-600 text-white px-2 py-1">T18</div>
                                <div className="absolute bottom-14 right-2 text-yellow-400">★★★★☆</div>
                            </div>
                            <div className=" text-white">Tên phim</div>
                        </div>
                        <div className="group w-[23%] max-w-[23%]">
                            <div className="relative flex flex-col items-center  flex-grow flex-shrink-0 my-2">
                                <img src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg" alt="item" className="w-full h-auto" />
                                <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <Link to="/detail" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">Mua vé</Link>
                                </div>
                                <div className="absolute bottom-0 right-0 bg-orange-600 text-white px-2 py-1">T18</div>
                                <div className="absolute bottom-14 right-2 text-yellow-400">★★★★☆</div>
                            </div>
                            <div className=" text-white">Tên phim</div>
                        </div>

                        
                    </div>


                    <div className="flex flex-col w-4/5 justify-center m-auto text-white mb py-5 px-5">
                        <div className="w-full py-8 text-center font-semibold text-3xl text-gray-300 ">
                            Phim đang chiếu
                        </div>
                        <div className="text-sm mt-4"> {/* Added mt-4 to create spacing below the title */}
                            <div className="flex items-center space-x-2 font-bold">
                                <div>1. Làm Giàu Với Ma</div>
                                <div>– Kinh dị, Hài</div>
                                <div>– 30.08</div>
                            </div>
                            <div className="mt-2">
                                Làm Giàu Với Ma là tác phẩm đánh dấu sự trở lại của NSUT Hoài Linh sau thời gian dài vắng bóng trên màn ảnh rộng. Phim mang đề tài hài tâm linh được đạo diễn bởi Trung Lùn, cùng với sự tham gia của nam chính nghìn tỷ Tuấn Trần, bên cạnh đó còn có sự góp mặt của NSƯT Hữu Châu, Lê Giang, Diệp Bảo Ngọc,…
                            </div>
                        </div>
                        <div className="text-sm mt-4"> {/* Added mt-4 to create spacing below the title */}
                            <div className="flex items-center space-x-2 font-bold">
                                <div>1. Làm Giàu Với Ma</div>
                                <div>– Kinh dị, Hài</div>
                                <div>– 30.08</div>
                            </div>
                            <div className="mt-2">
                                Làm Giàu Với Ma là tác phẩm đánh dấu sự trở lại của NSUT Hoài Linh sau thời gian dài vắng bóng trên màn ảnh rộng. Phim mang đề tài hài tâm linh được đạo diễn bởi Trung Lùn, cùng với sự tham gia của nam chính nghìn tỷ Tuấn Trần, bên cạnh đó còn có sự góp mặt của NSƯT Hữu Châu, Lê Giang, Diệp Bảo Ngọc,…
                            </div>
                        </div>
                        <div className="text-sm mt-4"> {/* Added mt-4 to create spacing below the title */}
                            <div className="flex items-center space-x-2 font-bold">
                                <div>1. Làm Giàu Với Ma</div>
                                <div>– Kinh dị, Hài</div>
                                <div>– 30.08</div>
                            </div>
                            <div className="mt-2">
                                Làm Giàu Với Ma là tác phẩm đánh dấu sự trở lại của NSUT Hoài Linh sau thời gian dài vắng bóng trên màn ảnh rộng. Phim mang đề tài hài tâm linh được đạo diễn bởi Trung Lùn, cùng với sự tham gia của nam chính nghìn tỷ Tuấn Trần, bên cạnh đó còn có sự góp mặt của NSƯT Hữu Châu, Lê Giang, Diệp Bảo Ngọc,…
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default Movie;
