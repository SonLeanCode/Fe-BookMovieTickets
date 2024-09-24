// src/services/authService.js
import axios from 'axios';

const API_URL = '/api/'; // Đường dẫn đến API của bạn

// Đăng nhập
const login = async (email, password) => {
  const response = await axios.post(`${API_URL}login`, { email, password });
  return response.data; // Trả về dữ liệu từ server
};

// Đăng xuất
const logout = () => {
  // Nếu bạn cần thực hiện các thao tác logout, như xóa token, hãy thực hiện ở đây
  localStorage.removeItem('user'); // Ví dụ, xóa thông tin người dùng từ local storage
};

// Xuất các hàm ra để sử dụng trong component
export default {
  login,
  logout,
};
