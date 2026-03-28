import api from "../../api/axios";

export const fetchDoctors = async () => {
  const response = await api.get("/doctor");
  console.log(response.data.data);
  return response.data.data; // ApiResponse wrapper
  
};