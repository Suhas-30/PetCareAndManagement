import { useState } from "react";

export default function AddSessionModal({ onClose, onSave }) {

  const [startTime,setStartTime] = useState("");
  const [endTime,setEndTime] = useState("");

  const handleSubmit = () => {
    if(!startTime || !endTime) return;

    onSave({ startTime, endTime });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">

      <div className="bg-white w-[380px] rounded-2xl p-6 shadow-xl">

        <h3 className="text-lg font-semibold mb-4">
          Add Session
        </h3>

        <input
          type="time"
          value={startTime}
          onChange={e=>setStartTime(e.target.value)}
          className="w-full border rounded-lg p-2 mb-4"
        />

        <input
          type="time"
          value={endTime}
          onChange={e=>setEndTime(e.target.value)}
          className="w-full border rounded-lg p-2 mb-6"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose}>Cancel</button>

          <button
            onClick={handleSubmit}
            className="bg-[#2FB7B2] text-white px-4 py-2 rounded-lg"
          >
            Add
          </button>
        </div>

      </div>
    </div>
  );
}