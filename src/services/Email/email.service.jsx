import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseUrl } from "../Auth/auth.service";

// Create the API with Redux Toolkit Query
export const emailApi = createApi({
  reducerPath: "emailApi",
  baseQuery: fetchBaseUrl,
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
export const { useEmailSendMutation } = emailApi; //
