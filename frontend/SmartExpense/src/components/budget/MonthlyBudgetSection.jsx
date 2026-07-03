import { useState } from "react";
import { Pencil, Wallet } from "lucide-react";

function MonthlyBudgetSection({
  budgetStatus,
  onSave,
  saving,
}) {
  const [editing, setEditing] = useState(false);
  const [amount, setAmount] = useState("");

  const hasBudget = budgetStatus && budgetStatus.totalBudget > 0;

  let percentage = 0;
  if (hasBudget) {
    percentage = Math.min(budgetStatus.percentageUsed, 100);
  }

  let isOver = false;
  if (budgetStatus && budgetStatus.isOverBudget) {
    isOver = budgetStatus.isOverBudget;
  }

  function openEdit() {
    if (hasBudget) {
      setAmount(String(budgetStatus.totalBudget));
    } else {
      setAmount("");
    }
    setEditing(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const success = await onSave(Number(amount));
    if (success) setEditing(false);
  };

  const monthLabel = new Date().toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  let formTitle = "Set monthly budget";
  if (hasBudget) {
    formTitle = "Update monthly budget";
  }

  let saveButtonText = "Set Budget";
  if (saving) {
    saveButtonText = "Saving...";
  } else if (hasBudget) {
    saveButtonText = "Update";
  }

  if (!hasBudget || editing) {
    return (
      <div className="card-padded border-2 border-primary/20 bg-primary-50/30">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0">
            <Wallet size={22} className="text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-bold text-slate-900">
              {formTitle}
              <span className="text-red-500 ml-1">*</span>
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Required for {monthLabel}. Set your total spending limit before
              allocating category budgets.
            </p>

            <form onSubmit={handleSubmit} className="mt-5 flex flex-col sm:flex-row gap-3">
              <input
                type="number"
                placeholder="Total monthly budget (₹)"
                className="input-field flex-1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min="1"
                step="1"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary py-3 px-6 disabled:opacity-60"
                >
                  {saveButtonText}
                </button>
                {hasBudget && editing && (
                  <button
                    type="button"
                    onClick={() => setEditing(false)}
                    className="btn-secondary py-3"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card-padded">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Monthly Budget</h2>
          <p className="text-sm text-slate-500 mt-0.5">{monthLabel}</p>
        </div>
        <button
          onClick={openEdit}
          className="btn-secondary inline-flex items-center gap-2 text-sm py-2"
        >
          <Pencil size={14} />
          Edit
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
        <div>
          <p className="text-slate-500 text-sm">Total Budget</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            ₹{Number(budgetStatus.totalBudget).toLocaleString("en-IN")}
          </p>
        </div>
        <div>
          <p className="text-slate-500 text-sm">Used</p>
          <p className="text-2xl font-bold text-red-500 mt-1">
            ₹{Number(budgetStatus.totalSpent).toLocaleString("en-IN")}
          </p>
        </div>
        <div>
          <p className="text-slate-500 text-sm">Remaining</p>
          <p className="text-2xl font-bold text-primary mt-1">
            ₹{Number(budgetStatus.remaining).toLocaleString("en-IN")}
          </p>
        </div>
        <div>
          <p className="text-slate-500 text-sm">Utilization</p>
          <p className="text-2xl font-bold text-slate-900 mt-1">
            {budgetStatus.percentageUsed}%
          </p>
        </div>
      </div>

      <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isOver ? "bg-red-500" : "bg-primary"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default MonthlyBudgetSection;
