import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const getAccessToken = () => localStorage.getItem('accessToken');

export const actorApi = createApi({
  reducerPath: 'actorApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:4003/',
    prepareHeaders: (headers) => {
      const token = getAccessToken();
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllActors: builder.query({
      query: () => '/api/actor',
    }),
    getActorById: builder.query({
      query: (id) => `/api/actor/${id}`,
    }),
    addActor: builder.mutation({
      query: (newActor) => ({
        url: '/api/actor',
        method: 'POST',
        body: newActor,
      }),
    }),
    updateActor: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/api/actor/${id}`,
        method: 'PATCH',
        body: updatedData,
      }),
    }),
    deleteActor: builder.mutation({
      query: (id) => ({
        url: `/api/actor/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetAllActorsQuery,
  useGetActorByIdQuery,
  useAddActorMutation,
  useUpdateActorMutation,
  useDeleteActorMutation,
} = actorApi;
