import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductById,
  updateProduct,
  uploadProductImage
} from "../services/productService";

export default function EditProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    imageUrl: ""
  });

  const [uploading, setUploading] = useState(false);

  const categories = [
    "Food & Nutrition",
    "Treats & Chews",
    "Toys",
    "Grooming",
    "Accessories",
    "Clothing & Apparel",
    "Other"
  ];

  useEffect(() => {
    getProductById(id).then(setForm);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "price" || name === "stock") {
      if (Number(value) < 0) return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      const imageUrl = await uploadProductImage(file);

      setForm((prev) => ({
        ...prev,
        imageUrl
      }));

    } catch {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await updateProduct(id, form);
    alert("Product updated");
    navigate("/admin/products");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-[#2E2E2E]">Edit Product</h1>

      <form className="space-y-4 mt-6" onSubmit={handleSubmit}>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            min="0"
            className="border p-2 rounded"
          />

          <input
            name="stock"
            value={form.stock}
            onChange={handleChange}
            type="number"
            min="0"
            className="border p-2 rounded"
          />
        </div>

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Category</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <input type="file" accept="image/*" onChange={handleImageUpload} />

        {uploading && <p>Uploading...</p>}

        {form.imageUrl && (
          <img
            src={`http://localhost:8080${form.imageUrl}`}
            alt="preview"
            className="w-32 rounded"
          />
        )}

        <button className="bg-[#2FB7B2] text-white px-6 py-2 rounded">
          Update Product
        </button>

      </form>
    </div>
  );
}