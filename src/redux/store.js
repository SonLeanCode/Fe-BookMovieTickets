import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/Auth/auth.service';
import { moviesApi } from '../services/Movies/movies.services';
import { regionsApi } from '../services/Regions/regions.service';
import { cinemaApi } from '../services/Cinema/cinema.service';
import { genreApi } from '../services/Genre/genre.service';
import { genreMovieApi } from '../services/Genre/genre_movies.service';
import { actorApi } from '../services/Actor/actor.service';
import { actorMovieApi } from '../services/Actor/actor_movies.service';
<<<<<<< HEAD
import { apiComents } from '../services/Comments/comments_user.service';
import {apiLanguage} from '../services/Language/language_service'
=======
import { commentsApi } from '../services/Comments/comments_user.service';
import { userApi } from '../services/User/user.services';

>>>>>>> e900a0e5aa161952fba2d8877a9a589411f6b2d4
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
<<<<<<< HEAD
    [apiComents.reducerPath]: apiComents.reducer,
    [apiLanguage.reducerPath]: apiLanguage.reducer,

=======
    [commentsApi.reducerPath]: commentsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
>>>>>>> e900a0e5aa161952fba2d8877a9a589411f6b2d4
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
      .concat(actorMovieApi.middleware)
<<<<<<< HEAD
      .concat(apiComents.middleware)
      .concat(apiLanguage.middleware),
=======
      .concat(commentsApi.middleware)
      .concat(userApi.middleware),
>>>>>>> e900a0e5aa161952fba2d8877a9a589411f6b2d4
});

export default store;
