import { Route } from "react-router-dom";
import RequiredUserAuth from "./RequiredUserAuth";

import UserDashboard from "../user/pages/UserDashboard";

import Appointments from "../user/pages/Appointments";
import Profile from "../user/pages/Profile";
import DoctorList from "../user/pages/DoctorList";

export default function UserRoutes() {
  return (
    <>
      <Route
        path="/user/dashboard"
        element={
          <RequiredUserAuth>
            <UserDashboard />
          </RequiredUserAuth>
        }
      />

      <Route
        path="/user/appointments"
        element={
          <RequiredUserAuth>
            <DoctorList />
          </RequiredUserAuth>
        }
      />

      <Route
        path="/user/profile"
        element={
          <RequiredUserAuth>
            <Profile />
          </RequiredUserAuth>
        }
      />
    </>
  );
}
