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

const paymentMethods = [
  "Cash",
  "Card",
  "UPI",
  "Net Banking",
  "Other",
];

function toDateInputValue(date) {
  const d = new Date(date);
  if (isNaN(d.getTime())) {
    return new Date().toISOString().slice(0, 10);
  }
  const offset = d.getTimezoneOffset();
  const local = new Date(d.getTime() - offset * 60 * 1000);
  return local.toISOString().slice(0, 10);
}

function AddExpenseModal({ onSubmit, onClose, expense = null }) {
  const isEdit = expense ? true : false;

  let initialTitle = "";
  let initialAmount = "";
  let initialCategory = "Food";
  let initialPaymentMethod = "UPI";
  let initialNotes = "";
  let initialDate = toDateInputValue(new Date());

  if (expense) {
    initialTitle = expense.title || "";
    initialAmount = expense.amount ? expense.amount.toString() : "";
    initialCategory = expense.category || "Food";
    initialPaymentMethod = expense.paymentMethod || "UPI";
    initialNotes = expense.notes || "";
    if (expense.expenseDate) {
      initialDate = toDateInputValue(expense.expenseDate);
    }
  }

  const [title, setTitle] = useState(initialTitle);
  const [amount, setAmount] = useState(initialAmount);
  const [category, setCategory] = useState(initialCategory);
  const [paymentMethod, setPaymentMethod] = useState(initialPaymentMethod);
  const [notes, setNotes] = useState(initialNotes);
  const [expenseDate, setExpenseDate] = useState(initialDate);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({
      title,
      amount,
      category,
      paymentMethod,
      notes,
      expenseDate,
    });
  }

  let modalTitle = "Add Expense";
  let submitText = "Save Expense";
  if (isEdit) {
    modalTitle = "Edit Expense";
    submitText = "Update Expense";
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-900">{modalTitle}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <X size={18} className="text-slate-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            placeholder="Merchant / Title"
            className="input-field"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <input
            type="number"
            placeholder="Amount"
            className="input-field"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            min="0"
            step="0.01"
          />

          <div>
            <label className="text-sm font-medium text-slate-700 mb-1.5 block">
              Date
            </label>
            <input
              type="date"
              className="input-field"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
              required
            />
          </div>

          <select
            className="input-field"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>

          <select
            className="input-field"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            {paymentMethods.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>

          <textarea
            className="input-field resize-none"
            placeholder="Notes (optional)"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />

          <div className="flex gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1 py-3">
              {submitText}
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
      </div>
    </div>
  );
}

export default AddExpenseModal;
