import { createApi } from "@reduxjs/toolkit/query/react";
import { fetchBaseUrl } from "../Auth/auth.service";

// Tạo API service bằng redux-toolkit
export const ticketApi = createApi({
  reducerPath: "ticketApi",
  baseQuery: fetchBaseUrl,
  endpoints: (builder) => ({
    // Endpoint để tạo một ticket
    createTicket: builder.mutation({
      query: (ticketData) => ({
        url: `/api/tickets`,
        method: "POST",
        body: ticketData,
      }),
    }),
    // Endpoint để lấy tất cả tickets
    getTickets: builder.query({
      query: () => `/api/tickets`,
    }),
    // Endpoint để lấy tất cả tickets với `user_id`
    getTicketsByUserId: builder.query({
      query: (id) => `/api/tickets/user/${id}`,
    }),
  }),
});

// Xuất các hooks auto-generated để sử dụng trong các component
export const {
  useCreateTicketMutation, //
  useGetTicketsQuery, // 
  useGetTicketsByUserIdQuery,//
} = ticketApi;
