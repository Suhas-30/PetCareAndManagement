import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UserRegister() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(name, email, password);
    navigate("/verify-email");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F9FB] px-4">
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]"
            required
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]"
            required
          />

          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]"
            required
          />

          {/* Terms checkbox */}
          <label className="flex items-start gap-2 text-xs text-gray-500">
            <input type="checkbox" required className="mt-1 accent-[#2FB7B2]" />
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
            className="w-full bg-[#FF9F43] text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Register
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

              {/* Close */}
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
                <p>
                  By creating an account on Smart Pet Care, you agree to provide
                  accurate and complete information.
                </p>
                <p>
                  You are responsible for maintaining the confidentiality of
                  your account credentials.
                </p>
                <p>
                  Smart Pet Care is intended for pet management purposes only
                  and does not replace professional veterinary advice.
                </p>
                <p>
                  Any misuse, abuse, or illegal activity may result in account
                  suspension or termination.
                </p>
                <p>
                  We reserve the right to update these terms at any time without
                  prior notice.
                </p>
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
