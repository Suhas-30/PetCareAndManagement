import { useEffect, useState } from "react";
import { getPendingDoctorApplications } from "../services/adminDoctorService";
import DoctorApplicationModal from "./DoctorApplicationModal";

export default function DoctorApplications() {

  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [actionType, setActionType] = useState(null);

  const loadApplications = async () => {
    const data = await getPendingDoctorApplications();
    setApplications(data);
  };

  useEffect(() => {
    loadApplications();
  }, []);

  return (
    <div className="p-6">

      <h2 className="text-2xl font-semibold mb-6">
        Doctor Applications
      </h2>

      <div className="bg-white rounded-xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-[#F7F9FB]">
            <tr>
              <th className="p-4">Doctor</th>
              <th className="p-4">Specialization</th>
              <th className="p-4">Experience</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.map(app => (
              <tr key={app.id} className="border-t">
                <td className="p-4">{app.fullName}</td>
                <td className="p-4">{app.specialization}</td>
                <td className="p-4">{app.yearsOfExperience} yrs</td>

                <td className="p-4 flex gap-2">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={()=>{
                      setSelectedApplication(app);
                      setActionType("approve");
                    }}
                  >
                    Approve
                  </button>

                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={()=>{
                      setSelectedApplication(app);
                      setActionType("reject");
                    }}
                  >
                    Reject
                  </button>

                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                    onClick={()=>setSelectedApplication(app)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <DoctorApplicationModal
        application={selectedApplication}
        actionType={actionType}
        onClose={()=>{
          setSelectedApplication(null);
          setActionType(null);
          loadApplications(); // ✅ reload from DB
        }}
      />
    </div>
  );
}