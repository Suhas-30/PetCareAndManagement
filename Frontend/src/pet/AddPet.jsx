import petImage from "../assets/images/image6.svg";

export default function AddPet() {
  return (
    <div className="min-h-screen bg-[#F7F9FB] flex flex-col items-center px-6 py-12">
      {/* Small Illustration */}
      <img src={petImage} alt="Happy pets" className="w-60 mb-6" />

      {/* Heading */}
      <h1 className="text-3xl font-bold text-[#2FB7B2] mb-2 text-center">
        Add Your Pet 🐾
      </h1>

      <p className="text-gray-600 text-center mb-8 max-w-md">
        Because every paw deserves a profile ❤️ Let’s create a safe and happy
        space for your furry friend.
      </p>

      {/* Form Card */}
      <div className="bg-white shadow-md rounded-2xl w-full max-w-2xl p-8">
        <form className="space-y-6">
          {/* Name & Species */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Pet Name *
              </label>
              <input
                type="text"
                placeholder="Enter pet name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Species *
              </label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]">
                <option value="">Select species</option>
                <option>Dog</option>
                <option>Cat</option>
                <option>Bird</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* Breed & Gender */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Breed *</label>
              <input
                type="text"
                placeholder="e.g. Labrador"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Gender *</label>
              <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]">
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
          </div>

          {/* DOB & Weight */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Date of Birth *
              </label>
              <input
                type="date"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                placeholder="Optional"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2FB7B2]"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Profile Image
            </label>
            <input
              type="file"
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#2FB7B2] text-white py-3 rounded-lg font-semibold hover:bg-[#27a6a2] transition"
            >
              Save Pet Profile 🐾
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
