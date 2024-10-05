import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import HeaderWeb from "./components/Header/HeaderWeb";
import FooterWeb from "./components/Footer/FooterWeb";
function App({ children }) {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isError404  = location.pathname.startsWith("/404");
  return (
    <>
      {!isAdminRoute && !isError404 && <HeaderWeb />}
      {children}
      {!isAdminRoute && !isError404 && <FooterWeb />}
    </>
  );
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};


export default App;



