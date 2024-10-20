import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/Auth/auth.service';
import { moviesApi } from '../services/Movies/movies.services';
import { regionsApi } from '../services/Regions/regions.service';
import { cinemaApi } from '../services/Cinema/cinema.service';
import { genreApi } from '../services/Genre/genre.service';
import { genreMovieApi } from '../services/Genre/genre_movies.service';
import { actorApi } from '../services/Actor/actor.service';
import { actorMovieApi } from '../services/Actor/actor_movies.service';
const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
    [regionsApi.reducerPath]: regionsApi.reducer,
    [cinemaApi.reducerPath]: cinemaApi.reducer,
    [genreApi.reducerPath]: genreApi.reducer,
    [genreMovieApi.reducerPath]: genreMovieApi.reducer,
    [actorApi.reducerPath]: actorApi.reducer,
    [actorMovieApi.reducerPath]: actorMovieApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware) 
      .concat(moviesApi.middleware)
      .concat(regionsApi.middleware)
      .concat(cinemaApi.middleware)
      .concat(genreApi.middleware)
      .concat(genreMovieApi.middleware)
      .concat(actorApi.middleware)
      .concat(actorMovieApi.middleware),
});

export default store;
