import { format } from 'date-fns';

export const formatShowtime = (startTime, endTime) => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  // Định dạng thời gian chiếu: "16:30 - 17:35"
  const formattedShowtime = `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`;

  return formattedShowtime;
};
