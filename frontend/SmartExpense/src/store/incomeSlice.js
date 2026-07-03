import { createSlice } from "@reduxjs/toolkit";

const incomeSlice = createSlice({
  name: "income",

  initialState: {
    incomes: [],
    totalIncome: 0,
    monthlyIncome: [],
  },

  reducers: {
    setIncomes: (
      state,
      action
    ) => {
      state.incomes =
        action.payload;
    },

    setTotalIncome: (
      state,
      action
    ) => {
      state.totalIncome =
        action.payload;
    },

    setMonthlyIncome: (
      state,
      action
    ) => {
      state.monthlyIncome =
        action.payload;
    },
  },
});

export const {
  setIncomes,
  setTotalIncome,
  setMonthlyIncome,
} = incomeSlice.actions;

export default incomeSlice.reducer;
