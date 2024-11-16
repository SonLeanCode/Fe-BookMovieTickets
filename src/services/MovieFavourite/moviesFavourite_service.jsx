import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getAccessToken = () => localStorage.getItem('accessToken');

export const moviesFavouriteApi = createApi({
  reducerPath: 'moviesFavouriteApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4003/', // Địa chỉ API của bạn
    prepareHeaders: (headers) => {
      const token = getAccessToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllFavourite: builder.query({
      query: () => ({
        url: '/api/favouratiteMovie',
        method: 'GET',
      }),
    }),
    createMoviesFavourite: builder.mutation({
      query: (dataFaMoive) => ({
        url: '/api/favouratiteMovie',
        method: 'POST',
        body: dataFaMoive,
      }),
      
    }),
  }),
});

export const {
  useCreateMoviesFavouriteMutation,
  useGetAllFavouriteQuery,
} = moviesFavouriteApi;
