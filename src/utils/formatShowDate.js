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
