import { Route } from "react-router-dom";
import RequiredAdminAuth from "./RequiredAdminAuth";
import AdminDashboard from "../admin/pages/AdminDashboard";
import DoctorApplications from "../admin/pages/DoctorApplications";

export default function AdminRoutes() {
  return (
    <>
      <Route
        path="/admin/dashboard"
        element={
          <RequiredAdminAuth>
            <AdminDashboard />
          </RequiredAdminAuth>
        }
      />

      <Route
        path="/admin/doctor-applications"
        element={
          <RequiredAdminAuth>
            <DoctorApplications />
          </RequiredAdminAuth>
        }
      />
    </>
  );
}
