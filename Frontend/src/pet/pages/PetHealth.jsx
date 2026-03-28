import { useParams } from "react-router-dom";
import MedicalHistorySection from "../components/MedicalHistorySection";
import VaccinationSection from "../components/VaccinationSection";

export default function PetHealth() {

  const { petId } = useParams();

  return (
    <div className="min-h-screen bg-[#F7F9FB] py-10 px-4">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-semibold text-[#2E2E2E] mb-8">
          Pet Health 🩺
        </h1>

        <MedicalHistorySection petId={petId} />
        <VaccinationSection petId={petId} />

      </div>
    </div>
  );
}