import { useEffect, useState } from "react";
import { getUpcomingAppointments } from "../api/scheduleApi";
import UpcomingAppointmentModal from "../components/UpcomingAppointmentModal";

export default function UpcomingAppointments() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await getUpcomingAppointments();
      setData(res.data || []);
    } catch (e) {
      console.error("Failed loading upcoming");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FB] px-8 py-10">

      {/* HEADER */}
      <div className="mb-8">

        <h1 className="text-3xl font-semibold tracking-tight text-gray-800">
          Upcoming Appointments
        </h1>

        <p className="text-gray-500 mt-1 text-[15px]">
          Manage and review your scheduled consultations.
        </p>

      </div>

      {/* CARD WRAPPER */}
      <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] border border-gray-100 p-6">

        {loading ? (
          <p className="text-center text-gray-400 py-12 text-sm">
            Loading appointments...
          </p>
        ) : data.length === 0 ? (
          <p className="text-center text-gray-400 py-12 text-sm">
            No upcoming appointments
          </p>
        ) : (
          <div className="space-y-4">

            {data.map((appt) => (
              <div
                key={appt.appointmentId}
                onClick={() => setSelected(appt)}
                className="group p-5 rounded-xl border border-gray-100 hover:border-[#2FB7B2]/40 hover:shadow-lg bg-white cursor-pointer transition-all duration-200"
              >

                <div className="flex justify-between items-center">

                  {/* LEFT */}
                  <div>

                    <p className="font-semibold text-gray-800 text-[16px] group-hover:text-[#2FB7B2] transition">
                      {appt.ownerName}
                    </p>

                    <p className="text-[14px] text-gray-500 mt-1">
                      {appt.startTime} — {appt.endTime}
                    </p>

                  </div>

                  {/* RIGHT */}
                  <div className="text-right">

                    <span className="text-[13px] text-gray-400">
                      {appt.slotDate}
                    </span>

                    <div className="mt-1">
                      <span className="px-2.5 py-1 rounded-full text-xs bg-[#2FB7B2]/10 text-[#2FB7B2] font-medium">
                        Scheduled
                      </span>
                    </div>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* MODAL */}
      {selected && (
        <UpcomingAppointmentModal
          data={selected}
          onClose={() => setSelected(null)}
        />
      )}

    </div>
  );
}