import { Route } from "react-router-dom";
import RequiredUserAuth from "./RequiredUserAuth";

import UserDashboard from "../user/pages/UserDashboard";

import Appointments from "../user/pages/Appointments";
import Profile from "../user/pages/Profile";
import DoctorList from "../user/pages/DoctorList";
import DoctorAvailabilityView from "../user/pages/DoctorAvailabilityView";
import OrderSuccess from "../order/pages/OrderSuccess";
import YourOrders from "../order/pages/YourOrders";
import OrderTracking from "../order/pages/OrderTracking";

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

      <Route
        path="/doctors/:doctorId/availability"
        element={
          <RequiredUserAuth>
            <DoctorAvailabilityView></DoctorAvailabilityView>
          </RequiredUserAuth>
        }
      />
      <Route path="/order-success" element={
        <RequiredUserAuth>
          <OrderSuccess></OrderSuccess>
        </RequiredUserAuth>
      } />


      <Route path="/account/orders" element={
        <RequiredUserAuth>
          <YourOrders></YourOrders>
        </RequiredUserAuth>
      }
      />

      <Route path="/account/orders/:id" element={
        <RequiredUserAuth>
            <OrderTracking></OrderTracking>
        </RequiredUserAuth>
      }

      />

    </>
  );
}
