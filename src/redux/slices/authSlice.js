import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  userInfo: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token); // Store token
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.token = null;
      localStorage.removeItem('token'); // Remove token
    },
  },
});

// Export actions and reducer
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
