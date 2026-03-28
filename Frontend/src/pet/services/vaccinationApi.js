import api from "../../api/axios";

/* -------- GET -------- */
export const getVaccinations = async (petId) => {
  const res = await api.get(`/pets/${petId}/vaccinations`);
  return res.data;
};

/* -------- CREATE -------- */
export const createVaccination = async (petId, data) => {
  const res = await api.post(`/pets/${petId}/vaccinations`, data);
  return res.data;
};

/* -------- UPDATE -------- */
export const updateVaccination = async (id, data) => {
  const res = await api.put(`/vaccinations/${id}`, data);
  return res.data;
};

/* -------- DELETE -------- */
export const deleteVaccination = async (id) => {
  await api.delete(`/vaccinations/${id}`);
};