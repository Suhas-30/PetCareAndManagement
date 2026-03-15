import { Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-[#F7F9FB]">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5">
        <h2 className="text-xl font-bold text-[#2FB7B2] mb-6">
          Admin Panel
        </h2>

        <nav className="flex flex-col gap-3 text-sm">

          <button
            className="text-left hover:text-[#2FB7B2]"
            onClick={() => navigate("/admin/dashboard")}
          >
            Dashboard
          </button>

          <button
            className="text-left hover:text-[#2FB7B2]"
            onClick={() => navigate("/admin/doctor-applications")}
          >
            Doctor Applications
          </button>

          <button
            className="text-left hover:text-[#2FB7B2]"
            onClick={() => navigate("/admin/orders")}
          >
            Orders
          </button>

          <button className="text-left hover:text-[#2FB7B2]">
            Users
          </button>

        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

    </div>
  );
}