import { createSlice } from "@reduxjs/toolkit";

const dashboardSlice = createSlice({
  name: "dashboard",

  initialState: {
    summary: null,
    transactions: [],
    monthlyExpenses: [],
    budgetStatus: null,
  },

  reducers: {
    setSummary: (state, action) => {
      state.summary = action.payload;
    },

    setTransactions: (
      state,
      action
    ) => {
      state.transactions =
        action.payload;
    },

    setMonthlyExpenses: (
      state,
      action
    ) => {
      state.monthlyExpenses =
        action.payload;
    },

    setBudgetStatus: (
      state,
      action
    ) => {
      state.budgetStatus =
        action.payload;
    },
  },
});

export const {
  setSummary,
  setTransactions,
  setMonthlyExpenses,
  setBudgetStatus,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
