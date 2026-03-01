import { useEffect, useState } from "react";
import { withdrawDoctorApplication } from "../../doctor/service/doctorService";
import { useDoctorStatus } from "../../context/DoctorStatusContext";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {

  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const navigate = useNavigate();

  const {
    doctorStatus,
    setDoctorStatus,
    fetchDoctorStatus,
    loading
  } = useDoctorStatus();

  /* ---------- LOAD USER ---------- */
  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await api.get("/users/me");
        setUser(res.data.data);

        await fetchDoctorStatus();
      } finally {
        setLoadingUser(false);
      }
    };

    loadUser();
  }, []);

  /* ---------- WITHDRAW ---------- */
  const handleWithdraw = async () => {
    try {
      await withdrawDoctorApplication();
      setDoctorStatus(null);
      alert("Application withdrawn");
    } catch {
      alert("Failed to withdraw");
    }
  };

  if (loadingUser || loading)
    return <p className="text-center mt-10">Loading profile...</p>;

  const initials =
    user?.fullName
      ?.split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* ================= PROFILE HEADER ================= */}
      <div className="bg-white rounded-2xl shadow p-6 flex items-center gap-6">

        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-[#2FB7B2] text-white flex items-center justify-center text-xl font-semibold">
          {initials}
        </div>

        {/* Basic Info */}
        <div>
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            {user?.fullName}

            {/* ✅ Industry badge */}
            {doctorStatus === "APPROVED" && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                Verified Doctor
              </span>
            )}
          </h2>

          <p className="text-gray-500">{user?.email}</p>

          <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-[#F7F9FB]">
            Role: {user?.role}
          </span>
        </div>
      </div>

      {/* ================= ACCOUNT DETAILS ================= */}
      <div className="bg-[#F7F9FB] rounded-2xl shadow p-6">
        <h3 className="text-lg font-semibold mb-4">
          Account Information
        </h3>

        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Full Name</p>
            <p className="font-medium">{user?.fullName}</p>
          </div>

          <div>
            <p className="text-gray-500">Email Address</p>
            <p className="font-medium">{user?.email}</p>
          </div>

          <div>
            <p className="text-gray-500">Account Role</p>
            <p className="font-medium">{user?.role}</p>
          </div>

          <div>
            <p className="text-gray-500">Account Status</p>
            <p className="font-medium text-green-600">
              Active
            </p>
          </div>
        </div>
      </div>

      {/* ================= DOCTOR STATES ================= */}

      {/* ✅ PENDING */}
      {doctorStatus === "PENDING" && (
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold mb-2">
            Doctor Application Under Review
          </h3>

          <p className="text-orange-500">
            Our team is reviewing your application.
          </p>

          <button
            onClick={handleWithdraw}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Withdraw Application
          </button>
        </div>
      )}

      {/* ✅ APPROVED → ACTION BASED UI */}
      {doctorStatus === "APPROVED" && (
        <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              Doctor Workspace
            </h3>
            <p className="text-sm text-gray-500">
              Manage appointments, availability and consultations.
            </p>
          </div>

          <button
            onClick={() => navigate("/doctor/dashboard")}
            className="bg-[#2FB7B2] text-white px-5 py-2 rounded-lg"
          >
            Open Dashboard
          </button>
        </div>
      )}

      {/* ✅ REJECTED */}
      {doctorStatus === "REJECTED" && (
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold text-red-500">
            Application Rejected
          </h3>

          <button
            onClick={() => navigate("/doctor/register")}
            className="mt-4 bg-[#2FB7B2] text-white px-5 py-2 rounded-lg"
          >
            Apply Again
          </button>
        </div>
      )}

      {/* ✅ NEVER APPLIED */}
      {!doctorStatus && (
        <div className="bg-white rounded-2xl shadow p-6 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">
              Become a Verified Pet Doctor 🩺
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Apply to join our trusted veterinary network.
            </p>
          </div>

          <button
            onClick={() => navigate("/doctor/register")}
            className="bg-[#2FB7B2] text-white px-5 py-2 rounded-lg"
          >
            Apply Now
          </button>
        </div>
      )}

    </div>
  );
}