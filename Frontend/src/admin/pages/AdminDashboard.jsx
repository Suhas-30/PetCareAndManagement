import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#2E2E2E]">
        Admin Dashboard
      </h1>

      <p className="text-gray-500 mt-2">
        Manage doctor applications, users and platform activity.
      </p>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        <div
          onClick={() => navigate("/admin/add-product")}
          className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-lg font-semibold text-[#2E2E2E]">
            Add Product
          </h2>
          <p className="text-gray-500 mt-2">
            Add new products to marketplace.
          </p>
        </div>

        <div
          onClick={() => navigate("/admin/products")}
          className="cursor-pointer bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
        >
          <h2 className="text-lg font-semibold text-[#2E2E2E]">
            View Products
          </h2>
          <p className="text-gray-500 mt-2">
            Manage existing products.
          </p>
        </div>

      </div>
    </div>
  );
}