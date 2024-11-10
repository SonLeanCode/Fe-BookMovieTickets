import { format, isSameDay } from 'date-fns';

export const formatShowDate = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  // Nếu ngày bắt đầu và ngày kết thúc là cùng một ngày
  if (isSameDay(start, end)) {
    return format(start, 'dd/MM/yyyy');
  } else {
    // Nếu suất chiếu kéo dài qua ngày
    return `${format(start, 'dd/MM/yyyy')} - ${format(end, 'dd/MM/yyyy')}`;
  }
};

export const formatShowDate2 = (dateStr) => {
  // Tạo đối tượng Date không dùng UTC
  const dateParts = dateStr.split('-'); // dateStr dạng 'YYYY-MM-DD'
  const date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]); // Không dùng Date.UTC

  const dayNames = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"];
  const dayOfWeek = dayNames[date.getDay()]; // Lấy ngày trong tuần theo local time
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}`; // Format ngày theo local time

  return `${dayOfWeek}  ${formattedDate}`;
};

export function formatShowDate3(start_time) {
  const daysOfWeek = [
    "Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", 
    "Thứ Năm", "Thứ Sáu", "Thứ Bảy"
  ];

  // Chuyển đổi start_time thành đối tượng Date
  const date = new Date(start_time);

  // Lấy ngày, tháng, năm và ngày trong tuần
  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = date.getDate().toString().padStart(2, '0'); // Đảm bảo có hai chữ số
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  // Trả về chuỗi định dạng
  return `${dayOfWeek}, ${day}/${month}/${year}`;
}
