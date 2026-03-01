import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDoctorStatus } from "../../context/DoctorStatusContext";
export default function DoctorApplicationSuccess() {
  const navigate = useNavigate();
  const { doctorStatus } = useDoctorStatus();
  // remove access when leaving page
  useEffect(() => {
    return () => {
      sessionStorage.removeItem("doctorApplied");
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F7F9FB] to-[#EEF3F7] px-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 text-center">
        <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full bg-[#2FB7B2]/10">
          <span className="text-4xl">✅</span>
        </div>

        <h2 className="text-2xl font-bold text-[#2FB7B2] mb-3">
          Application Submitted!
        </h2>

        <p className="text-gray-600 text-sm mb-6">
          Your application is under review. We will notify you once approved.
        </p>

        <div className="bg-[#F7F9FB] border rounded-xl p-4 mb-8">
          <p className="text-sm text-gray-500">Current Status</p>
          <p className="font-semibold text-[#FF9F43] mt-1">
            {!doctorStatus && "Application Not Submitted"}
            {doctorStatus === "PENDING" && "Pending Review ⏳"}
            {doctorStatus === "REJECTED" && "Application Rejected ❌"}
            {doctorStatus === "APPROVED" && "Approved ✅"}
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-[#2FB7B2] text-white py-3 rounded-xl font-semibold"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
