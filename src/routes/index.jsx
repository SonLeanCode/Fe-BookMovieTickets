import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy } from "react";

// Constants
// import ROLE from "../constants";

// Layouts
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import DefaultLayout from "../layouts/DefaultLayout";

// Private
// import PrivateRoute from "./private/PrivateRoute/PrivateRoute";
import { NotLoggedMiddleware } from "./private/middleware/MiddlewareRoute";


import Region_Manager from "../pages/Admin/Region_Manager";
import Cinema_Management from "../pages/Admin/Cinema_Management";
import Room_Managerment from "../pages/Admin/Room_Managerment";
import Account_Management from "../pages/Admin/User_Management";
import RegionDetails from "../pages/Admin/Region_detail";
import Seat_Management from "../pages/Admin/Seat_Management";
import Business from "../pages/Business/business";
import ShowTime_Management from "../pages/Admin/ShowTime_Management";
import Revenue from "../pages/Admin/Revenue";
import CommentManagement from "../pages/Admin/Comment-management";
import Tickets_Management from "../pages/Admin/tickets_Management";
import CinemaRevenue from "../pages/Admin/CinemaRevenue_Management";
import RoomLayout from "../pages/Admin/RoomLayout";
import Banner_Management from "../pages/Admin/Banner_Management";
import Voucher_Management from "../pages/Admin/Voucher_Management";



// Lazy-loaded pages
const Home = lazy(() => import("../pages/Home/Home"));
const Dashboard = lazy(() => import("../pages/Admin/Dashboard"));
const MovieDetailPage = lazy(() => import("../pages/Movies/MoviesDetail"));
const Movie = lazy(() => import("../pages/Movie/movie"));
const Actor = lazy(() => import("../pages/Actor/Actor"));
const Genre = lazy(() => import("../pages/GenreFilm/GenreFilm"));
const Register = lazy(() => import("../pages/Auth/Register"));
const Profile = lazy(() => import("../pages/Account/Profile"));
const Actordetail = lazy(() => import("../pages/Actor/Actordetail"));
const Voucher = lazy(() => import("../pages/Voucher/voucher"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Auth = lazy(() => import("../pages/Auth/Auth"));
const VoucherDetail = lazy(() => import("../pages/Voucher/voucher-detail"));
const LandingPage = lazy(() => import("../pages/LandingPage/LandingPage"));
const NotFound = lazy(() => import("../pages/404/NotFound"));
const BuyTickets = lazy(() => import("../pages/BuyTickets/BuyTickets"));
const CheapTicket = lazy(() => import("../pages/cinema/cheap-ticket"));
const Movie_Management = lazy(() => import("../pages/Admin/Movie_Management"));
const Genre_Management = lazy(() => import("../pages/Admin/Genre_Management"));
const Actor_Management = lazy(() => import("../pages/Admin/Actor_Management"));
const Policy = lazy(() => import("../pages/Policy/chinhsach"));
const Contact = lazy(() => import("../pages/Policy/Contact"));
const Setting = lazy(() => import("../pages/Policy/setting"));
const License = lazy(() => import("../pages/Policy/License"));
const GoodMovieTheMonth = lazy(() => import("../pages/GoodMovieTheMonth/goodMovieTheMonth"));




export default function AppRoutes() {
  return (
    <Router>
        <Routes>
          {/* Landing page */}
          <Route element={<DefaultLayout />}>
            <Route element={<NotLoggedMiddleware />}>
              <Route element={<UserLayout />}>
                <Route index path="/" element={<LandingPage />} />
              </Route>
            </Route>
          </Route>

          {/* Auth */}
          <Route element={<DefaultLayout />}>
            <Route element={<NotLoggedMiddleware />}>
              <Route path="/auth" element={<Auth />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
            </Route>
          </Route>


          {/* Public routes */}
          <Route element={<DefaultLayout />}>
            <Route path="/cinema" element={<UserLayout />}>
              <Route path="" element={<Home />} />
              <Route path="movie" element={<Movie />} />
              <Route path="actor" element={<Actor />} />
              <Route path="actor/:id" element={<Actordetail />} />
              <Route path="movie/:id" element={<MovieDetailPage />} />
              <Route path="landingpage" element={<LandingPage />} />
              <Route path="buy-tickets" element={<BuyTickets />} />
              <Route path="buy-tickets/:id" element={<BuyTickets />} />
              <Route path="cheap-tickets" element={<CheapTicket />} />
              <Route path="voucher" element={<Voucher />} />
              <Route path="voucher/detail" element={<VoucherDetail />} />
              <Route path="genrefilm" element={<Genre />} />
              <Route path="genrefilm/:id" element={<Genre />} />
              <Route path="contact" element={<Contact />} />
              <Route path="setting" element={<Setting />} />
              <Route path="license" element={<License />} />
              <Route path="goodMovieTheMonth" element={<GoodMovieTheMonth />} />

              


              {/* All page policy  */}
              <Route path="policy" element={<Policy />} />

               {/* All page policy  */}
               <Route path="business" element={<Business />} />

            </Route>
          </Route>

          {/* Private Routes for users */}
          <Route element={<DefaultLayout />}>
            <Route
              path="/cinema"
            >
              <Route element={<UserLayout />}>
                <Route path="profile/:userId" element={<Profile />} />
              </Route>
            </Route>
          </Route>

          {/* Private Routes for admin */}
          <Route element={<DefaultLayout />}>
            <Route
              path="/admin"
            >
              <Route element={<AdminLayout />}>
                <Route path="" element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="movies" element={<Movie_Management />} />
                <Route path="genres" element={<Genre_Management />} />
                <Route path="actors" element={<Actor_Management />} />
                <Route path="cinemas" element={<Cinema_Management />} />
                <Route path="regions" element={<Region_Manager />} />
                <Route path="region/:region_id" element={<RegionDetails />} />
                <Route path="users" element={<Account_Management />} />
                <Route path="rooms" element={<Room_Managerment />} />
                <Route path="rooms/:roomId/seats" element={<Seat_Management />} />
                <Route path="showtimes" element={<ShowTime_Management />} />
                <Route path="revenue" element={<Revenue />} />
                <Route path="commentManagement" element={<CommentManagement />} />
                <Route path="ticketsManagement" element={<Tickets_Management />} />
                <Route path="CinemaRevenueManagement" element={<CinemaRevenue />} />
                <Route path="roomlayout/:roomId" element={<RoomLayout />} />
                <Route path="banner" element={<Banner_Management />} />
                <Route path="voucher" element={<Voucher_Management />} />

              </Route>
            </Route>
          </Route>

          {/* 404 not found */}
          <Route element={<DefaultLayout />}>
            <Route path="*" element={<NotFound />} />
            <Route path="/404" element={<NotFound />} />
          </Route>
        </Routes>
    </Router>
  );
}
