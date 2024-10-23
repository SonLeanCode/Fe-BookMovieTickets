import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy } from "react";

// Constants
import ROLE from "../constants";

// Layouts
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import DefaultLayout from "../layouts/DefaultLayout";

// Private
import PrivateRoute from "./private/PrivateRoute/PrivateRoute";
import { NotLoggedMiddleware } from "./private/middleware/MiddlewareRoute";


import Region_Manager from "../pages/Admin/Region_Manager";


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
const Transaction = lazy(() => import("../pages/Account/Transaction"));
const Login = lazy(() => import("../pages/Auth/Login"));
const Auth = lazy(() => import("../pages/Auth/Auth"));
const VoucherDetail = lazy(() => import("../pages/Voucher/voucher-detail"));
const LandingPage = lazy(() => import("../pages/LandingPage/LandingPage"));
const NotFound = lazy(() => import("../pages/404/NotFound"));
const BuyTickets = lazy(() => import("../pages/BuyTickets/BuyTickets"));
const CheapTicket = lazy(() => import("../pages/cinema/cheap-ticket"));
const RegionAdmin = lazy(() => import("../pages/Admin/RegionAdmin/RegionAdmin"));
const CinemaAdmin = lazy(() => import("../pages/Admin/CinemaAdmin/CinemaAdmin"));
const GenreAdmin = lazy(() => import("../pages/Admin/GenreAdmin/GenreAdmin"));
const Genre_Movie = lazy(() => import("../pages/Admin/GenreAdmin/Genre_Movie"));
const Actor_Movie = lazy(() => import("../pages/Admin/ActorAdmin/Actor_Movie"));
const Movie_Management = lazy(() => import("../pages/Admin/Movie_Management"));
const Genre_Management = lazy(() => import("../pages/Admin/Genre_Management"));
const Actor_Management = lazy(() => import("../pages/Admin/Actor_Management"));
const ActorAdmin = lazy(() => import("../pages/Admin/ActorAdmin/ActorAdmin"));


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
              <Route path="buy-tickets/:id" element={<BuyTickets />} />
              <Route path="cheap-tickets" element={<CheapTicket />} />
              <Route path="voucher" element={<Voucher />} />
              <Route path="voucher/detail" element={<VoucherDetail />} />
              <Route path="genrefilm" element={<Genre />} />
              <Route path="genrefilm/:id" element={<Genre />} />
            </Route>
          </Route>

          {/* Private Routes for users */}
          <Route element={<DefaultLayout />}>
            <Route
              path="/cinema"
              element={<PrivateRoute allowedRoles={[ROLE.USER, ROLE.ADMIN]} />}
            >
              <Route element={<UserLayout />}>
                <Route path="profile" element={<Profile />} />
                <Route path="transaction" element={<Transaction />} />
              </Route>
            </Route>
          </Route>

          {/* Private Routes for admin */}
          <Route element={<DefaultLayout />}>
            <Route
              path="/admin"
              element={<PrivateRoute allowedRoles={[ROLE.ADMIN]} />}
            >
              <Route element={<AdminLayout />}>
                <Route path="" element={<Dashboard />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="movies" element={<Movie_Management />} />
                <Route path="genres" element={<Genre_Management />} />
                <Route path="actors" element={<Actor_Management />} />
                <Route path="regions/test" element={<RegionAdmin />} />
                <Route path="cinema/test" element={<CinemaAdmin />} />
                <Route path="genre/test" element={<GenreAdmin />} />
                <Route path="genre_movies/test" element={<Genre_Movie />} />
                <Route path="actor/test" element={<ActorAdmin />} />
                <Route path="actor_movies/test" element={<Actor_Movie />} />
                <Route path="region" element={<Region_Manager />} />
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
