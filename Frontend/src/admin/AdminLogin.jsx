import { useState } from "react";
import {Outlet, useNavigate } from "react-router-dom";

export default function AdminLogin(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e)=>{
        e.preventDefault();
        console.log(username, password);
        localStorage.setItem("adminToken", "dummytoken");
        navigate("/admin/dashboard");
    }
    return (
        <>
            <div>Admin Login</div>
            <form onSubmit={handleLogin}>

                <input type="text" placeholder="username" value={username}
                    onChange={ (e)=> {setUsername(e.target.value)}}/>


                <input type="password" placeholder="passowrd" value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
                <button type="submit">Login</button>
            </form>
        </>
    )
}