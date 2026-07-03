import { AlertTriangle } from "lucide-react";

function OverBudgetAlert({ overBudget }) {
  const hasAlerts = overBudget && overBudget.length > 0;
  if (!hasAlerts) {
    return null;
  }

  return (
    <div className="bg-red-50 border border-red-200 rounded-2xl p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle size={20} className="text-red-500" />
        <h2 className="font-bold text-red-600">Over Budget Alerts</h2>
      </div>

      <div className="space-y-2">
        {overBudget.map((item) => (
          <p key={item.category} className="text-sm text-red-700">
            You exceeded your{" "}
            <span className="font-bold">{item.category}</span> budget by ₹
            {Number(item.extraSpent).toLocaleString("en-IN")}
          </p>
        ))}
      </div>
    </div>
  );
}

export default OverBudgetAlert;
