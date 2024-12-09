import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseUrl } from "../Auth/auth.service";

// Create the API with Redux Toolkit Query
export const cinemaApi = createApi({
  reducerPath: "cinemaApi",
  baseQuery: fetchBaseUrl,
  endpoints: (builder) => ({
    getAllCinemas: builder.query({
      query: () => "/api/cinema",
    }),
    getCinemasByRegionId: builder.query({ 
      query: (id) => `/api/cinema/region/${id}`,
    }),
    addCinema: builder.mutation({
      query: (newCinema) => ({
        url: "/api/cinema",
        method: "POST",
        body: newCinema,
      }),
    }),
    updateCinema: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/api/cinema/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
    }),
    deleteCinema: builder.mutation({
      query: (id) => ({
        url: `/api/cinema/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export the hooks to use in components
export const {
  useGetAllCinemasQuery, //
  useGetCinemasByRegionIdQuery, //
  useAddCinemaMutation, //
  useUpdateCinemaMutation, //
  useDeleteCinemaMutation, //
} = cinemaApi;

