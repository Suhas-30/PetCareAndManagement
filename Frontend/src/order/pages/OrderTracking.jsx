import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderTrackingApi, confirmDeliveryApi } from "../service/orderApi";
import AppAlert from "../../components/alrettab/AppAlert";

export default function OrderTracking() {
  const { id } = useParams();

  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetchTracking();
  }, []);

  const fetchTracking = async () => {
    try {
      setLoading(true);
      const res = await getOrderTrackingApi(id);
      setTracking(res.data);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- CONFIRM DELIVERY ---------- */
  const handleConfirmDelivery = async () => {
    try {
      setConfirmLoading(true);

      await confirmDeliveryApi(id);

      setShowConfirm(false);
      setShowAlert(true);

      fetchTracking();

    } finally {
      setConfirmLoading(false);
    }
  };

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F9FB]">
        <p className="text-lg font-medium animate-pulse">Loading tracking...</p>
      </div>
    );
  }

  if (!tracking) return null;

  /* ---------- TIMELINE ---------- */

  const steps = [
    { key: "PAID", label: "Order Confirmed", date: tracking.paidAt },
    { key: "SHIPPING", label: "Shipped", date: tracking.shippedAt },
    { key: "OUT_FOR_DELIVERY", label: "Out for Delivery", date: tracking.outForDeliveryAt },
    { key: "COMPLETED", label: "Delivered", date: tracking.completedAt }
  ];

  const getStepStatus = (stepKey) => {
    const orderFlow = ["PAID", "SHIPPING", "OUT_FOR_DELIVERY", "COMPLETED"];

    if (tracking.status === "COMPLETED") return "done";

    const currentIndex = orderFlow.indexOf(tracking.status);
    const stepIndex = orderFlow.indexOf(stepKey);

    if (stepIndex < currentIndex) return "done";
    if (stepIndex === currentIndex) return "active";
    return "pending";
  };

  return (
    <div className="bg-[#F7F9FB] min-h-screen py-10 px-4">

      {/* SUCCESS ALERT */}
      {showAlert && (
        <AppAlert
          message="Product received successfully"
          onClose={() => setShowAlert(false)}
        />
      )}

      {/* CONFIRM MODAL */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-[360px] shadow-2xl animate-scaleIn">

            <h2 className="text-lg font-semibold mb-4 text-[#2E2E2E]">
              Product received?
            </h2>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition"
              >
                No
              </button>

              <button
                onClick={handleConfirmDelivery}
                disabled={confirmLoading}
                className="px-4 py-2 bg-[#2FB7B2] text-white rounded-lg hover:bg-[#27a6a2] transition"
              >
                {confirmLoading ? "Confirming..." : "Yes"}
              </button>
            </div>

          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-[#2E2E2E]">
            Track Order
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Order ID: #{id.slice(0, 8).toUpperCase()}
          </p>
        </div>

        {/* STATUS CARD */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
          <p className="text-sm text-gray-500">Current Status</p>
          <p className="text-lg font-semibold text-[#2FB7B2] mt-1 tracking-wide">
            {tracking.status.replaceAll("_", " ")}
          </p>
        </div>

        {/* TIMELINE */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">

          <div className="relative">

            {/* LINE */}
            <div className="absolute top-5 left-5 w-[2px] h-full bg-gray-200" />

            <div className="space-y-10">

              {steps.map((step, index) => {
                const status = getStepStatus(step.key);

                return (
                  <div key={index} className="relative flex items-start gap-6 group">

                    {/* DOT */}
                    <div
                      className={`
                        w-11 h-11 rounded-full flex items-center justify-center text-white text-sm font-semibold
                        transition-all duration-500
                        ${status === "done" && "bg-[#2FB7B2] shadow-lg shadow-[#2FB7B2]/40 scale-105"}
                        ${status === "active" && "bg-[#FF9F43] animate-pulse"}
                        ${status === "pending" && "bg-gray-300"}
                      `}
                    >
                      {status === "done" ? "✓" : index + 1}
                    </div>

                    {/* CONTENT */}
                    <div className="transition-all duration-300 group-hover:translate-x-1">

                      <p className="font-semibold text-[#2E2E2E] text-[15px]">
                        {step.label}
                      </p>

                      {step.date ? (
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(step.date).toLocaleString()}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-400 mt-1">
                          Waiting...
                        </p>
                      )}

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

        </div>

        {/* CONFIRM BUTTON */}
        {tracking.status === "OUT_FOR_DELIVERY" && (
          <div className="mb-8 flex justify-center">
            <button
              onClick={() => setShowConfirm(true)}
              className="bg-[#2FB7B2] text-white px-7 py-3 rounded-xl hover:bg-[#27a6a2] transition shadow-md hover:shadow-lg"
            >
              Confirm Delivery
            </button>
          </div>
        )}

        {/* ITEMS */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <h2 className="font-semibold mb-4 text-[#2E2E2E]">
            Items in this order
          </h2>

          <div className="divide-y">
            {tracking.items?.map((item, index) => (
              <div key={index} className="flex justify-between py-4 text-sm">
                <p className="font-medium text-[#2E2E2E]">
                  {item.productName}
                </p>
                <p className="text-gray-600">
                  Qty: {item.quantity}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ANIMATION STYLE */}
      <style>
        {`
        .animate-scaleIn {
          animation: scaleIn .25s ease-out;
        }

        @keyframes scaleIn {
          from { opacity: 0; transform: scale(.9); }
          to { opacity: 1; transform: scale(1); }
        }
        `}
      </style>

    </div>
  );
}