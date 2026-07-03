import { Pencil, Trash2 } from "lucide-react";

function IncomeTable({ incomes, onEdit, onDelete }) {
  const hasIncomes = incomes && incomes.length > 0;

  if (!hasIncomes) {
    return (
      <div className="card-padded">
        <h2 className="font-bold text-lg text-slate-900 mb-4">Income History</h2>
        <p className="text-slate-500 text-sm">No income recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="card-padded">
      <h2 className="font-bold text-lg text-slate-900 mb-6">Income History</h2>

      <div className="table-wrapper">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="pb-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Source</th>
              <th className="pb-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Date</th>
              <th className="pb-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Amount</th>
              <th className="pb-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody>
            {incomes.map((income) => (
              <tr key={income._id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="py-3.5 text-sm font-medium text-slate-800">{income.source}</td>
                <td className="py-3.5 text-sm text-slate-500">
                  {new Date(income.incomeDate).toLocaleDateString("en-IN")}
                </td>
                <td className="py-3.5 text-sm font-semibold text-green-600">
                  ₹{Number(income.amount).toLocaleString("en-IN")}
                </td>
                <td className="py-3.5">
                  <div className="flex gap-1">
                    <button
                      onClick={() => onEdit(income)}
                      className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-primary-50 transition-colors"
                      aria-label="Edit"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => onDelete(income._id)}
                      className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                      aria-label="Delete"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IncomeTable;
