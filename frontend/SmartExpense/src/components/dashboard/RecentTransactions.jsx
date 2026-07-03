import { Link } from "react-router-dom";
import {
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
  Wallet,
} from "lucide-react";
import { formatRelativeDate } from "../../utils/dashboardHelpers";

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
  Income: Wallet,
};

const CATEGORY_COLORS = {
  Food: "bg-purple-50 text-purple-700",
  Transport: "bg-orange-50 text-orange-700",
  Entertainment: "bg-pink-50 text-pink-700",
  Utilities: "bg-yellow-50 text-yellow-700",
  Education: "bg-blue-50 text-blue-700",
  Housing: "bg-indigo-50 text-indigo-700",
  Travel: "bg-cyan-50 text-cyan-700",
  Shopping: "bg-violet-50 text-violet-700",
  Health: "bg-red-50 text-red-700",
  Other: "bg-slate-100 text-slate-600",
  Income: "bg-green-50 text-green-700",
};

function RecentTransactions({ transactions }) {
  const hasTransactions = transactions && transactions.length > 0;

  if (!hasTransactions) {
    return (
      <div className="card-padded">
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          Recent transactions
        </h2>
        <p className="text-slate-500 text-sm">No transactions yet.</p>
      </div>
    );
  }

  return (
    <div className="card-padded">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-slate-900">Recent transactions</h2>
        <Link
          to="/dashboard/expenses"
          className="text-sm text-primary font-medium hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="overflow-x-auto -mx-2">
        <table className="w-full min-w-[480px]">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="pb-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider pl-2">
                Merchant
              </th>
              <th className="pb-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Category
              </th>
              <th className="pb-3 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider hidden sm:table-cell">
                Date
              </th>
              <th className="pb-3 text-right text-xs font-semibold text-slate-400 uppercase tracking-wider pr-2">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => {
              let Icon = Package;
              if (CATEGORY_ICONS[t.category]) {
                Icon = CATEGORY_ICONS[t.category];
              }

              let badgeColor = CATEGORY_COLORS.Other;
              if (CATEGORY_COLORS[t.category]) {
                badgeColor = CATEGORY_COLORS[t.category];
              }

              const isIncome = t.type === "income";

              return (
                <tr
                  key={`${t.type}-${t._id}`}
                  className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-3.5 pl-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                        <Icon size={14} className="text-slate-500" />
                      </div>
                      <span className="text-sm font-medium text-slate-800 truncate max-w-[120px] sm:max-w-none">
                        {t.label}
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5">
                    <span
                      className={`text-xs font-medium px-2 py-1 rounded-full ${badgeColor}`}
                    >
                      {t.category}
                    </span>
                  </td>
                  <td className="py-3.5 text-sm text-slate-500 hidden sm:table-cell">
                    {formatRelativeDate(t.date)}
                  </td>
                  <td className="py-3.5 text-right pr-2">
                    <span
                      className={`text-sm font-bold ${
                        isIncome ? "text-green-600" : "text-slate-900"
                      }`}
                    >
                      {isIncome ? "+" : "-"}₹
                      {Number(t.amount).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentTransactions;
