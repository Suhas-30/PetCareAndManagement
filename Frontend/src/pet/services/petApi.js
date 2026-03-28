import api from "../../api/axios";

export const createPet = async (formData) => {
  return await api.post("/pets", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getPetCount = async () => {
  const res = await api.get("/pets/count");
  return res.data;
};

export const getMyPets = async () => {
  const res = await api.get("/pets");
  return res.data;
};

/* ✅ DELETE PET */
export const deletePet = async (petId) => {
  return await api.delete(`/pets/${petId}`);
};