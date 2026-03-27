import { useEffect, useState } from "react";
import {
  savePrescription,
  getPrescriptionByAppointment,
  updateMeetingLink,
  getMeetingLinkByAppointment
} from "../service/doctorSlotApi";
import AppAlert from "../../components/alrettab/AppAlert";

export default function UpcomingAppointmentModal({ data, onClose }) {

  const [prescription, setPrescription] = useState("");
  const [meetLink, setMeetLink] = useState("");
  const [editingLink, setEditingLink] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState(null);

  /* =============================
     LOAD DATA
  ============================== */

  useEffect(() => {
    if (!data) return;
    loadPrescription();
  }, [data]);

  const loadPrescription = async () => {
    try {

      const res = await getPrescriptionByAppointment(data.appointmentId);

      if (res?.data?.data?.notes) {
        setPrescription(res.data.data.notes);
      }

      if (res?.data?.data?.meetingLink) {
        setMeetLink(res.data.data.meetingLink);
      } else {

        // fallback (optional)
        const meetRes = await getMeetingLinkByAppointment(data.appointmentId);
        setMeetLink(meetRes?.data?.data || "");

      }

    } catch (e) {
      // ignore
    } finally {
      setLoading(false);
    }
  };

  /* =============================
     UPDATE MEETING LINK ONLY
  ============================== */

  const handleUpdateMeeting = async () => {
    try {

      setSaving(true);

      await updateMeetingLink({
        appointmentId: data.appointmentId,
        meetingLink: meetLink,
      });

      setEditingLink(false);

      setAlert({
        type: "success",
        message: "Meeting link updated",
      });

    } catch {
      setAlert({
        type: "error",
        message: "Failed to update meeting link",
      });
    } finally {
      setSaving(false);
    }
  };

  /* =============================
     SAVE PRESCRIPTION
  ============================== */

  const handleSave = async () => {
    try {

      setSaving(true);

      await savePrescription({
        appointmentId: data.appointmentId,
        notes: prescription,
      });

      setAlert({
        type: "success",
        message: "Saved successfully",
      });

    } catch (e) {
      setAlert({
        type: "error",
        message: "Failed to save",
      });
    } finally {
      setSaving(false);
    }
  };

  if (!data) return null;

  return (
    <>
      {alert && (
        <AppAlert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4">

        <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.08)] w-full max-w-xl max-h-[90vh] flex flex-col">

          {/* HEADER */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">

            <h3 className="text-lg font-semibold text-gray-800">
              Appointment Details
            </h3>

            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 text-lg"
            >
              ✕
            </button>

          </div>

          {/* BODY */}
          <div className="overflow-y-auto px-6 py-5 space-y-6">

            {loading ? (
              <p className="text-center text-gray-400 py-10 text-sm">
                Loading prescription...
              </p>
            ) : (
              <>
                {/* INFO */}
                <div className="grid grid-cols-2 gap-x-6 gap-y-5 text-sm">

                  <Info label="Owner" value={data.ownerName} />
                  <Info label="Pet" value={`${data.petName} (${data.species})`} />
                  <Info label="Breed" value={data.breed || "-"} />
                  <Info label="Weight" value={`${data.weight || "-"} kg`} />
                  <Info label="Date" value={data.slotDate} />
                  <Info label="Time" value={`${data.startTime} - ${data.endTime}`} />

                </div>

                {/* PURPOSE */}
                <Section title="Purpose">
                  <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-700">
                    {data.purpose}
                  </div>
                </Section>

                {/* MEDICAL HISTORY */}
                <Section title="Medical History">
                  {data.medicalHistory?.length ? (
                    <ul className="list-disc ml-5 text-sm text-gray-600 space-y-1">
                      {data.medicalHistory.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400 text-sm">
                      No medical history available
                    </p>
                  )}
                </Section>

                {/* GOOGLE MEET (ONLY ONLINE) */}
                {data.mode === "ONLINE" && (
                  <Section title="Google Meet">

                    {/* SHOW JOIN BUTTON */}
                    {meetLink && !editingLink && (
                      <div className="flex items-center gap-3">

                        <a
                          href={meetLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 rounded-lg bg-[#2FB7B2] text-white text-sm font-medium hover:bg-[#27a39f]"
                        >
                          Join Meeting
                        </a>

                        <button
                          onClick={() => setEditingLink(true)}
                          className="text-xs text-gray-500 underline"
                        >
                          Update link
                        </button>

                      </div>
                    )}

                    {/* SHOW INPUT */}
                    {(editingLink || !meetLink) && (
                      <div className="flex gap-3">

                        <input
                          type="text"
                          value={meetLink}
                          onChange={(e) => setMeetLink(e.target.value)}
                          placeholder="Paste Google Meet link..."
                          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]/30"
                        />

                        <button
                          onClick={handleUpdateMeeting}
                          disabled={saving}
                          className="px-4 py-2 rounded-lg bg-[#2FB7B2] text-white text-sm font-medium hover:bg-[#27a39f]"
                        >
                          {saving ? "Updating..." : "Update"}
                        </button>

                      </div>
                    )}

                  </Section>
                )}

                {/* PRESCRIPTION */}
                <Section title="Prescription">
                  <textarea
                    value={prescription}
                    onChange={(e) => setPrescription(e.target.value)}
                    placeholder="Write prescription..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]/30"
                    rows={4}
                  />
                </Section>

              </>
            )}

          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-100">

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 text-sm"
            >
              Close
            </button>

            <button
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2 rounded-lg bg-[#2FB7B2] text-white hover:bg-[#27a39f] text-sm font-medium"
            >
              {saving ? "Saving..." : "Save Prescription"}
            </button>

          </div>

        </div>
      </div>
    </>
  );
}

/* SMALL COMPONENTS */

function Info({ label, value }) {
  return (
    <div>
      <p className="text-gray-400 text-xs">{label}</p>
      <p className="font-medium text-gray-800">{value}</p>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <p className="font-semibold text-gray-800 mb-2 text-sm">{title}</p>
      {children}
    </div>
  );
}