import { createSlice } from "@reduxjs/toolkit";

const analyticsSlice = createSlice({
  name: "analytics",

  initialState: {
    monthlyIncome: [],
    monthlyExpense: [],
    categorySummary: [],
    totalIncome: 0,
    totalExpense: 0,
  },

  reducers: {
    setMonthlyIncome: (state, action) => {
      state.monthlyIncome = action.payload;
    },

    setMonthlyExpense: (state, action) => {
      state.monthlyExpense = action.payload;
    },

    setCategorySummary: (state, action) => {
      state.categorySummary = action.payload;
    },

    setTotalIncome: (state, action) => {
      state.totalIncome = action.payload;
    },

    setTotalExpense: (state, action) => {
      state.totalExpense = action.payload;
    },
  },
});

export const {
  setMonthlyIncome,
  setMonthlyExpense,
  setCategorySummary,
  setTotalIncome,
  setTotalExpense,
} = analyticsSlice.actions;

export default analyticsSlice.reducer;
