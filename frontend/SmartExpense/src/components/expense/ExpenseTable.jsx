import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Pencil,
  Trash2,
  ShoppingBag,
  Car,
  Utensils,
  Zap,
  Home,
  Plane,
  Heart,
  GraduationCap,
  Gamepad2,
  Package,
} from "lucide-react";

const CATEGORIES = [
  "All categories",
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

const CATEGORY_ICONS = {
  Food: Utensils,
  Transport: Car,
  Entertainment: Gamepad2,
  Utilities: Zap,
  Education: GraduationCap,
  Housing: Home,
  Travel: Plane,
  Shopping: ShoppingBag,
  Health: Heart,
  Other: Package,
};

function getMerchantIcon(category) {
  if (CATEGORY_ICONS[category]) {
    return CATEGORY_ICONS[category];
  }
  return Package;
}

function ExpenseTable({ expenses, onDelete, onEdit }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");

  // filter list based on search text and category
  const filtered = [];
  for (let i = 0; i < expenses.length; i++) {
    const exp = expenses[i];
    const searchText = search.toLowerCase();

    let matchesSearch = true;
    if (search) {
      const titleMatch =
        exp.title && exp.title.toLowerCase().includes(searchText);
      const categoryMatch =
        exp.category && exp.category.toLowerCase().includes(searchText);
      matchesSearch = titleMatch || categoryMatch;
    }

    let matchesCategory = true;
    if (category !== "All categories") {
      matchesCategory = exp.category === category;
    }

    if (matchesSearch && matchesCategory) {
      filtered.push(exp);
    }
  }

  let emptyMessage = "No expenses match your search.";
  if (expenses.length === 0) {
    emptyMessage = "No expenses recorded yet.";
  }

  return (
    <div className="card overflow-hidden">
      <div className="p-5 sm:p-6 border-b border-slate-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-900">All expenses</h2>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search expenses..."
                className="input-field pl-9 py-2.5 text-sm w-full sm:w-52"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <select
              className="input-field py-2.5 text-sm w-full sm:w-40"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>

            <button className="btn-secondary inline-flex items-center justify-center gap-2 py-2.5 text-sm">
              <SlidersHorizontal size={15} />
              Filters
            </button>
          </div>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="p-10 text-center">
          <p className="text-slate-500 text-sm">{emptyMessage}</p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="py-3 pl-5 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Title
                </th>
                <th className="py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="py-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Method
                </th>
                <th className="py-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider pr-5">
                  Amount
                </th>
                <th className="py-3 w-20" />
              </tr>
            </thead>

            <tbody>
              {filtered.map((expense) => {
                const Icon = getMerchantIcon(expense.category);
                const date = new Date(expense.expenseDate);
                let paymentMethod = "Other";
                if (expense.paymentMethod) {
                  paymentMethod = expense.paymentMethod;
                }

                return (
                  <tr
                    key={expense._id}
                    className="border-b border-slate-50 hover:bg-slate-50/60 transition-colors group"
                  >
                    <td className="py-4 pl-5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                          <Icon size={16} className="text-slate-500" />
                        </div>
                        <span className="text-sm font-medium text-slate-800">
                          {expense.title}
                        </span>
                      </div>
                    </td>

                    <td className="py-4">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                        {expense.category}
                      </span>
                    </td>

                    <td className="py-4 text-sm text-slate-500">
                      {date.toLocaleDateString("en-IN", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    <td className="py-4 text-sm text-slate-500">
                      {paymentMethod}
                    </td>

                    <td className="py-4 text-right pr-5">
                      <span className="text-sm font-bold text-slate-900">
                        -₹
                        {Number(expense.amount).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </span>
                    </td>

                    <td className="py-4 pr-4">
                      <div className="flex gap-0.5 justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => onEdit(expense)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-primary hover:bg-primary-50 transition-colors"
                        >
                          <Pencil size={14} />
                        </button>

                        <button
                          onClick={() => onDelete(expense._id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ExpenseTable;
