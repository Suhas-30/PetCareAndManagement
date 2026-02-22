export default function DashboardContainer({ title, children }) {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">{title}</h1>

      <div className="bg-white rounded-2xl shadow-sm p-6">
        {children}
      </div>
    </div>
  );
}