import { useState } from "react";
import {
  createPaymentOrderApi,
  verifyPaymentApi,
} from "../service/paymentService";
import OrderSummary from "../components/OrderSummary";
import { useNavigate, useLocation } from "react-router-dom";

export default function Payment() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const selectedItems = location.state?.items || [];
  const addressId = location.state?.addressId;

  const orderItems = selectedItems.map((item) => item.productId);

  /* ================= PAYMENT ================= */

  const handlePayment = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await createPaymentOrderApi({
        items: orderItems,
        addressId,
      });

      const order = res.data.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,

        handler: async function (response) {
          try {
            setLoading(true);

            await verifyPaymentApi({
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              items: orderItems,
              addressId,
            });

            navigate("/order-success", { state: { success: true } });
          } catch (e) {
            const msg =
              e?.response?.data?.message || "Payment verification failed";
            alert(msg);
          } finally {
            setLoading(false);
          }
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },

        theme: { color: "#2FB7B2" },
      };

      new window.Razorpay(options).open();
    } catch (e) {
      const msg = e?.response?.data?.message || "Payment failed";
      alert(msg);
      setLoading(false);
    }
  };

  /* ================= UI ================= */

  return (
    <div className="bg-[#F7F9FB] min-h-screen pt-12 px-4">

      {/* CENTER CONTAINER */}
      <div className="max-w-xl mx-auto">

        {/* ORDER SUMMARY */}
        <div className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <OrderSummary items={selectedItems} />
        </div>

        {/* PAY BUTTON BELOW */}
        <div className="mt-6 text-center">

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-[#2FB7B2] hover:bg-[#27a39f] active:scale-[0.98] disabled:opacity-60 text-white py-4 rounded-xl font-semibold shadow-sm hover:shadow-md transition flex items-center justify-center gap-3"
          >
            {loading && (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            )}
            {loading ? "Processing Payment..." : "Pay Now"}
          </button>

          <p className="text-xs text-gray-400 mt-3">
            Secure payment powered by Razorpay
          </p>

        </div>

      </div>

    </div>
  );
}