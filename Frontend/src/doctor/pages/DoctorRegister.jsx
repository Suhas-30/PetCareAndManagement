import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import docImage from "../../assets/images/docreg.jpg";
import api from "../../api/axios";

export default function DoctorRegister() {

  const navigate = useNavigate();

  // doctor info
  const [licenseNumber, setLicenseNumber] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [certificateFile, setCertificateFile] = useState(null);

  // clinic info
  const [clinicName, setClinicName] = useState("");
  const [phone, setPhone] = useState("");
  const [clinicEmail, setClinicEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [area, setArea] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");

  // ✅ consultation type
  const [consultationType, setConsultationType] = useState("OFFLINE");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  // close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // API call
  const applyDoctorApplication = async (formValues) => {
    const formData = new FormData();

    Object.entries(formValues).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const res = await api.post("/doctor/apply", formData);
    return res.data;
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (experience === "" || Number(experience) < 0) {
      alert("Years of experience must be 0 or greater");
      return;
    }

    if (!certificateFile) {
      alert("Please upload certificate PDF");
      return;
    }

    try {
      await applyDoctorApplication({
        licenseNumber,
        specialization,
        yearsOfExperience: Number(experience),
        clinicName,
        phone,
        clinicEmail,
        address1,
        address2,
        area,
        city,
        state,
        pincode,
        consultationType,
        certificateFile,
      });

      navigate("/doctor/application-success");

    } catch (error) {
      console.error(error);
      alert(
        error?.response?.data?.message ||
        "Application submission failed"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F7F9FB] to-[#EEF3F7] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* LEFT PANEL */}
        <div className="bg-gradient-to-br from-[#2FB7B2] to-[#27a6a1] text-white p-12 flex flex-col justify-center">

          <div className="relative flex justify-center mb-10">
            <div className="absolute w-72 h-72 bg-white/20 blur-3xl rounded-full"></div>
            <div className="relative bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-2xl">
              <img src={docImage} alt="Veterinary Clinic" className="w-72 object-contain"/>
            </div>
          </div>

          <h1 className="text-3xl font-bold mb-4">
            Become a Verified Vet 🩺
          </h1>

          <p className="text-sm opacity-90">
            Join our trusted veterinary network and help pet owners access professional care easily.
          </p>
        </div>

        {/* RIGHT PANEL */}
        <div className="p-10 overflow-y-auto max-h-[90vh]">

          <h2 className="text-2xl font-semibold text-[#2FB7B2] mb-8">
            Doctor Application
          </h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <input className="form-input" placeholder="Vet License Number"
              value={licenseNumber}
              onChange={(e)=>setLicenseNumber(e.target.value)} required />

            <input className="form-input" placeholder="Specialization"
              value={specialization}
              onChange={(e)=>setSpecialization(e.target.value)} required />

            <input type="number" min="0"
              placeholder="Years of Experience"
              value={experience}
              onChange={(e)=>setExperience(e.target.value)}
              className="form-input" required />

            {/* ✅ Consultation Type */}
            <div className="relative md:col-span-2" ref={dropdownRef}>
              <p className="text-sm text-gray-500 mb-1">
                Consultation Type
              </p>

              <div
                onClick={()=>setDropdownOpen(!dropdownOpen)}
                className="form-input cursor-pointer flex justify-between"
              >
                {consultationType}
                <span className="text-gray-400">▼</span>
              </div>

              {dropdownOpen && (
                <div className="absolute z-10 w-full bg-white border rounded-lg shadow-md mt-1">
                  {["OFFLINE","ONLINE","BOTH"].map((type)=>(
                    <div
                      key={type}
                      onClick={()=>{
                        setConsultationType(type);
                        setDropdownOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {type}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <p className="text-sm text-gray-500 mb-1">
                Upload Veterinary Certificate (PDF)
              </p>
              <input type="file"
                accept="application/pdf"
                onChange={(e)=>setCertificateFile(e.target.files[0])}
                required
                className="form-input" />
            </div>

            <input className="form-input" placeholder="Clinic Name"
              value={clinicName}
              onChange={(e)=>setClinicName(e.target.value)} required />

            <input className="form-input" placeholder="Phone Number"
              value={phone}
              onChange={(e)=>setPhone(e.target.value)} required />

            <input className="form-input" placeholder="Clinic Email"
              value={clinicEmail}
              onChange={(e)=>setClinicEmail(e.target.value)} />

            <input className="form-input" placeholder="Address Line 1"
              value={address1}
              onChange={(e)=>setAddress1(e.target.value)} required />

            <input className="form-input" placeholder="Landmark"
              value={address2}
              onChange={(e)=>setAddress2(e.target.value)} />

            <input className="form-input" placeholder="Area"
              value={area}
              onChange={(e)=>setArea(e.target.value)} required />

            <input className="form-input" placeholder="City"
              value={city}
              onChange={(e)=>setCity(e.target.value)} required />

            <input className="form-input" placeholder="State"
              value={state}
              onChange={(e)=>setState(e.target.value)} required />

            <input className="form-input" placeholder="Pincode"
              value={pincode}
              onChange={(e)=>setPincode(e.target.value)} required />

            <div className="md:col-span-2 mt-6">
              <button
                type="submit"
                className="w-full bg-[#FF9F43] text-white py-3 rounded-xl font-semibold"
              >
                Apply as Doctor
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}