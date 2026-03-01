import api from "../../api/axios";

export const getCurrentUser = async()=>{
    const res = await api.get("/users/me")
    return res.data;
}