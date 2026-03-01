import { useEffect } from "react";

export default function AppAlert({ message, type = "success", onClose }) {

  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  /* ---------- STYLE CONFIG ---------- */

  const styles = {
    success: {
      title: "Success",
      iconBg: "bg-green-500",
      bar: "from-green-400 to-emerald-500",
    },
    warning: {
      title: "Warning",
      iconBg: "bg-red-500",
      bar: "from-red-500 to-rose-500",
    },
    error: {
      title: "Error",
      iconBg: "bg-red-600",
      bar: "from-red-600 to-red-400",
    },
  };

  const current = styles[type] || styles.success;

  return (
    <div className="fixed top-6 right-6 z-50 animate-slideIn">
      <div className="bg-white rounded-2xl shadow-xl border w-[320px] overflow-hidden">

        {/* TOP BAR */}
        <div className={`h-1 bg-gradient-to-r ${current.bar}`} />

        <div className="p-5 flex gap-3">
          <div
            className={`w-8 h-8 rounded-full text-white flex items-center justify-center ${current.iconBg}`}
          >
            ✓
          </div>

          <div className="flex-1">
            <p className="font-semibold text-gray-800">
              {current.title}
            </p>
            <p className="text-sm text-gray-500">{message}</p>
          </div>
        </div>

      </div>
    </div>
  );
}