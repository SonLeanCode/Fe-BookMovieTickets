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
        return "Sắp chiếu"; // Chiếu vào ngày mai
      }
      return "Đã lên lịch"; // Chiếu trong tương lai, không phải ngày mai
    }
  
    // Nếu thời gian hiện tại trong khoảng thời gian chiếu
    if (isAfter(now, start) && isBefore(now, end)) {
      // Kiểm tra nếu thời gian chiếu vào cùng ngày
      if (isSameDay(start, now)) {
        return "Đang Chiếu"; // Chiếu trong ngày
      }
      return "Đang Chiếu"; // Chiếu và trong khoảng thời gian
    }
  
    // Nếu thời gian hiện tại sau thời gian kết thúc
    if (isAfter(now, end)) {
      return "Hoàn thành"; // Suất chiếu đã kết thúc
    }
  
    return "Không xác định"; // Trường hợp không mong đợi
  };
  