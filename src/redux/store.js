import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/Auth/auth.service';
import { moviesApi } from '../services/Movies/movies.services';
import { regionsApi } from '../services/Regions/regions.service';
import { cinemaApi } from '../services/Cinema/cinema.service';
import { genreApi } from '../services/Genre/genre.service';
import { genreMovieApi } from '../services/Genre/genre_movies.service';
import { actorApi } from '../services/Actor/actor.service';
import { actorMovieApi } from '../services/Actor/actor_movies.service';
import { commentsApi } from '../services/Comments/comments_user.service';
import { userApi } from '../services/User/user.services';
import { apiLanguage } from '../services/Language/language_service';
import { roomsApi } from '../services/Room/room.service';
import { seatApi } from '../services/Seat/seat.serviecs';
import { showtimesApi } from '../services/Showtimes/showtimes.serviecs';
import { ticketApi } from '../services/Ticket/ticket.serviecs';

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
    [commentsApi.reducerPath]: commentsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [roomsApi.reducerPath]: roomsApi.reducer,
    [seatApi.reducerPath]: seatApi.reducer,
    [showtimesApi.reducerPath]: showtimesApi.reducer,
    [ticketApi.reducerPath]: ticketApi.reducer,
    [apiLanguage.reducerPath]: apiLanguage.reducer,
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
      .concat(commentsApi.middleware)
      .concat(userApi.middleware)
      .concat(roomsApi.middleware)
      .concat(seatApi.middleware)
      .concat(showtimesApi.middleware)
      .concat(ticketApi.middleware)
      .concat(apiLanguage.middleware)
});

export default store;
