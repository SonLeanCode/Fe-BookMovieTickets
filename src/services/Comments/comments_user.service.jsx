import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const getAccessToken = () => localStorage.getItem("accessToken");

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4003/",
    prepareHeaders: (headers) => {
      const token = getAccessToken();
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (builder) => ({
    postComments: builder.mutation({
      query: (credentials) => ({
        url: "/api/comment",
        method: "POST",
        body: credentials,
      }),
    }),

    findAllComments: builder.query({
      query: (credentials) => ({
        url: `/api/comment`,
        method: "GET",
        body: credentials,
      }),
    }),

    // Updated the updateComment mutation
    updateComment: builder.mutation({
      query: ({ commentId, updatedData }) => ({
        url: `/api/comment/${commentId}`, // Corrected the URL to match the route
        method: "PATCH", // Assuming PATCH is used for partial update
        body: updatedData,
      }),
    }),

    getComments: builder.query({
      query: (movieId) => `/api/comment/${movieId}`,
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/api/comment/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetCommentsQuery, //
  useFindAllCommentsQuery, //
  usePostCommentsMutation, //
  useDeleteCommentMutation, //
  useUpdateCommentMutation, //
} = commentsApi;
