import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import AppAlert from "../../components/alrettab/AppAlert";

export default function UserRegister() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showTerms, setShowTerms] = useState(false);

  const [loading, setLoading] = useState(false);

  // ✅ use same pattern like Login.jsx
  const [alertData, setAlertData] = useState(null);

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/auth/register", {
        email,
        password,
        fullName: name,
      });

      const userId = response.data.data.userId;
      sessionStorage.setItem("verifyUserId", userId);

      setAlertData({
        message: "Registration successful 🎉",
        type: "success",
      });

      setTimeout(() => {
        navigate("/verify-email");
      }, 1000);

    } catch (error) {
      console.error("Registration failed:", error.response?.data || error.message);

      setAlertData({
        message: error.response?.data?.message || "Registration failed. Try again.",
        type: "error",
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F9FB] px-4">

      {/* ✅ ALERT (only render when needed) */}
      {alertData && (
        <AppAlert
          message={alertData.message}
          type={alertData.type}
          onClose={() => setAlertData(null)}
        />
      )}

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 relative">

        <h2 className="text-2xl font-bold text-center text-[#2FB7B2] mb-2">
          Create Account 🐾
        </h2>

        <p className="text-center text-sm text-gray-500 mb-6">
          Start managing your pet care
        </p>

        <form onSubmit={handleRegister} className="space-y-4">

          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={loading}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]"
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]"
          />

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]"
          />

          {/* Terms */}
          <label className="flex items-start gap-2 text-xs text-gray-500">
            <input
              type="checkbox"
              required
              disabled={loading}
              className="mt-1 accent-[#2FB7B2]"
            />

            <span>
              I agree to the{" "}
              <span
                onClick={() => setShowTerms(true)}
                className="text-[#2FB7B2] font-semibold cursor-pointer hover:underline"
              >
                Terms & Conditions
              </span>{" "}
              and{" "}
              <span className="text-[#2FB7B2] font-semibold">
                Privacy Policy
              </span>
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-semibold transition
              ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#FF9F43] text-white hover:opacity-90"}
            `}
          >
            {loading ? "Processing..." : "Register"}
          </button>

        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#2FB7B2] font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>

        {/* TERMS POPUP */}
        {showTerms && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg rounded-xl shadow-lg p-6 relative">

              <button
                className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                onClick={() => setShowTerms(false)}
              >
                ✕
              </button>

              <h3 className="text-lg font-bold text-[#2FB7B2] mb-4">
                Terms & Conditions
              </h3>

              <div className="text-sm text-gray-600 space-y-3 max-h-80 overflow-y-auto pr-2">
                <p>By creating an account on Smart Pet Care, you agree to provide accurate information.</p>
                <p>You are responsible for maintaining your credentials.</p>
                <p>This platform does not replace professional veterinary advice.</p>
                <p>Misuse may result in account suspension.</p>
                <p>We may update these terms anytime.</p>
              </div>

              <button
                className="mt-5 w-full bg-[#2FB7B2] text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
                onClick={() => setShowTerms(false)}
              >
                I Understand
              </button>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}