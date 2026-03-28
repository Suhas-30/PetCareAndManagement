import { useNavigate } from "react-router-dom";

export default function DoctorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F9FB] px-8 py-10">

      {/* HEADER */}
      <div className="mb-10">

        <h1 className="text-3xl font-semibold tracking-tight text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 mt-1 text-[15px]">
          Manage consultations, availability and daily workflow.
        </p>

      </div>

      {/* HERO CARD */}
      <div className="relative overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.05)] px-7 py-6 flex items-center justify-between mb-10">

        {/* subtle gradient glow */}
        <div className="absolute right-[-80px] top-[-80px] w-[220px] h-[220px] bg-[#2FB7B2]/10 rounded-full blur-3xl"></div>

        <div className="relative">

          <h2 className="text-xl font-semibold text-gray-800 tracking-tight">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mt-1 text-[15px]">
            Stay organized and manage your consultations efficiently.
          </p>

        </div>

        {/* RIGHT BADGE */}
        <div className="relative hidden md:block">
          <span className="px-4 py-1.5 rounded-full bg-[#2FB7B2]/10 text-[#2FB7B2] text-sm font-medium">
            Doctor Panel
          </span>
        </div>

      </div>

      {/* ACTION CARDS */}
      <div className="grid md:grid-cols-2 gap-7 max-w-4xl">

        <DashboardButton
          title="Upcoming Appointments"
          desc="View and manage scheduled consultations"
          onClick={() => navigate("/doctor/dashboard/upcoming")}
        />

        <DashboardButton
          title="Consultation Availability"
          desc="Add and manage consultation slots"
          onClick={() => navigate("/doctor/dashboard/availability")}
        />

      </div>

    </div>
  );
}

/* ---------------- PREMIUM ACTION CARD ---------------- */

function DashboardButton({ title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="group relative overflow-hidden bg-white rounded-2xl border border-gray-100 p-7 cursor-pointer transition-all duration-200 shadow-[0_6px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.08)] hover:border-[#2FB7B2]/40"
    >

      {/* glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#2FB7B2]/0 via-[#2FB7B2]/0 to-[#2FB7B2]/5 opacity-0 group-hover:opacity-100 transition"></div>

      <div className="relative">

        <h3 className="font-semibold text-[17px] text-gray-800 group-hover:text-[#2FB7B2] transition">
          {title}
        </h3>

        <p className="text-[14px] text-gray-500 mt-2 leading-relaxed">
          {desc}
        </p>

        {/* bottom hint */}
        <div className="mt-5 flex items-center text-[#2FB7B2] text-sm font-medium opacity-0 group-hover:opacity-100 transition">
          Open →
        </div>

      </div>

    </div>
  );
}