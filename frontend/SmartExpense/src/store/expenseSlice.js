import { createSlice } from "@reduxjs/toolkit";

const expenseSlice =
  createSlice({
    name: "expense",

    initialState: {
      expenses: [],
      totalExpenses: 0,
      monthlyExpenses: [],
      categorySummary: [],
    },

    reducers: {
      setExpenses: (
        state,
        action
      ) => {
        state.expenses =
          action.payload;
      },

      setTotalExpenses: (
        state,
        action
      ) => {
        state.totalExpenses =
          action.payload;
      },

      setMonthlyExpenses: (
        state,
        action
      ) => {
        state.monthlyExpenses =
          action.payload;
      },

      setCategorySummary: (
        state,
        action
      ) => {
        state.categorySummary =
          action.payload;
      },
    },
  });

export const {
  setExpenses,
  setTotalExpenses,
  setMonthlyExpenses,
  setCategorySummary,
} = expenseSlice.actions;

export default expenseSlice.reducer;
