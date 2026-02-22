import { Route } from "react-router-dom";
import AddPet from "../pet/pages/AddPet";
import MyPets from "../pet/pages/MyPets";
import RequiredUserAuth from "./RequiredUserAuth";

export default function PetRoutes() {
  return (
    <>
      <Route
        path="/pets/add"
        element={
          <RequiredUserAuth>
            <AddPet />
          </RequiredUserAuth>
        }
      />

      <Route
        path="/pets"
        element={
          <RequiredUserAuth>
            <MyPets />
          </RequiredUserAuth>
        }
      />
    </>
  );
}