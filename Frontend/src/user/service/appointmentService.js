import api from "../../api/axios";

export const getDoctorSlots = async (doctorId) => {
  const res = await api.get(`/doctor/availability/${doctorId}`);
  return res.data.data;
};

export const bookAppointment = async (slotId) => {
  await api.post("/appointments/book", {
    slotId,
  });
};