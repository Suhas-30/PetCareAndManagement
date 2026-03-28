import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import ProductDetailsView from "../components/ProductDetailsView";
import { getAllProducts } from "../service/productService";
export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-10">Loading products...</div>;
  }

  if (selectedProductId) {
    return (
      <ProductDetailsView
        productId={selectedProductId}
        onBack={() => setSelectedProductId(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FB]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">
              Pet Marketplace
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Discover premium essentials for your pets
            </p>
          </div>

          {/* search */}
          <input
            placeholder="Search products..."
            className="bg-white border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]"
          />
        </div>

        {/* CATEGORY CHIPS */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {["All", "Food", "Toys", "Clothing"].map((c) => (
            <button
              key={c}
              className="px-4 py-1.5 rounded-full bg-white border text-sm hover:bg-[#F0FBFA] hover:border-[#2FB7B2] transition"
            >
              {c}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard
              product={p}
              onSelect={(p) => setSelectedProductId(p.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
