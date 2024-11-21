import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Function to get the access token from localStorage
const getAccessToken = () => localStorage.getItem('accessToken');

// Tạo API service bằng redux-toolkit
export const ticketApi = createApi({
  reducerPath: 'ticketApi',
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
    // Endpoint để tạo một ticket
    createTicket: builder.mutation({
      query: (ticketData) => ({
        url: `/api/tickets`,
        method: 'POST',
        body: ticketData,
      }),
    }),
    // Endpoint để lấy tất cả tickets
    getTickets: builder.query({
      query: () => `/api/tickets`,
    }),
    // Endpoint để lấy một ticket cụ thể theo ID
    getTicketById: builder.query({
      query: (id) => `/api/tickets/${id}`,
    }),
    
    // Endpoint để xóa một ticket theo ID
    deleteTicket: builder.mutation({
      query: (id) => ({
        url: `tickets/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Xuất các hooks auto-generated để sử dụng trong các component
export const {
  useCreateTicketMutation,
  useGetTicketsQuery,
  useGetTicketByIdQuery,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
} = ticketApi;
