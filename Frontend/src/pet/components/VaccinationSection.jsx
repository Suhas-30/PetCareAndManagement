import { useState, useEffect } from "react";
import { Syringe, Trash2, Pencil, X } from "lucide-react";
import AppAlert from "../../components/alrettab/AppAlert";
import {
  getVaccinations,
  deleteVaccination,
  createVaccination,
  updateVaccination,
} from "../services/vaccinationApi";
/* ---------------- MASTER ---------------- */

const VACCINE_MASTER = {
  Rabies: 30,
  DHPP: 21,
  Parvo: 21,
  Distemper: 28,
};

export default function VaccinationSection({ petId }) {
  const [vaccines, setVaccines] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [alert, setAlert] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    completedDoses: 0,
    lastDoseDate: "",
  });

  useEffect(() => {
    if (petId) loadVaccinations();
  }, [petId]);

  const loadVaccinations = async () => {
    try {
      const data = await getVaccinations(petId);
      setVaccines(data || []);
    } catch (e) {
      console.error(e);
      setVaccines([]);
    }
  };

  /* ---------------- AVAILABLE VACCINES ---------------- */
  const availableVaccines = Object.keys(VACCINE_MASTER).filter(
    (v) =>
      !vaccines.some((x) => x.name === v) ||
      (editingId && vaccines.find((x) => x.id === editingId)?.name === v),
  );

  /* ---------------- SAVE ---------------- */

  const handleSave = async () => {
    if (!form.lastDoseDate) {
      setAlert({ message: "Please select last dose date", type: "error" });
      return;
    }

    try {
      const payload = {
        vaccineName: form.name,
        totalDoses: 3,
        completedDoses: form.completedDoses,
        lastDoseDate: form.lastDoseDate,
      };
      if (editingId) {
        await updateVaccination(editingId, payload);
        setAlert({ message: "Vaccination updated", type: "success" });
      } else {
        await createVaccination(petId, payload);
        setAlert({ message: "Vaccination added", type: "success" });
      }

      resetModal();
      await loadVaccinations();
    } catch (e) {
      console.error(e);
      setAlert({ message: "Save failed", type: "error" });
    }
  };

  /* ---------------- EDIT ---------------- */

  const handleEdit = (v) => {
    setEditingId(v.id);
    setForm({
      name: v.name,
      completedDoses: v.completedDoses,
      lastDoseDate: v.lastDoseDate,
    });
    setShowAdd(true);
  };

  /* ---------------- DELETE ---------------- */

  const handleDelete = async (id) => {
    try {
      await deleteVaccination(id);
      await loadVaccinations();
      setAlert({ message: "Vaccination deleted", type: "success" });
    } catch {
      setAlert({ message: "Delete failed", type: "error" });
    }
  };

  /* ---------------- RESET ---------------- */

  const resetModal = () => {
    setEditingId(null);
    setShowAdd(false);
    setForm({
      name: "",
      completedDoses: 0,
      lastDoseDate: "",
    });
  };

  /* ================= UI ================= */

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mt-10">
      {alert && (
        <AppAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold flex gap-2">
          <Syringe size={20} /> Vaccinations
        </h2>

        {vaccines.length < 4 && (
          <button
            onClick={() => setShowAdd(true)}
            className="px-5 py-2 bg-[#2FB7B2] text-white rounded-xl"
          >
            + Add Vaccine
          </button>
        )}
      </div>

      {/* EMPTY STATE */}
      {vaccines.length === 0 && (
        <p className="text-gray-400">No vaccination records added yet.</p>
      )}

      {/* CARDS */}
      <div className="grid md:grid-cols-2 gap-6">
        {vaccines.map((v) => (
          <div
            key={v.id}
            className="bg-[#F7F9FB] rounded-2xl p-6 hover:shadow-md"
          >
            <div className="flex justify-between">
              <div>
                <h3 className="font-semibold">{v.name}</h3>

                <p className="text-sm text-gray-400">
                  {v.completedDoses}/{v.totalDoses} doses completed
                </p>

                {v.nextDueDate && (
                  <p className="text-sm text-gray-400 mt-1">
                    Next vaccination:{" "}
                    {new Date(v.nextDueDate).toLocaleDateString()}
                  </p>
                )}

                {v.lastDoseDate && (
                  <p className="text-sm text-gray-400 mt-1">
                    Last dose: {v.lastDoseDate}
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <Pencil
                  size={18}
                  onClick={() => handleEdit(v)}
                  className="cursor-pointer text-blue-500"
                />
                <Trash2
                  size={18}
                  onClick={() => handleDelete(v.id)}
                  className="cursor-pointer text-red-500"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {showAdd && (
        <Modal
          form={form}
          setForm={setForm}
          onSave={handleSave}
          onClose={resetModal}
          editing={editingId}
          availableVaccines={availableVaccines}
        />
      )}
    </div>
  );
}

/* ---------------- MODAL ---------------- */

function Modal({ form, setForm, onSave, onClose, editing, availableVaccines }) {
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 w-[420px]">
        <div className="flex justify-between mb-4">
          <h3 className="font-semibold">
            {editing ? "Edit Vaccination" : "Add Vaccination"}
          </h3>
          <X onClick={onClose} className="cursor-pointer" />
        </div>

        <select
          className="w-full border rounded-lg p-2 mb-3"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          disabled={editing}
        >
          <option value="">Select Vaccine</option>
          {availableVaccines.map((v) => (
            <option key={v}>{v}</option>
          ))}
        </select>

        <input
          type="number"
          min="0"
          max="3"
          className="w-full border rounded-lg p-2 mb-3"
          placeholder="Completed doses"
          value={form.completedDoses || ""}
          onChange={(e) =>
            setForm({ ...form, completedDoses: Number(e.target.value) })
          }
        />

        {/* ✅ FUTURE DATE LOCKED */}
        <input
          type="date"
          max={today}
          required
          className="w-full border rounded-lg p-2 mb-4"
          value={form.lastDoseDate || ""}
          onChange={(e) => setForm({ ...form, lastDoseDate: e.target.value })}
        />

        <button
          onClick={onSave}
          className="w-full bg-[#2FB7B2] text-white py-2 rounded-lg"
        >
          Save
        </button>
      </div>
    </div>
  );
}
