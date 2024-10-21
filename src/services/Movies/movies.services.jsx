import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Lấy token từ localStorage
const getAccessToken = () => localStorage.getItem('accessToken');

// Tạo API với Redux Toolkit Query
export const moviesApi = createApi({
  reducerPath: 'moviesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4003/', // Địa chỉ API của bạn
    prepareHeaders: (headers) => {
      // Lấy token từ localStorage
      const token = getAccessToken();
      // Nếu có token, thêm vào header Authorization
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Lấy tất cả phim
    getAllMovies: builder.query({
      query: () => ({
        url: '/api/movie',
        method: 'GET',
      }),
    }),

    getLatestMoviesByCreationDate: builder.query({
      query: () => ({
        url: '/api/movie/latest',
        method: 'GET',
      }),
    }),

    getMoviesByActorId: builder.query({
      query: (id) => ({
        url: `/api/movies/actor/${id}`,
        method: 'GET',
      }),
    }),

    // Lấy phim theo ID
    getMovieById: builder.query({
      query: (id) => ({
        url: `/api/movie/${id}`,
        method: 'GET',
      }),
    }),

    // Thêm phim mới
    addMovie: builder.mutation({
      query: (movieData) => ({
        url: '/api/movie',
        method: 'POST',
        body: movieData,
      }),
    }),

    // Cập nhật thông tin phim
    updateMovie: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/api/movie/${id}`,
        method: 'PATCH',
        body: updatedData,
      }),
    }),

    // Xóa phim theo ID
    deleteMovie: builder.mutation({
      query: (id) => ({
        url: `/api/movie/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export các hook để sử dụng trong các component
export const {
  useGetAllMoviesQuery,
  useGetMovieByIdQuery,
  useGetLatestMoviesByCreationDateQuery,
  useGetMoviesByActorIdQuery,
  useAddMovieMutation,
  useUpdateMovieMutation,
  useDeleteMovieMutation,
} = moviesApi;
