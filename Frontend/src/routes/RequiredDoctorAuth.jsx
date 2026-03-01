import { Navigate } from "react-router-dom";
import { useDoctorStatus } from "../context/DoctorStatusContext";

export default function RequiredDoctorAuth({ children }) {

  const session = localStorage.getItem("userSession");
  const { doctorStatus, loading } = useDoctorStatus();

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  if (loading) return null;

  const user = JSON.parse(session);

  // must be doctor AND approved
  if (user.role !== "DOCTOR" || doctorStatus !== "APPROVED") {
    return <Navigate to="/" replace />;
  }

  return children;
}