import { Route } from "react-router-dom";
import DoctorRegister from "../doctor/pages/DoctorRegister";
import DoctorApplicationSuccess from "../doctor/pages/DoctorApplicationSuccess";
import DoctorApplicationGuard from "../guards/DoctorApplicationGuard";
import RequiredDoctorAuth from "./RequiredDoctorAuth";
import DoctorDashboard from "../doctor/pages/DoctorDashboard";

export default function DoctorRoutes() {
  return (
    <>
      <Route path="/doctor/register" element={<DoctorRegister />} />

      <Route
        path="/doctor/application-success"
        element={
          <DoctorApplicationGuard>
            <DoctorApplicationSuccess />
          </DoctorApplicationGuard>
        }
      />

      <Route
        path="/doctor/dashboard"
        element={
          <RequiredDoctorAuth>
            <DoctorDashboard />
          </RequiredDoctorAuth>
        }
      />
    </>
  );
}
