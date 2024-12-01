import {
    isBefore,
    isAfter,
    isSameDay,
} from 'date-fns';

export const checkVoucherStatus = (valid_from, valid_until) => {
    console.log('ngaybat',valid_from,valid_until)
    const now = new Date()
    const start = new Date(valid_from)
    const end = new Date(valid_until)
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        console.error('Ngày không hợp lệ:', { valid_from, valid_until });
        return <span className="text-red-500">Ngày không hợp lệ</span>;
      }
      
    if (isBefore(now, start)) {
        return (
            <span className="font-bold text-blue-500">
                Voucher chưa có hiệu lực
            </span>
        )
    }
    if (isAfter(now, start) && isBefore(now, end)) {
        if (isSameDay(start, now) || isSameDay(end, now)) {
            return (
                <span className="font-bold text-green-500">
                    Voucher có hiệu lực hôm nay
                </span>
            );
        }
        return (
            <span>
            <span className="font-bold text-green-500">
                Voucher hiện đang có hiệu lực
            </span> 
            <br />
            <span className="font-bold text-gray-500">
                 {start.toLocaleDateString()} - {end.toLocaleDateString()}.
            </span>
        </span>
        );
    }
    if (isAfter(now, end)) {
        return (
            <span className="font-bold text-red-500">
                Voucher đã hết hạn 
            </span>
        );
    }

    return (
        <span className="font-bold text-gray-500">
            Trạng thái không xác định
        </span>
    );
}