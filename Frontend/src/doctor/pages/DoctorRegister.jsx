import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

const DoctorRegister = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const doctorData = {
      name,
      email,
      password,
      licenseNumber,
    };

    console.log("Doctor Register Data:", doctorData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F9FB] px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-[#2FB7B2] flex items-center justify-center gap-2">
            Doctor Registration <span>🩺</span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Help pets live healthier lives
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]"
          />

          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]"
          />

          {/* Password with eye icon */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500 hover:text-[#2FB7B2]"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </span>
          </div>

          <input
            type="text"
            placeholder="Vet license number"
            value={licenseNumber}
            onChange={(e) => setLicenseNumber(e.target.value)}
            required
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]"
          />

          <button
            type="submit"
            className="w-full bg-[#FF9F43] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
            onClick={()=>{
              navigate("/verify-email")
            }}
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-[#2FB7B2] font-medium cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default DoctorRegister;
