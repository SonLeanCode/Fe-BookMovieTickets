import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseUrl } from "../Auth/auth.service";

// Create the API with Redux Toolkit Query
export const bannerApi = createApi({
  reducerPath: "bannerApi",
  baseQuery: fetchBaseUrl,
  endpoints: (builder) => ({
    getBanners: builder.query({
      query: () => "/api/banner",
    }),
    createBanner: builder.mutation({
      query: (newBanner) => ({
        url: "/api/banner",
        method: "POST",
        body: newBanner,
      }),
    }),
    updateBanner: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/api/banner/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
    }),
    deleteBanner: builder.mutation({
      query: (id) => ({
        url: `/api/banner/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

// Export the hooks to use in components
export const {
    useGetBannersQuery,
    useCreateBannerMutation,
    useDeleteBannerMutation,
    useUpdateBannerMutation
} = bannerApi;

