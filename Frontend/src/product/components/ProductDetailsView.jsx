import { useEffect, useState } from "react";
import { getProductById } from "../service/productService";
import { addToCartApi } from "../../cart/service/cartApi";
import AppAlert from "../../components/alrettab/AppAlert";

export default function ProductDetailsView({ productId, onBack }) {
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  /* ALERT STATE */
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    const data = await getProductById(productId);
    setProduct(data);
  };

  /* ADD TO CART */
  const addToCart = async () => {
    try {
      await addToCartApi(product.id, qty);

      setAlert({
        show: true,
        message: "Added to cart successfully",
        type: "success",
      });

    } catch (e) {
      setAlert({
        show: true,
        message: "Failed to add product",
        type: "error",
      });
    }
  };

  if (!product) return <div className="p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#F7F9FB]">
      {/* ALERT */}
      {alert.show && (
        <AppAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ ...alert, show: false })}
        />
      )}

      <div className="max-w-6xl mx-auto px-6 py-10">

        {/* BACK */}
        <button
          onClick={onBack}
          className="text-sm text-gray-500 hover:text-black transition mb-6"
        >
          ← Back
        </button>

        {/* CARD */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 grid md:grid-cols-2 gap-10">

          {/* IMAGE */}
          <div className="rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
            <img
              src={`http://localhost:8080${product.imageUrl}`}
              alt={product.name}
              className="w-full h-[420px] object-cover hover:scale-[1.02] transition duration-500"
            />
          </div>

          {/* CONTENT */}
          <div className="flex flex-col justify-center">

            {/* CATEGORY */}
            <span className="text-xs w-fit px-3 py-1 rounded-full bg-[#F0FBFA] text-[#2FB7B2] font-medium">
              {product.category}
            </span>

            {/* TITLE */}
            <h2 className="text-3xl font-semibold text-gray-800 mt-3 leading-snug">
              {product.name}
            </h2>

            {/* DESC */}
            <p className="text-gray-500 mt-4 leading-relaxed text-[15px]">
              {product.description}
            </p>

            {/* PRICE */}
            <div className="flex items-center gap-4 mt-6">
              <span className="text-3xl font-bold text-[#2FB7B2]">
                ₹ {product.price}
              </span>

              <span className="text-sm px-3 py-1 rounded-full bg-gray-100 text-gray-600">
                {product.stock} in stock
              </span>
            </div>

            {/* QTY + BUTTON */}
            <div className="flex items-center gap-4 mt-8">

              {/* QTY */}
              <div className="flex items-center border rounded-xl overflow-hidden">
                <button
                  onClick={() => setQty((q) => (q > 1 ? q - 1 : 1))}
                  className="px-3 py-2 hover:bg-gray-100 active:scale-90 transition"
                >
                  −
                </button>

                <span className="px-4">{qty}</span>

                <button
                  onClick={() =>
                    setQty((q) => (q < product.stock ? q + 1 : q))
                  }
                  className="px-3 py-2 hover:bg-gray-100 active:scale-90 transition"
                >
                  +
                </button>
              </div>

              {/* BUTTON */}
              <button
                onClick={addToCart}
                className="flex-1 bg-[#2FB7B2] hover:bg-[#27a39f] active:scale-[0.97] text-white py-3 rounded-xl font-medium transition shadow-sm hover:shadow-md"
              >
                Add to Cart
              </button>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}