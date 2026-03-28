export const refreshToken = async () => {
  const res = await api.get("/auth/refresh");
  return res.data.data; // returns NEW JWT
};