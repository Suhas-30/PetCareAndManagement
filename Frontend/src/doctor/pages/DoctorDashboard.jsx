import { useNavigate } from "react-router-dom";

export default function DoctorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-8 bg-[#F7F9FB] min-h-screen">
      <h1 className="text-2xl font-semibold mb-8">Doctor Dashboard</h1>

      <div className="grid md:grid-cols-3 gap-6">
        <DashboardButton
          title="Consultation Schedule"
          desc="Configure working days and consultation timings"
          onClick={() => navigate("/doctor/dashboard/availability")}
        />
      </div>
    </div>
  );
}

function DashboardButton({ title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow cursor-pointer
                 hover:shadow-lg transition"
    >
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{desc}</p>
    </div>
  );
}
