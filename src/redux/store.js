import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';
import { authApi } from '../services/auth/authService';

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    [authApi.reducerPath]: authApi.reducer, // Thêm reducer cho authApi
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(authApi.middleware), // Thêm middleware cho authApi
});

export default store;
