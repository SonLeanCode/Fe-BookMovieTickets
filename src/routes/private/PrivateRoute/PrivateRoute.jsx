import PropTypes from 'prop-types';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('accessToken');
  const user = JSON.parse(localStorage.getItem('user'));
  const userRole = user?.role;

  // Kiểm tra xem người dùng có token không và vai trò có trong allowedRoles không
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/404" replace />; // Hoặc trang nào đó bạn muốn redirect
  }

  // Nếu tất cả các điều kiện đều đúng, trả về Outlet để render các route con
  return <Outlet />;
};
// Thêm PropTypes cho component
PrivateRoute.propTypes = {
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired, // `allowedRoles` là một mảng các string (mỗi string là một role được cho phép) 
};

export default PrivateRoute;
