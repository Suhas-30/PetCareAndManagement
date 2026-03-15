import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAdminOrderByIdApi,
  updateAdminOrderStatusApi,
  getNextAdminOrderStatusApi
} from "../services/adminOrderService";

export default function AdminOrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [nextStatus, setNextStatus] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOrder();
    fetchNextStatus();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await getAdminOrderByIdApi(id);
      setOrder(res.data);
    } catch (e) {
      setError("Failed to load order");
    }
  };

  const fetchNextStatus = async () => {
    try {
      const res = await getNextAdminOrderStatusApi(id);
      setNextStatus(res.data);
    } catch (e) {
      console.log("next status error", e);
    }
  };

  /* ---------- UPDATE STATUS ---------- */
  const handleStatusUpdate = async () => {
    try {
      setLoadingStatus(true);
      setError(null);

      await updateAdminOrderStatusApi(id, { status: nextStatus });

      await fetchOrder();
      await fetchNextStatus();

    } catch (e) {
      setError("Failed to update status");
    } finally {
      setLoadingStatus(false);
    }
  };

  if (!order) return <div className="p-10">Loading...</div>;

  const isCompleted = order.status === "COMPLETED";
  const isOutForDelivery = order.status === "OUT_FOR_DELIVERY";

  const completedDate = order.updatedAt
    ? new Date(order.updatedAt).toLocaleString()
    : null;

  return (
    <div className="p-10 bg-[#F7F9FB] min-h-screen">

      {/* HEADER */}
      <h1 className="text-2xl font-semibold mb-6">
        Order #{order.orderId.slice(0, 8)}
      </h1>

      {/* ERROR UI */}
      {error && (
        <div className="mb-4 bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* MAIN CARD */}
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 space-y-8">

        {/* TOP GRID */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* ORDER INFO */}
          <div className="bg-[#F7F9FB] rounded-xl p-5 border">
            <h2 className="font-semibold mb-4 text-gray-700">Order Info</h2>

            <div className="space-y-2 text-sm">
              <p>
                Status:
                <span className="ml-2 px-2 py-1 rounded bg-[#2FB7B2]/10 text-[#2FB7B2] font-medium">
                  {order.status}
                </span>
              </p>

              <p>Total: <b>₹{order.totalAmount}</b></p>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
            </div>

            {/* STATUS UI */}
            <div className="mt-4">

              {/* COMPLETED */}
              {isCompleted && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 w-fit">
                  <p className="text-sm font-semibold text-green-700">
                    Order Completed
                  </p>

                  {completedDate && (
                    <p className="text-xs text-green-600 mt-1">
                      Completed on: {completedDate}
                    </p>
                  )}
                </div>
              )}

              {/* OUT FOR DELIVERY (LOCKED UI) */}
              {isOutForDelivery && (
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 w-fit">
                  <p className="text-sm font-semibold text-blue-700">
                    Out for Delivery
                  </p>
                  <p className="text-xs text-blue-600 mt-1">
                    Waiting for customer confirmation
                  </p>
                </div>
              )}

              {/* NORMAL FLOW BUTTON (ONLY PAID → SHIPPING) */}
              {!isCompleted && !isOutForDelivery && nextStatus && (
                <button
                  onClick={handleStatusUpdate}
                  disabled={loadingStatus}
                  className="px-4 py-2 text-sm bg-[#2FB7B2] text-white rounded-lg hover:bg-[#27a6a2] disabled:opacity-60"
                >
                  {loadingStatus
                    ? "Updating..."
                    : `Mark as ${nextStatus.replaceAll("_", " ")}`}
                </button>
              )}

            </div>
          </div>

          {/* CUSTOMER INFO */}
          <div className="bg-[#F7F9FB] rounded-xl p-5 border">
            <h2 className="font-semibold mb-4 text-gray-700">Customer Info</h2>

            <div className="space-y-2 text-sm">
              <p><b>{order.userName}</b></p>
              <p className="text-gray-600">{order.email}</p>
              <p className="text-gray-600">{order.phone}</p>
            </div>
          </div>

          {/* ADDRESS */}
          <div className="bg-[#F7F9FB] rounded-xl p-5 border">
            <h2 className="font-semibold mb-4 text-gray-700">
              Delivery Address
            </h2>

            <div className="text-sm text-gray-700 leading-relaxed">
              <p>{order.addressLine}</p>
              <p>{order.city} - {order.pincode}</p>
            </div>
          </div>
        </div>

        {/* PRODUCTS */}
        <div>
          <h2 className="font-semibold mb-4 text-gray-700">Products</h2>

          <div className="border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="text-left">
                  <th className="p-4">Product</th>
                  <th className="p-4 text-center">Qty</th>
                  <th className="p-4 text-center">Price</th>
                  <th className="p-4 text-center">Total</th>
                </tr>
              </thead>

              <tbody>
                {order.items?.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-4 font-medium">{item.productName}</td>
                    <td className="text-center">{item.quantity}</td>
                    <td className="text-center">₹{item.price}</td>
                    <td className="text-center font-medium">₹{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}