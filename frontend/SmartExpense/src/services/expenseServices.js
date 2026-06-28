import axios from "axios";
import { BASE_URL } from "../utils/constants";

const config = {
    withCredentials: true,
};

export const getAllExpense = () =>
    axios.get(
        `${BASE_URL}/all-expense`,
        config
    );

export const getTotalExpense = () =>
    axios.get(
        `${BASE_URL}/total-expenses`,
        config
    );

export const getMonthlyExpense = () =>
    axios.get(
        `${BASE_URL}/expense/monthly-summary`,
        config
    );

export const getCategorySummary = () =>
    axios.get(
        `${BASE_URL}/expense/category-summary`,
        config
    );

export const addExpense = (data) =>
    axios.post(
        `${BASE_URL}/add-expense`,
        data,
        config
    );

export const updateExpense = (
    id,
    data
) =>
    axios.patch(
        `${BASE_URL}/update-expense/${id}`,
        data,
        config
    );

export const deleteExpense = (id) =>
    axios.delete(
        `${BASE_URL}/delete-expense/${id}`,
        config
    );