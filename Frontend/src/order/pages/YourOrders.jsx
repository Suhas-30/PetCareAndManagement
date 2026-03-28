import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getMyOrdersApi } from "../service/orderApi";

export default function YourOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await getMyOrdersApi();
        setOrders(res.data || []);
      } catch (e) {
        alert("Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div className="bg-[#F7F9FB] min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium">Loading orders...</p>
      </div>
    );
  }

  /* ---------- EMPTY ---------- */
  if (!orders.length) {
    return (
      <div className="bg-[#F7F9FB] min-h-screen flex flex-col items-center justify-center text-center px-6">
        <h2 className="text-2xl font-semibold mb-2">No Orders Yet</h2>

        <p className="text-gray-500 mb-6 max-w-md">
          Start shopping and your orders will appear here.
        </p>

        <button
          onClick={() => navigate("/products")}
          className="bg-[#2FB7B2] text-white px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition"
        >
          Browse Products
        </button>
      </div>
    );
  }

  /* ---------- UI ---------- */
  return (
    <div className="bg-[#F7F9FB] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6">

        <h1 className="text-2xl font-semibold mb-8">Your Orders</h1>

        <div className="space-y-5">
          {orders.map((order) => {

            const items = order.orderItems || [];

            /* summary format */
            const summary =
              items.length > 2
                ? `${items[0]?.productName}, ${items[1]?.productName} +${
                    items.length - 2
                  } more`
                : items.map((i) => i.productName).join(", ");

            return (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-5 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center">

                  {/* LEFT */}
                  <div>
                    <p className="font-semibold text-[#2E2E2E]">
                      Order #{order.id.slice(0, 8).toUpperCase()}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>

                    <p className="text-sm text-gray-600 mt-2">
                      {summary}
                    </p>
                  </div>

                  {/* RIGHT */}
                  <div className="text-right">

                    <p className="font-semibold text-lg">
                      ₹{order.totalAmount}
                    </p>

                    <p className="text-xs font-medium text-[#2FB7B2] mt-1">
                      {order.status}
                    </p>

                    <button
                      onClick={() => navigate(`/account/orders/${order.id}`)}
                      className="mt-2 text-sm font-medium text-[#2FB7B2] hover:underline"
                    >
                      View Tracking
                    </button>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}