import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseUrl } from "../Auth/auth.service";

// Tạo API service bằng redux-toolkit
export const showtimesApi = createApi({
  reducerPath: 'showtimesApi',
  baseQuery: fetchBaseUrl,
  tagTypes: ['Showtime'],
  endpoints: (builder) => ({
    // Lấy tất cả các suất chiếu
    getAllShowtimes: builder.query({
      query: () => '/api/showtime',
    }),

    getShowtimesById: builder.query({
      query: (id) => `/api/showtime/${id}`,
    }),

    getDataWithShowtimes: builder.query({
      query: () => '/api/showtimes/data',
    }),


    getShowtimesByMovie: builder.query({
      query: (id) => `/api/showtimes/movie/${id}`,
    }),

    
    // Thêm một suất chiếu mới
    createShowtime: builder.mutation({
        query: (newShowtime) => ({
          url: '/api/showtime',
          method: 'POST',
          body: newShowtime,
        }),
        invalidatesTags: ['Showtime'],
      }),
    
    // Cập nhật một suất chiếu
    updateShowtime: builder.mutation({
      query: ({ id, updatedShowtime }) => ({
        url: `/api/showtime/${id}`,
        method: 'PUT',
        body: updatedShowtime,
      }),
    }),

    addSeatStatuses: builder.mutation({
      query: ({ showtimeId, seatStatuses, user_id}) => ({
        url: `/api/showtimes/${showtimeId}/seat-statuses`,
        method: 'POST',
        body: { seatStatuses, user_id }, // Gửi kèm userId
      }),
    }),

    deleteSeatStatus: builder.mutation({
      query: ({ showtimeId, seatId, user_id }) => ({
        url: `/api/showtimes/${showtimeId}/seat-statuses/${seatId}`,
        method: 'DELETE',
        body: { user_id }, // Gửi kèm userId
      }),
    }),
    

    
    // Xóa một suất chiếu
    deleteShowtime: builder.mutation({
      query: (id) => ({
        url: `/api/showtime/${id}`,
        method: 'DELETE',
      }),
    }),

    // Endpoint để xóa trạng thái ghế
    removeSeatStatus: builder.mutation({
      query: (seatStatusId) => ({
        url: `/api/seatStatus/${seatStatusId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Xuất các hooks auto-generated
export const {
  useGetAllShowtimesQuery, //
  useCreateShowtimeMutation, //
  useUpdateShowtimeMutation, //
  useAddSeatStatusesMutation, //
  useDeleteShowtimeMutation, //
  useGetDataWithShowtimesQuery, //
  useGetShowtimesByMovieQuery,
  useDeleteSeatStatusMutation,//
  useGetShowtimesByIdQuery,
  useRemoveSeatStatusMutation
} = showtimesApi;
