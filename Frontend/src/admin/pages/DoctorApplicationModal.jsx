import { useState } from "react";
import {
  approveDoctorApplication,
  rejectDoctorApplication,
} from "../services/adminDoctorService";

export default function DoctorApplicationModal({
  application,
  actionType,
  onClose,
}) {
  const [rejectReason, setRejectReason] = useState("");
  const [processing, setProcessing] = useState(false);

  if (!application) return null;

  const handleApprove = async () => {
    setProcessing(true);
    await approveDoctorApplication(application.id);
    onClose();
  };

  const handleReject = async () => {
    setProcessing(true);
    await rejectDoctorApplication(application.id, rejectReason);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white w-[750px] p-6 rounded-xl max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Doctor Details</h3>

        <p>
          <b>Name:</b> {application.fullName}
        </p>
        <p>
          <b>Email:</b> {application.email}
        </p>
        <p>
          <b>Clinic:</b> {application.clinicName}
        </p>

        {/* ✅ PDF INLINE VIEW */}
        <div className="mt-5">
          <h4 className="font-semibold mb-2">Certificate</h4>

          <iframe
            src={`http://localhost:8080${application.certificateUrl}`}
            className="w-full h-[400px] border rounded"
            title="certificate"
          />
        </div>

        {actionType === "reject" && (
          <textarea
            className="w-full border mt-4 p-2"
            placeholder="Reject reason"
            onChange={(e) => setRejectReason(e.target.value)}
          />
        )}

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Close
          </button>

          {actionType === "approve" && (
            <button
              onClick={handleApprove}
              className="px-4 py-2 bg-green-500 text-white rounded"
            >
              {processing ? "Processing..." : "Confirm Approve"}
            </button>
          )}

          {actionType === "reject" && (
            <button
              onClick={handleReject}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              {processing ? "Processing..." : "Confirm Reject"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
