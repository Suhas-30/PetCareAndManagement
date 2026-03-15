import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAdminOrdersApi } from "../services/adminOrderService";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await getAllAdminOrdersApi();
      setOrders(res.data || []);

    } catch (e) {
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- LOADING ---------- */
  if (loading) {
    return (
      <div className="p-10">
        <p>Loading orders...</p>
      </div>
    );
  }

  /* ---------- EMPTY ---------- */
  if (!orders.length) {
    return (
      <div className="p-10">
        <p>No orders found</p>
      </div>
    );
  }

  /* ---------- UI ---------- */
  return (
    <div className="p-10 bg-[#F7F9FB] min-h-screen">

      <h1 className="text-2xl font-semibold mb-8">Orders</h1>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

        <table className="w-full text-sm">

          <thead className="bg-gray-50 border-b">
            <tr className="text-left">
              <th className="p-4">Order ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr
                key={o.id}
                onClick={() => navigate(`/admin/orders/${o.id}`)}
                className="border-b cursor-pointer hover:bg-gray-50 transition"
              >

                <td className="p-4 font-medium">
                  {o.id.slice(0, 8).toUpperCase()}
                </td>

                <td>{o.userId}</td>

                <td>
                  {new Date(o.createdAt).toLocaleDateString()}
                </td>

                <td>₹{o.totalAmount}</td>

                <td className="text-[#2FB7B2] font-medium">
                  {o.status}
                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

    </div>
  );
}