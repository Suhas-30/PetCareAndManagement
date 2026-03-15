


import api from "../../api/axios";

/**
 * SAVE DOCTOR DAILY SCHEDULE
 * POST /doctor/schedule
 */
export const saveDoctorSchedule = async ({
  date,
  sessions,
  isWorking = true,
}) => {

  const payload = {
    date,
    isWorking,
    sessions: sessions.map(s => ({
      startTime: s.startTime,
      endTime: s.endTime,
    })),
  };

  const response = await api.post(
    "/doctor/schedule",
    payload
  );

  return response.data;
};


export const getScheduleByDate = async (date) => {
  const response = await api.get(`/doctor/schedule/${date}`);
  return response.data;
};

/**
 * GET UPCOMING APPOINTMENTS (DOCTOR DASHBOARD)
 * GET /doctor/upcoming-appointments
 */
export const getUpcomingAppointments = async () => {
  const response = await api.get("/doctor/upcoming-appointments");
  return response.data;
};