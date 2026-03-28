import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/navbars/PublicNavbar";

export default function DoctorLayout() {
  return (
    <>
      <PublicNavbar />
      <main className="pt-16 bg-[#F7F9FB] min-h-screen">
        <Outlet />
      </main>
    </>
  );
}
