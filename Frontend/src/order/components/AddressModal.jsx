import { useState, useEffect } from "react";
import { saveAddressApi, updateAddressApi } from "../service/addressApi";

export default function AddressModal({ onClose, onSaved, editData }) {

  const [form, setForm] = useState({});

  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      if (editData) {
        await updateAddressApi(editData.id, form);
      } else {
        await saveAddressApi(form);
      }
      onSaved();
      onClose();
    } catch {
      console.error("Save failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

      <div className="bg-white w-[440px] rounded-2xl shadow-xl p-6 animate-[fadeIn_.2s_ease]">

        <h3 className="font-semibold text-lg text-gray-800 mb-4">
          {editData ? "Edit Address" : "Add Address"}
        </h3>

        <div className="space-y-3">

          {[
            ["fullName", "Full Name*"],
            ["phone", "Mobile Number*"],
            ["pincode", "Pin Code*"],
            ["line1", "House / Block / Tower*"],
            ["line2", "Area / Street / Landmark*"],
            ["city", "City"],
            ["state", "State"],
          ].map(([name, label]) => (
            <input
              key={name}
              name={name}
              placeholder={label}
              value={form[name] || ""}
              onChange={handleChange}
              className="w-full border border-gray-200 px-3 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]/40"
            />
          ))}

        </div>

        <div className="flex gap-3 mt-6">

          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 py-2.5 rounded-lg hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="flex-1 bg-[#2FB7B2] hover:bg-[#27a39f] text-white py-2.5 rounded-lg font-medium shadow-sm transition"
          >
            Save Address
          </button>

        </div>

      </div>
    </div>
  );
}