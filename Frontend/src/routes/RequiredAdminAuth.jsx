import { Navigate } from "react-router-dom";

import { isAdminAuthenticated } from "../auth/adminAuth";

export default function RequiredAdminAuth({children}){
    if(!isAdminAuthenticated()){
        return <Navigate to="/admin" replace></Navigate>
    }
    return children
}