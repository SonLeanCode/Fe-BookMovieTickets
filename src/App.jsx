import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Home/Home";

import { ListProDuct } from "./pages/ListPro/List"
import HeaderPage from "./components/Header/HeaderWeb";
import FooterPage from "./components/Footer/FooterWeb"
import { DetaiTicKet } from  "./pages/Detail/DetaiTicket"
import BuyTickets from "./pages/BuyTickets/BuyTickets";

function App() {
  return (
    <Router>
      <HeaderPage />
      <Routes>
        <Route path="/" element={<Index />} />
        {/*   <Route path="/detail/:id" component={DetailPage} /> */}
        <Route path="/detail" element={<DetaiTicKet />} />
        <Route path="/prolist" element={<ListProDuct />} />
        <Route path="/buytickets" element={<BuyTickets />} />
      </Routes>
      <FooterPage />
    </Router>
  );
}

export default App;
