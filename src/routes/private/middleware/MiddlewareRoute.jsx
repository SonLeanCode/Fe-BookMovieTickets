import { Outlet, Navigate } from "react-router-dom";

export function NotLoggedMiddleware() {
  // Lấy token và thông tin người dùng từ localStorage
  const token = localStorage.getItem("accessToken");
  const user = JSON.parse(localStorage.getItem("user"));

  // Kiểm tra nếu người dùng đã đăng nhập và có token hợp lệ
  if (token && user) {
    // Xác định đường dẫn chuyển hướng dựa trên vai trò của người dùng
    const roleRedirectMap = {
      user: "/cinema",
      admin: "/admin",
    };

    const redirectTo = roleRedirectMap[user.role];

    // Nếu tìm thấy đường dẫn tương ứng với vai trò, điều hướng người dùng đến trang đó
    if (redirectTo) {
      return <Navigate to={redirectTo} />;
    }
  }

  // Nếu không có token hoặc chưa đăng nhập, cho phép tiếp tục truy cập các route khác
  return <Outlet />;
}
