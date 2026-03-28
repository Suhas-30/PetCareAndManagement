import api
 from "../../api/axios";

/* -------- GET USER ALERTS -------- */
export const getAlerts = () => {
  return api.get("/alerts");
};