import { useNavigate } from "react-router-dom";
import image1 from "./assets/images/image1.svg";
import image2 from "./assets/images/image2.svg";
// import image3 from "./assets/images/image3.svg";
import image4 from "./assets/images/image4.svg";
import images from "./assets/images/image5.svg";
import PublicNavbar from "./components/navbars/PublicNavbar";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F7F9FB] text-[#2E2E2E]">
      {/* Hero Section */}
      <section className="bg-[#2FB7B2] text-white px-6 py-8">
        <div className="max-w-5xl mx-auto text-center">
          <img
            src={image1}
            alt="Pet care illustration"
            className="mx-auto mb-3 w-28 md:w-32"
          />

          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Smart Care for Your Pets 🐾
          </h1>

          <p className="text-sm opacity-90 mb-4">
            Manage pet health, book vet appointments, and shop essentials — all
            in one place.
          </p>

          <div className="flex justify-center gap-3">
            <button className="bg-[#FF9F43] text-white px-4 py-2 rounded-lg font-semibold">
              Get Started
            </button>
            <button className="bg-white text-[#2FB7B2] px-4 py-2 rounded-lg font-semibold">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        {/* //add pet */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div
            className="bg-white rounded-xl shadow p-6 text-center cursor-pointer hover:shadow-lg transition"
            onClick={() => {
              navigate("/pets/add");
              console.log("Add Pet to Profile clicked");
            }}
          >
            <img
              src={images}
              alt="Add pet to profile"
              className="mx-auto mb-4 w-20 h-20"
            />
            <h3 className="text-xl font-semibold mb-2">Add Pet to Profile</h3>
            <p className="text-gray-600">
              Create a profile for your pet with name, breed, age, and medical
              details.
            </p>
          </div>

          {/* Appointents list */}
          <div
            className="bg-white rounded-xl shadow p-6 text-center cursor-pointer hover:shadow-lg transition"
            onClick={() => {
              console.log("Vet Appointments clicked");
              navigate("/appointments");
            }}
          >
            <img
              src={image2}
              alt="Vet appointments"
              className="mx-auto mb-4 w-20 h-20"
            />
            <h3 className="text-xl font-semibold mb-2">Vet Appointments</h3>
            <p className="text-gray-600">
              Book and manage vet visits easily with reminders and
              notifications.
            </p>
          </div>

          <div
            className="bg-white rounded-xl shadow p-6 text-center cursor-pointer hover:shadow-lg transition"
            onClick={() => {
              console.log("Pet Marketplace clicked");
              navigate("/market-place");
            }}
          >
            <img
              src={image4}
              alt="Pet marketplace"
              className="mx-auto mb-4 w-20 h-20"
            />
            <h3 className="text-xl font-semibold mb-2">Pet Marketplace</h3>
            <p className="text-gray-600">
              Buy food, medicines, and accessories from trusted sellers.
            </p>
          </div>
        </div>
      </section>

      {/* Call To Action */}
      <section className="bg-[#6BCF9D] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Because Your Pet Deserves the Best Care
          </h2>
          <p className="mb-6 opacity-90">
            Join thousands of pet owners using Smart Pet Care every day.
          </p>
          <button className="bg-white text-[#6BCF9D] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Create Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-6 text-center text-gray-500 text-sm">
        © 2026 Smart Pet Care. All rights reserved.
      </footer>
    </div>
  );
}
