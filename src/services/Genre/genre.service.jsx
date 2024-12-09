import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseUrl } from "../Auth/auth.service";

// Create the API with Redux Toolkit Query
export const genreApi = createApi({
  reducerPath: 'genreApi',
  baseQuery: fetchBaseUrl,
  endpoints: (builder) => ({
    getAllGenres: builder.query({
      query: () => '/api/genre',
    }),
    addGenre: builder.mutation({
      query: (newGenre) => ({
        url: '/api/genre',
        method: 'POST',
        body: newGenre,
      }),
    }),
    updateGenre: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/api/genre/${id}`,
        method: 'PATCH',
        body: updatedData,
      }),
    }),
    deleteGenre: builder.mutation({
      query: (id) => ({
        url: `/api/genre/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export the hooks to use in components
export const {
    useGetAllGenresQuery, //
    useAddGenreMutation, //
    useUpdateGenreMutation, //
    useDeleteGenreMutation, //
} = genreApi;
