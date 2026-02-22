import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

const DoctorRegister = () => {
  const navigate = useNavigate();

  const [licenseNumber, setLicenseNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [experience, setExperience] = useState("");

  const applyDoctorApi = async (payload) => {
    try {
      const response = await api.post("/doctor/apply", payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await applyDoctorApi({
        licenseNumber,
        specialization,
        documentUrl,
        yearsOfExperience: Number(experience),
      });

      sessionStorage.setItem("doctorApplied", "true");
      navigate("/doctor/application-success");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F9FB] to-[#EEF3F7] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="bg-gradient-to-br from-[#2FB7B2] to-[#27a6a1] text-white p-12 flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4">
            Become a Verified Vet 🩺
          </h1>

          <p className="text-sm opacity-90 leading-relaxed">
            Submit your credentials and get verified to help pet owners
            connect with trusted veterinary professionals.
          </p>

          <div className="mt-8 space-y-2 text-sm opacity-90">
            <p>✔ Verified professional badge</p>
            <p>✔ Reach pet owners instantly</p>
            <p>✔ Manage consultations easily</p>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-10">
          <h2 className="text-2xl font-semibold text-[#2FB7B2] mb-8">
            Doctor Application
          </h2>

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5"
          >

            <input
              type="text"
              placeholder="Vet License Number"
              value={licenseNumber}
              onChange={(e)=>setLicenseNumber(e.target.value)}
              required
              className="form-input"
            />

            <input
              type="text"
              placeholder="Specialization"
              value={specialization}
              onChange={(e)=>setSpecialization(e.target.value)}
              required
              className="form-input"
            />

            <input
              type="text"
              placeholder="Document URL"
              value={documentUrl}
              onChange={(e)=>setDocumentUrl(e.target.value)}
              required
              className="form-input"
            />

            <input
              type="number"
              placeholder="Years of Experience"
              value={experience}
              onChange={(e)=>setExperience(e.target.value)}
              required
              min="0"
              className="form-input"
            />

            {/* BUTTON FULL WIDTH */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-[#FF9F43] text-white py-3 rounded-xl
                font-semibold shadow-md hover:shadow-lg
                hover:scale-[1.01] active:scale-[0.98]
                transition-all duration-200"
              >
                Apply as Doctor
              </button>
            </div>

          </form>
        </div>

      </div>
    </div>
  );
};

export default DoctorRegister;
