import { createSlice } from "@reduxjs/toolkit";

const budgetSlice = createSlice({
  name: "budget",

  initialState: {
    budgets: [],
    budgetStatus: null,
    overBudget: [],
  },

  reducers: {
    setBudgets: (
      state,
      action
    ) => {
      state.budgets =
        action.payload;
    },

    setBudgetStatus: (
      state,
      action
    ) => {
      state.budgetStatus =
        action.payload;
    },

    setOverBudget: (
      state,
      action
    ) => {
      state.overBudget =
        action.payload;
    },
  },
});

export const {
  setBudgets,
  setBudgetStatus,
  setOverBudget,
} = budgetSlice.actions;

export default budgetSlice.reducer;
