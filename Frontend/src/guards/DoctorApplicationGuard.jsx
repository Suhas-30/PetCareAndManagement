import { Navigate } from "react-router-dom";

export default function DoctorApplicationGuard({ children }) {
  const applied = sessionStorage.getItem("doctorApplied");

  if (!applied) {
    return <Navigate to="/doctor/register" replace />;
  }

  return children;
}
