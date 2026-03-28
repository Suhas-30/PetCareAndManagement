import { Route } from "react-router-dom";

import RequiredUserAuth from "./RequiredUserAuth";

import Cart from "../cart/pages/Cart";
import AddressPage from "../order/pages/AddressPage";
import Payment from "../order/pages/Payment"

export default function CheckoutRoutes() {
  return (
    <Route>
      <Route
        path="/checkout/cart"
        element={
          <RequiredUserAuth>
            <Cart />
          </RequiredUserAuth>
        }
      />

      <Route
        path="/checkout/address"
        element={
          <RequiredUserAuth>
            <AddressPage />
          </RequiredUserAuth>
        }
      />

      <Route
        path="/checkout/payment"
        element={
          <RequiredUserAuth>
            <Payment></Payment>
          </RequiredUserAuth>
        }
      />
    </Route>
  );
}
