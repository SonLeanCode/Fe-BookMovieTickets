import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import HeaderWeb from "./components/Header/HeaderWeb";
import MovieDetailPage from "./pages/Movies/MoviesDetail";
import FooterWeb from "./components/Footer/FooterWeb";
import SignIn from "./pages/SignIn/SignIn";
import LoginPage from "./pages/TestCode/LoginPage";

function App() {
  return (
    <Router>
      <HeaderWeb />


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<MovieDetailPage />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/testlogin" element={<LoginPage />} />
      </Routes>
      

      <FooterWeb />
    </Router>
  );
}

export default App;
