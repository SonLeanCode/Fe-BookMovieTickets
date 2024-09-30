import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Movie from "./pages/movie/movie";
import HeaderWeb from "./components/Header/HeaderWeb";
import MovieDetailPage from "./pages/Movies/MoviesDetail";
import FooterWeb from "./components/Footer/FooterWeb";


function App() {
  return (
    <Router>
      <HeaderWeb />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/detail" element={<MovieDetailPage />} />
      </Routes>
      

      <FooterWeb />
    </Router>
  );
}

export default App;
