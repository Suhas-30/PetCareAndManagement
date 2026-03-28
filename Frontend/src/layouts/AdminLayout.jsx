import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { name: "Dashboard", path: "/admin/dashboard" },
  { name: "Doctor Applications", path: "/admin/doctor-applications" },
  { name: "Products", path: "/admin/products" },
  { name: "Add Product", path: "/admin/add-product" },
  { name: "Orders", path: "/admin/orders" },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login"); // change if your login route is different
  };

  return (
    <div className="flex min-h-screen bg-[#F7F9FB]">

      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6 flex flex-col">
        
        {/* Clickable Title */}
        <h2
          onClick={() => navigate("/admin/dashboard")}
          className="text-2xl font-bold text-[#2FB7B2] mb-8 cursor-pointer hover:opacity-80 transition"
        >
          Admin Panel
        </h2>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.path);

            return (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`text-left px-3 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-[#2FB7B2] text-white"
                    : "text-[#2E2E2E] hover:bg-gray-100"
                }`}
              >
                {item.name}
              </button>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="mt-auto pt-6 border-t">
          <button
            onClick={handleLogout}
            className="w-full text-left text-red-500 hover:text-red-600"
          >
            Logout
          </button>
        </div>

      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>

    </div>
  );
}