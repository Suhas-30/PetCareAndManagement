import { useState, useEffect } from "react";
import { Edit3, Trash2, X } from "lucide-react";
import AppAlert from "../../components/alrettab/AppAlert";
import {
  getMedicalHistory,
  createMedicalHistory,
  updateMedicalHistory,
  deleteMedicalHistory,
} from "../services/medicalHistoryApi";
export default function MedicalHistorySection({ petId }) {
  /* ---------------- STATE ---------------- */

  const [history, setHistory] = useState([]);
  const [alert, setAlert] = useState(null);
const [loading, setLoading] = useState(true);
  const [editingRecord, setEditingRecord] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [newRecord, setNewRecord] = useState({
    type: "ILLNESS",
    title: "",
    description: "",
    date: "",
  });

  const loadHistory = async () => {
    try {
      setLoading(true);
      const data = await getMedicalHistory(petId);
      setHistory(data || []);
    } catch (e) {
      console.error("Failed loading history", e);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (petId) loadHistory();
  }, [petId]);
  /* ---------------- ADD ---------------- */

  const handleAddRecord = async () => {
    try {
      await createMedicalHistory(petId, newRecord);

      setShowAddModal(false);

      setNewRecord({
        type: "ILLNESS",
        title: "",
        description: "",
        date: "",
      });

      await loadHistory(); // reload from DB

      setAlert({
        message: "Medical record added successfully",
        type: "success",
      });
    } catch (e) {
      console.error(e);
    }
  };

  /* ---------------- DELETE ---------------- */

  const confirmDelete = async () => {
    try {
      await deleteMedicalHistory(deleteCandidate);

      setDeleteCandidate(null);
      await loadHistory();

      setAlert({
        message: "Medical record deleted successfully",
        type: "success",
      });
    } catch (e) {
      console.error(e);
    }
  };

  /* ---------------- EDIT ---------------- */

  const handleSave = async () => {
    try {
      await updateMedicalHistory(editingRecord.id, editingRecord);

      setEditingRecord(null);
      await loadHistory();

      setAlert({
        message: "Medical record updated successfully",
        type: "success",
      });
    } catch (e) {
      console.error(e);
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
      {alert && (
        <AppAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-[#2E2E2E]">
          Medical History
        </h2>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2 bg-[#2FB7B2] text-white rounded-xl"
        >
          + Add Record
        </button>
      </div>

      {/* EMPTY STATE */}
      {!loading && history.length === 0 && (
        <p className="text-gray-400">No medical records added yet.</p>
      )}

      {/* TIMELINE */}
      <div className="relative border-l-2 border-[#E6F4F3] ml-3 space-y-8">
        {history.map((item) => (
          <div key={item.id} className="relative pl-8">
            <span className="absolute -left-[10px] top-2 w-4 h-4 rounded-full bg-[#2FB7B2] border-4 border-white shadow" />

            <div className="bg-[#F7F9FB] rounded-2xl p-6 hover:shadow-md">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>

                  <p className="text-sm text-gray-400">{item.date}</p>

                  <p className="text-gray-600 mt-3">{item.description}</p>
                </div>

                <div className="flex gap-3 text-gray-400">
                  <Edit3
                    size={18}
                    onClick={() => setEditingRecord({ ...item })}
                    className="cursor-pointer hover:text-[#2FB7B2]"
                  />

                  <Trash2
                    size={18}
                    onClick={() => setDeleteCandidate(item.id)}
                    className="cursor-pointer hover:text-red-500"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* DELETE CONFIRM */}
      {deleteCandidate && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl">
            <p className="mb-4">Delete this record?</p>
            <div className="flex gap-3">
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
              <button
                onClick={() => setDeleteCandidate(null)}
                className="bg-gray-200 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[400px] space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Add Medical Record</h3>
              <X
                className="cursor-pointer"
                onClick={() => setShowAddModal(false)}
              />
            </div>

            <select
              className="w-full border p-2 rounded"
              value={newRecord.type}
              onChange={(e) =>
                setNewRecord({
                  ...newRecord,
                  type: e.target.value,
                  title: e.target.value, // show same text in timeline
                })
              }
            >
              <option value="ILLNESS">Illness</option>
              <option value="SURGERY">Surgery</option>
              <option value="OTHER">Other</option>
            </select>

            <input
              type="date"
              className="w-full border p-2 rounded"
              value={newRecord.date}
              onChange={(e) =>
                setNewRecord({ ...newRecord, date: e.target.value })
              }
            />

            <textarea
              placeholder="Description"
              className="w-full border p-2 rounded"
              value={newRecord.description}
              onChange={(e) =>
                setNewRecord({
                  ...newRecord,
                  description: e.target.value,
                })
              }
            />

            <button
              onClick={handleAddRecord}
              className="w-full bg-[#2FB7B2] text-white py-2 rounded-xl"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* EDIT MODAL */}
      {editingRecord && (
        <div className="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-[400px] space-y-4">
            <h3 className="font-semibold text-lg">Edit Record</h3>

            <select
              className="w-full border p-2 rounded"
              value={editingRecord.type}
              onChange={(e) =>
                setEditingRecord({
                  ...editingRecord,
                  type: e.target.value,
                  title: e.target.value,
                })
              }
            >
              <option value="ILLNESS">Illness</option>
              <option value="SURGERY">Surgery</option>
              <option value="OTHER">Other</option>
            </select>

            <input
              type="date"
              className="w-full border p-2 rounded"
              value={editingRecord.date}
              onChange={(e) =>
                setEditingRecord({
                  ...editingRecord,
                  date: e.target.value,
                })
              }
            />

            <textarea
              className="w-full border p-2 rounded"
              value={editingRecord.description}
              onChange={(e) =>
                setEditingRecord({
                  ...editingRecord,
                  description: e.target.value,
                })
              }
            />

            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex-1 bg-[#2FB7B2] text-white py-2 rounded"
              >
                Save
              </button>

              <button
                onClick={() => setEditingRecord(null)}
                className="flex-1 bg-gray-200 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
