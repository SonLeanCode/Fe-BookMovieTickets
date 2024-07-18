import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./Home/Home";
import { DetaiTicKet } from "./Detail/DetaiTicket";
import { ListProDuct } from "./ListPro/List";
import HeaderPage from "./Header/HeaderWeb";
import FooterPage from "./Footer/FooterWeb";

function App() {
  return (
    <Router>
      <HeaderPage />
      <Routes>
        <Route path="/" element={<Index />} />
        {/*   <Route path="/detail/:id" component={DetailPage} /> */}

        <Route path="/detail" element={<DetaiTicKet />} />
        <Route path="/prolist" element={<ListProDuct />} />
      </Routes>
      <FooterPage />
    </Router>
  );
}

export default App;
