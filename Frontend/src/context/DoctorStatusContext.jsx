import { createContext, useContext, useEffect, useState } from "react";
import { getDoctorApplicationStatus } from "../doctor/service/doctorService";

const DoctorStatusContext = createContext();

export const DoctorStatusProvider = ({ children }) => {
  const [doctorStatus, setDoctorStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDoctorStatus = async () => {
    const session = localStorage.getItem("userSession");
    if (!session) {
      setDoctorStatus(null);
      setLoading(false);
      return;
    }

    try {
      const res = await getDoctorApplicationStatus();

      // ✅ IMPORTANT FIX
      setDoctorStatus(res.data.status);
    } catch {
      setDoctorStatus(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (doctorStatus !== undefined) return;
    fetchDoctorStatus();
  }, []);

  return (
    <DoctorStatusContext.Provider
      value={{
        doctorStatus,
        setDoctorStatus,
        fetchDoctorStatus,
        loading,
      }}
    >
      {children}
    </DoctorStatusContext.Provider>
  );
};

export const useDoctorStatus = () => {
  const context = useContext(DoctorStatusContext);
  if (!context) {
    throw new Error("useDoctorStatus must be used inside DoctorStatusProvider");
  }
  return context;
};
