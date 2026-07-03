import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const getExpenses = () => {
  return axios.get(
    BASE_URL + "/expense",
    {
      withCredentials: true,
    }
  );
};

export const addExpense = (expenseData) => {
  return axios.post(
    BASE_URL + "/expense",
    expenseData,
    {
      withCredentials: true,
    }
  );
};

export const deleteExpense = (id) => {
  return axios.delete(
    BASE_URL + `/expense/${id}`,
    {
      withCredentials: true,
    }
  );
};

export const updateExpense = (id, expenseData) => {
  return axios.patch(
    BASE_URL + `/expense/${id}`,
    expenseData,
    {
      withCredentials: true,
    }
  );
};

export const getTotalExpenses = () => {
  return axios.get(
    BASE_URL + "/expense/total",
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

export const getCategorySummary = () => {
  return axios.get(
    BASE_URL + "/expense/category-summary",
    {
      withCredentials: true,
    }
  );
};
