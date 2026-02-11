import { Route } from "react-router-dom";
import ProductList from "../product/ProductList";

export default function ProductRoutes() {
  return (
    <Route path="/market-place" element={<ProductList />} />
  );
}
