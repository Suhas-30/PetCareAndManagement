import { Route } from "react-router-dom";
import RequiredUserAuth from "./RequiredUserAuth";

import UserDashboard from "../user/pages/UserDashboard";
import AddPet from "../pet/AddPet";
import Appointments from "../user/pages/Appointments";

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
            <Appointments />
          </RequiredUserAuth>
        }
      />
    </>
  );
}
