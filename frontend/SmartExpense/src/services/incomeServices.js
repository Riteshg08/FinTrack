import axios from "axios";
import { BASE_URL } from "../utils/constants";

const config = {
  withCredentials: true,
};

export const getAllIncome = () =>
  axios.get(`${BASE_URL}/all-income`, config);

export const getTotalIncome = () =>
  axios.get(`${BASE_URL}/total-income`, config);

export const getMonthlyIncome = () =>
  axios.get(
    `${BASE_URL}/income/monthly-summary`,
    config
  );

export const addIncome = (data) =>
  axios.post(
    `${BASE_URL}/add-income`,
    data,
    config
  );

export const updateIncome = (
  id,
  data
) =>
  axios.patch(
    `${BASE_URL}/update-income/${id}`,
    data,
    config
  );

export const deleteIncome = (id) =>
  axios.delete(
    `${BASE_URL}/delete-income/${id}`,
    config
  );