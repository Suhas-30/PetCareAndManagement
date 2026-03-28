import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardContainer from "../../components/dashboard/DashboardContainer";
import { getPetCount } from "../../pet/services/petapi";
import { getMyAppointments } from "../service/appointmentService";

export default function UserDashboard() {
  const [petCount, setPetCount] = useState(0);
  const [futureAppointments, setFutureAppointments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        // 1️⃣ Load pet count
        const count = await getPetCount();
        setPetCount(count);

        // 2️⃣ Load appointments
        const res = await getMyAppointments();
        const appointments = res.data.data || [];
        console.log("app", appointments);
        const now = new Date();

        // 3️⃣ Convert to proper local Date objects (timezone safe)
        const upcoming = appointments
          .map((appt) => {
            if (!appt.slot) return null;

            const [year, month, day] = appt.slot.slotDate.split("-");
            const [hour, minute] = appt.slot.startTime.split(":");

            const fullDateTime = new Date(
              Number(year),
              Number(month) - 1,
              Number(day),
              Number(hour),
              Number(minute)
            );

            return {
              ...appt,
              fullDateTime,
            };
          })
          .filter((appt) => appt && appt.fullDateTime > now)
          .sort((a, b) => a.fullDateTime - b.fullDateTime);

        setFutureAppointments(upcoming);
        setCurrentIndex(0);
      } catch (error) {
        console.error("Dashboard load error", error);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <DashboardContainer title="Dashboard">
      <div className="space-y-8">

        {/* 1️⃣ Welcome Strip */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-8 py-6 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-[#2E2E2E]">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage your pets and appointments efficiently.
            </p>
          </div>

          <div className="mt-4 md:mt-0 flex items-center gap-8">
            <div>
              <p className="text-xs uppercase text-gray-400 tracking-wide">
                Total Pets
              </p>
              <p className="text-2xl font-bold text-[#2FB7B2]">
                {petCount}
              </p>
            </div>

            <button
              onClick={() => navigate("/my-appointments")}
              className="bg-[#2FB7B2] text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-[#27a6a2] transition"
            >
              View Appointments
            </button>
          </div>
        </div>

        {/* 2️⃣ Upcoming Appointments Slider */}
        <div className="bg-[#F7F9FB] border border-gray-200 rounded-2xl p-6">
          <p className="text-xs uppercase text-gray-400 tracking-wide mb-4">
            Upcoming Appointments
          </p>

          {futureAppointments.length > 0 ? (
            <div className="relative">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#2E2E2E]">
                    {
                      futureAppointments[currentIndex]?.slot?.doctor?.user
                        ?.fullName
                    }
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {futureAppointments[currentIndex]?.slot?.slotDate} •{" "}
                    {futureAppointments[currentIndex]?.slot?.startTime} -{" "}
                    {futureAppointments[currentIndex]?.slot?.endTime}
                  </p>

                  <span className="inline-block mt-3 px-3 py-1 text-xs font-medium rounded-full bg-[#EAFDFC] text-[#2FB7B2]">
                    {futureAppointments[currentIndex]?.status}
                  </span>
                </div>

                <button
                  onClick={() => navigate("/my-appointments")}
                  className="text-[#2FB7B2] text-sm font-medium hover:underline"
                >
                  View All
                </button>
              </div>

              {/* Slider Controls */}
              {futureAppointments.length > 1 && (
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() =>
                      setCurrentIndex(
                        currentIndex === 0
                          ? futureAppointments.length - 1
                          : currentIndex - 1
                      )
                    }
                    className="w-8 h-8 rounded-full border border-gray-300 text-sm hover:bg-gray-100"
                  >
                    ‹
                  </button>

                  <button
                    onClick={() =>
                      setCurrentIndex(
                        currentIndex === futureAppointments.length - 1
                          ? 0
                          : currentIndex + 1
                      )
                    }
                    className="w-8 h-8 rounded-full border border-gray-300 text-sm hover:bg-gray-100"
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                No upcoming appointments scheduled.
              </p>

              <button
                onClick={() => navigate("/user/appointments")}
                className="text-[#2FB7B2] text-sm font-medium hover:underline"
              >
                Book Now
              </button>
            </div>
          )}
        </div>

        {/* 3️⃣ Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold text-[#2E2E2E] mb-4">
            Quick Actions
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            {/* Add Pet */}
            <div
              onClick={() => navigate("/pets/add")}
              className="cursor-pointer bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="w-10 h-10 bg-[#EAFDFC] text-[#2FB7B2] rounded-lg flex items-center justify-center font-semibold mb-4">
                +
              </div>

              <h4 className="text-sm font-semibold text-[#2E2E2E]">
                Add Pet
              </h4>

              <p className="text-xs text-gray-500 mt-2">
                Register a new pet profile.
              </p>
            </div>

            {/* Manage Pets */}
            <div
              onClick={() => navigate("/pets")}
              className="cursor-pointer bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="w-10 h-10 bg-[#F7F9FB] text-[#2FB7B2] rounded-lg flex items-center justify-center font-semibold mb-4">
                🐾
              </div>

              <h4 className="text-sm font-semibold text-[#2E2E2E]">
                Manage Pets
              </h4>

              <p className="text-xs text-gray-500 mt-2">
                Edit and maintain pet details.
              </p>
            </div>

            {/* My Appointments */}
            <div
              onClick={() => navigate("/my-appointments")}
              className="cursor-pointer bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="w-10 h-10 bg-[#FFF3E6] text-[#FF9F43] rounded-lg flex items-center justify-center font-semibold mb-4">
                📅
              </div>

              <h4 className="text-sm font-semibold text-[#2E2E2E]">
                My Appointments
              </h4>

              <p className="text-xs text-gray-500 mt-2">
                View your scheduled consultations.
              </p>
            </div>

            {/* Your Orders ✅ NEW */}
            <div
              onClick={() => navigate("/account/orders")}
              className="cursor-pointer bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="w-10 h-10 bg-[#EAFDFC] text-[#2FB7B2] rounded-lg flex items-center justify-center font-semibold mb-4">
                📦
              </div>

              <h4 className="text-sm font-semibold text-[#2E2E2E]">
                Your Orders
              </h4>

              <p className="text-xs text-gray-500 mt-2">
                Track and manage your product orders.
              </p>
            </div>

          </div>
        </div>

      </div>
    </DashboardContainer>
  );
}