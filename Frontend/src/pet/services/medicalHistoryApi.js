import api from "../../api/axios";

/* ---------------- MAPPER ---------------- */

// backend → frontend
const mapFromBackend = (item) => ({
  id: item.id,
  type: item.type,
  title: item.title,
  description: item.description,
  date: item.treatedDate, // ✅ convert name
});

// frontend → backend
const mapToBackend = (data) => ({
  type: data.type,
  title: data.title,
  description: data.description,
  treatedDate: data.date, // ✅ convert name
});

/* ---------------- GET ---------------- */

export const getMedicalHistory = async (petId) => {
  const res = await api.get(`/pets/${petId}/medical-history`);

  return res.data.map(mapFromBackend);
};

/* ---------------- CREATE ---------------- */

export const createMedicalHistory = async (petId, data) => {
  const res = await api.post(
    `/pets/${petId}/medical-history`,
    mapToBackend(data)
  );

  return mapFromBackend(res.data);
};

/* ---------------- UPDATE ---------------- */

export const updateMedicalHistory = async (id, data) => {
  const res = await api.put(
    `/medical-history/${id}`,
    mapToBackend(data)
  );

  return mapFromBackend(res.data);
};

/* ---------------- DELETE ---------------- */

export const deleteMedicalHistory = async (id) => {
  await api.delete(`/medical-history/${id}`);
};