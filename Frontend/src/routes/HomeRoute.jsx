import Home from "../Home";
import { Route, Routes } from "react-router-dom";
export default function HomeRoute(){
    return(
        <Routes>
            <Route path="/" element={<Home></Home>}></Route>
        </Routes>
    )
}