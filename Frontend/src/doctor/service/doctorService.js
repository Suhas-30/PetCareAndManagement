import api from "../../api/axios";
export const getDoctorApplicationStatus = async () => {
  console.log("Doctor status is feacthing...")
  const res = await api.get("/doctor/application/status");
  console.log(res.data);
  return res.data;
};

export const withdrawDoctorApplication = async () => {
  const res = await api.put("/doctor/application/withdraw");
  return res.data;
};