import { Navigate } from "react-router-dom";

export default function RequiredAdminAuth({ children }) {

  const session = localStorage.getItem("userSession");

  if (!session) {
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(session);

  if (user.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}