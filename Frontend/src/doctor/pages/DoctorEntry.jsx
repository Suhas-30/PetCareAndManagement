import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDoctorStatus } from "../../context/DoctorStatusContext";

export default function DoctorEntry() {
  const { doctorStatus, loading } = useDoctorStatus();
  const navigate = useNavigate();

    console.log("loading:", loading);
    console.log("status:", doctorStatus);

  useEffect(() => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      );
    }

    if (!doctorStatus) {
      navigate("/doctor/register", { replace: true });
      return;
    }

    if (doctorStatus === "PENDING") {
      navigate("/doctor/application-success", { replace: true });
      return;
    }

    if (doctorStatus === "APPROVED") {
      navigate("/doctor/dashboard", { replace: true });
      return;
    }

    if (doctorStatus === "REJECTED") {
      navigate("/doctor/register", { replace: true });
    }
  }, [doctorStatus, loading]);

  return null;
}
