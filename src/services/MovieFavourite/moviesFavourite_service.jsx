import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseUrl } from "../Auth/auth.service";

export const moviesFavouriteApi = createApi({
  reducerPath: 'moviesFavouriteApi',
  baseQuery: fetchBaseUrl,
  endpoints: (builder) => ({
    getAllFavourite: builder.query({
      query: (id) => ({
        url: `/api/favouratiteMovie/${id}`,
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
  useCreateMoviesFavouriteMutation, //
  useGetAllFavouriteQuery, //
} = moviesFavouriteApi;
