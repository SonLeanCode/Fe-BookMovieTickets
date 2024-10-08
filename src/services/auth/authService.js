import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Lấy token từ localStorage
const getAccessToken = () => localStorage.getItem('accessToken');

// Tạo API với Redux Toolkit Query
export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4003/', // Địa chỉ API của bạn
    prepareHeaders: (headers) => {
      // Lấy token từ localStorage
      const token = getAccessToken();
      // Nếu có token, thêm vào header Authorization
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
        console.log('Authorization header set:', `Bearer ${token}`);
      } else {
        console.log('No token found');
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Endpoint để login
    login: builder.mutation({
      query: (credentials) => ({
        url: '/api/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // Endpoint để register
    register: builder.mutation({
      query: (userData) => ({
        url: '/api/auth/register',
        method: 'POST',
        body: userData,
      }),
    }),

    // Endpoint để đăng nhập bằng Google
    googleLogin: builder.mutation({
      query: (credentials) => ({
        url: '/api/auth/google',
        method: 'POST',
        body: credentials,
      }
    ),
    }),

    facebookLogin: builder.mutation({
      query: (credentials) => ({
        url: '/api/auth/facebook',
        method: 'POST',
        body: credentials,
      }),
    }),

    //test
    GetRegion: builder.query({
      query: () => '/api/regions',
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetRegionQuery, useGoogleLoginMutation, useFacebookLoginMutation } = authApi;