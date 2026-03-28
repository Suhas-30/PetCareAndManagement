export const isAdminAuthenticated = ()=>{
    return Boolean(localStorage.getItem("adminToken"));
}