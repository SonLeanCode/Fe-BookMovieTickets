import { useState, useEffect } from "react";

const PopupNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [fadeIn, setFadeIn] = useState(false); // Trạng thái để kích hoạt hiệu ứng xuất hiện

  useEffect(() => {
    const popupClosedAt = localStorage.getItem("popupClosedAt");
    if (!popupClosedAt || new Date().getTime() - popupClosedAt > 3600000) {
      setIsVisible(true); // Hiển thị popup nếu chưa đóng hoặc đã qua 1 giờ
      setTimeout(() => setFadeIn(true), 50); // Bắt đầu hiệu ứng xuất hiện dần sau 50ms
    }
  }, []);

  const closePopupTemporarily = () => {
    setFadeIn(false); // Bắt đầu hiệu ứng ẩn dần đi
    setTimeout(() => setIsVisible(false), 300); // Đợi 300ms để hoàn thành hiệu ứng ẩn popup
  };

  const closePopupForOneHour = () => {
    setFadeIn(false); // Bắt đầu hiệu ứng ẩn dần đi
    setTimeout(() => {
      setIsVisible(false); // Tắt popup và lưu thời gian đóng sau hiệu ứng ẩn dần
      localStorage.setItem("popupClosedAt", new Date().getTime());
    }, 300); // Thực hiện sau khi hiệu ứng ẩn hoàn thành
  };

  return (
    isVisible && (
      <div className={`fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-700 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative w-[43%] bg-white p-6 rounded-lg shadow-lg text-center transition-all duration-700 transform scale-100">
          {/* Nút đóng ở góc trên bên phải */}
          <button
            className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full hover:bg-red-700 focus:outline-none"
            onClick={closePopupTemporarily} // Tắt tạm thời
          >
            &times;
          </button>

          <h2 className="text-2xl text-black capitalize font-semibold mb-4 animate-text bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent">
            <span role="img" aria-label="Loa loa">📢</span> Chương trình khuyến mãi đặc biệt <span className="uppercase">sự kiện</span>
          </h2>
          <img src="https://i.pinimg.com/originals/4c/11/f7/4c11f751f8d87ba74ba90f3588d67022.gif" className="h-56 text-center flex justify-center items-center w-full" alt="" />
          <p className="mb-4 text-lg text-gray-700">
            Loa loa! Chúng tôi đang tổ chức một sự kiện cực kỳ hấp dẫn với nhiều ưu đãi và quà tặng đặc biệt dành cho bạn.
            Đừng bỏ lỡ cơ hội này, tham gia ngay để nhận ngay ưu đãi khủng chỉ trong thời gian giới hạn!
          </p>
          <a
            target="_blank"
            href="/cinema/voucher/detail"
            className="text-black underline hover:text-slate-500"
          >
            Xem chi tiết sự kiện tại đây
          </a>

          <p className="mb-4 mt-5 text-2xl text-gray-700">
            Mọi người tham gia nhóm chat <br /> <a target="_blank" className="text-blue-500" href="https://zalo.me/g/hitmfg682">https://zalo.me/g/hitmfg682</a>
          </p>

          <button
            className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700"
            onClick={closePopupForOneHour} // Tắt popup trong 1 giờ
          >
            Đóng 1 giờ
          </button>
        </div>
      </div>
    )
  );
};

export default PopupNotification;
