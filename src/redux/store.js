import { configureStore } from '@reduxjs/toolkit';
import { authApi } from '../services/Auth/auth.service';
import { moviesApi } from '../services/Movies/movies.services';
import { regionsApi } from '../services/Regions/regions.service';
import { cinemaApi } from '../services/Cinema/cinema.service';
import { genreApi } from '../services/Genre/genre.service';
import { actorApi } from '../services/Actor/actor.service';
import { commentsApi } from '../services/Comments/comments_user.service';
import { userApi } from '../services/User/user.services';
import { roomsApi } from '../services/Room/room.service';
import { seatApi } from '../services/Seat/seat.serviecs';
import { showtimesApi } from '../services/Showtimes/showtimes.serviecs';
import { ticketApi } from '../services/Ticket/ticket.serviecs';
import { emailApi } from '../services/Email/email.service';
import {paymentApi} from '../services/payment/Payment.services';
import {moviesFavouriteApi}  from '../services/MovieFavourite/moviesFavourite_service';
import {statsApi} from '../services/RevenueStatistics/revenuestatistics.service'
import {voucherApi}from '../services/Voucher/voucher.service'
import {vouchersApi}from '../services/Voucher/vouchers'
import { ratingApi } from '../services/Rating/rating.serviecs';
import { roomLayoutApi } from '../services/Room/roomlayout.service';
import { bannerApi } from '../services/Banner/banner.service';

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [moviesApi.reducerPath]: moviesApi.reducer,
    [regionsApi.reducerPath]: regionsApi.reducer,
    [cinemaApi.reducerPath]: cinemaApi.reducer,
    [genreApi.reducerPath]: genreApi.reducer,
    [actorApi.reducerPath]: actorApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [roomsApi.reducerPath]: roomsApi.reducer,
    [roomLayoutApi.reducerPath]: roomLayoutApi.reducer,
    [seatApi.reducerPath]: seatApi.reducer,
    [showtimesApi.reducerPath]: showtimesApi.reducer,
    [ticketApi.reducerPath]: ticketApi.reducer,
    [emailApi.reducerPath]: emailApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
    [moviesFavouriteApi.reducerPath]: moviesFavouriteApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [voucherApi.reducerPath]: voucherApi.reducer,
    [vouchersApi.reducerPath]: vouchersApi.reducer,
    [ratingApi.reducerPath]: ratingApi.reducer,
    [bannerApi.reducerPath]: bannerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(moviesApi.middleware)
      .concat(regionsApi.middleware)
      .concat(cinemaApi.middleware)
      .concat(genreApi.middleware)
      .concat(actorApi.middleware)
      .concat(commentsApi.middleware)
      .concat(userApi.middleware)
      .concat(roomsApi.middleware)
      .concat(roomLayoutApi.middleware)
      .concat(seatApi.middleware)
      .concat(showtimesApi.middleware)
      .concat(ticketApi.middleware)
      .concat(emailApi.middleware)
      .concat(paymentApi.middleware)
      .concat(moviesFavouriteApi.middleware)
      .concat(statsApi.middleware)
      .concat(voucherApi.middleware)
      .concat(vouchersApi.middleware)
      .concat(ratingApi.middleware)
      .concat(bannerApi.middleware)
});

export default store;
