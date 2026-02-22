import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function VerifyEmail() {
  const navigate = useNavigate();

  // 6 digit OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);

  const inputsRef = useRef([]);

  // get userId saved after registration
  const userId = sessionStorage.getItem("verifyUserId");

  /* ---------------- PAGE GUARD ---------------- */
  useEffect(() => {
    if (!userId) {
      navigate("/register");
    }
  }, [userId, navigate]);

  /* ---------------- TIMER ---------------- */
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  /* ---------------- OTP INPUT HANDLING ---------------- */
  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  /* ---------------- VERIFY OTP API ---------------- */
  const verifyOtpApi = async (payload) => {
    try {
      const response = await api.post("/auth/verify-otp", {
        userId: payload.userId,
        otp: payload.otp,
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  /* ---------------- RESEND OTP API ---------------- */
  const resendOtpApi = async (payload) => {
    try {
      const response = await api.post("/auth/resend-otp", {
        userId: payload.userId,
      });

      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");

    try {
      await verifyOtpApi({
        userId: userId,
        otp: finalOtp,
      });

      // cleanup after success
      sessionStorage.removeItem("verifyUserId");

      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  /* ---------------- RESEND ---------------- */
  const handleResendOtp = async () => {
    try {
      await resendOtpApi({
        userId: userId,
      });

      setTimer(60);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F9FB] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        <h2 className="text-2xl font-bold text-center text-[#2FB7B2] mb-2">
          Verify Your Email
        </h2>

        <p className="text-center text-sm text-gray-500 mb-6">
          Enter the 6-digit OTP sent to your email
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength="1"
                value={digit}
                ref={(el) => (inputsRef.current[index] = el)}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center text-lg font-semibold border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF9F43] text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Verify Email
          </button>
        </form>

        <p className="text-center text-xs text-gray-500 mt-4">
          Didn’t receive OTP?{" "}
          {timer > 0 ? (
            <span className="text-gray-400">Resend in {timer}s</span>
          ) : (
            <span
              onClick={handleResendOtp}
              className="text-[#2FB7B2] font-semibold cursor-pointer hover:underline"
            >
              Resend
            </span>
          )}
        </p>

      </div>
    </div>
  );
}
