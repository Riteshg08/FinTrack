import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const getDashboardData = () => {
  return axios.get(
    BASE_URL + "/dashboard",
    {
      withCredentials: true,
    }
  );
};

export const getRecentTransactions = () => {
  return axios.get(
    BASE_URL + "/recent-transaction",
    {
      withCredentials: true,
    }
  );
};

export const getMonthlyExpenses = () => {
  return axios.get(
    BASE_URL + "/expense/monthly-summary",
    {
      withCredentials: true,
    }
  );
};

export const getBudgetStatus = () => {
  return axios.get(
    BASE_URL + "/budget/status",
    {
      withCredentials: true,
    }
  );
};
