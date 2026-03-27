import { useEffect, useState } from "react";
import { getPrescriptionByAppointment, getMeetingLinkByAppointment } from "../service/appointmentService";

export default function AppointmentModal({ appointment, onClose }) {

  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!appointment) return;
    loadPrescription();
  }, [appointment]);

  const loadPrescription = async () => {
    try {
      setLoading(true);

      const res = await getPrescriptionByAppointment(appointment.id);
      setPrescription(res.data?.data?.notes || null);

    } catch (err) {
      setPrescription(null);
    } finally {
      setLoading(false);
    }
  };

  if (!appointment) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.08)] p-7 relative animate-[fadeIn_.25s_ease]">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-[#2FB7B2] transition"
        >
          ✕
        </button>

        {/* TITLE */}
        <h3 className="text-2xl font-semibold text-[#1F3A3A] mb-6 tracking-tight">
          Appointment Details
        </h3>

        {/* DETAILS */}
        <div className="space-y-3 text-sm">

          <Info label="Doctor" value={appointment.doctorName} />

          <Info label="Date" value={appointment.slotDate} />

          <Info
            label="Time"
            value={`${appointment.startTime || "-"} - ${appointment.endTime || "-"}`}
          />

          {appointment.mode === "OFFLINE" ? (
            <Info
              label="Clinic Address"
              value={appointment.clinicAddressSnapshot}
            />
          ) : (
            <div>
              <p className="text-[#7A9E9D] text-xs">Google Meet</p>

              {appointment.meetingLink ? (
                <a
                  href={appointment.meetingLink}
                  target="_blank"
                  rel="noreferrer"
                  className="font-medium text-[#2FB7B2] hover:underline"
                >
                  Join Meeting
                </a>
              ) : (
                <p className="text-[#7A9E9D]">
                  The doctor has not added the meeting link yet. It will be updated here shortly before the consultation.
                </p>
              )}

            </div>
          )}

        </div>

        {/* PRESCRIPTION */}
        <div className="mt-7">
          <h4 className="font-semibold text-[#1F3A3A] mb-2">
            Prescription
          </h4>

          <div className="bg-[#F7F9FB] rounded-xl p-4 text-sm border border-gray-100 min-h-[80px]">

            {loading ? (
              <div className="flex justify-center py-3">
                <div className="w-5 h-5 border-[3px] border-[#2FB7B2]/30 border-t-[#2FB7B2] rounded-full animate-spin"></div>
              </div>
            ) : prescription ? (
              <p className="text-[#1F3A3A] leading-relaxed">
                {prescription}
              </p>
            ) : (
              <span className="text-[#7A9E9D]">
                Doctor has not uploaded the prescription yet.
              </span>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}

/* SMALL COMPONENT */

function Info({ label, value }) {
  return (
    <div>
      <p className="text-[#7A9E9D] text-xs">{label}</p>
      <p className="font-medium text-[#1F3A3A]">{value || "-"}</p>
    </div>
  );
}