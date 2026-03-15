import api from "../../api/axios";

/* ---------- CREATE ORDER ---------- */
export const createPaymentOrderApi = async (data) => {
  return api.post("/user/order/create", data);
};

/* ---------- VERIFY PAYMENT ---------- */
export const verifyPaymentApi = async (data) => {
  return api.post("/user/order/verify", data);
};