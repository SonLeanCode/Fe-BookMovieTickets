import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseUrl } from "../Auth/auth.service";
// Create the API with Redux Toolkit Query
export const statsApi = createApi({
  reducerPath: 'statsApi',
  baseQuery: fetchBaseUrl,
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

    


    // Tổng doanh thu và số vé bán ra của từng rạp.
    getCinemaSalesStats: builder.query({
      query: () => ({
        url: '/api/statistics/cinema-sales-stats', // Updated path to match the router
        method: 'GET',
      }),
    }),

  }),
});

// Export the hooks to use in components
export const {
  useGetTotalRevenueQuery, // 
  useGetRevenueStatsQuery, //
  useGetTicketsStatsQuery, //
  useGetMoviesStatsQuery, //
  useGetCinemaSalesStatsQuery //
} = statsApi;
