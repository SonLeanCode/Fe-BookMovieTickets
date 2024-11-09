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
      providesTags: ['Showtime'],
    }),
    
    // Lấy một suất chiếu cụ thể theo ID
    getShowtimeById: builder.query({
      query: (id) => `/api/showtime/${id}`,
      providesTags: (result, error, id) => [{ type: 'Showtime', id }],
    }),

    getMoviesByRegion: builder.query({
      query: (id) => `/api/showtime/regions/${id}`,
      providesTags: (result, error, id) => [{ type: 'Showtime', id }],
    }),

    getShowDatesByMovie: builder.query({
      query: (movieId) => `/api/showtimes/dates/${movieId}`,
    }),

    getCinemasWithShowtimesByMovieAndRegion: builder.query({
      query: ({movieId, regionId}) => `/api/cinemas/showtimes/${movieId}/${regionId}`,
    }),

    // Lọc suất chiếu theo phim, ngày và rạp
    filterShowtimes: builder.query({
      query: ({ movieId, date, cinemaId }) =>
        `/api/showtimes/filter?movieId=${movieId}&date=${date}&cinemaId=${cinemaId}`,
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
      invalidatesTags: (result, error, { id }) => [{ type: 'Showtime', id }],
    }),
    
    // Xóa một suất chiếu
    deleteShowtime: builder.mutation({
      query: (id) => ({
        url: `/api/showtime/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [{ type: 'Showtime', id }],
    }),
  }),
});

// Xuất các hooks auto-generated
export const {
  useGetAllShowtimesQuery,
  useGetShowtimeByIdQuery,
  useGetMoviesByRegionQuery,
  useGetShowDatesByMovieQuery,
  useFilterShowtimesQuery,
  useGetCinemasWithShowtimesByMovieAndRegionQuery,
  useCreateShowtimeMutation,
  useUpdateShowtimeMutation,
  useDeleteShowtimeMutation,
} = showtimesApi;
