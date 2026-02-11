import { Route } from "react-router-dom";

import UserRegister from "../user/UserRegister";
import UserLogin from "../user/UserLogin";
import ForgotPassword from "../user/ForgotPassword";
import ResetPassword from "../user/ResetPassword";
import VerifyEmail from "../user/VerifyEmail";

export default function AuthRoutes() {
  return (
    <>
      <Route path="/login" element={<UserLogin />} />
      <Route path="/register" element={<UserRegister />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
    </>
  );
}
