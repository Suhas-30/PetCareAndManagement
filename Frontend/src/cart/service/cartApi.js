import api from "../../api/axios"; // your axios instance

/* ---------- ADD TO CART ---------- */
export const addToCartApi = async (productId, quantity = 1) => {
  return api.post("/user/cart/add", null, {
    params: { productId, quantity },
  });
};

/* ---------- GET CART ---------- */
export const getCartApi = async () => {
  const res = await api.get("/user/cart");
  return res.data;
};

/* ---------- INCREASE QTY ---------- */
export const increaseCartQtyApi = async (productId) => {
  return api.post("/user/cart/increase", null, {
    params: { productId },
  });
};

/* ---------- DECREASE QTY ---------- */
export const decreaseCartQtyApi = async (productId) => {
  return api.post("/user/cart/decrease", null, {
    params: { productId },
  });
};

/* ---------- REMOVE ITEM ---------- */
export const removeCartItemApi = async (productId) => {
  return api.delete("/user/cart/remove", {
    params: { productId },
  });
};