import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import HeaderWeb from "./components/Header/HeaderWeb";
import FooterWeb from "./components/Footer/FooterWeb";
function App({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <HeaderWeb />}
      {children}
      {!isAdminRoute && <FooterWeb />}
    </>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};


export default App;



