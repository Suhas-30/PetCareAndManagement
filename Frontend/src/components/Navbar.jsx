import { useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

export default function Navbar() {
  const navigate = useNavigate();
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo / Brand */}
        <h1 className="text-xl font-bold text-[#2FB7B2]">Smart Pet Care</h1>

        {/* Nav Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium text-[#2E2E2E]">
          <button className="hover:text-[#2FB7B2]">Home</button>
          <button className="hover:text-[#2FB7B2]">My Pets</button>
          <button className="hover:text-[#2FB7B2]">Vets</button>
          <button className="hover:text-[#2FB7B2]">Shop</button>
        </div>

        {/* Action */}
        <button
          title="Login"
        //   className="bg-[#FF9F43] text-white px-3 py-2 rounded-lg text-lg flex items-center justify-center hover:opacity-90 transition"
        className="bg-[#FF9F43] text-white p-2.5 rounded-full hover:scale-105 transition"

          onClick={() => navigate("/login")}
        >
          <FiLogIn />
        </button>
      </div>
    </nav>
  );
}
