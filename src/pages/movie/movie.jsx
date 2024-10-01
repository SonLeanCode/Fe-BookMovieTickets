import { Link } from "react-router-dom";

const Movie = () => {
    return (
        <>
            <div className="flex justify-center">
                <div className="w-full">
                    <div className="flex justify-center items-center mt-10">
                        <div className="text-center text-gray-400 w-full border-b border-white">
                            <div className="text-2xl font-semibold pb-2"><strong className="text-red-600 px-1">|</strong>Phim</div>
                            <div className="flex justify-center space-x-4 mb-2">
                                <Link className="text-red-600 active">Đang chiếu</Link>
                                <Link className="text-white">Sắp chiếu</Link>
                                <Link className="text-white">Phim IMAX</Link>
                            </div>
                        </div>
                    </div>
                    <div className="container mx-auto grid grid-cols-4 gap-10 my-8">
                        {Array(5).fill(0).map((_, i) => (
                            <div key={i} className="relative group flex flex-col items-center">
                                <img src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg" alt="item" className="w-full h-auto" />
                                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 flex items-center justify-center group-hover:opacity-100 transition-opacity">
                                    <Link to="/detail" className="bg-orange-600 hover:bg-orange-700 text-white rounded px-4 py-2">Mua vé</Link>
                                </div>
                                <div className="absolute bottom-0 right-0 bg-orange-500 text-white p-2">T18</div>
                                <div className="absolute bottom-12 right-2 text-yellow-400">★★★★☆</div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center text-white mb-5 px-4">
                        <h2 className="text-2xl font-bold mb-6">Phim đang chiếu</h2>
                        <div className="text-sm">
                            <div className="flex items-center space-x-2 font-semibold">
                                <div>1. Làm Giàu Với Ma</div>
                                <div className="text-gray-400">– Kinh dị, Hài</div>
                                <div className="text-gray-400">– 30.08</div>
                            </div>
                            <p className="mt-2 text-justify">
                                Làm Giàu Với Ma là tác phẩm đánh dấu sự trở lại của NSUT Hoài Linh sau thời gian dài vắng bóng trên màn ảnh rộng. Phim mang đề tài hài tâm linh...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Movie;
