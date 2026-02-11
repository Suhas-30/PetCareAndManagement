import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const [otp, setOtp] = useState(["", "", "", "", ""]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const inputsRef = useRef([]);
  const navigate = useNavigate();

  const handleOtpChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 4) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");
    console.log("OTP:", finalOtp, "New Password:", password);
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F9FB] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-2xl font-bold text-center text-[#2FB7B2] mb-2">
          Verify OTP
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Enter OTP and set a new password
        </p>

        <form onSubmit={handleReset} className="space-y-6">

          {/* OTP Boxes */}
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleOtpChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]"
                required
              />
            ))}
          </div>

          {/* Password with Show/Hide */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#2FB7B2] font-semibold cursor-pointer select-none"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF9F43] text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Reset Password
          </button>

        </form>

      </div>
    </div>
  );
}
