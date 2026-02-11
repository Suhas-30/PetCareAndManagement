import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import UserLayout from "./layouts/UserLayout";

import HomeRoute from "./routes/HomeRoute";
import JobRoutes from "./routes/JobRoutes";
import ProductRoutes from "./routes/ProductRoutes";
import UserRoutes from "./routes/UserRoutes";
import DoctorRoutes from "./routes/DoctorRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import PetRoutes from "./routes/PetRoutes";

function App() {
  return (
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
    </Routes>
  );
}


export default App;
