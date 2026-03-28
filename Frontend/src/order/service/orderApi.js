import api from "../../api/axios";

/* ---------- CHECKOUT ---------- */
export const checkoutApi = async () => {
  const res = await api.post("/user/orders/checkout");
  return res.data;
};

/* ---------- MY ORDERS ---------- */
export const getMyOrdersApi = async () => {
  const res = await api.get("/user/order/my");
  return res.data;
};


/* ---------- ORDER TRACKING --------- */
export const getOrderTrackingApi = async (id) => {
  const res = await api.get(`/user/order/${id}/tracking`);
  return res.data;   // returns { data: {...tracking info...} }
};


/* ---------- CONFIRM DELIVERY ---------- */
export const confirmDeliveryApi = async (id) => {
  const res = await api.put(`/user/order/${id}/confirm-delivery`);
  return res.data;
};