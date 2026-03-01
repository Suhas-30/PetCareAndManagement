import { useEffect, useState } from "react";
import { getMyPets, deletePet } from "../services/petApi";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

export default function MyPets() {
  const [pets, setPets] = useState([]);
  const navigate = useNavigate();

  /* LOAD PETS */
  useEffect(() => {
    const fetchPets = async () => {
      try {
        const data = await getMyPets();
        setPets(data);
      } catch (error) {
        console.error("Failed to load pets", error);
      }
    };
    fetchPets();
  }, []);

  /* OPEN PET */
  const handlePetClick = (petId) => {
    navigate(`/pets/${petId}/health`);
  };

  /* DELETE PET */
  const handleDeletePet = async (e, petId) => {
    e.stopPropagation();
    try {
      await deletePet(petId);
      setPets(prev => prev.filter(p => p.id !== petId));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F9FB] py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-semibold text-[#2E2E2E]">
            My Pets 🐾
          </h1>

          {/* ADD PET BUTTON */}
          <button
            onClick={() => navigate("/pets/add")}
            className="
              px-5 py-2.5 rounded-xl
              bg-[#2FB7B2] text-white font-medium
              shadow-sm
              hover:bg-[#28a39f]
              transition-all duration-300
            "
          >
            + Add Pet
          </button>
        </div>

        {/* EMPTY STATE */}
        {pets.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">

            <div className="text-6xl mb-4">🐶</div>

            <h2 className="text-xl font-semibold text-[#2E2E2E]">
              No pets added yet
            </h2>

            <p className="text-gray-500 mt-2 max-w-sm">
              Add your first pet to start tracking health records,
              appointments, and care history.
            </p>

            <button
              onClick={() => navigate("/pets/add")}
              className="
                mt-6 px-6 py-3 rounded-xl
                bg-[#2FB7B2] text-white font-medium
                shadow-sm
                hover:bg-[#28a39f]
                transition-all duration-300
              "
            >
              + Add Your First Pet
            </button>

          </div>
        ) : (
          /* PET GRID */
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {pets.map((pet) => (
              <div
                key={pet.id}
                onClick={() => handlePetClick(pet.id)}
                className="
                  group relative cursor-pointer
                  bg-white rounded-2xl overflow-hidden
                  border border-gray-100
                  hover:border-[#2FB7B2]/40
                  transition-all duration-300
                  hover:shadow-lg
                "
              >

                {/* IMAGE */}
                <div className="relative h-36 overflow-hidden">
                  {pet.imageUrl ? (
                    <img
                      src={`http://localhost:8080/uploads/pets/${pet.imageUrl}`}
                      alt={pet.name}
                      className="
                        h-full w-full object-cover
                        transition-transform duration-500
                        group-hover:scale-105
                      "
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                      No Image
                    </div>
                  )}

                  {/* DELETE */}
                  <button
                    onClick={(e) => handleDeletePet(e, pet.id)}
                    className="
                      absolute top-3 right-3
                      bg-white/95 backdrop-blur
                      p-2 rounded-full
                      shadow-md
                      opacity-0 group-hover:opacity-100
                      transition
                    "
                  >
                    <Trash2 size={16} className="text-red-500" />
                  </button>
                </div>

                {/* CONTENT */}
                <div className="p-4 space-y-1">
                  <h2 className="text-base font-semibold text-[#2E2E2E]">
                    {pet.name}
                  </h2>

                  <p className="text-sm font-medium text-[#2FB7B2]">
                    {pet.species}
                  </p>

                  <p className="text-xs text-gray-500 pt-1">
                    {pet.breed}
                  </p>

                  <p className="text-xs text-gray-400">
                    {pet.gender} • {pet.weight ?? "-"} kg
                  </p>
                </div>

              </div>
            ))}

          </div>
        )}
      </div>
    </div>
  );
}