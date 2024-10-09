import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Function to get the access token from localStorage
const getAccessToken = () => localStorage.getItem('accessToken');

// Create the API with Redux Toolkit Query
export const regionsApi = createApi({
  reducerPath: 'regionsApi',
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
    // Get all regions
    getAllRegions: builder.query({
      query: () => ({
        url: '/api/regions',
        method: 'GET',
      }),
    }),

    // Get region by ID
    getRegionById: builder.query({
      query: (id) => ({
        url: `/api/regions/${id}`,
        method: 'GET',
      }),
    }),

    // Add new region
    addRegion: builder.mutation({
      query: (regionData) => ({
        url: '/api/regions',
        method: 'POST',
        body: regionData,
      }),
    }),

    // Update region by ID
    updateRegion: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/api/regions/${id}`,
        method: 'PATCH',
        body: updatedData,
      }),
    }),

    // Delete region by ID
    deleteRegion: builder.mutation({
      query: (id) => ({
        url: `/api/regions/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export the hooks to use in components
export const {
  useGetAllRegionsQuery,
  useGetRegionByIdQuery,
  useAddRegionMutation,
  useUpdateRegionMutation,
  useDeleteRegionMutation,
} = regionsApi;
