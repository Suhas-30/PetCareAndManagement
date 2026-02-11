import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { ChevronDown } from "lucide-react";

export default function PublicNavbar() {
  const navigate = useNavigate();
  const [openJoin, setOpenJoin] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <h1
          className="text-xl font-bold text-[#2FB7B2] cursor-pointer"
          onClick={() => navigate("/")}
        >
          Smart Pet Care
        </h1>

        {/* Nav Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-[#2E2E2E] items-center">
          <button className="hover:text-[#2FB7B2]">Home</button>
          <button className="hover:text-[#2FB7B2]">My Pets</button>
          <button className="hover:text-[#2FB7B2]">Vets</button>
          <button className="hover:text-[#2FB7B2]">Shop</button>

          {/* Join Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpenJoin(!openJoin)}
              className="flex items-center gap-1 hover:text-[#2FB7B2]"
            >
              Join <ChevronDown size={16} />
            </button>

            {openJoin && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded-lg shadow-lg text-sm">
                <button
                  className="w-full text-left px-4 py-2 hover:bg-[#F7F9FB]"
                  onClick={() => {
                    navigate("/job-openings");
                  }}
                >
                  Careers
                </button>

                <button
                  onClick={() => {
                    navigate("/doctor/register");
                    setOpenJoin(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-[#F7F9FB]"
                >
                  Join as Doctor
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Login */}
        <button
          title="Login"
          className="bg-[#FF9F43] text-white p-2.5 rounded-full hover:scale-105 transition"
          onClick={() => navigate("/login")}
        >
          <FiLogIn />
        </button>
      </div>
    </nav>
  );
}
