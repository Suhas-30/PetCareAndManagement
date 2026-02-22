import DashboardContainer from "../../components/dashboard/DashboardContainer";
import StatCard from "../../components/dashboard/StatCard";

export default function DoctorDashboard() {
  return (
    <DashboardContainer title="Doctor Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Today Appointments" value="0" />
        <StatCard title="Pending Requests" value="0" />
        <StatCard title="Total Patients" value="0" />
        <StatCard title="Completed Consultations" value="0" />
      </div>
    </DashboardContainer>
  );
}