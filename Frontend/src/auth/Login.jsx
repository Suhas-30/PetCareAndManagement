import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { loginUser } from "./userAuth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* -------- LOGIN API -------- */
  const loginApi = async (payload) => {
    try {
      const response = await api.post("/auth/login", payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  /* -------- SUBMIT -------- */
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const data = await loginApi({ email, password });

      loginUser({
        token: data.data.token,
        role: data.data.role,
      });

      console.log(data.data.role);

      if (data.data.role === "DOCTOR") {
        navigate("/doctor/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  /* -------- GOOGLE LOGIN (UI only for now) -------- */
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // later → redirect to backend OAuth endpoint
    // window.location.href = "http://localhost:8080/oauth2/authorization/google";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F9FB] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-[#2FB7B2] mb-2">
          Welcome Back 🐾
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Login to continue
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]"
          />

          <button
            type="submit"
            className="w-full bg-[#FF9F43] text-white py-3
            rounded-lg font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="px-3 text-xs text-gray-400">OR</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 py-3 rounded-lg
          flex items-center justify-center gap-2
          hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-[#2FB7B2] font-semibold cursor-pointer hover:underline"
          >
            Create Account
          </span>
        </p>
      </div>
    </div>
  );
}
