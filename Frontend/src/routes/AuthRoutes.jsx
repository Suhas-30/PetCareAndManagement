import { Route } from "react-router-dom";
import UserRegister from '../user/pages/UserRegister'

import Login from "../auth/Login";
import ForgotPassword from "../auth/ForgotPassword"
import ResetPassword from "../auth/ResetPassword";
import VerifyEmail from "../auth/VerifyEmail";

export default function AuthRoutes() {
  return (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<UserRegister/>} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
    </>
  );
}
