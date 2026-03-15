import { Outlet } from "react-router-dom";
import CheckoutNavbar from "../components/navbars/CheckoutNavbar";

export default function CheckoutLayout() {
  return (
    <>
      <CheckoutNavbar />

      <main className="bg-[#F7F9FB] min-h-screen">
        <Outlet />
      </main>
    </>
  );
}