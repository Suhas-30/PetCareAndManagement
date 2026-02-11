import { Route } from "react-router-dom";
import AddPet from "../pet/AddPet";

export default function PetRoutes() {
  return (
    <>
      <Route path="/pets/add" element={<AddPet/>}></Route>
    </>
  );
}
