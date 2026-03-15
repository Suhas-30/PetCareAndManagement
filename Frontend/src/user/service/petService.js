import api from "../../api/axios";

export const getPetNameAndIdApi = async () => {
  const res = await api.get("/pets/petname-id");
  return res.data; // returns ApiResponse
};