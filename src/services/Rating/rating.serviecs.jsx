import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseUrl } from "../Auth/auth.service";

export const ratingApi = createApi({
    reducerPath: 'ratingApi',
    baseQuery: fetchBaseUrl,
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

export const {
   useAddOrUpdateRatingMutation,//
    useGetRatingsByMovieQuery  //
  } = ratingApi;