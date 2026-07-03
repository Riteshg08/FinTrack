import { Trash2 } from "lucide-react";

function CategoryBudgetTable({
  categories,
  totalMonthlyBudget,
  onDelete,
}) {
  let allocatedTotal = 0;
  const activeRows = [];

  for (let i = 0; i < categories.length; i++) {
    const c = categories[i];
    allocatedTotal = allocatedTotal + (c.budget || 0);
    if (c.budget > 0 || c.spent > 0) {
      activeRows.push(c);
    }
  }

  if (activeRows.length === 0) {
    return (
      <div className="card-padded text-center py-12">
        <p className="text-slate-500 text-sm">
          No category budgets allocated yet. Add categories to split your
          monthly budget.
        </p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="p-5 sm:p-6 border-b border-slate-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Category allocations
            </h2>
            <p className="text-sm text-slate-500 mt-0.5">
              Allocated vs used per category
            </p>
          </div>
          {totalMonthlyBudget > 0 && (
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-primary">
                ₹{allocatedTotal.toLocaleString("en-IN")}
              </span>{" "}
              allocated of ₹{totalMonthlyBudget.toLocaleString("en-IN")} monthly
              {allocatedTotal > totalMonthlyBudget && (
                <span className="text-red-500 ml-2 font-medium">
                  (exceeds monthly budget)
                </span>
              )}
            </p>
          )}
        </div>
      </div>

      <div className="table-wrapper">
        <table className="w-full min-w-[640px]">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100">
              <th className="py-3 pl-5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Category
              </th>
              <th className="py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Allocated
              </th>
              <th className="py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Used
              </th>
              <th className="py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Remaining
              </th>
              <th className="py-3 text-center text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Progress
              </th>
              <th className="py-3 pr-5 w-12" />
            </tr>
          </thead>
          <tbody>
            {activeRows.map((item) => {
              let pct = 0;
              if (item.budget > 0) {
                pct = Math.min((item.spent / item.budget) * 100, 100);
              } else if (item.spent > 0) {
                pct = 100;
              }

              const isOver = item.isOverBudget || item.spent > item.budget;

              let remainingAmount = item.budget - item.spent;
              if (item.remaining !== undefined && item.remaining !== null) {
                remainingAmount = item.remaining;
              }

              return (
                <tr
                  key={item.category}
                  className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-4 pl-5">
                    <span className="text-sm font-medium text-slate-800">
                      {item.category}
                    </span>
                  </td>
                  <td className="py-4 text-right text-sm font-semibold text-slate-800">
                    {item.budget > 0
                      ? `₹${Number(item.budget).toLocaleString("en-IN")}`
                      : "—"}
                  </td>
                  <td className="py-4 text-right text-sm font-semibold text-red-500">
                    ₹{Number(item.spent).toLocaleString("en-IN")}
                  </td>
                  <td className="py-4 text-right text-sm font-medium text-primary">
                    {item.budget > 0
                      ? `₹${Number(remainingAmount).toLocaleString("en-IN")}`
                      : "—"}
                  </td>
                  <td className="py-4 px-4">
                    {item.budget > 0 ? (
                      <div className="flex items-center gap-2 min-w-[120px]">
                        <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              isOver ? "bg-red-500" : "bg-primary"
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span
                          className={`text-xs font-medium w-8 text-right ${
                            isOver ? "text-red-500" : "text-slate-600"
                          }`}
                        >
                          {pct.toFixed(0)}%
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">No budget</span>
                    )}
                  </td>
                  <td className="py-4 pr-5">
                    {item._id && (
                      <button
                        onClick={() => onDelete(item._id)}
                        className="p-2 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        aria-label="Remove allocation"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CategoryBudgetTable;
