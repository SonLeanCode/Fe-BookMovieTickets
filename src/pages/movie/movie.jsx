import "../movie/movie.css";

const Movie = () => {
    return (
        <>
            <h2 className="movies">phim</h2>

            <div className="w-3/4 m-auto grid grid-cols-4">
                <div className="item relative group m-4">
                    <img src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg" alt="item" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="bg-red-400 p-2 border-radius">mua vé</button>
                    </div>
                    <div className="age__limit absolute bottom-[6px] right-[6px]">t18</div>
                    {/* Đánh giá sao */}
                    <div className="rating bg-opacity-50 absolute bottom-10 right-0 text-yellow-400">
                        ★★★★☆
                    </div>
                </div>
                <div className="item relative group m-4">
                    <img src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg" alt="item" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="bg-red-400 p-2 border-radius">mua vé</button>
                    </div>
                    <div className="rating bg-opacity-50 absolute bottom-10 right-0 text-yellow-400">
                        ★★★★☆
                    </div>
                </div>
                <div className="item relative group m-4">
                    <img src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg" alt="item" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="bg-red-400 p-2 border-radius">mua vé</button>
                    </div>
                    <div className="rating bg-opacity-50 absolute bottom-10 right-0 text-yellow-400">
                        ★★★☆☆
                    </div>
                </div>
                <div className="item relative group m-4">
                    <img src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg" alt="item" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="bg-red-400 p-2 border-radius">mua vé</button>
                    </div>
                    <div className="rating bg-opacity-50 absolute bottom-10 right-0 text-yellow-400">
                        ★★★★★
                    </div>
                </div>
                <div className="item relative group m-4">
                    <img src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg" alt="item" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="bg-red-400 p-2 border-radius">mua vé</button>
                    </div>
                    <div className="rating bg-opacity-100 absolute bottom-10 right-0 text-yellow-400">
                        ★★★★★
                    </div>
                    
                </div>
            </div>
        </>
    );
};

export default Movie;
