import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getDoctorAvailableSlots,
  createAppointmentApi,
  verifyPaymentApi,
} from "../service/appointmentService";
import SlotDetailsModal from "../components/SlotDetailsModal";
import AppAlert from "../../components/alrettab/AppAlert";

export default function DoctorAvailabilityView() {
  const { doctorId } = useParams();

  const today = new Date().toISOString().split("T")[0];

  const [selectedDate, setSelectedDate] = useState(today);
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [alert, setAlert] = useState(null);

  /* ================= FETCH SLOTS ================= */
  const fetchSlots = async (date) => {
    try {
      setLoading(true);

      const res = await getDoctorAvailableSlots(doctorId, date);
      const slots = res?.data ?? [];

      setSlots(slots);
      setSelectedSlot(null);
    } catch (err) {
      console.error("FETCH SLOT ERROR:", err);
      setSlots([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (doctorId) fetchSlots(selectedDate);
  }, [doctorId, selectedDate]);

  /* ================= HANDLE BOOKING ================= */
  const handleBooking = async (data) => {
    try {
      setBookingLoading(true);

      /* ---------- STEP 1: CREATE ORDER ---------- */
      const res = await createAppointmentApi({
        doctorId,
        slotId: data.slotId,
        petId: data.petId,
        mode: data.consultMode,
        purpose: data.purpose,
        amount: selectedSlot.consultingFee,
      });

      const order = res.data.data;

      /* ---------- STEP 2: OPEN RAZORPAY ---------- */
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "Smart Pet Care",
        description: "Appointment Booking",
        order_id: order.id,

        handler: async (response) => {
          try {
            await verifyPaymentApi({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            });

            setAlert({
              type: "success",
              message: "Appointment booked successfully ✅",
            });

            setOpenModal(false);
            fetchSlots(selectedDate);

          } catch (err) {
            console.error("VERIFY FAILED:", err);

            setAlert({
              type: "error",
              message: "Payment verification failed",
            });
          }
        },

        prefill: {
          name: "User",
          email: "user@email.com",
        },

        theme: {
          color: "#2FB7B2",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("CREATE FAILED:", err);

      setAlert({
        type: "error",
        message: err.response?.data?.message || "Failed to create appointment",
      });

    } finally {
      setBookingLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <div className="min-h-screen bg-[#F7F9FB] py-14 px-6 flex justify-center">

      {/* 🔔 ALERT */}
      {alert && (
        <AppAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl p-10">

        <div className="mb-10">
          <h2 className="text-3xl font-bold text-[#2E2E2E]">
            Doctor Availability
          </h2>
          <p className="text-gray-500 mt-2 text-sm">
            Select a date and choose a time slot for your consultation.
          </p>
        </div>

        <div className="mb-10">
          <label className="block text-sm font-medium text-gray-600 mb-2">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate}
            min={today}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-[#2FB7B2] focus:outline-none transition"
          />
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500">
            Loading available slots...
          </div>
        ) : slots.length === 0 ? (
          <div className="bg-[#F7F9FB] border border-dashed border-gray-300 rounded-2xl py-12 text-center text-gray-500">
            No available slots for this date.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {slots.map((slot) => (
              <button
                key={slot.id}
                onClick={() => {
                  setSelectedSlot(slot);
                  setOpenModal(true);
                }}
                className="rounded-2xl py-4 font-medium transition-all duration-200 shadow-sm border bg-white border-gray-200 text-gray-700 hover:border-[#6BCF9D] hover:bg-[#EAFDFC]"
              >
                {slot.startTime} – {slot.endTime}
              </button>
            ))}
          </div>
        )}
      </div>

      <SlotDetailsModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        slot={selectedSlot}
        onConfirm={handleBooking}
        loading={bookingLoading}
      />
    </div>
  );
}