import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCartApi,
  increaseCartQtyApi,
  decreaseCartQtyApi,
  removeCartItemApi,
} from "../service/cartApi";
import OrderSummary from "../../order/components/OrderSummary";

export default function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);

  /* ---------- LOAD CART ---------- */
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await getCartApi();
      setCartItems(data);
    } catch (e) {
      console.error("Failed to load cart", e);
    }
  };

  /* ---------- SELECT TOGGLE ---------- */
  const toggleSelect = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  /* ---------- CHECKOUT ---------- */
  const handleContinue = () => {
    const selectedProducts = cartItems.filter((i) =>
      selectedItems.includes(i.productId)
    );

    navigate("/checkout/address", {
      state: { items: selectedProducts },
    });
  };

  /* ---------- QTY HANDLERS ---------- */
  const increaseQty = async (id) => {
    try {
      await increaseCartQtyApi(id);
      fetchCart();
    } catch (e) {
      console.error("Increase failed", e);
    }
  };

  const decreaseQty = async (id) => {
    try {
      await decreaseCartQtyApi(id);
      fetchCart();
    } catch (e) {
      console.error("Decrease failed", e);
    }
  };

  const removeItem = async (id) => {
    try {
      await removeCartItemApi(id);
      fetchCart();
    } catch (e) {
      console.error("Remove failed", e);
    }
  };

  /* =======================================================
      EMPTY CART UI (INDUSTRY LEVEL)
  ======================================================= */
  if (!cartItems.length) {
    return (
      <div className="min-h-screen bg-[#F7F9FB] flex items-center justify-center">
        <div className="text-center bg-white px-12 py-14 rounded-3xl shadow-sm border border-gray-100 max-w-md">

          {/* ICON */}
          <div className="w-20 h-20 mx-auto rounded-full bg-[#F0FBFA] flex items-center justify-center mb-6">
            🛒
          </div>

          {/* TITLE */}
          <h2 className="text-2xl font-semibold text-gray-800">
            Your cart is empty
          </h2>

          {/* DESC */}
          <p className="text-gray-500 mt-2 text-sm">
            Looks like you haven’t added anything yet.
          </p>

          {/* BUTTON */}
          <button
            onClick={() => navigate("/products")}
            className="mt-6 w-full bg-[#2FB7B2] hover:bg-[#27a39f] active:scale-[0.97] transition text-white py-3 rounded-xl font-medium shadow-sm hover:shadow-md"
          >
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  /* =======================================================
      NORMAL CART UI
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#F7F9FB]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-2xl font-semibold mb-6">Your Cart</h2>

        <div className="grid grid-cols-3 gap-6">

          {/* LEFT */}
          <div className="col-span-2">
            <div className="space-y-6 bg-white rounded-3xl shadow-sm border border-gray-100 p-6">

              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-6 border-b pb-5">

                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.productId)}
                    onChange={() => toggleSelect(item.productId)}
                  />

                  <img
                    src={`http://localhost:8080${item.imageUrl}`}
                    alt={item.name}
                    className="w-24 h-24 rounded-xl object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">₹ {item.price}</p>

                    <div className="flex items-center gap-3 mt-3">
                      <button
                        onClick={() => decreaseQty(item.productId)}
                        className="px-3 py-1 border rounded-lg hover:bg-gray-100 active:scale-90"
                      >
                        −
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        onClick={() => increaseQty(item.productId)}
                        className="px-3 py-1 border rounded-lg hover:bg-gray-100 active:scale-90"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-semibold">
                      ₹ {item.price * item.quantity}
                    </p>

                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-sm text-red-500 mt-2 hover:underline"
                    >
                      Remove
                    </button>
                  </div>

                </div>
              ))}

            </div>
          </div>

          {/* RIGHT */}
          <div className="col-span-1">
            <OrderSummary
              items={cartItems.filter((i) =>
                selectedItems.includes(i.productId)
              )}
            />

            <button
              onClick={handleContinue}
              disabled={!selectedItems.length}
              className="w-full mt-4 bg-[#2FB7B2] hover:bg-[#27a39f] active:scale-[0.97] text-white px-6 py-3 rounded-xl disabled:opacity-50"
            >
              Continue
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}