/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryBudgetStatus,
  getCategoryBudgets,
  getBudgetStatus,
  addCategoryBudget,
  saveMonthlyBudget,
  deleteBudget,
} from "../services/budgetService";
import {
  setBudgets,
  setBudgetStatus,
  setOverBudget,
} from "../store/budgetSlice";
import { mergeCategoryBudgets } from "../utils/apiHelpers";
import MonthlyBudgetSection from "../components/budget/MonthlyBudgetSection";
import CategoryBudgetTable from "../components/budget/CategoryBudgetTable";
import AddCategoryBudgetModal from "../components/budget/AddCategoryBudgetModal";
import OverBudgetAlert from "../components/budget/OverBudgetAlert";
import { Plus } from "lucide-react";

function Budget() {
  const dispatch = useDispatch();
  const { budgets, budgetStatus, overBudget } = useSelector(
    (store) => store.budget
  );
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [error, setError] = useState("");
  const [savingMonthly, setSavingMonthly] = useState(false);

  const hasMonthlyBudget = budgetStatus && budgetStatus.totalBudget > 0;

  // add up all category budget amounts
  let allocatedTotal = 0;
  for (let i = 0; i < budgets.length; i++) {
    const budgetItem = budgets[i];
    if (budgetItem.budget) {
      allocatedTotal = allocatedTotal + budgetItem.budget;
    }
  }

  // get names of categories that already have a budget
  const existingCategoryNames = [];
  for (let i = 0; i < budgets.length; i++) {
    const budgetItem = budgets[i];
    if (budgetItem.budget > 0) {
      existingCategoryNames.push(budgetItem.category);
    }
  }

  const fetchBudgetData = async () => {
    try {
      setError("");

      const statusResponse = await getBudgetStatus();
      const categoryStatusResponse = await getCategoryBudgetStatus();
      const categoryDocsResponse = await getCategoryBudgets();

      dispatch(setBudgetStatus(statusResponse.data.data));

      const merged = mergeCategoryBudgets(
        categoryStatusResponse.data.data,
        categoryDocsResponse.data.data
      );
      dispatch(setBudgets(merged));

      const overBudgetItems = categoryStatusResponse.data.data
        .filter((b) => b.isOverBudget)
        .map((b) => ({
          category: b.category,
          extraSpent: b.spent - b.budget,
        }));
      dispatch(setOverBudget(overBudgetItems));
    } catch (err) {
      let errorMessage = "Failed to load budget data";
      if (err && err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      }
      setError(errorMessage);
    }
  };

  // load budget data when page opens
  useEffect(() => {
    fetchBudgetData();
  }, []);

  const handleMonthlySave = async (amount) => {
    try {
      setSavingMonthly(true);
      setError("");
      await saveMonthlyBudget({ budgetAmount: amount, currency: "INR" });
      await fetchBudgetData();
      return true;
    } catch (err) {
      let errorMessage = "Failed to save monthly budget";
      if (err && err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      }
      setError(errorMessage);
      return false;
    } finally {
      setSavingMonthly(false);
    }
  };

  const handleAddCategory = async (data) => {
    if (!hasMonthlyBudget) {
      setError("Please set your monthly budget first.");
      return false;
    }

    const amount = Number(data.amount);

    let monthlyTotal = 0;
    if (budgetStatus && budgetStatus.totalBudget) {
      monthlyTotal = budgetStatus.totalBudget;
    }

    if (allocatedTotal + amount > monthlyTotal) {
      setError("Category budget is exceeding the overall budget");
      return false;
    }

    try {
      setError("");
      await addCategoryBudget({
        category: data.category,
        category_budget: amount,
        currency: "INR",
      });
      setShowCategoryModal(false);
      fetchBudgetData();
      return true;
    } catch (err) {
      let errorMessage = "Failed to add category budget";
      if (err && err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      }
      setError(errorMessage);
      return false;
    }
  };

  const handleDeleteCategory = async (id) => {
    if (!id) return;
    try {
      setError("");
      await deleteBudget(id);
      fetchBudgetData();
    } catch (err) {
      let errorMessage = "Failed to delete category budget";
      if (err && err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      }
      setError(errorMessage);
    }
  };

  // get total monthly budget for the table
  let totalMonthlyBudget = 0;
  if (budgetStatus && budgetStatus.totalBudget) {
    totalMonthlyBudget = budgetStatus.totalBudget;
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="page-header">
        <div>
          <h1 className="page-title">Budget</h1>
          <p className="page-subtitle">
            Set your monthly limit and allocate by category
          </p>
        </div>

        {hasMonthlyBudget && (
          <button
            className="btn-primary inline-flex items-center gap-2"
            onClick={() => setShowCategoryModal(true)}
          >
            <Plus size={18} />
            Allocate category
          </button>
        )}
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl border border-red-100">
          {error}
        </div>
      )}

      <MonthlyBudgetSection
        budgetStatus={budgetStatus}
        onSave={handleMonthlySave}
        saving={savingMonthly}
      />

      {hasMonthlyBudget && (
        <>
          <OverBudgetAlert overBudget={overBudget} />

          <CategoryBudgetTable
            categories={budgets}
            totalMonthlyBudget={totalMonthlyBudget}
            onDelete={handleDeleteCategory}
          />
        </>
      )}

      {showCategoryModal && (
        <AddCategoryBudgetModal
          onSubmit={handleAddCategory}
          onClose={() => setShowCategoryModal(false)}
          existingCategories={existingCategoryNames}
          monthlyBudget={totalMonthlyBudget}
          allocatedSoFar={allocatedTotal}
        />
      )}
    </div>
  );
}

export default Budget;
