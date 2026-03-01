import api from "../../api/axios";

/**
 * POST - save doctor availability
 * /doctor/availability
 */
export const saveAvailability = async (availabilityList) => {
  const response = await api.post(
    "/doctor/availability",
    availabilityList
  );
  return response.data;
};


/**
 * GET - logged-in doctor's availability
 * /doctor/availability
 */
export const getMyAvailability = async () => {
  const response = await api.get("/doctor/availability");
  return response.data;
};


/**
 * DELETE - remove slot
 * /doctor/availability/{slotId}
 */
export const deleteAvailabilitySlot = async (slotId) => {
  const response = await api.delete(
    `/doctor/availability/${slotId}`
  );
  return response.data;
};


/**
 * GET - availability for users (booking view)
 * /doctor/availability/{doctorId}
 */
export const getDoctorAvailability = async (doctorId) => {
  const response = await api.get(
    `/doctor/availability/${doctorId}`
  );
  return response.data;
};