import {Routes, Route } from "react-router-dom";
import UserRegister from "../user/UserRegister";
import UserLogin from "../user/UserLogin";
import UserDashboard from "../user/UserDashboard";
import ForgotPassword from "../user/ForgotPassword";
import ResetPassword from "../user/ResetPassword";
import VerifyEmail from "../user/VerifyEmail";
import AddPet from "../pet/AddPet";
import Appointments from "../user/Appointments.Jsx";
import RequiredUserAuth from "./RequiredUserAuth";



export default function UserRoutes(){
    return(
        <Routes>
            <Route path="/register" element={<UserRegister></UserRegister>}></Route>
            <Route path="/login" element={<UserLogin></UserLogin>}></Route>
            <Route path="/forgot-password" element={<ForgotPassword></ForgotPassword>}></Route>
            <Route path="/reset-password" element={<ResetPassword></ResetPassword>}></Route>
            <Route path="/verify-email" element={<VerifyEmail   ></VerifyEmail>}></Route>

            <Route path="/dashboard" element={<RequiredUserAuth><UserDashboard></UserDashboard></RequiredUserAuth>}></Route>
            <Route path="/add-pet" element={<RequiredUserAuth><AddPet></AddPet></RequiredUserAuth>}></Route>
            <Route path="/appointments" element={<RequiredUserAuth><Appointments></Appointments></RequiredUserAuth>}></Route>
        </Routes>
    )
}