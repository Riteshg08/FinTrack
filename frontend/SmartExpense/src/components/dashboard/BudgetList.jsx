import { Link } from "react-router-dom";

const BAR_COLORS = ["#22C55E", "#14B8A6", "#F59E0B", "#EF4444", "#5B64F2"];

function BudgetList({ categories = [], monthLabel }) {
  const withBudget = [];
  const spentOnly = [];

  for (let i = 0; i < categories.length; i++) {
    const item = categories[i];
    if (item.budget > 0) {
      withBudget.push(item);
    } else if (item.budget === 0 && item.spent > 0) {
      spentOnly.push(item);
    }
  }

  let display = spentOnly;
  if (withBudget.length > 0) {
    display = withBudget;
  }

  let progressLabel = "Monthly progress";
  if (monthLabel) {
    progressLabel = monthLabel + " progress";
  }

  return (
    <div className="card-padded">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">Budgets</h2>
        <p className="text-sm text-slate-500 mt-0.5">
          {progressLabel}
        </p>
      </div>

      {display.length === 0 ? (
        <p className="text-slate-500 text-sm">
          No spending or budgets for this month.{" "}
          <Link to="/dashboard/budget" className="text-primary hover:underline">
            Set a budget
          </Link>
        </p>
      ) : (
        <div className="space-y-5">
          {display.slice(0, 5).map((item, index) => {
            let pct = 0;
            if (item.budget > 0) {
              pct = Math.min((item.spent / item.budget) * 100, 100);
            }

            const isOver = item.isOverBudget || item.spent > item.budget;

            let color = BAR_COLORS[index % BAR_COLORS.length];
            if (isOver) {
              color = "#EF4444";
            }

            return (
              <div key={item.category}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-slate-800">
                    {item.category}
                  </span>
                  <span className="text-xs text-slate-500">
                    {item.budget > 0 ? (
                      <>
                        ₹{Number(item.spent).toLocaleString("en-IN")} / ₹
                        {Number(item.budget).toLocaleString("en-IN")}
                      </>
                    ) : (
                      <>₹{Number(item.spent).toLocaleString("en-IN")} spent</>
                    )}
                  </span>
                </div>
                {item.budget > 0 ? (
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${pct}%`,
                        backgroundColor: color,
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-slate-300"
                      style={{ width: "100%" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BudgetList;
