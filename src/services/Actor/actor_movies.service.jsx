import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseUrl } from '../Auth/auth.service';

// Create the API with Redux Toolkit Query
export const actorMovieApi = createApi({
  reducerPath: 'actorMovieApi',
  baseQuery: fetchBaseUrl,
  endpoints: (builder) => ({
    // Get all actor movies
    getAllActorMovies: builder.query({
      query: () => `/api/actor-movies`, // Updated route path for consistency
    }),

    // Get all actors for a specific movie
    getActorsByMovie: builder.query({
      query: (movieId) => `/api/movie/${movieId}/actors`,
    }),

    // Get all movies for a specific actor
    getMoviesByActor: builder.query({
      query: (actorId) => `/api/actor/${actorId}/movies`,
    }),

    // Add actors to a specific movie
    addActorsToMovie: builder.mutation({
      query: ({ movieId, actorIds }) => ({
        url: `/api/movie/${movieId}/actors`, // Ensure the URL matches your route
        method: 'POST',
        body: { actorIds }, // Make sure the body contains the expected structure
      }),
    }),

    // Remove an actor from a specific movie
    removeActorFromMovie: builder.mutation({
      query: ({ movieId, actorId }) => ({
        url: `/api/movie/${movieId}/actor/${actorId}`, // Ensure the URL matches your route
        method: 'DELETE',
      }),
    }),
  }),
});

// Export hooks to use in components
export const {
  useGetAllActorMoviesQuery,
  useGetActorsByMovieQuery,
  useGetMoviesByActorQuery,
  useAddActorsToMovieMutation,
  useRemoveActorFromMovieMutation,
} = actorMovieApi;
