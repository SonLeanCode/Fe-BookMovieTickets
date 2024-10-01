import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Admin/Dashboard";
import MovieDetailPage from "../pages/Movies/MoviesDetail";
import Movie from "../pages/movie/movie";
import SignIn from "../pages/Auth/Login";
import App from "../App";


export default function AppRoutes() {
  return (
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/detail" element={<MovieDetailPage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />
        </Routes>
      </App>
    </Router>
  );
}
