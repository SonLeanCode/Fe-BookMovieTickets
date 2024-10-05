import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Dashboard from "../pages/Admin/Dashboard";
import MovieDetailPage from "../pages/Movies/MoviesDetail";

import Movie from "../pages/movie/movie";


import SignIn from "../pages/Auth/Login";
import App from "../App";
import MovieList from "../pages/TestApi/MovieList";
import MovieDetail from "../pages/TestApi/MovieDetail";
import SeatSelection from "../pages/TestApi/SeatSelection";
import OrderSummary from "../pages/TestApi/OrderSummary ";
import NotFound from "../pages/404/NotFound";

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

          {/* Test api */}
          <Route path="/movies" element={<MovieList />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/seat" element={<SeatSelection />} />
          <Route path="/order" element={<OrderSummary />} />
          <Route path="/404" element={<NotFound />} />
        </Routes>
      </App>
    </Router>
  );
}