import {
  Receipt,
  ArrowLeftRight,
  CalendarDays,
  RefreshCw,
} from "lucide-react";
import { isInMonth } from "../../utils/dashboardHelpers";

function ExpenseStatCard({
  title,
  value,
  subtitle,
  trend = "neutral",
  icon: Icon,
  isCurrency = true,
}) {
  const trendColors = {
    positive: "text-green-600",
    negative: "text-red-500",
    neutral: "text-slate-400",
  };

  let displayValue = value;
  if (isCurrency) {
    displayValue =
      "₹" +
      Number(value).toLocaleString("en-IN", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
      });
  }

  return (
    <div className="card p-5 sm:p-6 relative">
      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center">
        <Icon size={17} className="text-slate-400" />
      </div>

      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider pr-10">
        {title}
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
        {displayValue}
      </h2>

      {subtitle && (
        <p className={`text-xs mt-3 ${trendColors[trend]}`}>{subtitle}</p>
      )}
    </div>
  );
}

export function computeExpenseStats(expenses = [], month, year) {
  const now = new Date();

  let targetMonth = now.getMonth();
  if (month !== undefined && month !== null) {
    targetMonth = month;
  }

  let targetYear = now.getFullYear();
  if (year !== undefined && year !== null) {
    targetYear = year;
  }

  const isCurrentMonth =
    targetMonth === now.getMonth() && targetYear === now.getFullYear();

  // get expenses for selected month
  const thisMonth = [];
  for (let i = 0; i < expenses.length; i++) {
    const e = expenses[i];
    const date = e.expenseDate || e.createdAt;
    if (isInMonth(date, targetMonth, targetYear)) {
      thisMonth.push(e);
    }
  }

  let prevMonth = targetMonth - 1;
  let prevYear = targetYear;
  if (targetMonth === 0) {
    prevMonth = 11;
    prevYear = targetYear - 1;
  }

  // get expenses for previous month
  const lastMonth = [];
  for (let i = 0; i < expenses.length; i++) {
    const e = expenses[i];
    const date = e.expenseDate || e.createdAt;
    if (isInMonth(date, prevMonth, prevYear)) {
      lastMonth.push(e);
    }
  }

  let spendThisMonth = 0;
  for (let i = 0; i < thisMonth.length; i++) {
    spendThisMonth = spendThisMonth + Number(thisMonth[i].amount);
  }

  let lastMonthSpend = 0;
  for (let i = 0; i < lastMonth.length; i++) {
    lastMonthSpend = lastMonthSpend + Number(lastMonth[i].amount);
  }

  let spendChange = null;
  if (lastMonthSpend > 0) {
    spendChange = (
      ((spendThisMonth - lastMonthSpend) / lastMonthSpend) *
      100
    ).toFixed(1);
  }

  const daysInMonth = new Date(targetYear, targetMonth + 1, 0).getDate();
  let dayDivisor = daysInMonth;
  if (isCurrentMonth) {
    dayDivisor = now.getDate();
  }

  let avgPerDay = 0;
  if (dayDivisor > 0) {
    avgPerDay = spendThisMonth / dayDivisor;
  }

  let lastMonthDaily = 0;
  if (lastMonthSpend > 0) {
    const daysInPrevMonth = new Date(prevYear, prevMonth + 1, 0).getDate();
    lastMonthDaily = lastMonthSpend / daysInPrevMonth;
  }

  let dailyChange = null;
  if (lastMonthDaily > 0) {
    dailyChange = (
      ((avgPerDay - lastMonthDaily) / lastMonthDaily) *
      100
    ).toFixed(1);
  }

  return {
    spendThisMonth,
    transactionCount: thisMonth.length,
    avgPerDay,
    spendChange,
    dailyChange,
    newTransactions: thisMonth.length - lastMonth.length,
  };
}

export { Receipt, ArrowLeftRight, CalendarDays, RefreshCw };
export default ExpenseStatCard;
