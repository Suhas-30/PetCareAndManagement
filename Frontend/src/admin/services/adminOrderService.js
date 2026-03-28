import api from "../../api/axios";



/* ---------- GET ALL ORDERS ---------- */
export const getAllAdminOrdersApi = async () => {
  const res = await api.get("/admin/orders");
  return res.data;   // returns { data: [...] }
};

/* ---------- GET ORDER BY ID ---------- */
export const getAdminOrderByIdApi = async (id) => {
  const res = await api.get(`/admin/orders/${id}`);
  return res.data;   // returns { data: {...} }
};


/* -------- UPDATE ORDER STATUS ------*/
export const updateAdminOrderStatusApi = async (id, data) => {
  const res = await api.put(`/admin/orders/${id}/status`, data);
  return res.data;   // returns { message: "Status updated" }
};

/* -------- GET NEXT ORDER STATUS ------*/
export const getNextAdminOrderStatusApi = async (id) => {
  const res = await api.get(`/admin/orders/${id}/next-status`);
  return res.data;   // returns { data: "SHIPPING" } OR { data: null }
};

