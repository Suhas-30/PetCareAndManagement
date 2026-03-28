import { useNavigate } from "react-router-dom";
import { getAllProducts, deleteProduct } from "../services/productService";

import { useEffect, useState,  } from "react";


export default function ProductList() {

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const navigate = useNavigate();

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await deleteProduct(id);
    fetchProducts();
  };


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#2E2E2E]">Products</h1>

      <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td className="p-3">{p.name}</td>
                <td className="p-3">{p.price}</td>
                <td className="p-3">{p.stock}</td>
                <td className="p-3">{p.category}</td>
                <td className="p-3">
                  <button className="text-blue-500 mr-3" onClick={() => navigate(`/admin/products/edit/${p.id}`)}>Edit</button>
                  <button className="text-red-500" onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}