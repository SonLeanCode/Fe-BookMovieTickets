import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Constants
import ROLE from "../constants";

// Pages
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Admin/Dashboard";
import MovieDetailPage from "../pages/Movies/MoviesDetail";
import Movie from "../pages/Movie/movie";
import Actor from "../pages/Actor/Actor";
import SignIn from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Profile from "../pages/Account/Profile";
import Actordetail from "../pages/Actor/Actordetail";
import Transaction from "../pages/Account/Transaction";
// Layout
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";

// Private
import PrivateRoute from "./private/PrivateRoute/PrivateRoute";
import NotFound from "../pages/404/NotFound";




export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Routes for users */}
        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/actor" element={<Actor />} />
          <Route path="/actor/detail" element={<Actordetail />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/detail" element={<MovieDetailPage />} />
        </Route>

        {/* Routes for admin */}
        <Route element={<AdminLayout />}>
          <Route
            path="/admin"
            element={
              <PrivateRoute allowedRoles={[ROLE.ADMIN]}>
                <Dashboard />
              </PrivateRoute>
            }
          />
        </Route>

        {/*Notfound routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
