import { Route } from "react-router-dom";
import RequiredUserAuth from "./RequiredUserAuth";

import UserDashboard from "../user/UserDashboard";
import AddPet from "../pet/AddPet";
import Appointments from "../user/Appointments";

export default function UserRoutes() {
  return (
    <>
      <Route
        path="/dashboard"
        element={
          <RequiredUserAuth>
            <UserDashboard />
          </RequiredUserAuth>
        }
      />
      <Route
        path="/appointments"
        element={
          <RequiredUserAuth>
            <Appointments />
          </RequiredUserAuth>
        }
      />
    </>
  );
}
