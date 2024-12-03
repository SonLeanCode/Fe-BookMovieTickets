import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Function to get the access token from localStorage
const getAccessToken = () => localStorage.getItem('accessToken');

export const ratingApi = createApi({
    reducerPath: 'ratingApi',
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
    // Thêm hoặc cập nhật đánh giá
    addOrUpdateRating: builder.mutation({
      query: ({ movieId, userId, rating }) => ({
        url: `/api/rating/${movieId}`,
        method: "POST",
        body: { userId, rating },
      }),
    }),
    // Lấy danh sách đánh giá của một phim
    getRatingsByMovie: builder.query({
      query: (movieId) => `/api/ratings/${movieId}`,
    }),
  }),
});

export const { useAddOrUpdateRatingMutation, useGetRatingsByMovieQuery } = ratingApi;