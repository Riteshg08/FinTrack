import { useState } from "react";
import { X } from "lucide-react";

const categories = [
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

function AddBudgetModal({ onSubmit, onClose }) {
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ category, amount });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Create Budget</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            className="input-field"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Budget Amount"
            className="input-field"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0"
          />

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1 py-3">
              Save Budget
            </button>
            <button type="button" onClick={onClose} className="btn-secondary py-3">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBudgetModal;
