import HeaderWeb from "../components/Header/HeaderWeb";
import FooterWeb from "../components/Footer/FooterWeb";
// import SpeedDial from "../components/SpeedDial/dial"; 
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <HeaderWeb />
      <Outlet />
      {/* <SpeedDial />  */}
      <FooterWeb />
    </>
  );
};

export default UserLayout;