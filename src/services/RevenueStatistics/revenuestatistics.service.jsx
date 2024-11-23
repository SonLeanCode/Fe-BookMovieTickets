import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Function to get the access token from localStorage
const getAccessToken = () => localStorage.getItem('accessToken');

// Create the API with Redux Toolkit Query
export const statsApi = createApi({
  reducerPath: 'statsApi',
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
    // Get total revenue
    getTotalRevenue: builder.query({
      query: () => ({
        url: '/api/statistics/revenue/total',
        method: 'GET',
      }),
    }),

    // Get revenue stats by time (day, month, year)
    getRevenueStats: builder.query({
      query: (timeUnit) => ({
        url: '/api/statistics/revenue/time',
        method: 'GET',
        params: { timeUnit }, // Pass the time unit as query parameter
      }),
    }),

    // Get ticket statistics
    getTicketsStats: builder.query({
      query: () => ({
        url: '/api/statistics/tickets',
        method: 'GET',
      }),
    }),

    // Get movie statistics
    getMoviesStats: builder.query({
      query: () => ({
        url: '/api/statistics/movies', // Updated path to match the router
        method: 'GET',
      }),
    }),

    // Get cinema statistics
    getCinemasStats: builder.query({
      query: () => ({
        url: '/api/statistics/cinemas', // Updated path to match the router
        method: 'GET',
      }),
    }),
  }),
});

// Export the hooks to use in components
export const {
  useGetTotalRevenueQuery,
  useGetRevenueStatsQuery,
  useGetTicketsStatsQuery,
  useGetMoviesStatsQuery,
  useGetCinemasStatsQuery,
} = statsApi;
