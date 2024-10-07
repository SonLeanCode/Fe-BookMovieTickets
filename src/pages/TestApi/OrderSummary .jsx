
const OrderSummary = () => {
  // Dữ liệu mẫu cho đơn hàng
  const movieDetails = {
    title: "Transformers",
    format: "2D Phụ Đề",
    showTime: "T13 Galaxy Nguyễn Du - RAP 5",
    date: "Thứ Ba, 01/10/2024",
    seatType: "Ghế đơn",
    seatNumber: "B5",
    price: 55000,
    quantity: 1,
    imageUrl: "https://cdn.galaxycine.vn/media/2024/8/13/transformers-500_1723544375976.jpg", // Thay thế bằng URL hình ảnh thật
  };

  const totalAmount = movieDetails.price * movieDetails.quantity;

  return (
    <div className="flex flex-col items-center mt-32 p-4 border rounded shadow-lg w-1/2 mx-auto">
      <img 
        src={movieDetails.imageUrl} 
        alt={movieDetails.title} 
        className="mb-4 w-44 rounded" // Điều chỉnh kích thước hình ảnh
      />
      <h2 className="text-2xl font-semibold mb-4">{movieDetails.title}</h2>
      <p className="mb-2">{movieDetails.format} - {movieDetails.showTime}</p>
      <p className="mb-2">{movieDetails.date}</p>
      <p className="mb-2">{movieDetails.quantity}x {movieDetails.seatType} Ghế: {movieDetails.seatNumber}</p>
      <p className="mb-2">Giá: {movieDetails.price.toLocaleString('vi-VN')} ₫</p>
      <p className="font-bold">Tổng cộng: {totalAmount.toLocaleString('vi-VN')} ₫</p>
      <div className="flex mt-4 space-x-4">
        <button className="bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded">
          Quay lại
        </button>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
          Tiếp tục
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;