import { Outlet } from "react-router-dom";
import PublicNavbar from "../components/navbars/PublicNavbar";

export default function UserLayout() {
  return (
    <>
      <PublicNavbar />

      <main className="bg-[#F7F9FB] min-h-screen">
        <Outlet />
      </main>
    </>
  );
}

