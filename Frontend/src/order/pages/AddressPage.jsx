import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OrderSummary from "../components/OrderSummary";
import {
  getAddressesApi,
  deleteAddressApi,
} from "../service/addressApi";
import { getCartApi } from "../../cart/service/cartApi";
import AddressModal from "../components/AddressModal";

export default function AddressPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const selectedItems = location.state?.items || [];

  const [addresses, setAddresses] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchAddresses();
    fetchCart();
  }, []);

  const fetchAddresses = async () => {
    try {
      const data = await getAddressesApi();
      setAddresses(data);
      if (data.length) setSelectedId(data[0].id);
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    const data = await getCartApi();
    setCartItems(data);
  };

  const handleRemove = async (id) => {
    await deleteAddressApi(id);
    fetchAddresses();
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="bg-[#F7F9FB] min-h-screen pt-10">
      <div className="max-w-6xl mx-auto px-6">

        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Select Delivery Address
        </h2>

        <div className="grid grid-cols-3 gap-8 items-start">

          {/* LEFT */}
          <div className="col-span-2">

            <p className="text-xs tracking-wide text-gray-500 mb-3">
              SAVED ADDRESSES
            </p>

            {addresses.map((a) => (
              <div
                key={a.id}
                className={`bg-white border rounded-2xl p-5 mb-4 transition shadow-sm hover:shadow-md ${
                  selectedId === a.id ? "border-[#2FB7B2]" : "border-gray-100"
                }`}
              >
                <div className="flex gap-4">

                  <input
                    type="radio"
                    className="mt-1 accent-[#2FB7B2]"
                    checked={selectedId === a.id}
                    onChange={() => setSelectedId(a.id)}
                  />

                  <div className="flex-1">

                    <h3 className="font-semibold text-gray-800">
                      {a.fullName}
                    </h3>

                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                      {a.line1}, {a.line2}
                    </p>

                    <p className="text-sm text-gray-600">
                      {a.city}, {a.state} - {a.pincode}
                    </p>

                    <p className="text-sm mt-2">
                      Mobile: <b>{a.phone}</b>
                    </p>

                    <div className="flex gap-3 mt-4">

                      <button
                        onClick={() => handleRemove(a.id)}
                        className="border border-gray-200 px-4 py-1.5 rounded-lg text-sm hover:bg-gray-50 transition"
                      >
                        REMOVE
                      </button>

                      <button
                        onClick={() => {
                          setEditData(a);
                          setShowModal(true);
                        }}
                        className="border border-gray-200 px-4 py-1.5 rounded-lg text-sm hover:bg-gray-50 transition"
                      >
                        EDIT
                      </button>

                    </div>

                  </div>
                </div>
              </div>
            ))}

            {/* ADD NEW */}
            <div
              onClick={() => {
                setEditData(null);
                setShowModal(true);
              }}
              className="border-2 border-dashed border-[#2FB7B2]/40 rounded-2xl p-6 cursor-pointer text-center text-[#2FB7B2] font-medium hover:bg-[#F0FBFA] transition"
            >
              + Add New Address
            </div>

          </div>

          {/* RIGHT */}
          <div className="col-span-1">
            <div className="sticky top-24">

              <OrderSummary items={cartItems} />

              <button
                disabled={!selectedId}
                onClick={() =>
                  navigate("/checkout/payment", {
                    state: { items: selectedItems, addressId: selectedId },
                  })
                }
                className="w-full mt-4 bg-[#2FB7B2] hover:bg-[#27a39f] active:scale-[0.98] text-white px-8 py-3 rounded-xl font-semibold shadow-sm hover:shadow-md disabled:opacity-50 transition"
              >
                Continue
              </button>

            </div>
          </div>

        </div>

        {showModal && (
          <AddressModal
            onClose={() => setShowModal(false)}
            onSaved={fetchAddresses}
            editData={editData}
          />
        )}

      </div>
    </div>
  );
}