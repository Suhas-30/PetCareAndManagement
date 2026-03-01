import { Navigate } from "react-router-dom";
import { useDoctorStatus } from "../context/DoctorStatusContext";

export default function DoctorRegisterGuard({ children }) {

  const { doctorStatus, loading } = useDoctorStatus();

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-gray-500">Loading...</p>
    </div>
  );
}

  // never applied → allow register
  if (!doctorStatus) {
    return children;
  }

  // rejected → allow reapply
  if (doctorStatus === "REJECTED") {
    return children;
  }

  // pending → show waiting page
  if (doctorStatus === "PENDING") {
    return <Navigate to="/doctor/application-success" replace />;
  }

  // approved → dashboard
  if (doctorStatus === "APPROVED") {
    return <Navigate to="/doctor/dashboard" replace />;
  }

  return children;
}