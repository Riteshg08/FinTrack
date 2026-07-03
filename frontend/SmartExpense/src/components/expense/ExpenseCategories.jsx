import { buildMonthCategories } from "../../utils/dashboardHelpers";

const CATEGORY_COLORS = [
  "#EF4444", // Red
  "#3B82F6", // Blue
  "#10B981", // Green
  "#F59E0B", // Orange
  "#8B5CF6", // Purple
  "#EC4899", // Pink
  "#06B6D4", // Cyan
  "#64748B", // Slate
];

function ExpenseCategories({ expenses, month, year }) {
  const categories = buildMonthCategories(expenses, month, year);

  return (
    <div className="card-padded h-full">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Expense Categories</h2>

      {categories.length === 0 ? (
        <p className="text-slate-500 text-sm">No expenses for this month.</p>
      ) : (
        <div className="space-y-5">
          {categories.map((cat, index) => (
            <div key={cat.category}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-800">
                  {cat.category}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400">
                    ₹{Number(cat.amount).toLocaleString("en-IN")}
                  </span>
                  <span className="text-sm font-semibold text-slate-600">
                    {cat.percent}%
                  </span>
                </div>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: cat.percent + "%",
                    backgroundColor:
                      CATEGORY_COLORS[index % CATEGORY_COLORS.length],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExpenseCategories;
