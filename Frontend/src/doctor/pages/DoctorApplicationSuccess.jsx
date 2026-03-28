import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDoctorStatus, } from "../../context/DoctorStatusContext";

export default function DoctorApplicationSuccess() {
  const navigate = useNavigate();
  const { doctorStatus, fetchDoctorStatus, loading } = useDoctorStatus();

  // ✅ fetch latest status when page opens
  useEffect(() => {
    fetchDoctorStatus();

    return () => {
      sessionStorage.removeItem("doctorApplied");
    };
  }, []);

  const renderStatus = () => {
    if (loading) return "Loading...";
    if (doctorStatus === "PENDING") return "Pending Review ⏳";
    if (doctorStatus === "REJECTED") return "Application Rejected ❌";
    if (doctorStatus === "APPROVED") return "Approved ✅";

    return "Application Not Submitted";
  };

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
            {renderStatus()}
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