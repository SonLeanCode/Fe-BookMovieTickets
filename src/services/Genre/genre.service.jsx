import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Function to get the access token from localStorage
const getAccessToken = () => localStorage.getItem('accessToken');

// Create the API with Redux Toolkit Query
export const genreApi = createApi({
  reducerPath: 'genreApi',
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
