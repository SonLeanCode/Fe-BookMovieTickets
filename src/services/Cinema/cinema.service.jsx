import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Function to get the access token from localStorage
const getAccessToken = () => localStorage.getItem('accessToken');

// Create the API with Redux Toolkit Query
export const cinemaApi = createApi({
  reducerPath: 'cinemaApi',
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
    getAllCinemas: builder.query({
      query: () => '/api/cinema',
    }),
    getCinemaById: builder.query({
      query: (id) => `/api/cinema/${id}`,
    }),
    getCinemasByRegionId: builder.query({ 
      query: (id) => `/api/cinema/region/${id}`,
    }),
    addCinema: builder.mutation({
      query: (newCinema) => ({
        url: '/api/cinema',
        method: 'POST',
        body: newCinema,
      }),
    }),
    updateCinema: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/api/cinema/${id}`,
        method: 'PATCH',
        body: updatedData,
      }),
    }),
    deleteCinema: builder.mutation({
      query: (id) => ({
        url: `/api/cinema/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export the hooks to use in components
export const {
    useGetAllCinemasQuery,
    useGetCinemaByIdQuery,
    useGetCinemasByRegionIdQuery,
    useAddCinemaMutation,
    useUpdateCinemaMutation,
    useDeleteCinemaMutation,
} = cinemaApi;
