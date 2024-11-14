import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Lấy token từ localStorage
const getAccessToken = () => localStorage.getItem('accessToken');

// Tạo API với Redux Toolkit Query
export const paymentApi = createApi({
  reducerPath: 'paymentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4003/', // Địa chỉ API của bạn
    prepareHeaders: (headers) => {
      // Lấy token từ localStorage
      const token = getAccessToken();
      // Nếu có token, thêm vào header Authorization
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        console.log('Authorization header set:', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Endpoint để thanh toán MoMo
    paymentMomo: builder.mutation({
      query: (credentials) => ({
        url: '/api/payment',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
});

export const { usePaymentMomoMutation } = paymentApi;
