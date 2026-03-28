import { useEffect, useState } from "react";
import AppAlert from "../../components/alrettab/AppAlert";
import { getPetNameAndIdApi } from "../service/petService";

export default function SlotDetailsModal({
  open,
  onClose,
  slot,
  onConfirm,
  loading,
}) {
  const [consultMode, setConsultMode] = useState("");
  const [selectedPet, setSelectedPet] = useState("");
  const [purpose, setPurpose] = useState("");
  const [alert, setAlert] = useState(null);
  const [pets, setPets] = useState([]);
  const [petLoading, setPetLoading] = useState(false);

  const consultationType = slot?.doctor?.consultationType;

  const fullAddress = [
    slot?.doctor?.address1,
    slot?.doctor?.address2,
    slot?.doctor?.area,
    slot?.doctor?.city,
  ]
    .filter(Boolean)
    .join(", ");

  /* ---------------- CONSULT MODE ---------------- */

  useEffect(() => {
    if (consultationType === "ONLINE" || consultationType === "OFFLINE") {
      setConsultMode(consultationType);
    } else if (consultationType === "BOTH") {
      setConsultMode("");
    }
  }, [consultationType]);

  /* ---------------- FETCH PETS ---------------- */

  useEffect(() => {
    if (!open) return;

    const fetchPets = async () => {
      try {
        setPetLoading(true);
        const res = await getPetNameAndIdApi();
        setPets(res.data || []);
      } catch (err) {
        setAlert({
          type: "error",
          message: "Failed to fetch pets. Please try again.",
        });
      } finally {
        setPetLoading(false);
      }
    };

    fetchPets();
  }, [open]);

  /* ---------------- ESC CLOSE ---------------- */

  useEffect(() => {
    const escClose = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", escClose);
    return () => window.removeEventListener("keydown", escClose);
  }, [onClose]);

  if (!open || !slot) return null;

  /* ---------------- CONFIRM ---------------- */

  const handleConfirm = async () => {
    if (!consultMode) {
      return setAlert({
        type: "warning",
        message: "Please select consultation mode.",
      });
    }

    if (!selectedPet) {
      return setAlert({
        type: "warning",
        message: "Please select your pet.",
      });
    }

    if (!purpose.trim()) {
      return setAlert({
        type: "warning",
        message: "Please enter purpose of visit.",
      });
    }

    onConfirm({
      slotId: slot.id,
      consultMode,
      petId: selectedPet,
      purpose,
    });
  };

  return (
    <>
      {alert && (
        <AppAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="fixed inset-0 z-50 bg-black/45 backdrop-blur-[5px] flex justify-center items-center px-4 py-5">

        {/* Modal */}
        <div className="w-full max-w-md bg-white rounded-[24px] shadow-[0_22px_55px_-18px_rgba(0,0,0,0.28)]
        relative overflow-hidden animate-[fadeIn_.18s_ease]">

          {/* Scroll Area */}
          <div className="max-h-[86vh] overflow-y-auto ultra-scroll">

            <div className="px-7 pt-7 pb-5">

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-3.5 right-3.5 w-7 h-7 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition"
              >
                ✕
              </button>

              {/* Title */}
              <h2 className="text-[20px] font-semibold text-[#2E2E2E] mb-5">
                Confirm Appointment
              </h2>

              {/* Slot Info */}
              <div className="space-y-3 border-b border-gray-100 pb-4 mb-4">
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Time</p>
                  <p className="text-[15px] font-semibold">
                    {slot.startTime} – {slot.endTime}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">Consulting Fee</p>
                  <p className="text-[15px] font-semibold">
                    ₹{slot.consultingFee}
                  </p>
                </div>

                {consultMode === "OFFLINE" && (
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Clinic Address</p>
                    <p className="text-[14px] leading-relaxed">{fullAddress}</p>
                  </div>
                )}
              </div>

              {/* Consultation Mode */}
              {consultationType === "BOTH" && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Consultation Mode</p>

                  <div className="grid grid-cols-2 gap-2.5">
                    {["ONLINE", "OFFLINE"].map((type) => (
                      <button
                        key={type}
                        onClick={() => setConsultMode(type)}
                        className={`py-2 rounded-lg text-[14px] font-medium border transition
                        ${
                          consultMode === type
                            ? "bg-[#2FB7B2] text-white border-[#2FB7B2]"
                            : "border-gray-200 text-gray-600 hover:border-[#2FB7B2] hover:bg-[#F1FEFD]"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Pet */}
              <div className="mb-4">
                <label className="text-sm text-gray-500 block mb-1.5">
                  Select Pet
                </label>

                <select
                  value={selectedPet}
                  onChange={(e) => setSelectedPet(e.target.value)}
                  disabled={petLoading}
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2 text-[14px]
                  focus:ring-2 focus:ring-[#2FB7B2] outline-none"
                >
                  <option value="">
                    {petLoading ? "Loading pets..." : "Select your pet"}
                  </option>

                  {pets.map((pet) => (
                    <option key={pet.petId} value={pet.petId}>
                      {pet.petName}
                    </option>
                  ))}
                </select>
              </div>

              {/* Purpose */}
              <div>
                <label className="text-sm text-gray-500 block mb-1.5">
                  Purpose of Visit
                </label>

                <textarea
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  rows={3}
                  placeholder="Describe reason for consultation..."
                  className="w-full border border-gray-200 rounded-lg px-3.5 py-2 text-[14px]
                  focus:ring-2 focus:ring-[#2FB7B2] outline-none resize-none"
                />
              </div>

            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-7 py-3.5 flex gap-2.5 bg-white">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 text-[14px] font-medium hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              onClick={handleConfirm}
              disabled={loading}
              className="flex-1 py-2 rounded-lg bg-[#FF9F43] text-white text-[14px] font-semibold
              shadow-sm hover:shadow-md active:scale-[0.98] transition disabled:opacity-60"
            >
              {loading ? "Processing..." : `Pay ₹${slot.consultingFee}`}
            </button>
          </div>

        </div>
      </div>
    </>
  );
}