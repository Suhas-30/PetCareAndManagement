import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardContainer from "../../components/dashboard/DashboardContainer";
import StatCard from "../../components/dashboard/StatCard";
import { getPetCount } from "../../pet/services/petapi";

export default function UserDashboard() {

  const [petCount, setPetCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPetCount = async () => {
      try {
        const count = await getPetCount();
        setPetCount(count);
      } catch (error) {
        console.error("Failed to fetch pet count", error);
      }
    };

    fetchPetCount();
  }, []);

  return (
    <DashboardContainer title="User Dashboard">

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Pets" value={petCount} />
        <StatCard title="Upcoming Appointments" value="0" />
        <StatCard title="Completed Visits" value="0" />
        <StatCard title="Notifications" value="0" />
      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={() => navigate("/pets/add")}
            className="bg-[#2FB7B2] text-white px-5 py-3 rounded-lg hover:bg-[#27a6a2] transition"
          >
            ➕ Add Pet
          </button>

          <button
            onClick={() => navigate("/pets")}
            className="bg-white border border-[#2FB7B2] text-[#2FB7B2] px-5 py-3 rounded-lg hover:bg-[#F0FAFA] transition"
          >
            🐾 My Pets
          </button>
        </div>
      </div>

    </DashboardContainer>
  );
}