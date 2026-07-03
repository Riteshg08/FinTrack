function BudgetProgress({ budget }) {
  if (!budget) {
    return (
      <div className="card-padded">
        <h2 className="text-lg font-bold text-slate-900 mb-2">Budget Overview</h2>
        <p className="text-slate-500 text-sm">No budget data available yet.</p>
      </div>
    );
  }

  let totalBudget = 0;
  let totalSpent = 0;
  let remaining = 0;
  let isOverBudget = false;

  if (budget) {
    totalBudget = budget.totalBudget || 0;
    totalSpent = budget.totalSpent || 0;
    remaining = budget.remaining || totalBudget - totalSpent;
    isOverBudget = budget.isOverBudget || totalSpent > totalBudget;
  }

  let percentage = 0;
  if (totalBudget > 0) {
    percentage = Math.min((totalSpent / totalBudget) * 100, 100);
  } else if (totalSpent > 0) {
    percentage = 100;
  }

  return (
    <div className="card-padded">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Budget Overview</h2>

      {totalBudget === 0 ? (
        <p className="text-slate-500 text-sm mb-4">
          No monthly budget set.{" "}
          {totalSpent > 0 &&
            `You've spent ₹${Number(totalSpent).toLocaleString("en-IN")} this month.`}
        </p>
      ) : (
        <>
          <div className="flex items-end justify-between mb-4">
            <div>
              <p className="text-slate-500 text-sm">Spent</p>
              <p className="text-2xl font-bold text-slate-900">
                ₹{Number(totalSpent).toLocaleString("en-IN")}
              </p>
            </div>
            <div className="text-right">
              <p className="text-slate-500 text-sm">Total Budget</p>
              <p className="text-2xl font-bold text-slate-900">
                ₹{Number(totalBudget).toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isOverBudget ? "bg-red-500" : "bg-primary"
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>

          <div className="flex justify-between mt-3 text-sm">
            <span
              className={`font-medium ${isOverBudget ? "text-red-500" : "text-primary"}`}
            >
              {totalBudget > 0 ? `${percentage.toFixed(0)}% used` : "—"}
            </span>
            <span className="text-slate-500">
              ₹{Number(remaining).toLocaleString("en-IN")} remaining
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default BudgetProgress;
