import { Route, Routes } from "react-router-dom";

import AdminDashboard from "../admin/AdminDashboard";
import AdminLogin from "../admin/AdminLogin";
import RequiredAdminAuth from "./RequiredAdminAuth";

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminLogin />} />

      <Route
        path="/admin/dashboard"
        element={
          <RequiredAdminAuth>
            <AdminDashboard></AdminDashboard>
          </RequiredAdminAuth>
        }
      ></Route>
    </Routes>
  );
}
