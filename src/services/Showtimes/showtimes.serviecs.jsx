import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Function to get the access token from localStorage
const getAccessToken = () => localStorage.getItem('accessToken');

// Tạo API service bằng redux-toolkit
export const showtimesApi = createApi({
  reducerPath: 'showtimesApi',
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
  tagTypes: ['Showtime'],
  endpoints: (builder) => ({
    // Lấy tất cả các suất chiếu
    getAllShowtimes: builder.query({
      query: () => '/api/showtime',
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
      query: ({ showtimeId, seatStatuses }) => ({
        url: `/api/showtimes/${showtimeId}/seat-statuses`,
        method: 'POST', 
        body: { seatStatuses },
      }),
    }),
    
    // Xóa một suất chiếu
    deleteShowtime: builder.mutation({
      query: (id) => ({
        url: `/api/showtime/${id}`,
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
  useGetShowtimesByMovieQuery
} = showtimesApi;
