import { Navigate } from "react-router-dom";
import { isUserAuthencticated } from "../auth/userAuth";

export default function RequiredUserAuth({ children }) {
  if (!isUserAuthencticated()) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
