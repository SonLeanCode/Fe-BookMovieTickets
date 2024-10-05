import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('accessToken');
  const user = localStorage.getItem('user');
  const userData = user ? JSON.parse(user) : null;
  const userRole = userData ? userData.role : null;
  console.log(userRole)
  // Kiểm tra xem người dùng có token không và vai trò có trong allowedRoles không
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/404" replace />; // Hoặc trang nào đó bạn muốn redirect
  }

  return children; // Nếu tất cả các điều kiện đều đúng, render children
};

// Thêm PropTypes cho component
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired, // `children` là một React node 
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired, // `allowedRoles` là một mảng các string (mỗi string là một role được cho phép) 
};

export default PrivateRoute;
