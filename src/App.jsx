import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
// import { ListProDuct } from "./pages/ListPro/List"
import HeaderWeb from "./components/Header/HeaderWeb";
// import FooterPage from "./components/Footer/FooterWeb"
// import { DetaiTicKet } from  "./pages/Detail/DetaiTicket"

function App() {
  return (
    <Router>
      <HeaderWeb />
      <Routes>
        <Route path="/" element={<Home />} />
        {/*  <Route path="/detail/:id" component={DetailPage} /> */}
        {/* <Route path="/detail" element={<DetaiTicKet />} /> */}
        {/* <Route path="/prolist" element={<ListProDuct />} /> */}
      </Routes>
      {/* <FooterPage /> */}
    </Router>
  );
}

export default App;
