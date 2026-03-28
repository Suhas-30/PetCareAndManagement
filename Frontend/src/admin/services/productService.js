import api from "../../api/axios";

// ✅ Add Product
export const addProduct = async (data) => {
  const res = await api.post("/admin/products", data);
  return res.data;
};

// ✅ Get All Products
export const getAllProducts = async () => {
  const res = await api.get("/admin/products");
  return res.data;
};

// ✅ Get Product By Id (for edit later)
export const getProductById = async (id) => {
  const res = await api.get(`/admin/products/${id}`);
  return res.data;
};

// ✅ Update Product
export const updateProduct = async (id, data) => {
  const res = await api.put(`/admin/products/${id}`, data);
  return res.data;
};

export const deleteProduct = async (id) => {
  await api.delete(`/admin/products/${id}`);
};

// ✅ Upload Image
export const uploadProductImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await api.post("/admin/products/upload-image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data; // imageUrl
};