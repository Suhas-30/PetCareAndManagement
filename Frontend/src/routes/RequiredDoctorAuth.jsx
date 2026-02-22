import { Navigate } from "react-router-dom";

export default function RequiredDoctorAuth({ children }) {
  const session = localStorage.getItem("userSession");

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(session);

  if (user.role !== "DOCTOR") {
    return <Navigate to="/user/dashboard" replace />;
  }

  return children;
}