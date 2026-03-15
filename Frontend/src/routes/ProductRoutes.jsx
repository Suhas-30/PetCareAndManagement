import { Route } from "react-router-dom";
import ProductList from "../product/pages/ProductList";
import Cart from "../cart/pages/Cart";
import RequiredUserAuth from "./RequiredUserAuth";


export default function ProductRoutes() {
  return (
    <>
    <Route path="/products" element={<ProductList />} />
    </>
       
  );
}
