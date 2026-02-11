import { Route } from "react-router-dom";
import DoctorRegister from "../join/doctor/DoctorRegister";

export default function DoctorRoutes() {
  return (
    <>
      <Route path="/doctor-register" element={<DoctorRegister />} />
    </>
  );
}
