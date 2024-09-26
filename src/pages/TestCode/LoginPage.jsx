import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../../redux/slices/authSlice';
import { useLoginMutation } from '../../services/auth/authService';

const LoginPage = () => {
  const [loginApi] = useLoginMutation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userInfo = useSelector((state) => state.auth.userInfo);

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await loginApi({ username, password }).unwrap();
      const { token, user } = response; // Assuming your API returns token and user info
      dispatch(login({ token, user })); // Dispatch the login action
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    alert("You have been logged out."); // Optional: Notify the user
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {!isAuthenticated ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="User">Username:</label>
                <input
                  type="text"
                  id="User"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1" htmlFor="password">Password:</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                Login
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Welcome, {userInfo.username}</h2>
            <p className="mb-4">Email: {userInfo.email}</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}
        {isAuthenticated && <p className="mt-4 text-green-600">You are logged in!</p>}
        {!isAuthenticated && <p className="mt-4 text-red-600">You are logged out!</p>}
      </div>
    </div>
  );
};

export default LoginPage;
