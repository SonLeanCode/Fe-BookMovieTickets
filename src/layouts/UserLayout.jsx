import HeaderWeb from "../components/Header/HeaderWeb";
import FooterWeb from "../components/Footer/FooterWeb";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <HeaderWeb />
      <Outlet />
      <FooterWeb />
    </>
  );
};

export default UserLayout;
