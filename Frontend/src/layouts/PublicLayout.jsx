import PublicNavbar from "../components/navbars/PublicNavbar";
import { Outlet } from "react-router-dom";

export default function PublicLayout() {
  return (
    <>
      <PublicNavbar />
      <Outlet />
    </>
  );
}