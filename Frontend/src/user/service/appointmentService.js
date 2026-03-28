import api from "../../api/axios";

/* ================================
   GET DOCTOR AVAILABLE SLOTS
================================ */

export const getDoctorAvailableSlots = (doctorId, date) => {
  const res = api.get(`/user/appointments/${doctorId}/slots/${date}`);
  // console.log(res)
  return res;
};

export const createAppointmentApi = (data) => {
  return api.post("/user/appointments/create", data);
};

/* ================================
   BOOK APPOINTMENT
================================ */

export const bookAppointment = (slotId) => {
  return api.post(
    `/public/doctors`,
    null,
    {
      params: { slotId }
    }
  );
};


/* ================================
   GET MY APPOINTMENTS
================================ */

export const getMyAppointments = async () => {
  const res = await api.get("/user/appointments/my");

  console.log("FULL RESPONSE:", res);
  console.log("DATA:", res.data);

  return res;
};


export const verifyPaymentApi = (data) => {
  return api.post("/user/payment/verify", data);
};


/* ================================
   GET PRESCRIPTION BY APPOINTMENT
================================ */

export const getPrescriptionByAppointment = (appointmentId) => {
  return api.get(`/doctor/prescription/${appointmentId}`);
};

/* ================================
   GET MEETING LINK (USER SIDE)
================================ */

export const getMeetingLinkByAppointment = (appointmentId) => {
  return api.get(`/doctor/meeting-link/${appointmentId}`);
};