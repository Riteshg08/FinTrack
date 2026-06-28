import { useEffect, useState } from "react";
import {
  getAllIncome,
  getMonthlyIncome,
  getTotalIncome,
} from "../services/incomeService";

const useIncome = () => {
  const [incomes, setIncomes] =
    useState([]);
  const [totalIncome, setTotalIncome] =
    useState(0);
  const [monthlyIncome, setMonthlyIncome] =
    useState([]);

  useEffect(() => {
    fetchIncome();
  }, []);

  const fetchIncome = async () => {
    try {
      const [
        incomesRes,
        totalRes,
        monthlyRes,
      ] = await Promise.all([
        getAllIncome(),
        getTotalIncome(),
        getMonthlyIncome(),
      ]);

      setIncomes(incomesRes.data.data);
      setTotalIncome(totalRes.data.data);
      setMonthlyIncome(
        monthlyRes.data.data
      );
    } catch (err) {
      console.log(err);
    }
  };

  return {
    incomes,
    totalIncome,
    monthlyIncome,
    fetchIncome,
  };
};

export default useIncome;