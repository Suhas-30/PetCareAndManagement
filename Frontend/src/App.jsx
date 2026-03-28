import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import UserLayout from "./layouts/UserLayout";
import { DoctorStatusProvider } from "./context/DoctorStatusContext";
import HomeRoute from "./routes/HomeRoute";
import JobRoutes from "./routes/JobRoutes";
import ProductRoutes from "./routes/ProductRoutes";
import UserRoutes from "./routes/UserRoutes";
import DoctorRoutes from "./routes/DoctorRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import PetRoutes from "./routes/PetRoutes";
import AdminRoutes from "./routes/AdminRoutes";
import AdminLayout from "./layouts/AdminLayout";
import { refreshToken } from "./auth/service/authService";
import { useEffect } from "react";
import CheckoutLayout from "./layouts/CheckoutLayout";
import CheckoutRoutes from "./routes/CheckoutRoutes"

function App() {
  useEffect(() => {
    const syncToken = async () => {
      const session = localStorage.getItem("userSession");
      if (!session) return;

      try {
        const newToken = await refreshToken();

        const parsed = JSON.parse(session);

        localStorage.setItem(
          "userSession",
          JSON.stringify({
            ...parsed,
            token: newToken,
          }),
        );

        console.log("✅ JWT refreshed with latest role");
      } catch (e) {
        console.log("Token refresh skipped");
      }
    };

    syncToken();
  }, []);

  return (
    <DoctorStatusProvider>
      <Routes>
        {/* Public pages */}
        <Route element={<PublicLayout />}>
          {HomeRoute()}
          {JobRoutes()}
          {ProductRoutes()}
          {DoctorRoutes()}
          {AuthRoutes()}
        </Route>

        {/* User pages */}
        <Route element={<UserLayout />}>
          {UserRoutes()}
          {PetRoutes()}
        </Route>

        <Route element={<AdminLayout />}>{AdminRoutes()}</Route>

        <Route element={<CheckoutLayout />}>{CheckoutRoutes()}</Route>
      </Routes>
    </DoctorStatusProvider>
  );
}

export default App;
