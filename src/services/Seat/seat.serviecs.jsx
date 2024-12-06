import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Function to get the access token from localStorage
const getAccessToken = () => localStorage.getItem('accessToken');

// Tạo API với Redux Toolkit Query
export const seatApi = createApi({
  reducerPath: 'seatApi',
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

    // Lấy tất cả ghế của một phòng
    getSeatsByRoom: builder.query({
      query: (roomId) => `/api/rooms/${roomId}/seats`, // Đường dẫn đến API lấy ghế trong phòng
    }),

    // Lấy ghế của một hàng cụ thể trong phòng
    getSeatsByRoomAndRow: builder.query({
      query: ({ roomId, row }) => `/api/rooms/${roomId}/seats/row/${row}`, // Đường dẫn đến API lấy ghế theo hàng
    }),

    getSeatTypesByRoomID: builder.query({
      query: (roomId) => `api/rooms/${roomId}/seats/types`,
    }),

    getSeatTypes: builder.query({
      query: () => `api/rooms/seats/types`,
    }),

    // Thêm một ghế
    addSeat: builder.mutation({
      query: ({ room_id, row, seat_number, seat_type, base_price }) => ({
        url: `/api/rooms/${room_id}/seat`,
        method: 'POST',
        body: { room_id, row, seat_number, seat_type, base_price }, 
      }),
    }),

    // Thêm nhiều ghế vào một hàng trong phòng
   addSeatsInRow: builder.mutation({
      query: ({ room_id, row, seatCount, seat_type, base_price }) => ({
        url: `/api/rooms/${room_id}/seats`,
        method: 'POST',
        body: { room_id, row, seatCount, seat_type, base_price }, // Dữ liệu để thêm ghế
      }),
    }),

    createSeatsForRoom: builder.mutation({
      query: (roomId) => ({
        url: `/api/create-seats/${roomId}`,
        method: 'POST',
      }),
    }),

    // Cập nhật giá ghế theo loại ghế hoặc loại ngày
    updateSeatPrices: builder.mutation({
      query: ({ roomId, seat_type, day_type, new_price }) => ({
        url: `/api/rooms/${roomId}/seats/update-price`,
        method: 'PATCH',
         body: { seat_type, day_type, new_price }, // Dữ liệu để cập nhật giá
      }),
    }),

    // Cập nhật all
    updateAllSeatPrices: builder.mutation({
      query: (prices) => ({
        url: '/api/seats/update-all',
        method: 'PATCH',  // Đổi thành PATCH
        body: prices,
      }),
    }),

    updateSeatStatus: builder.mutation({
      query: ({ seatId, newStatus }) => ({
        url: `/api/seats/${seatId}/status`,
        method: "PUT",
        body: { newStatus },
      }),
    }),

    // Xóa một ghế cụ thể
    deleteSeat: builder.mutation({
      query: (seatId) => ({
        url: `/api/seats/${seatId}`, // Đường dẫn đến API xóa ghế theo ID
        method: 'DELETE',
      }),
    }),

    // Xóa tất cả ghế trong một hàng cụ thể
    deleteSeatsByRow: builder.mutation({
      query: ({ roomId, row }) => ({
        url: `/api/rooms/${roomId}/seats/row/${row}`, // Đường dẫn đến API xóa tất cả ghế trong hàng
        method: 'DELETE',
      }),
    }),
  }),
});

// Xuất các hook để sử dụng trong component
export const {
  useGetSeatsByRoomQuery,
  useGetSeatsByRoomAndRowQuery,
  useGetSeatTypesQuery,
  useGetSeatTypesByRoomIDQuery,
  useAddSeatMutation,
  useAddSeatsInRowMutation,
  useUpdateSeatPricesMutation,
  useUpdateAllSeatPricesMutation,
  useUpdateSeatStatusMutation,
  useDeleteSeatMutation,
  useDeleteSeatsByRowMutation,
  useCreateSeatsForRoomMutation
} = seatApi;
