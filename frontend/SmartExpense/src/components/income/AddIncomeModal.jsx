import { useState } from "react";
import { X } from "lucide-react";

function AddIncomeModal({ onSubmit, onClose }) {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({ source, amount, notes });
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">Add Income</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 transition-colors">
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Source (e.g. Salary)"
            className="input-field"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            required
          />

          <input
            placeholder="Amount"
            type="number"
            className="input-field"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0"
          />

          <textarea
            placeholder="Notes (optional)"
            className="input-field resize-none"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1 py-3">
              Save Income
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

export default AddIncomeModal;
