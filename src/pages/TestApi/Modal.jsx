const Modal = ({ isOpen, onClose, room }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white rounded p-4 w-1/3">
          <h2 className="text-lg font-bold">Thông tin phòng</h2>
          {room ? (
            <div>
              <p><strong>Tên phòng:</strong> {room.name}</p>
              <p><strong>Sức chứa:</strong> {room.capacity}</p>
              <p><strong>Địa chỉ:</strong> {room.address}</p>
              {/* Thêm thông tin khác nếu cần */}
            </div>
          ) : (
            <p>Không có thông tin phòng.</p>
          )}
          <button onClick={onClose} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Đóng</button>
        </div>
      </div>
    );
  };
  
  export default Modal;