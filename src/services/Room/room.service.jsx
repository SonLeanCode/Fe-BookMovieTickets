import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Function to get the access token from localStorage
const getAccessToken = () => localStorage.getItem('accessToken');

// Create the API with Redux Toolkit Query
export const roomsApi = createApi({
  reducerPath: 'roomsApi',
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
    // Get all rooms
    getAllRooms: builder.query({
      query: () => ({
        url: '/api/rooms',
        method: 'GET',
      }),
    }),


    // Add new room
    addRoom: builder.mutation({
      query: (roomData) => ({
        url: '/api/room',
        method: 'POST',
        body: roomData,
      }),
    }),

    // Update room by ID
    updateRoom: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/api/room/${id}`,
        method: 'PATCH',
        body: updatedData,
      }),
    }),

    // Delete room by ID
    deleteRoom: builder.mutation({
      query: (id) => ({
        url: `/api/room/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Export the hooks to use in components
export const {
  useGetAllRoomsQuery, //
  useAddRoomMutation,//
  useUpdateRoomMutation,//
  useDeleteRoomMutation,//
} = roomsApi;