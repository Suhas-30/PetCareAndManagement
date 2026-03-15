import api from "../../api/axios";

/* GET ADDRESSES */
export const getAddressesApi = async () => {
  const res = await api.get("/user/address");
  return res.data;
};


/* SAVE ADDRESS*/
export const saveAddressApi = async (data) => {
  const res = await api.post("/user/address", data);
  return res.data;
};

/*UPDATE ADDRES */
export const updateAddressApi = async (id, data) => {
  const res = await api.put(`/user/address/${id}`, data);
  return res.data;
};

export const deleteAddressApi = async (id) => {
  await api.delete(`/user/address/${id}`);
};