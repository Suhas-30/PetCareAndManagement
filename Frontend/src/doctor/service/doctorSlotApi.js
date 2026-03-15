import api from "../../api/axios"



/* ================================
   CREATE SLOT
================================ */

export const createSlot = (payload) => {
  return api.post("/doctor/slots", payload);
};

/* ================================
   GET SLOTS BY DATE
================================ */

export const getSlotsByDate = (date) => {
  return api.get(`/doctor/slots/${date}`);
};

/* ================================
   DELETE SLOT
================================ */

export const deleteSlot = (slotId) => {
  return api.delete(`/doctor/slots/${slotId}`);
};


/* ================================
   SAVE / UPDATE PRESCRIPTION
================================ */

export const savePrescription = (payload) => {
  return api.post("/doctor/prescription", payload);
};


/* ================================
   GET PRESCRIPTION BY APPOINTMENT
================================ */

export const getPrescriptionByAppointment = (appointmentId) => {
  return api.get(`/doctor/prescription/${appointmentId}`);
};

export const activateSlot = (slotId) =>
  api.patch(`/doctor/slots/${slotId}/activate`);