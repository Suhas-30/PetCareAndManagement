import { Routes, Route } from "react-router-dom";
import ProductList from "../product/productList";

export default function ProductRoutes(){
    return(
        <>
            <Routes>
                <Route path="/market-place" element={<ProductList></ProductList>}></Route>
            </Routes>
        </>
    )
}