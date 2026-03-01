import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import ScheduleCalendar from "../components/ScheduleCalendar";
import AddSessionModal from "../components/AddSessionModal";
import AppAlert from "../../components/alrettab/AppAlert";

import {
  saveDoctorSchedule,
  getScheduleByDate,
} from "../api/scheduleApi";

export default function DoctorAvailability() {

  const [selectedDate, setSelectedDate] = useState(new Date());

  // existing sessions from backend
  const [existingSessions, setExistingSessions] = useState([]);

  // new sessions added locally
  const [draftSessions, setDraftSessions] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [alertMsg, setAlertMsg] = useState(null);
  const [saving, setSaving] = useState(false);

  /* ================= DATE ================= */

  const formattedDate = useMemo(
    () => selectedDate.toISOString().split("T")[0],
    [selectedDate]
  );

  /* ================= TIME HELPERS ================= */

  const toMinutes = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  /* ================= VALIDATION ================= */

  const validateSession = (newSession) => {

    const combined = [
      ...existingSessions,
      ...draftSessions,
      newSession
    ].sort(
      (a,b)=>toMinutes(a.startTime)-toMinutes(b.startTime)
    );

    for (let i=0;i<combined.length;i++) {

      const curr = combined[i];

      if (toMinutes(curr.endTime) <= toMinutes(curr.startTime))
        return "End time must be after start time";

      if (i>0){
        const prevEnd = toMinutes(combined[i-1].endTime);
        const currStart = toMinutes(curr.startTime);

        if (currStart < prevEnd + 15)
          return "15 min gap required between sessions";
      }
    }

    return null;
  };

  /* ================= LOAD EXISTING ================= */

  const loadScheduleByDate = async (date) => {
    try {
      const res = await getScheduleByDate(date);

      if (res.success) {
        setExistingSessions(res.data.sessions || []);
      }
    } catch {
      setExistingSessions([]);
    }
  };

  useEffect(() => {
    setDraftSessions([]);
    loadScheduleByDate(formattedDate);
  }, [formattedDate]);

  /* ================= ADD SESSION ================= */

  const handleAddSession = (session) => {

    const error = validateSession(session);

    if (error) {
      setAlertMsg(error);
      return;
    }

    setDraftSessions(prev => [...prev, session]);
    setShowModal(false);
  };

  /* ================= SAVE ================= */

  const handleSaveSchedule = async () => {

    const allSessions = [
      ...existingSessions,
      ...draftSessions
    ];

    if (allSessions.length === 0) {
      setAlertMsg("Add at least one session");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        date: formattedDate,
        isWorking: true,
        sessions: allSessions,
      };

      const res = await saveDoctorSchedule(payload);

      if (res.success) {
        setAlertMsg(res.message || "Schedule updated successfully");
        setDraftSessions([]);
        await loadScheduleByDate(formattedDate);
      }

    } catch (err) {

      const message =
        err?.response?.data?.message ||
        "Failed to save schedule";

      setAlertMsg(message);

    } finally {
      setSaving(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F7F9FB] to-[#EEF3F6] px-12 py-10">

      <h2 className="text-3xl font-semibold mb-10 text-gray-800">
        Consultation Schedule
      </h2>

      <div className="grid md:grid-cols-2 gap-10 items-start">

        {/* CALENDAR */}
        <ScheduleCalendar
          selectedDate={selectedDate}
          onChange={setSelectedDate}
        />

        {/* RIGHT PANEL */}
        <div className="
          bg-white rounded-3xl border border-gray-200
          shadow-[0_20px_50px_rgba(0,0,0,0.08)]
          p-8 overflow-hidden
        ">

          <div className="flex gap-4 mb-8">

            <button
              onClick={()=>setShowModal(true)}
              className="
                px-6 py-3 rounded-xl
                bg-gradient-to-r from-[#2FB7B2] to-[#38C6C1]
                text-white font-semibold
              ">
              + Add Session
            </button>

            {(draftSessions.length > 0) && (
              <button
                onClick={handleSaveSchedule}
                disabled={saving}
                className="
                  px-6 py-3 rounded-xl
                  bg-gradient-to-r from-[#6BCF9D] to-[#57B987]
                  text-white font-semibold
                  disabled:opacity-60
                ">
                {saving ? "Saving..." : "Save Schedule"}
              </button>
            )}

          </div>

          {/* ===== EXISTING ===== */}
          {existingSessions.length > 0 && (
            <>
              <p className="text-sm text-gray-500 mb-3">
                Existing Sessions
              </p>

              {existingSessions.map((s,i)=>(
                <div
                  key={"ex"+i}
                  className="border rounded-xl p-4 mb-3 bg-gray-50"
                >
                  {s.startTime} — {s.endTime}
                </div>
              ))}
            </>
          )}

          {/* ===== DRAFT ===== */}
          <AnimatePresence>
            {draftSessions.map((s,i)=>(
              <motion.div
                key={"dr"+i}
                initial={{opacity:0,y:20}}
                animate={{opacity:1,y:0}}
                exit={{opacity:0}}
                className="
                  border rounded-xl p-4 mb-3
                  bg-green-50 font-semibold
                "
              >
                {s.startTime} — {s.endTime}
              </motion.div>
            ))}
          </AnimatePresence>

          {existingSessions.length === 0 &&
           draftSessions.length === 0 && (
            <p className="text-gray-400">
              No sessions added for this day.
            </p>
          )}

        </div>
      </div>

      {showModal && (
        <AddSessionModal
          onClose={()=>setShowModal(false)}
          onSave={handleAddSession}
        />
      )}

      {alertMsg && (
        <AppAlert
          message={alertMsg}
          onClose={()=>setAlertMsg(null)}
        />
      )}
    </div>
  );
}