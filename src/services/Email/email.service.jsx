import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Function to get the access token from localStorage
const getAccessToken = () => localStorage.getItem("accessToken");

// Create the API with Redux Toolkit Query
export const emailApi = createApi({
  reducerPath: "emailApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4003/", // Your API base URL
    prepareHeaders: (headers) => {
      // Get token from localStorage
      const token = getAccessToken();
      // If token exists, add it to the Authorization header
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    emailSend: builder.mutation({
      query: (email) => ({
        url: "/api/book-ticket/email",
        method: "POST",
        body: email,
      }),
    }),
  }),
});

// Export the hooks to use in components
export const { useEmailSendMutation } = emailApi;
