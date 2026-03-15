import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { ChevronDown, Bell, ShoppingBag } from "lucide-react";
import { useDoctorStatus } from "../../context/DoctorStatusContext";
import { getCurrentUser } from "../../user/service/userService";
import { useAuth } from "../../context/AuthContext";
import { getAlerts } from "../services/alertApi";

export default function PublicNavbar() {
  const navigate = useNavigate();

  /* ---------- DROPDOWN STATES ---------- */
  const [openJoin, setOpenJoin] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);

  /* ---------- DATA STATES ---------- */
  const [currentUser, setCurrentUser] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const { doctorStatus, loading } = useDoctorStatus();
  const { user, logout } = useAuth();

  /* ---------- LOAD USER DETAILS ---------- */
  useEffect(() => {
    if (!user) return;

    const loadUser = async () => {
      try {
        const res = await getCurrentUser();
        setCurrentUser(res.data);
      } catch (e) {
        console.error(e);
      }
    };

    loadUser();
  }, [user]);

  /* ---------- LOAD ALERTS ---------- */
  const loadAlerts = async () => {
    try {
      const res = await getAlerts();

      const mapped = res.data.map((a, index) => ({
        id: a.referenceId ?? index,
        title: a.title,
        path: a.redirectUrl || "/user/dashboard",
      }));

      setNotifications(mapped);
    } catch (e) {
      console.error("Alert loading failed", e);
    }
  };

  /* Load alerts when login */
  useEffect(() => {
    if (user) loadAlerts();
  }, [user]);

  /* Reload alerts when dropdown opens */
  useEffect(() => {
    if (openNotifications && user) loadAlerts();
  }, [openNotifications]);

  /* ---------- LOGOUT ---------- */
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  /* ---------- JOIN NAVIGATION ---------- */
  const handleDoctorJoin = () => {
    setOpenJoin(false);

    if (!doctorStatus || doctorStatus === "REJECTED") {
      navigate("/doctor/register");
      return;
    }

    if (doctorStatus === "PENDING") {
      navigate("/doctor/application-success");
      return;
    }

    if (doctorStatus === "APPROVED") {
      navigate("/doctor/dashboard");
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* ---------- LOGO SECTION ---------- */}
        <h1
          className="text-xl font-bold text-[#2FB7B2] cursor-pointer"
          onClick={() => navigate("/")}
        >
          Smart Pet Care
        </h1>

        {/* ---------- NAV LINKS SECTION ---------- */}
        <div className="hidden md:flex gap-6 text-sm font-medium items-center">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => navigate("/pets")}>My Pets</button>
          <button>Vets</button>
          <button>Shop</button>

          {/* ---------- CART NAVIGATION ---------- */}
          <button
            onClick={() => navigate("/checkout/cart")}
            className="flex items-center gap-1 hover:text-[#2FB7B2]"
          >
            <ShoppingBag size={16} />
            Cart
          </button>

          {/* ---------- JOIN MENU ---------- */}
          <div className="relative">
            <button
              onClick={() => setOpenJoin(!openJoin)}
              className="flex items-center gap-1 hover:text-[#2FB7B2]"
            >
              Join <ChevronDown size={16} />
            </button>

            {openJoin && (
              <div className="absolute right-0 mt-2 w-52 bg-white border rounded-lg shadow-lg text-sm">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-[#F7F9FB]"
                  onClick={() => {
                    navigate("/job-openings");
                    setOpenJoin(false);
                  }}
                >
                  Careers
                </button>

                {loading ? (
                  <div className="px-4 py-2 text-gray-400">Loading...</div>
                ) : (
                  <button
                    onClick={handleDoctorJoin}
                    className="w-full text-left px-4 py-2 hover:bg-[#F7F9FB]"
                  >
                    Join as Doctor
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ---------- RIGHT SECTION (AUTH + NOTIFICATIONS) ---------- */}
        <div className="flex items-center">
          {/* ---------- NOTIFICATIONS ---------- */}
          <div className="relative mr-3">
            <button
              onClick={() => setOpenNotifications(!openNotifications)}
              className="relative p-2 rounded-full hover:bg-[#F7F9FB]"
            >
              <Bell size={20} />

              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] px-1.5 rounded-full">
                  {notifications.length}
                </span>
              )}
            </button>

            {openNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white border rounded-xl shadow-lg max-h-96 overflow-y-auto">
                <div className="p-3 font-semibold border-b">Notifications</div>

                {notifications.length === 0 ? (
                  <div className="p-4 text-gray-400 text-sm">
                    No notifications
                  </div>
                ) : (
                  notifications.map((n) => (
                    <button
                      key={n.id}
                      onClick={() => {
                        navigate(n.path);
                        setOpenNotifications(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-[#F7F9FB] text-sm"
                    >
                      {n.title}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* ---------- LOGIN / PROFILE ---------- */}
          {!user ? (
            <button
              className="bg-[#FF9F43] text-white p-2.5 rounded-full"
              onClick={() => navigate("/login")}
            >
              <FiLogIn />
            </button>
          ) : (
            <div className="relative">
              <button
                onClick={() => setOpenProfile(!openProfile)}
                className="w-9 h-9 rounded-full bg-[#2FB7B2] text-white font-semibold"
              >
                {currentUser?.fullName
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()}
              </button>

              {openProfile && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg text-sm">
                  <button
                    onClick={() => navigate("/user/profile")}
                    className="w-full text-left px-4 py-2 hover:bg-[#F7F9FB]"
                  >
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      if (loading) return;

                      if (doctorStatus === "APPROVED") {
                        navigate("/doctor/dashboard");
                      } else {
                        navigate("/user/dashboard");
                      }
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-[#F7F9FB]"
                  >
                    Dashboard
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-[#F7F9FB]"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
