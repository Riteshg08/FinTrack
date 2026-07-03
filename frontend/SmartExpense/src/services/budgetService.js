import axios from "axios";
import { BASE_URL } from "../utils/constants";

const authConfig = { withCredentials: true };

export const getBudgetStatus = () =>
  axios.get(`${BASE_URL}/budget/status`, authConfig);

export const getCategoryBudgetStatus = () =>
  axios.get(`${BASE_URL}/budget/category-status`, authConfig);

export const getCategoryBudgets = () =>
  axios.get(`${BASE_URL}/budget/category`, authConfig);

export const addCategoryBudget = (budgetData) =>
  axios.post(`${BASE_URL}/category-budget`, budgetData, authConfig);

export const addMonthlyBudget = (budgetData) =>
  axios.post(`${BASE_URL}/monthly-budget`, budgetData, authConfig);

export const updateMonthlyBudget = (budgetData) =>
  axios.patch(`${BASE_URL}/budget`, budgetData, authConfig);

/** Create or update the user's single monthly budget document */
export const saveMonthlyBudget = async (budgetData) => {
  try {
    return await addMonthlyBudget(budgetData);
  } catch (err) {
    const message = err?.response?.data?.message || "";
    const isDuplicate =
      message.includes("duplicate key") ||
      message.includes("already exists") ||
      message.includes("E11000");

    if (isDuplicate) {
      return updateMonthlyBudget(budgetData);
    }
    throw err;
  }
};

export const updateCategoryBudget = (id, budgetData) =>
  axios.patch(`${BASE_URL}/budget/category/${id}`, budgetData, authConfig);

export const deleteBudget = (id) =>
  axios.delete(`${BASE_URL}/budget/${id}`, authConfig);

/** @deprecated Use getCategoryBudgetStatus + getCategoryBudgets */
export const getBudgets = getCategoryBudgets;

/** Maps modal form data to backend category-budget payload */
export const addBudget = ({ category, amount }) =>
  addCategoryBudget({
    category,
    category_budget: Number(amount),
    currency: "INR",
  });
