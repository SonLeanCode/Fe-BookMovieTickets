import { formatCurrency } from "./formatCurrency";

export const getPriceByDayType = (priceVariations, dayType) => {
    const variation = priceVariations.find(
      (item) => item.day_type === dayType
    );
    return variation ? formatCurrency(variation.price) : "N/A"; // Hiển thị "N/A" nếu không tìm thấy
  };