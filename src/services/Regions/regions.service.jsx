import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseUrl } from "../Auth/auth.service";

// Create the API with Redux Toolkit Query
export const regionsApi = createApi({
  reducerPath: 'regionsApi',
  baseQuery: fetchBaseUrl,
  endpoints: (builder) => ({
    // Get all regions
    getAllRegions: builder.query({
      query: () => ({
        url: '/api/regions',
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
  useGetAllRegionsQuery, //
  useAddRegionMutation, // 
  useUpdateRegionMutation,//
  useDeleteRegionMutation,//
} = regionsApi;
