import Home from "../Home";
import { Route, Routes } from "react-router-dom";
export default function HomeRoute() {
  return <Route path="/" element={<Home />} />;
}
