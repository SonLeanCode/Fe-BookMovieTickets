import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Admin/Dashboard";
import MovieDetailPage from "../pages/Movies/MoviesDetail";
import SignIn from "../pages/Auth/Login";
import App from "../App";
import MovieList from "../pages/TestApi/MovieList";
import MovieDetail from "../pages/TestApi/MovieDetail";


export default function AppRoutes() {
  return (
    <Router>
      <App>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/detail" element={<MovieDetailPage />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/unauthorized" element={<div>Unauthorized Access</div>} />

          {/* Test api */}
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
        </Routes>
      </App>
    </Router>
  );
}
