import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import HeaderWeb from "./components/Header/HeaderWeb";
// import FooterPage from "./components/Footer/FooterWeb"
import MovieDetailPage from "./pages/Movies/MoviesDetail";

function App() {
  return (
    <Router>
      <HeaderWeb />
      <Routes>
        <Route path="/" element={<Home />} />
        {/*  <Route path="/detail/:id" component={DetailPage} /> */}
        <Route path="/detail" element={<MovieDetailPage />} />
      </Routes>
      {/* <FooterPage /> */}
    </Router>
  );
}

export default App;
