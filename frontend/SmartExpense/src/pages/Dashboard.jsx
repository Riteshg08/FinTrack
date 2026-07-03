/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllIncome } from "../services/incomeService";
import { getExpenses } from "../services/expenseService";
import { getCategoryBudgets } from "../services/budgetService";
import StatCard from "../components/dashboard/StatCard";
import SpendingTrendChart from "../components/dashboard/SpendingTrendChart";
import CategoryBreakdown from "../components/dashboard/CategoryBreakdown";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import BudgetList from "../components/dashboard/BudgetList";
import { Calendar, Upload } from "lucide-react";
import {
  buildMonthCategories,
  mergeRecentTransactions,
  computeDashboardTrends,
  getDefaultMonth,
  getAvailableMonths,
  getMonthLabel,
  buildBudgetProgress,
  filterByMonth,
  computeMonthSummary,
} from "../utils/dashboardHelpers";

function Dashboard() {
  const { user } = useSelector((store) => store.user);

  const [loading, setLoading] = useState(true);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [categoryBudgetDocs, setCategoryBudgetDocs] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);

  const fetchDashboard = async () => {
    try {
      const [allExpensesRes, allIncomeRes, categoryBudgetRes] =
        await Promise.all([
          getExpenses(),
          getAllIncome(),
          getCategoryBudgets(),
        ]);

      const expenseData = allExpensesRes.data.data;
      const incomeData = allIncomeRes.data.data;

      setExpenses(expenseData);
      setIncomes(incomeData);
      setCategoryBudgetDocs(categoryBudgetRes.data.data);

      const defaultMonthInfo = getDefaultMonth(expenseData, incomeData);
      setSelectedMonth(defaultMonthInfo.month);
      setSelectedYear(defaultMonthInfo.year);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // load data when page opens
  useEffect(() => {
    fetchDashboard();
  }, []);

  // figure out the label for the selected month
  let monthLabel = "";
  if (selectedMonth !== null && selectedYear !== null) {
    monthLabel = getMonthLabel(selectedMonth, selectedYear);
  }

  // get list of months that have data
  const availableMonths = getAvailableMonths(expenses, incomes);

  // calculate trends for the selected month
  let trends = null;
  if (selectedMonth !== null && selectedYear !== null) {
    trends = computeDashboardTrends(
      expenses,
      incomes,
      selectedMonth,
      selectedYear
    );
  }

  // build category breakdown for charts
  let monthCategories = [];
  if (selectedMonth !== null && selectedYear !== null) {
    monthCategories = buildMonthCategories(expenses, selectedMonth, selectedYear);
  }

  // build budget progress bars
  let budgetProgress = [];
  if (selectedMonth !== null && selectedYear !== null) {
    budgetProgress = buildBudgetProgress(
      expenses,
      categoryBudgetDocs,
      selectedMonth,
      selectedYear
    );
  }

  // get recent transactions for the list
  let recentItems = [];
  if (selectedMonth !== null && selectedYear !== null) {
    recentItems = mergeRecentTransactions(
      expenses,
      incomes,
      selectedMonth,
      selectedYear
    );
  }

  const handleMonthChange = (e) => {
    const parts = e.target.value.split("-");
    const year = Number(parts[0]);
    const month = Number(parts[1]);
    setSelectedYear(year);
    setSelectedMonth(month - 1);
  };

  let monthInputValue = "";
  if (selectedYear !== null && selectedMonth !== null) {
    const monthNumber = selectedMonth + 1;
    const monthString = String(monthNumber).padStart(2, "0");
    monthInputValue = `${selectedYear}-${monthString}`;
  }

  const handleExport = () => {
    const monthExpenses = filterByMonth(
      expenses,
      selectedMonth,
      selectedYear,
      "expenseDate"
    );
    const monthIncomes = filterByMonth(
      incomes,
      selectedMonth,
      selectedYear,
      "incomeDate"
    );
    const summary = computeMonthSummary(
      expenses,
      incomes,
      selectedMonth,
      selectedYear
    );

    const escapeCsv = (value) => {
      let text = "";
      if (value !== null && value !== undefined) {
        text = String(value);
      }
      if (/[",\n]/.test(text)) {
        return `"${text.replace(/"/g, '""')}"`;
      }
      return text;
    };

    const row = (cells) => cells.map(escapeCsv).join(",");

    const lines = [
      `Dashboard Export - ${monthLabel}`,
      "",
      "=== INCOME ===",
      row(["Source", "Date", "Amount", "Notes"]),
      ...monthIncomes.map((income) =>
        row([
          income.source,
          new Date(income.incomeDate).toLocaleDateString("en-IN"),
          income.amount,
          income.notes || "",
        ])
      ),
      row(["Total Income", "", summary.totalIncome, ""]),
      "",
      "=== EXPENSES ===",
      row(["Title", "Category", "Date", "Method", "Amount", "Notes"]),
      ...monthExpenses.map((expense) =>
        row([
          expense.title,
          expense.category,
          new Date(expense.expenseDate).toLocaleDateString("en-IN"),
          expense.paymentMethod || "Other",
          expense.amount,
          expense.notes || "",
        ])
      ),
      row(["Total Expenses", "", "", "", summary.totalExpenses, ""]),
      "",
      "=== SUMMARY ===",
      row(["Metric", "Amount"]),
      row(["Total Income", summary.totalIncome]),
      row(["Total Expenses", summary.totalExpenses]),
      row(["Balance", summary.balance]),
      row(["Savings", summary.savings]),
      row(["Savings Rate (%)", summary.savingsRate]),
    ];

    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `dashboard-${monthInputValue}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatTrend = (val, suffix = "% vs last month") => {
    if (val === null) return "No prior month data";
    let prefix = "";
    if (Number(val) > 0) {
      prefix = "+";
    }
    return `${prefix}${val}${suffix}`;
  };

  // show loading spinner while data is loading
  if (loading || selectedMonth === null || !trends) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-500 text-sm">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // get the user's first name for the welcome message
  let welcomeName = "there";
  if (user && user.firstName) {
    welcomeName = user.firstName;
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="page-header">
        <div>
          <h1 className="page-title">
            Welcome back, {welcomeName}
          </h1>
          <p className="page-subtitle">
            Here's a snapshot of your finances for {monthLabel}
          </p>
        </div>

        <div className="flex gap-3">
          <label className="btn-secondary inline-flex items-center gap-2 text-sm py-2.5 cursor-pointer">
            <Calendar size={16} />
            <select
              value={monthInputValue}
              onChange={handleMonthChange}
              className="bg-transparent border-none outline-none text-slate-700 font-medium cursor-pointer pr-1"
            >
              {availableMonths.map((m) => (
                <option
                  key={`${m.year}-${m.month}`}
                  value={`${m.year}-${String(m.month + 1).padStart(2, "0")}`}
                >
                  {m.label}
                </option>
              ))}
            </select>
          </label>
          <button
            onClick={handleExport}
            className="btn-primary inline-flex items-center gap-2 text-sm"
          >
            <Upload size={16} />
            Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        <StatCard
          title="Total Balance"
          value={trends.balance}
          trend={
            trends.balanceTrend !== null && Number(trends.balanceTrend) >= 0
              ? "positive"
              : "info"
          }
          subtitle={formatTrend(trends.balanceTrend)}
        />
        <StatCard
          title="Income"
          value={trends.totalIncome}
          trend="positive"
          subtitle={formatTrend(trends.incomeTrend)}
        />
        <StatCard
          title="Expenses"
          value={trends.totalExpenses}
          trend={
            trends.expenseTrend !== null && Number(trends.expenseTrend) < 0
              ? "positive"
              : "info"
          }
          subtitle={formatTrend(trends.expenseTrend)}
        />
        <StatCard
          title="Savings"
          value={trends.savingsRate}
          format="percentage"
          trend="positive"
          subtitle={`₹${Number(trends.savings).toLocaleString("en-IN")} saved this month`}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <SpendingTrendChart expenses={expenses} incomes={incomes} />
        <CategoryBreakdown data={monthCategories} monthLabel={monthLabel} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <RecentTransactions transactions={recentItems} />
        <BudgetList categories={budgetProgress} monthLabel={monthLabel} />
      </div>
    </div>
  );
}

export default Dashboard;
