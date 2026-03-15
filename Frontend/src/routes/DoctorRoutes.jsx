import { Route } from "react-router-dom";
import DoctorEntry from "../doctor/pages/DoctorEntry";
import DoctorRegister from "../doctor/pages/DoctorRegister";
import DoctorApplicationSuccess from "../doctor/pages/DoctorApplicationSuccess";
import DoctorRegisterGuard from "../guards/DoctorRegisterGuard";
import RequiredDoctorAuth from "./RequiredDoctorAuth";
import DoctorDashboard from "../doctor/pages/DoctorDashboard";
import DoctorAvailability from "../doctor/pages/DoctorAvailability"
import DoctorAvailabilityView from "../user/pages/DoctorAvailabilityView";
import RequiredUserAuth from "./RequiredUserAuth";
import MyAppointments from "../user/pages/MyAppointments";
import UpcomingAppointments from "../doctor/pages/UpcomingAppointments";
export default function DoctorRoutes() {
  return (
    <>
      {/* Smart doctor entry */}
      <Route path="/doctor" element={<DoctorEntry />} />

      {/* Registration */}
      <Route
        path="/doctor/register"
        element={
          <DoctorRegisterGuard>
            <DoctorRegister />
          </DoctorRegisterGuard>
        }
      />

      {/* Pending screen */}
      <Route
        path="/doctor/application-success"
        element={<DoctorApplicationSuccess />}
      />

      {/* Dashboard */}
      <Route
        path="/doctor/dashboard"
        element={
          <RequiredDoctorAuth>
            <DoctorDashboard />
          </RequiredDoctorAuth>
        }
      />

      <Route
        path="/doctor/dashboard/availability"
        element={
          <RequiredDoctorAuth>
            <DoctorAvailability />
          </RequiredDoctorAuth>
        }
      />

      <Route
        path="/my-appointments"
        element={
          <RequiredUserAuth>
              <MyAppointments></MyAppointments>
          </RequiredUserAuth>
        }
      />

      <Route
        path="/doctor/dashboard/upcoming"
        element = {
          <RequiredDoctorAuth>
            <UpcomingAppointments></UpcomingAppointments>
          </RequiredDoctorAuth>
        }
      />

    </>
    
  );
}
