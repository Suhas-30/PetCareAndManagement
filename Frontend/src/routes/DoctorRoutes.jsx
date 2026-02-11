import { Route } from "react-router-dom";
import DoctorRegister from "../doctor/pages/DoctorRegister";

export default function DoctorRoutes() {
  return (
    <>
      <Route path="/doctor/register" element={<DoctorRegister />} />
    </>
  );
}
