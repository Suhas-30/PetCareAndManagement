import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import {
  createSlot,
  getSlotsByDate,
  deleteSlot,
  activateSlot,
} from "../service/doctorSlotApi";

export default function DoctorAvailability() {
  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [slots, setSlots] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState(30);
  const [consultingFee, setConsultingFee] = useState("");
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ================================
     FETCH SLOTS
  ================================ */

  const fetchSlots = async (date) => {
    try {
      setLoading(true);
      const res = await getSlotsByDate(date);
      setSlots(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load slots");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots(selectedDate);
  }, [selectedDate]);

  /* ================================
     CREATE SLOT
  ================================ */

  const handleAddSlot = async () => {
    if (!startTime) return setError("Select start time");
    if (!consultingFee || Number(consultingFee) <= 0)
      return setError("Enter valid consulting fee");

    try {
      setError("");

      await createSlot({
        slotDate: selectedDate,
        startTime,
        durationMinutes: duration,
        consultingFee: Number(consultingFee),
      });

      setStartTime("");
      fetchSlots(selectedDate);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create slot");
    }
  };

  /* ================================
     DELETE SLOT
  ================================ */

  const confirmDelete = async () => {
    try {
      await deleteSlot(deleteId);
      setDeleteId(null);
      fetchSlots(selectedDate);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to delete slot");
    }
  };

  /* ================================
     ACTIVATE SLOT
  ================================ */

  const handleActivate = async (slotId) => {
    try {
      await activateSlot(slotId);
      fetchSlots(selectedDate);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to activate slot");
    }
  };

  /* ================================
     STATUS UI HELPER
  ================================ */

  const getStatusStyles = (status) => {
    switch (status) {
      case "AVAILABLE":
        return {
          border: "border-l-4 border-emerald-400",
          badge: "bg-emerald-100 text-emerald-600",
          dot: "bg-emerald-500",
          label: "Available",
        };
      case "BOOKED":
        return {
          border: "border-l-4 border-red-400",
          badge: "bg-red-100 text-red-600",
          dot: "bg-red-500",
          label: "Booked",
        };
      case "CANCELLED":
        return {
          border: "border-l-4 border-gray-400",
          badge: "bg-gray-200 text-gray-600",
          dot: "bg-gray-500",
          label: "Cancelled",
        };
      default:
        return {};
    }
  };

  /* ================================
     UI
  ================================ */

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F9FB] to-[#EAFDFC] py-14 px-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl p-8">

        <h2 className="text-3xl font-bold text-[#2E2E2E] mb-8">
          Manage Availability
        </h2>

        {/* CONSULTING FEE */}
        <div className="mb-8">
          <label className="text-sm font-medium text-gray-600">
            Consulting Fee (₹)
          </label>
          <input
            type="number"
            min="0"
            value={consultingFee}
            onChange={(e) => setConsultingFee(e.target.value)}
            className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2FB7B2]"
            placeholder="Enter consulting fee"
          />
        </div>

        {/* DATE */}
        <div className="mb-8">
          <label className="text-sm font-medium text-gray-600">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            min={today}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="mt-2 w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2FB7B2]"
          />
        </div>

        {/* ADD SLOT */}
        <div className="bg-[#F7F9FB] rounded-2xl p-6 mb-10 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">
            Add Time Slot
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6BCF9D]"
            />

            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="border rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#6BCF9D]"
            >
              <option value={15}>15 mins</option>
              <option value={30}>30 mins</option>
              <option value={45}>45 mins</option>
              <option value={60}>60 mins</option>
            </select>

            <button
              onClick={handleAddSlot}
              className="bg-[#FF9F43] text-white rounded-xl font-semibold px-6 py-3 hover:bg-orange-500 transition"
            >
              Add Slot
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-3">{error}</p>
          )}
        </div>

        {/* SLOT LIST */}
        <div>
          <h3 className="text-xl font-semibold mb-6">
            Time Slots
          </h3>

          {loading ? (
            <div className="text-center py-10">Loading...</div>
          ) : slots.length === 0 ? (
            <div className="text-center py-12 bg-[#F7F9FB] rounded-2xl border border-dashed">
              No time slots created.
            </div>
          ) : (
            <div className="space-y-5">
              {slots.map((slot) => {
                const statusUI = getStatusStyles(slot.status);

                return (
                  <div
                    key={slot.id}
                    className={`bg-white p-6 rounded-2xl shadow-md flex justify-between items-center transition hover:shadow-lg ${statusUI.border}`}
                  >
                    <div>
                      <p className="text-xl font-semibold text-[#2FB7B2]">
                        {slot.startTime} - {slot.endTime}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        ₹{slot.consultingFee} consultation
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${statusUI.badge}`}>
                        {statusUI.label}
                      </span>

                      {slot.status === "AVAILABLE" && (
                        <button
                          onClick={() => setDeleteId(slot.id)}
                          className="text-gray-400 hover:text-red-500 transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}

                      {slot.status === "CANCELLED" && (
                        <button
                          onClick={() => handleActivate(slot.id)}
                          className="px-4 py-1.5 rounded-full text-sm font-medium bg-emerald-100 text-emerald-600 hover:bg-emerald-200 transition"
                        >
                          Activate
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* DELETE MODAL */}
        {deleteId && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 w-96 shadow-xl">
              <h4 className="font-semibold mb-4">Confirm Delete</h4>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete this slot?
              </p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  className="px-4 py-2 rounded-lg border"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}