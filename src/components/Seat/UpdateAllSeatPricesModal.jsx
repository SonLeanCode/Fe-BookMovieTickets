import { useState, useEffect } from 'react';
import { useGetSeatTypesQuery, useUpdateAllSeatPricesMutation } from '../../services/Seat/seat.serviecs';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
const UpdateAllSeatPricesModal = ({ isOpen, onClose, refetchSeats }) => {
  const { data: seatTypesData, isLoading } = useGetSeatTypesQuery();
  const [updateAllSeatPrices] = useUpdateAllSeatPricesMutation();
  const [prices, setPrices] = useState({});
  
  useEffect(() => {
    if (seatTypesData) {
      const initialPrices = seatTypesData.data.reduce((acc, seat) => {
        acc[seat.seat_type] = {
          base: seat.base_price,
          weekend: seat.price_variations.find(v => v.day_type === 'weekend')?.price || '',
          holiday: seat.price_variations.find(v => v.day_type === 'holiday')?.price || ''
        };
        return acc;
      }, {});
      setPrices(initialPrices);
    }
  }, [seatTypesData]);

  const handlePriceChange = (seat_type, priceType, value) => {
    setPrices((prevPrices) => ({
      ...prevPrices,
      [seat_type]: {
        ...prevPrices[seat_type],
        [priceType]: value,
      },
    }));
  };

  const handleUpdatePrices = async () => {
    try {
      await updateAllSeatPrices(prices).unwrap();
      toast.success("Đã cập nhật giá ghế cho tất cả các phòng thành công");
      refetchSeats()
      onClose();
    } catch (error) {
      toast.error("Không thể cập nhật giá ghế cho tất cả các phòng");
    }
  };

  const getSeatTypeColor = (seatType) => {
    switch (seatType) {
      case '0':
        return 'text-blue-500';
      case '1':
        return 'text-yellow-500';
      case '2':
        return 'text-red-500';
      default:
        return ''; // Trả về lớp mặc định nếu không khớp
    }
  };

  return (
    isOpen && (
      <div
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-2xl rounded-lg bg-[#2d2d2d] p-6 shadow-lg"
        >
          <h2 className="mb-4 text-xl font-semibold">Cập nhật giá ghế cho tất cả các phòng</h2>
          {isLoading ? (
            <p>Đang tải...</p>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(prices).map((seatType) => (
                  <div key={seatType} className="p-2 border rounded-md">
                    <h3 className="text-lg font-semibold">Loại Ghế: <span className={getSeatTypeColor(seatType)}>{seatType == 0 ? "STANDARD" : seatType == 1 ? "VIP": "SWEETBOX"}</span></h3>
                    <div className="mt-2 flex items-center gap-2">
                      <label className="w-32">Ngày thường</label>
                      <input
                        type="number"
                        className="w-24 rounded-md border px-2 py-1 text-black"
                        placeholder="Nhập giá"
                        value={prices[seatType].base || ''}
                        onChange={(e) => handlePriceChange(seatType, 'base', e.target.value)}
                      />
                    </div>
                    {['weekend', 'holiday'].map((dayType) => (
                      <div key={dayType} className="mt-2 flex items-center gap-2">
                        <label className="w-32 capitalize">{dayType}</label>
                        <input
                          type="number"
                          className="w-24 rounded-md border px-2 py-1 text-black"
                          placeholder="Nhập giá"
                          value={prices[seatType][dayType] || ''}
                          onChange={(e) => handlePriceChange(seatType, dayType, e.target.value)}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
          <button
            onClick={handleUpdatePrices}
            className="mt-6 w-full rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Cập nhật giá cho tất cả
          </button>
          <button
            onClick={onClose}
            className="mt-2 w-full rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Đóng
          </button>
        </div>
      </div>
    )
  );
};

UpdateAllSeatPricesModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    refetchSeats: PropTypes.func.isRequired,
  };

export default UpdateAllSeatPricesModal;
