import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(email, password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F9FB] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-[#2FB7B2] mb-2">
          Welcome Back 🐾
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Login to manage your pet care
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]"
            required
          />

          <div className="text-right">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-xs text-[#2FB7B2] hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF9F43] text-white py-2 rounded-lg font-semibold hover:opacity-90 transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-5">
          <div className="flex-grow h-px bg-gray-200" />
          <span className="px-3 text-xs text-gray-400">OR</span>
          <div className="flex-grow h-px bg-gray-200" />
        </div>

        {/* Google Sign In */}
        <button
          type="button"
          className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 text-sm hover:bg-gray-50 transition"
          onClick={() => console.log("Google login")}
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        {/* Register */}
        <p className="text-center text-sm text-gray-500 mt-6">
          New user?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-[#2FB7B2] font-semibold hover:underline"
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}
