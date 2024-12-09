import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseUrl } from "../Auth/auth.service";

// Create the API with Redux Toolkit Query
export const roomsApi = createApi({
  reducerPath: 'roomsApi',
  baseQuery: fetchBaseUrl,
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