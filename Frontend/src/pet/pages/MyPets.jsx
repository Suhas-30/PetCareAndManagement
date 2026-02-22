import { useEffect, useState } from "react";
import { getMyPets } from "../services/petapi";

export default function MyPets() {

  const [pets, setPets] = useState([]);

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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My Pets 🐾</h1>

      {pets.length === 0 ? (
        <p className="text-gray-500">No pets added yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-2xl shadow-sm overflow-hidden border"
            >
              {/* Pet Image */}
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                {pet.imageUrl ? (
                  <img
                    src={`http://localhost:8080/uploads/pets/${pet.imageUrl}`}
                    alt={pet.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>

              {/* Pet Details */}
              <div className="p-5 space-y-1">
                <h2 className="text-lg font-semibold">{pet.name}</h2>
                <p className="text-gray-600">{pet.species}</p>
                <p className="text-sm text-gray-500">{pet.breed}</p>
                <p className="text-sm text-gray-500">
                  {pet.gender} • {pet.weight ?? "-"} kg
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}