import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseUrl } from "../Auth/auth.service";

// Tạo API với Redux Toolkit Query
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseUrl,
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
