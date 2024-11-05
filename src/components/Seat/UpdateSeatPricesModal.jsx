import { useState, useEffect } from 'react';
import { useUpdateSeatPricesMutation, useGetSeatTypesQuery } from '../../services/Seat/seat.serviecs';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
const UpdateSeatPricesModal = ({ isOpen, onClose, roomId ,refetchSeats}) => {
  const { data: seatTypesData, isLoading, refetch } = useGetSeatTypesQuery(roomId);
  const [updateSeatPrices] = useUpdateSeatPricesMutation();
  const [prices, setPrices] = useState({});
    console.log(seatTypesData)
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

  const handleUpdatePrice = async (seat_type, priceType) => {
    const new_price = prices[seat_type][priceType];
    if (!new_price) {
      toast.error("Vui lòng nhập giá mới");
      return;
    }

    const day_type = priceType === 'base' ? null : priceType;
    try {
      await updateSeatPrices({
        roomId,
        seat_type,
        day_type,
        new_price,
      }).unwrap();
      toast.success("Đã cập nhật giá thành công");
      refetch()
      refetchSeats()
    } catch (error) {
      toast.error("Không thể cập nhật giá ghế");
    }
  };
  const getSeatTypeColor = (seatType) => {
    switch (seatType) {
      case 'Single':
        return 'text-blue-500';
      case 'VIP':
        return 'text-yellow-500';
      case 'Sweetbox':
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
          <h2 className="mb-4 text-xl font-semibold">Cập nhật giá ghế trong phòng : <span className='text-blue-500 font-bold'>{seatTypesData?.data[0].room_id.name}</span></h2>
          {isLoading ? (
            <p>Đang tải...</p>
          ) : (
            <div className="max-h-96 overflow-y-auto scrollbar-hidden">
              <div className="grid grid-cols-2 gap-4">
                {Object.keys(prices).map((seatType) => (
                  <div key={seatType} className="p-2 border rounded-md">
                    <h3 className="text-lg font-semibold">Loại Ghế: <span className={getSeatTypeColor(seatType)}>{seatType}</span></h3>

                    {/* Giá ngày thường (base_price) */}
                    <div className="mt-2 flex items-center gap-2">
                      <label className="w-32">Ngày thường</label>
                      <input
                        type="number"
                        className="w-24 rounded-md border px-2 py-1 text-black"
                        placeholder="Nhập giá"
                        value={prices[seatType].base || ''}
                        onChange={(e) =>
                          handlePriceChange(seatType, 'base', e.target.value)
                        }
                      />
                      <button
                        onClick={() => handleUpdatePrice(seatType, 'base')}
                        className="rounded-md bg-blue-500 px-4 py-1 text-white hover:bg-blue-600"
                      >
                        Cập nhật
                      </button>
                    </div>

                    {/* Giá cuối tuần và ngày lễ (price_variations) */}
                    {['weekend', 'holiday'].map((dayType) => (
                      <div key={dayType} className="mt-2 flex items-center gap-2">
                        <label className="w-32 capitalize">{dayType}</label>
                        <input
                          type="number"
                          className="w-24 rounded-md border px-2 py-1 text-black"
                          placeholder="Nhập giá"
                          value={prices[seatType][dayType] || ''}
                          onChange={(e) =>
                            handlePriceChange(seatType, dayType, e.target.value)
                          }
                        />
                        <button
                          onClick={() => handleUpdatePrice(seatType, dayType)}
                          className="rounded-md bg-blue-500 px-4 py-1 text-white hover:bg-blue-600"
                        >
                          Cập nhật
                        </button>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}
          <button
            onClick={onClose}
            className="mt-6 w-full rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Đóng
          </button>
        </div>
      </div>
    )
  );
};

UpdateSeatPricesModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    roomId: PropTypes.string.isRequired,
    refetchSeats: PropTypes.func.isRequired,
  };

export default UpdateSeatPricesModal;
