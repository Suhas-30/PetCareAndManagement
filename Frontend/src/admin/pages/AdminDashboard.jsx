import { useNavigate } from "react-router-dom";

const cards = [
  {
    title: "Add Product",
    desc: "Add new products to marketplace",
    path: "/admin/add-product",
  },
  {
    title: "View Products",
    desc: "Manage existing products",
    path: "/admin/products",
  },
  {
    title: "Orders",
    desc: "Track and manage orders",
    path: "/admin/orders",
  },
  {
    title: "Doctor Applications",
    desc: "Approve or reject doctors",
    path: "/admin/doctor-applications",
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-[#2E2E2E]">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-2">
          Manage platform activities, users, and products
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => navigate(card.path)}
            className="cursor-pointer bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-[#2E2E2E]">
              {card.title}
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}