import {
  Building2,
  Briefcase,
  TrendingUp,
  Wallet,
  Pencil,
  Trash2,
} from "lucide-react";

function getSourceIcon(source = "") {
  const lower = source.toLowerCase();

  if (lower.includes("salary") || lower.includes("employment")) {
    return Building2;
  }
  if (lower.includes("freelance") || lower.includes("contract")) {
    return Briefcase;
  }
  if (
    lower.includes("invest") ||
    lower.includes("dividend") ||
    lower.includes("stock")
  ) {
    return TrendingUp;
  }
  return Wallet;
}

function IncomeRecentList({ incomes, onEdit, onDelete }) {
  const hasIncomes = incomes && incomes.length > 0;

  if (!hasIncomes) {
    return (
      <div className="card-padded">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Recent income</h2>
        <p className="text-slate-500 text-sm">No income recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="card-padded">
      <h2 className="text-lg font-bold text-slate-900 mb-5">Recent income</h2>

      <div className="space-y-3">
        {incomes.map((income) => {
          const Icon = getSourceIcon(income.source);
          const date = new Date(income.incomeDate);

          let badgeText = income.source;
          if (income.recurring) {
            badgeText = "Recurring";
          }

          return (
            <div
              key={income._id}
              className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50/50 transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary-50 flex items-center justify-center shrink-0">
                <Icon size={18} className="text-primary" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-slate-900 truncate">
                  {income.source}
                </p>
                <p className="text-xs text-slate-400 mt-0.5">
                  {date.toLocaleDateString("en-IN", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              <span className="hidden sm:inline-flex text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 shrink-0">
                {badgeText}
              </span>

              <p className="text-sm font-bold text-green-600 shrink-0">
                +₹{Number(income.amount).toLocaleString("en-IN")}
              </p>

              <div className="flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                <button
                  onClick={() => onEdit(income)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-primary-50 transition-colors"
                  aria-label="Edit"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => onDelete(income._id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                  aria-label="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default IncomeRecentList;
