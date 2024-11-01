import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  useGetSeatsByRoomQuery,
  useAddSeatsInRowMutation,
  useUpdateSeatPricesMutation,
  useDeleteSeatMutation,
} from '../../services/Seat/seat.serviecs';

const Seat_Management = () => {
  const { roomId } = useParams(); // room_id is obtained from URL params
  const [addSeatsInRow] = useAddSeatsInRowMutation();
  const [updateSeatPrices] = useUpdateSeatPricesMutation();
  const [deleteSeat] = useDeleteSeatMutation();
  const { data: seats, refetch: refetchSeats } = useGetSeatsByRoomQuery(roomId);

  const [newSeat, setNewSeat] = useState({
    room_id: roomId, // Ensure room_id is initialized
    row: '',
    seatCount: 1,
    seatType: 'Single',
    basePrice: 10000,
    priceVariations: [],
    status: 'available',
  });
  
  const [editSeatId, setEditSeatId] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddSeats = async () => {
    const { row, seatCount, seatType, basePrice } = newSeat;
    try {
      // Prepare price variations based on the base price
      const priceVariations = [
        { day_type: 'weekday', price: basePrice },
        { day_type: 'weekend', price: basePrice * 1.2 },
        { day_type: 'holiday', price: basePrice * 1.5 },
      ];

      // Send request with all necessary information
      await addSeatsInRow({
        room_id: roomId, // Use room_id from params
        row,
        seatCount,
        seat_type: seatType,
        base_price: basePrice,
        price_variations: priceVariations,
      });
      refetchSeats();
      // Reset form after adding seats
      setNewSeat({
        room_id: roomId, // Reset to the current room_id
        row: '',
        seatCount: 1,
        seatType: 'Single',
        basePrice: 10000,
        priceVariations: [],
        status: 'available',
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error(error); // Check for errors
    }
  };

  const handleUpdateSeat = async (seatId, newPrice) => {
    await updateSeatPrices({ roomId, seatId, new_price: newPrice });
    refetchSeats();
  };

  const handleDeleteSeat = async (seatId) => {
    await deleteSeat(seatId);
    refetchSeats();
  };

  const handleOpenModal = (seat) => {
    if (seat) {
      setNewSeat({
        room_id: roomId, // Ensure room_id is set for editing
        row: seat.row,
        seatCount: 1, // Change if you need for number of seats
        seatType: seat.seat_type,
        basePrice: seat.base_price,
        priceVariations: seat.price_variations, // Assuming you want to show price variations in the modal
        status: seat.status,
      });
      setEditSeatId(seat.id);
    } else {
      setNewSeat({
        room_id: roomId, 
        row: '',
        seatCount: 1,
        seatType: 'Single',
        basePrice: 10000,
        priceVariations: [],
        status: 'available',
      });
      setEditSeatId(null);
    }
    setIsModalOpen(true);
  };



  return (
    <div className='ml-64 text-white'>
      <h1>Quản lý ghế</h1>
      <div>
        {seats && seats.map(seat => (
          <div key={seat.id}>
            <span>{seat.row} - Ghế {seat.seat_number}</span>
            <button onClick={() => handleOpenModal(seat)}>Sửa giá</button>
            <button onClick={() => handleDeleteSeat(seat.id)}>Xóa</button>
          </div>
        ))}
      </div>
      <button onClick={() => handleOpenModal(null)}>Thêm Ghế</button>

      {/* Modal Thêm/Cập nhật Ghế */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>{editSeatId ? 'Cập Nhật Ghế' : 'Thêm Ghế'}</h2>
            <input 
              type="text" 
              placeholder="Hàng" 
              value={newSeat.row} 
              onChange={(e) => setNewSeat({ ...newSeat, row: e.target.value })} 
              className='text-black'
              required
            />
            <input 
              type="number" 
              placeholder="Số ghế" 
              value={newSeat.seatCount} 
              onChange={(e) => setNewSeat({ ...newSeat, seatCount: Number(e.target.value) })} 
              className='text-black'
              required
            />
            <input 
              type="text" 
              placeholder="Loại ghế" 
              value={newSeat.seatType} 
              onChange={(e) => setNewSeat({ ...newSeat, seatType: e.target.value })} 
              className='text-black'
              required
            />
            <input 
              type="number" 
              placeholder="Giá cơ bản" 
              value={newSeat.basePrice} 
              onChange={(e) => setNewSeat({ ...newSeat, basePrice: Number(e.target.value) })} 
              className='text-black'
              required
            />
            <button 
              onClick={editSeatId ? handleUpdateSeat : handleAddSeats}
              disabled={!newSeat.row || newSeat.seatCount <= 0 || !newSeat.seatType || newSeat.basePrice <= 0} // Disable if any field is invalid
            >
              {editSeatId ? 'Cập Nhật' : 'Thêm'}
            </button>
            <button onClick={() => setIsModalOpen(false)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Seat_Management;
