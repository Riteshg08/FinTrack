/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getExpenses,
  getTotalExpenses,
  getMonthlyExpenses,
  getCategorySummary,
  addExpense,
  updateExpense,
  deleteExpense,
} from "../services/expenseService";
import {
  setExpenses,
  setTotalExpenses,
  setMonthlyExpenses,
  setCategorySummary,
} from "../store/expenseSlice";
import ExpenseStatCard, {
  computeExpenseStats,
  Receipt,
  ArrowLeftRight,
  CalendarDays,
} from "../components/expense/ExpenseStatCard";
import ExpenseTable from "../components/expense/ExpenseTable";
import AddExpenseModal from "../components/expense/AddExpenseModal";
import ExpenseChart from "../components/expense/ExpenseChart";
import ExpenseCategories from "../components/expense/ExpenseCategories";
import { Plus } from "lucide-react";
import { mapCategorySummary } from "../utils/apiHelpers";
import {
  getDefaultMonth,
  getAvailableMonths,
} from "../utils/dashboardHelpers";

function Expenses() {
  const dispatch = useDispatch();
  const { expenses, monthlyExpenses } = useSelector((store) => store.expense);
  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [viewMonth, setViewMonth] = useState(() => {
    const now = new Date();
    return { month: now.getMonth(), year: now.getFullYear() };
  });
  const monthInitialized = useRef(false);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError("");

      const [expenseRes, totalRes, monthlyRes, categoryRes] = await Promise.all([
        getExpenses(),
        getTotalExpenses(),
        getMonthlyExpenses(),
        getCategorySummary(),
      ]);

      const expenseData = expenseRes.data.data || [];
      dispatch(setExpenses(expenseData));
      dispatch(setTotalExpenses(totalRes.data.data));
      dispatch(setMonthlyExpenses(monthlyRes.data.data));
      dispatch(setCategorySummary(mapCategorySummary(categoryRes.data.data)));

      // set default month on first load
      if (!monthInitialized.current) {
        const defaultMonthInfo = getDefaultMonth(expenseData, []);
        setViewMonth({ month: defaultMonthInfo.month, year: defaultMonthInfo.year });
        monthInitialized.current = true;
      }
    } catch (err) {
      let errorMessage = "Failed to load expenses";
      if (err && err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // load expenses when page opens
  useEffect(() => {
    fetchExpenses();
  }, []);

  // get month dropdown options from expense data
  const monthOptions = getAvailableMonths(expenses, []);

  // calculate stats for the selected month
  const stats = computeExpenseStats(expenses, viewMonth.month, viewMonth.year);

  const closeModal = () => {
    setShowModal(false);
    setEditingExpense(null);
  };

  const handleSave = async (data) => {
    try {
      setError("");
      const payload = {
        title: data.title,
        amount: Number(data.amount),
        category: data.category,
        paymentMethod: data.paymentMethod,
        notes: data.notes,
        expenseDate: data.expenseDate,
        currency: "INR",
      };

      if (editingExpense) {
        await updateExpense(editingExpense._id, payload);
      } else {
        await addExpense(payload);
      }

      closeModal();
      await fetchExpenses();
    } catch (err) {
      let actionWord = "add";
      if (editingExpense) {
        actionWord = "update";
      }
      let errorMessage = `Failed to ${actionWord} expense`;
      if (err && err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      }
      setError(errorMessage);
    }
  };

  const handleEdit = (expense) => {
    setEditingExpense(expense);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this expense?")) return;

    try {
      setError("");
      await deleteExpense(id);
      await fetchExpenses();
    } catch (err) {
      let errorMessage = "Failed to delete expense";
      if (err && err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      }
      setError(errorMessage);
    }
  };

  // build subtitle text for spend change stat
  let spendChangeSubtitle = "No data from last month";
  if (stats.spendChange !== null) {
    let prefix = "";
    if (stats.spendChange > 0) {
      prefix = "+";
    }
    spendChangeSubtitle = `${prefix}${stats.spendChange}% vs. last month`;
  }

  // build subtitle text for transaction count stat
  const transactionSubtitle = stats.newTransactions >= 0
    ? `+${stats.newTransactions} vs. last month`
    : `${stats.newTransactions} vs. last month`;

  // build subtitle text for daily average stat
  let dailyChangeSubtitle = "Daily average this month";
  if (stats.dailyChange !== null) {
    let prefix = "";
    if (stats.dailyChange > 0) {
      prefix = "+";
    }
    dailyChangeSubtitle = `${prefix}${stats.dailyChange}% daily average`;
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="page-header">
        <div>
          <h1 className="page-title">Expenses</h1>
          <p className="page-subtitle">Track every rupee going out</p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          {monthOptions.length > 0 && (
            <select
              className="input-field py-2.5 text-sm w-full sm:w-auto"
              value={`${viewMonth.year}-${viewMonth.month}`}
              onChange={(e) => {
                const parts = e.target.value.split("-");
                const year = Number(parts[0]);
                const month = Number(parts[1]);
                setViewMonth({ month, year });
              }}
            >
              {monthOptions.map((opt) => (
                <option
                  key={`${opt.year}-${opt.month}`}
                  value={`${opt.year}-${opt.month}`}
                >
                  {opt.label}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={() => {
              setEditingExpense(null);
              setShowModal(true);
            }}
            className="btn-primary inline-flex items-center gap-2 text-sm"
          >
            <Plus size={16} />
            Add expense
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-100">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
        <ExpenseStatCard
          title="Spend This Month"
          value={stats.spendThisMonth}
          icon={Receipt}
          trend={
            stats.spendChange !== null && stats.spendChange < 0
              ? "positive"
              : "neutral"
          }
          subtitle={spendChangeSubtitle}
        />

        <ExpenseStatCard
          title="Transactions"
          value={stats.transactionCount}
          icon={ArrowLeftRight}
          isCurrency={false}
          trend="neutral"
          subtitle={transactionSubtitle}
        />

        <ExpenseStatCard
          title="Avg Per Day"
          value={stats.avgPerDay}
          icon={CalendarDays}
          trend={
            stats.dailyChange !== null && stats.dailyChange < 0
              ? "positive"
              : "neutral"
          }
          subtitle={dailyChangeSubtitle}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <ExpenseChart data={monthlyExpenses} />
        <ExpenseCategories expenses={expenses} month={viewMonth.month} year={viewMonth.year} />
      </div>

      {loading ? (
        <div className="card p-10 text-center text-slate-500 text-sm">
          Loading expenses...
        </div>
      ) : (
        <ExpenseTable
          expenses={expenses}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      )}

      {showModal && (
        <AddExpenseModal
          expense={editingExpense}
          onSubmit={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default Expenses;
