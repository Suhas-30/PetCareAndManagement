import { useEffect, useState } from "react";
import { getMyAppointments } from "../service/appointmentService";
import AppointmentModal from "../components/AppointmentModal";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await getMyAppointments();
        setAppointments(res.data.data || []);
      } catch (err) {
        console.error("Failed to load appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  /* ================= LOADER ================= */

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-8 h-8 border-[3px] border-[#2FB7B2]/30 border-t-[#2FB7B2] rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-14 bg-[#F7F9FB] min-h-screen">

      {/* HEADER */}
      <div className="mb-10">
        <h2 className="text-[30px] font-semibold text-[#1F3A3A] tracking-tight">
          My Appointments
        </h2>
        <p className="text-[#4F7C7B] text-sm mt-1">
          View and manage your upcoming consultations
        </p>
      </div>

      {/* EMPTY */}
      {appointments.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
          <p className="text-[#7A9E9D] text-base">No appointments found</p>
        </div>
      ) : (

        /* GRID */
        <div className="grid gap-6 md:grid-cols-2">

          {appointments.map((appt) => (
            <div
              key={appt.id}
              onClick={() => setSelected(appt)}
              className="group bg-white rounded-2xl p-6 border border-gray-100
              shadow-[0_10px_30px_rgba(0,0,0,0.04)]
              hover:shadow-[0_18px_40px_rgba(47,183,178,0.15)]
              hover:-translate-y-[2px]
              transition-all duration-300 cursor-pointer"
            >

              {/* TOP */}
              <div className="flex items-center justify-between">

                <p className="text-[17px] font-semibold text-[#1F3A3A] tracking-tight">
                  {appt.doctorName || "Doctor"}
                </p>

                <StatusBadge status={appt.status} />

              </div>

              {/* INFO */}
              <div className="mt-5 space-y-2 text-sm">

                <InfoRow label="Date" value={appt.slotDate || "-"} />

                <InfoRow
                  label="Time"
                  value={`${appt.startTime || "-"} - ${appt.endTime || "-"}`}
                />

              </div>

              {/* FOOT */}
              <div className="mt-6 flex items-center justify-between">

                <span className="text-xs text-[#7A9E9D]">
                  Click to view details
                </span>

                <span className="text-[#2FB7B2] group-hover:translate-x-1 transition">
                  →
                </span>

              </div>

            </div>
          ))}

        </div>
      )}

      {/* MODAL */}
      <AppointmentModal
        appointment={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}

/* ================= SMALL COMPONENTS ================= */

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between">
      <span className="text-[#7A9E9D]">{label}</span>
      <span className="font-medium text-[#1F3A3A]">{value}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    CONFIRMED: "bg-[#2FB7B2]/10 text-[#2FB7B2]",
    PENDING: "bg-[#FF9F43]/15 text-[#FF9F43]",
    CANCELLED: "bg-red-50 text-red-500",
    COMPLETED: "bg-[#6BCF9D]/15 text-[#34a57f]",
  };

  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full ${
        map[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}