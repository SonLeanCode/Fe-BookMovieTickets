import { useEffect, useState } from "react";
import { Seat } from "./api/movies";

const SeatSelection = () => {
  const [seats, setSeats] = useState([]);

  useEffect(() => {
    const fetchSeats = async () => {
      const seatsData = await Seat();
      const filteredSeats = seatsData.filter(seat => seat.room_id === 2);
      setSeats(filteredSeats);
    };

    fetchSeats();
  }, []);

  const handleSeatClick = (seat) => {
    // Xử lý click ghế, có thể đánh dấu ghế được chọn
    if (!seat.status) {
      console.log(`Ghế ${seat.row}${seat.number} được chọn.`);
      // Thêm logic để đặt ghế
    } else {
      console.log(`Ghế ${seat.row}${seat.number} đã được đặt.`);
    }
  };

  return (
    <div className="flex flex-col items-center mt-32">
      <h2 className="mb-4 text-xl font-semibold">Chọn ghế</h2>
      <div className="flex flex-col items-center">
        {["A", "B", "C", "D", "E", "F", "G", "H"].map(row => (
          <div key={row} className="flex justify-center mb-2">
            {seats
              .filter(seat => seat.row === row)
              .map(seat => (
                <div
                  key={seat.id}
                  onClick={() => handleSeatClick(seat)}
                  className={`cursor-pointer rounded border p-2 text-center 
                    ${seat.status === 'booked' ? 'bg-gray-800 text-white' : 
                      seat.type === 'vip' ? 'bg-red-500 text-white' : 
                      seat.type === 'sweetbox' ? 'bg-pink-500 text-white' : 
                      'bg-green-500 text-white'}`}
                >
                  {seat.row}{seat.number}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeatSelection;
