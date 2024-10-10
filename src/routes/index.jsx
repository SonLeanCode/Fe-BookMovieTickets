import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Constants
import ROLE from "../constants";

// Pages
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Admin/Dashboard";
import MovieDetailPage from "../pages/Movies/MoviesDetail";
import Movie from "../pages/Movie/movie";
import Actor from "../pages/Actor/Actor";
import Register from "../pages/Auth/Register";
import Profile from "../pages/Account/Profile";
import Actordetail from "../pages/Actor/Actordetail";
import Voucher from "../pages/Voucher/voucher";
import VoucherDetail from "../pages/Voucher/voucher-detail";
import Transaction from "../pages/Account/Transaction";
import Login from "../pages/Auth/Login";
import Auth from "../pages/Auth/Auth";
// import Login from "../pages/Auth/testapi";
import LandingPage from "../pages/LandingPage/LandingPage";

// Layout
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

// Private
import PrivateRoute from "./private/PrivateRoute/PrivateRoute";
import NotFound from "../pages/404/NotFound";

import DefaultLayout from "../layouts/DefaultLayout";
import { NotLoggedMiddleware } from "./private/middleware/MiddlewareRoute";
import BuyTickets from "../pages/BuyTickets/BuyTickets";
import CheapTicket from "../pages/cinema/cheap-ticket";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Landing page  */}
        <Route element={<DefaultLayout />}>
          <Route element={<NotLoggedMiddleware />}>
            <Route element={<UserLayout />}>
              <Route index path="/" element={<LandingPage />} />
            </Route>
          </Route>
        </Route>

        {/* Auth  */}
        <Route element={<DefaultLayout />}>
          <Route element={<NotLoggedMiddleware />}>
            <Route element={<DefaultLayout />}>
              <Route path="/auth" element={<Auth />}>
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
              </Route>
            </Route>
          </Route>
        </Route>

        {/* Không cần đăng nhập */}
        <Route element={<DefaultLayout />}>
          <Route path="/cinema" element={<UserLayout />}>
            <Route path="" element={<Home />} />
            <Route path="movie" element={<Movie />} />
            <Route path="actor" element={<Actor />} />
            <Route path="actor/detail" element={<Actordetail />} />
            <Route path="detail" element={<MovieDetailPage />} />
            <Route path="landingpage" element={<LandingPage />} />
            <Route path="buy-tickets" element={<BuyTickets />} />
            <Route path="cheap-tickets" element={<CheapTicket />} />
            <Route path="voucher" element={<Voucher />} />
            <Route path="voucher/detail" element={<VoucherDetail />} />
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
            </Route>
          </Route>
        </Route>

        {/* 404 not found */}
        <Route element={<DefaultLayout />}>
          <Route errorElement={<NotFound />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/404" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
