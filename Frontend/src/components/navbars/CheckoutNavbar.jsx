import { useLocation, useNavigate } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi"; // industry standard icon

export default function CheckoutNavbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const step =
    pathname.includes("address")
      ? "address"
      : pathname.includes("payment")
      ? "payment"
      : "bag";

  const active = "text-[#2FB7B2]";
  const inactive = "text-gray-400";

  return (
    <div className="bg-white border-b border-gray-100 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">

        {/* LEFT HOME BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-gray-600 hover:text-[#2FB7B2] transition font-medium"
        >
          <HiOutlineHome size={22} />
          <span className="hidden sm:block">Home</span>
        </button>

        {/* CENTER STEPS */}
        <div className="flex justify-center items-center gap-6 font-semibold text-sm">

          <span className={step === "bag" ? active : inactive}>BAG</span>
          <span className="text-gray-200">────────</span>

          <span className={step === "address" ? active : inactive}>ADDRESS</span>
          <span className="text-gray-200">────────</span>

          <span className={step === "payment" ? active : inactive}>PAYMENT</span>

        </div>

        {/* RIGHT SPACE (balance layout) */}
        <div className="w-[60px]" />

      </div>
    </div>
  );
}