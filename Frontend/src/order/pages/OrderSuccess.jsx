import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function OrderSuccess() {

  const navigate = useNavigate();
  const location = useLocation();

  /* ✅ GUARD */
  useEffect(() => {
    if (!location.state?.success) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F7F9FB] flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-sm text-center max-w-md">

        <div className="text-5xl mb-4">✅</div>

        <h2 className="text-2xl font-semibold text-gray-800">
          Order Placed Successfully
        </h2>

        <p className="text-gray-500 mt-2 text-sm">
          Thank you for shopping with us.
        </p>

        <div className="flex flex-col gap-3 mt-6">

          <button
            onClick={() => navigate("/")}
            className="bg-[#2FB7B2] hover:bg-[#27a39f] text-white py-2 rounded-lg"
          >
            Go to Home
          </button>

          <button
            onClick={() => navigate("/products")}
            className="border py-2 rounded-lg"
          >
            Browse Products
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="border py-2 rounded-lg"
          >
            Previous Orders
          </button>

        </div>

      </div>

    </div>
  );
}