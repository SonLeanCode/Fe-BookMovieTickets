const EventPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
  
    useEffect(() => {
      const popupClosedTime = localStorage.getItem('popupClosedTime');
      const oneHour = 60 * 60 * 1000; // 1 giờ tính bằng mili giây
  
      if (!popupClosedTime || Date.now() - popupClosedTime > oneHour) {
        setIsOpen(true);
      }
    }, []);
  
    const handleClose = () => {
      setIsOpen(false);
      localStorage.setItem('popupClosedTime', Date.now());
    };
  
    return (
      isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center">
            <h2 className="text-3xl font-bold text-blue-500 animate-pulse mb-4">Sự Kiện Đặc Biệt!</h2>
            <p className="text-gray-700 text-lg">
              Tham gia sự kiện đặc biệt vào cuối tuần này và nhận nhiều ưu đãi hấp dẫn!
            </p>
            <button
              className="mt-6 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg"
              onClick={handleClose}
            >
              Đóng
            </button>
          </div>
        </div>
      )
    );
  };
  