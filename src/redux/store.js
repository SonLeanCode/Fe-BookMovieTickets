import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer, // Thêm các reducer tại đây
  },
});

export default store;
