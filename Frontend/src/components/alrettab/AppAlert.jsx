import { useEffect } from "react";

export default function AppAlert({ message, type = "success", onClose }) {

  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  const styles = {
    success: {
      title: "Success",
      icon: "✓",
      iconBg: "bg-green-500",
      bar: "from-green-400 to-emerald-500",
    },
    error: {
      title: "Error",
      icon: "✕",
      iconBg: "bg-red-500",
      bar: "from-red-500 to-rose-500",
    },
    warning: {
      title: "Warning",
      icon: "!",
      iconBg: "bg-yellow-500",
      bar: "from-yellow-400 to-amber-500",
    },
    info: {
      title: "Info",
      icon: "i",
      iconBg: "bg-blue-500",
      bar: "from-blue-400 to-cyan-500",
    },
  };

  const current = styles[type] || styles.success;

  return (
    <div className="fixed top-6 right-6 z-[999] animate-slideIn">
      <div className="bg-white rounded-2xl shadow-xl border w-[320px] overflow-hidden">

        {/* Top Gradient Bar */}
        <div className={`h-1 bg-gradient-to-r ${current.bar}`} />

        <div className="p-4 flex gap-3">
          <div className={`w-8 h-8 rounded-full text-white flex items-center justify-center font-semibold ${current.iconBg}`}>
            {current.icon}
          </div>

          <div className="flex-1">
            <p className="font-semibold text-gray-800">{current.title}</p>
            <p className="text-sm text-gray-500">{message}</p>
          </div>
        </div>

      </div>
    </div>
  );
}