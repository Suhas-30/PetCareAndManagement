import { useEffect, useState } from "react";
import {
  getDoctorSlots,
  bookAppointment,
} from "../services/appointmentService";

export default function DoctorBooking({ doctorId }) {

  const [slots, setSlots] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadSlots();
  }, []);

  const loadSlots = async () => {
    const data = await getDoctorSlots(doctorId);
    setSlots(data);
  };

  const handleBook = async () => {
    if (!selected) return;

    await bookAppointment(selected);
    alert("Appointment booked");
    loadSlots();
  };

  const formatTime = (time) => {
    const [h, m] = time.split(":");
    const hour = Number(h);
    const suffix = hour >= 12 ? "PM" : "AM";
    const formatted = hour % 12 || 12;
    return `${formatted}:${m} ${suffix}`;
  };

  const grouped = slots.reduce((acc, slot) => {
    if (!acc[slot.date]) acc[slot.date] = [];
    acc[slot.date].push(slot);
    return acc;
  }, {});

  return (
    <div className="p-6">

      <h2 className="text-xl font-semibold mb-4">
        Select Appointment Slot
      </h2>

      {/* COLOR LEGEND */}
      <div className="flex gap-4 mb-6 text-sm">
        <span className="text-green-600">■ Available</span>
        <span className="text-red-600">■ Booked</span>
        <span className="text-blue-600">■ Selected</span>
      </div>

      {Object.entries(grouped).map(([date, daySlots]) => (
        <div key={date} className="mb-6">

          <h3 className="font-semibold mb-2">
            {new Date(date).toDateString()}
          </h3>

          <div className="flex flex-wrap gap-3">

            {daySlots.map((slot) => {

              let color =
                slot.status === "BOOKED"
                  ? "bg-red-400 cursor-not-allowed"
                  : selected === slot.id
                  ? "bg-blue-500"
                  : "bg-green-500";

              return (
                <button
                  key={slot.id}
                  disabled={slot.status !== "AVAILABLE"}
                  onClick={() => setSelected(slot.id)}
                  className={`text-white px-4 py-2 rounded ${color}`}
                >
                  {formatTime(slot.startTime)} -
                  {" "}
                  {formatTime(slot.endTime)}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <button
        onClick={handleBook}
        className="mt-6 bg-black text-white px-6 py-2 rounded"
      >
        Confirm Booking
      </button>
    </div>
  );
}