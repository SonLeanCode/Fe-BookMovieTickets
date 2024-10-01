import { Link } from "react-router-dom";
import "../movie/movie.css";

const Movie = () => {
    return (
        <>
        <div className="body">
        <div className="box">
        <div className="movies-container">
                <div className="movies">
                    <div className="movies-title"><strong className="textcolor p-1 ">|</strong>Phim</div>
                    <div className="cate">
                        <Link className="textcolor active">Đang chiếu</Link>
                        <Link className="inactive">Sắp chiếu</Link>
                        <Link className="inactive">Phim IMAX</Link>
                    </div>

                </div>
            </div>
            <div className="container">
                <div className="item group">
                    <img src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg" alt="item" />
                    <div className="overlay">
                        <button className="buysticket">mua vé</button>
                    </div>
                    <div className="badge bgcam">T18</div>
                    <div className="rating">★★★★☆</div>
                </div>
                <div className="item group">
                    <img src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg" alt="item" />
                    <div className="overlay">
                        <button className="buysticket">mua vé</button>
                    </div>
                    <div className="badge  bgcam text-white">T18</div>
                    <div className="rating">★★★★☆</div>
                </div>
                <div className="item group">
                    <img src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg" alt="item" />
                    <div className="overlay">
                        <button className="buysticket">mua vé</button>
                    </div>
                    <div className="badge bgcam">T18</div>
                    <div className="rating">★★★★☆</div>
                </div>
                <div className="item group">
                    <img src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg" alt="item" />
                    <div className="overlay">
                        <button className="buysticket">mua vé</button>
                    </div>
                    <div className="badge bgcam">T18</div>
                    <div className="rating">★★★★☆</div>
                </div>
                <div className="item group">
                    <img src="https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg" alt="item" />
                    <div className="overlay">
                        <button className="buysticket">mua vé</button>
                    </div>
                    <div className="badge bgcam">T18</div>
                    <div className="rating">★★★★☆</div>
                </div>
            </div>
            <div className="container text-section">
                <h2 className="movie">Phim đang chiếu</h2>
                <div className="description-detail">
                    <div className="name-detail">
                        <div className="name">1. Làm Giàu Với Ma</div>
                        <div className="category">– Kinh dị, Hài </div>
                        <div className="date">– 30.08 </div>
                    </div>
                    <div className="description">
                        Làm Giàu Với Ma là tác phẩm đánh dấu sự trở lại của NSUT Hoài Linh sau thời gian dài vắng bóng trên màn ảnh rộng. Phim mang đề tài hài tâm linh được đạo diễn bởi Trung Lùn, cùng với sự tham gia của nam chính nghìn tỷ Tuấn Trần, bên cạnh đó còn có sự góp mặt của NSƯT Hữu Châu, Lê Giang, Diệp Bảo Ngọc,…
                    </div>
                </div>
            </div>
        </div>
        </div>
        
            
        </>
    );
};

export default Movie;
