import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Function to get the access token from localStorage
const getAccessToken = () => localStorage.getItem('accessToken');

// Tạo API với Redux Toolkit Query
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4003/', // Your API base URL
    prepareHeaders: (headers) => {
      // Get token from localStorage
      const token = getAccessToken();
      // If token exists, add it to the Authorization header
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({

    // Endpoint để lấy danh sách người dùng
    getAllUsers: builder.query({
      query: () => '/api/users', // Đường dẫn đến API lấy danh sách người dùng
    }),

    getUserById: builder.query({
      query: (id) => `/api/user/${id}`, // Đường dẫn đến API lấy danh sách người dùng
    }),

    // Endpoint để sửa thông tin người dùng
    updateUser: builder.mutation({
      query: ({ id, userData }) => ({
        url: `/api/user/${id}`, // Đường dẫn đến API sửa người dùng theo ID
        method: 'PATCH',
        body: userData,
      }),
    }),

    // Endpoint để xóa người dùng
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/user/${id}`, // Đường dẫn đến API xóa người dùng theo ID
        method: 'DELETE',
      }),
    }),
  }),
});

// Xuất các hook để sử dụng trong component
export const {
  useGetAllUsersQuery, //
  useGetUserByIdQuery,
  useUpdateUserMutation, //
  useDeleteUserMutation, //
} = userApi;
