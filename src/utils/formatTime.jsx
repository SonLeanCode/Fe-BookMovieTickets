  import {
      differenceInDays,
      isBefore,
      isAfter,
      isSameDay,
    } from 'date-fns';
    
  export const formatTime = (startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
  
    // Nếu thời gian hiện tại trước thời gian bắt đầu
    if (isBefore(now, start)) {
      // Kiểm tra nếu suất chiếu vào ngày hôm sau
      if (differenceInDays(start, now) === 1) {
        return <span className="font-bold text-blue-500">Sắp chiếu</span>; // Chiếu vào ngày mai
      }
      return <span className="font-bold text-blue-500">Đã lên lịch</span>; // Chiếu trong tương lai, không phải ngày mai
    }
  
    // Nếu thời gian hiện tại trong khoảng thời gian chiếu
    if (isAfter(now, start) && isBefore(now, end)) {
      // Kiểm tra nếu thời gian chiếu vào cùng ngày
      if (isSameDay(start, now)) {
        return <span className="font-bold text-red-500">Đang Chiếu</span>; // Chiếu trong ngày
      }
      return <span className="font-bold text-red-500">Đang Chiếu</span>; // Chiếu và trong khoảng thời gian của suất
    }
  
    // Nếu thời gian hiện tại sau thời gian kết thúc
    if (isAfter(now, end)) {
      return <span className="font-bold text-[#36f350]">Hoàn thành</span>; // Suất chiếu đã kết thúc
    }
  
    return <span className="font-bold text-gray-500">Không xác định</span>; // Trường hợp không mong đợi
  };
  