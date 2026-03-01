import { useEffect, useState } from "react";
import { fetchDoctors } from "../service/doctorService";


export default function DoctorList() {

  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");
  const [consultationFilter, setConsultationFilter] = useState("ALL");

  // ✅ load doctors from backend
  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    try {
      const data = await fetchDoctors();
      setDoctors(data);
    } catch (err) {
      console.error("Failed to load doctors", err);
    } finally {
      setLoading(false);
    }
  };

  // filtering
  const filteredDoctors = doctors.filter((doc) => {
    const search = searchText.toLowerCase();

    const matchSearch =
      doc.fullName.toLowerCase().includes(search) ||
      doc.city.toLowerCase().includes(search);

    const matchConsultation =
      consultationFilter === "ALL" ||
      doc.consultationType === consultationFilter;

    return matchSearch && matchConsultation;
  });

  if (loading) {
    return <p className="text-center mt-10">Loading doctors...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6">
        Available Veterinarians
      </h2>

      {/* Filters */}
      <div className="bg-white shadow-md rounded-xl p-4 mb-8 flex flex-wrap gap-4 items-center">

        <input
          type="text"
          placeholder="Search by doctor name or city..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border rounded-lg px-4 py-2 flex-1 min-w-[200px]"
        />

        <select
          value={consultationFilter}
          onChange={(e) => setConsultationFilter(e.target.value)}
          className="border rounded-lg px-4 py-2"
        >
          <option value="ALL">All Consultations</option>
          <option value="ONLINE">Online</option>
          <option value="OFFLINE">Offline</option>
          <option value="BOTH">Both</option>
        </select>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.doctorId}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-teal-500 text-white flex items-center justify-center text-xl font-bold">
                {doctor.fullName.charAt(3)}
              </div>

              <div>
                <h3 className="font-semibold text-lg">
                  {doctor.fullName}
                </h3>
                <p className="text-sm text-gray-500">
                  {doctor.specialization}
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-2 text-sm text-gray-600">
              <p><b>Clinic:</b> {doctor.clinicName}</p>
              <p><b>Experience:</b> {doctor.experience} years</p>
              <p><b>City:</b> {doctor.city}</p>
              <p>
                <b>Consultation:</b>{" "}
                <span className="px-2 py-1 rounded-md bg-gray-100">
                  {doctor.consultationType}
                </span>
              </p>
            </div>

            <button className="mt-6 w-full bg-orange-400 text-white py-2 rounded-lg hover:opacity-90">
              View Availability
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}