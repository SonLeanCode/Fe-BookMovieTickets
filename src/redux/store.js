import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/Auth/auth.service';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer, // Thêm reducer cho authApi
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(authApi.middleware), // Thêm middleware cho authApi
});

export default store;
