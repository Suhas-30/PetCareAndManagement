import { useState } from "react";
import petImage from "../../assets/images/image6.svg";
import { useNavigate } from "react-router-dom";
import { createPet } from "../services/petapi";

export default function AddPet() {

  const [formData, setFormData] = useState({
    name: "",
    species: "",
    breed: "",
    gender: "",
    dob: "",
    weight: "",
    image: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = new FormData();

      payload.append("name", formData.name);
      payload.append("species", formData.species);
      payload.append("breed", formData.breed);
      payload.append("gender", formData.gender);

      // IMPORTANT → must stay YYYY-MM-DD
      payload.append("dob", formData.dob);

      if (formData.weight) {
        payload.append("weight", formData.weight.toString());
      }

      if (formData.image) {
        payload.append("image", formData.image);
      }

      await createPet(payload);

      console.log("Pet created successfully");
      navigate("/user/dashboard");

    } catch (err) {
      console.error("Pet creation failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FB] flex flex-col items-center px-6 py-12">
      <img src={petImage} alt="Happy pets" className="w-60 mb-6" />

      <h1 className="text-3xl font-bold text-[#2FB7B2] mb-2 text-center">
        Add Your Pet 🐾
      </h1>

      <p className="text-gray-600 text-center mb-8 max-w-md">
        Because every paw deserves a profile ❤️
      </p>

      <div className="bg-white shadow-md rounded-2xl w-full max-w-2xl p-8">
        <form className="space-y-6" onSubmit={handleSubmit}>

          <div className="grid md:grid-cols-2 gap-6">
            <input name="name" placeholder="Pet name"
              onChange={handleChange}
              className="border rounded-lg px-4 py-2" />

            <select name="species" onChange={handleChange}
              className="border rounded-lg px-4 py-2">
              <option value="">Select species</option>
              <option>Dog</option>
              <option>Cat</option>
              <option>Bird</option>
              <option>Other</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <input name="breed" placeholder="Breed"
              onChange={handleChange}
              className="border rounded-lg px-4 py-2" />

            <select name="gender" onChange={handleChange}
              className="border rounded-lg px-4 py-2">
              <option value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              name="dob"
              type="date"
              onChange={handleChange}
              className="border rounded-lg px-4 py-2"
            />

            <input
              name="weight"
              type="number"
              step="0.1"
              onChange={handleChange}
              className="border rounded-lg px-4 py-2"
            />
          </div>

          <input
            name="image"
            type="file"
            accept="image/*"
            onChange={handleChange}
            className="border rounded-lg px-4 py-2 w-full"
          />

          <button
            type="submit"
            className="w-full bg-[#2FB7B2] text-white py-3 rounded-lg"
          >
            Save Pet Profile 🐾
          </button>

        </form>
      </div>
    </div>
  );
}