import { useState } from "react";
import { X } from "lucide-react";

const CATEGORIES = [
  "Food",
  "Transport",
  "Entertainment",
  "Utilities",
  "Education",
  "Housing",
  "Travel",
  "Shopping",
  "Health",
  "Other",
];

function AddCategoryBudgetModal({
  onSubmit,
  onClose,
  existingCategories = [],
  monthlyBudget = 0,
  allocatedSoFar = 0,
}) {
  const available = [];
  for (let i = 0; i < CATEGORIES.length; i++) {
    const cat = CATEGORIES[i];
    if (!existingCategories.includes(cat)) {
      available.push(cat);
    }
  }

  let defaultCategory = "Food";
  if (available.length > 0) {
    defaultCategory = available[0];
  }

  const [category, setCategory] = useState(defaultCategory);
  const [amount, setAmount] = useState("");

  const remainingPool = monthlyBudget - allocatedSoFar;
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const value = Number(amount);

    if (allocatedSoFar + value > monthlyBudget) {
      setError("Category budget is exceeding the overall budget");
      return;
    }

    setError("");
    onSubmit({ category, amount: value });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Allocate category budget
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Split your monthly budget by category
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        {available.length === 0 ? (
          <p className="text-slate-500 text-sm py-4">
            All categories already have a budget for this month.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {monthlyBudget > 0 && (
              <div className="bg-primary-50 text-primary text-sm px-4 py-3 rounded-xl border border-primary-100">
                ₹{remainingPool.toLocaleString("en-IN")} left to allocate from
                monthly budget
              </div>
            )}

            {error && (
              <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-100">
                {error}
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                Category
              </label>
              <select
                className="input-field"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {available.map((cat) => (
                  <option key={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700 mb-1.5 block">
                Allocated amount (₹)
              </label>
              <input
                type="number"
                placeholder="e.g. 5000"
                className="input-field"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  setError("");
                }}
                required
                min="1"
                max={remainingPool > 0 ? remainingPool : 0}
                step="1"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="btn-primary flex-1 py-3"
                disabled={remainingPool <= 0}
              >
                Add allocation
              </button>
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary py-3"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AddCategoryBudgetModal;
