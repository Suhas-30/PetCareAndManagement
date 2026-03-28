import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("OTP sent to:", email);
    navigate("/reset-password"); // move to OTP screen
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F9FB] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        
        <h2 className="text-2xl font-bold text-center text-[#2FB7B2] mb-2">
          Forgot Password
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Enter your email to receive an OTP
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]"
            required
          />

          <button
            type="submit"
            className="w-full bg-[#FF9F43] text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Send OTP
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Remembered your password?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-[#2FB7B2] font-semibold hover:underline"
          >
            Login
          </button>
        </p>

      </div>
    </div>
  );
}
