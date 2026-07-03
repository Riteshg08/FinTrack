import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const getAllIncome = () =>
  axios.get(
    BASE_URL + "/income",
    {
      withCredentials: true,
    }
  );

export const getTotalIncome = () =>
  axios.get(
    BASE_URL + "/income/total",
    {
      withCredentials: true,
    }
  );

export const getMonthlyIncome = () =>
  axios.get(
    BASE_URL + "/income/monthly-summary",
    {
      withCredentials: true,
    }
  );

export const addIncome = (data) =>
  axios.post(
    BASE_URL + "/income",
    data,
    {
      withCredentials: true,
    }
  );

export const updateIncome = (
  id,
  data
) =>
  axios.patch(
    BASE_URL + `/income/${id}`,
    data,
    {
      withCredentials: true,
    }
  );

export const deleteIncome = (id) =>
  axios.delete(
    BASE_URL + `/income/${id}`,
    {
      withCredentials: true,
    }
  );
