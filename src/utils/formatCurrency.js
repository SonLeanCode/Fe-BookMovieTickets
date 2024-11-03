export function formatCurrency(amount) {
  // Chuyển đổi amount thành số
  const number = Number(amount);

  const formattedAmount = number.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0, // Số chữ số thập phân tối thiểu
    maximumFractionDigits: 0, // Số chữ số thập phân tối đa
  });

  return formattedAmount.replace("₫", "VNĐ"); // Thay đổi biểu tượng tiền tệ từ ₫ thành đ
}
