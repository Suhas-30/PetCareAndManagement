import api from "../../api/axios"


export const getPendingDoctorApplications = async ()=>{
    const res = await api.get("/admin/doctor-applications/pending");
    console.log(res.data);
    return res.data.data;
}

export const approveDoctorApplication = async (id) => {
  return await api.put(`/admin/doctor-applications/${id}/approve`);
};


export const rejectDoctorApplication = async (id, reason) => {
  return await api.put(
    `/admin/doctor-applications/${id}/reject`,
    null,
    {
      params: { reason },
    }
  );
};