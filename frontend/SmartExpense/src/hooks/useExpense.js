import { useEffect, useState } from "react";
import {
  getAllExpense,
  getTotalExpense,
  getMonthlyExpense,
  getCategorySummary,
} from "../services/expenseService";

const useExpense = () => {
  const [expenses, setExpenses] =
    useState([]);
  const [totalExpense, setTotalExpense] =
    useState(0);
  const [monthlyExpense, setMonthlyExpense] =
    useState([]);
  const [categorySummary, setCategorySummary] =
    useState([]);

  useEffect(() => {
    fetchExpense();
  }, []);

  const fetchExpense = async () => {
    try {
      const [
        expenseRes,
        totalRes,
        monthlyRes,
        categoryRes,
      ] = await Promise.all([
        getAllExpense(),
        getTotalExpense(),
        getMonthlyExpense(),
        getCategorySummary(),
      ]);

      setExpenses(
        expenseRes.data.data
      );
      setTotalExpense(
        totalRes.data.data
      );
      setMonthlyExpense(
        monthlyRes.data.data
      );
      setCategorySummary(
        categoryRes.data.data
      );
    } catch (err) {
      console.log(err);
    }
  };

  return {
    expenses,
    totalExpense,
    monthlyExpense,
    categorySummary,
    fetchExpense,
  };
};

export default useExpense;