/* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setMonthlyIncome,
  setMonthlyExpense,
  setCategorySummary,
  setTotalIncome,
  setTotalExpense,
} from "../store/analyticsSlice";
import {
  getMonthlyIncome,
  getMonthlyExpenses,
  getCategorySummary,
  getTotalIncome,
  getTotalExpenses,
} from "../services/analyticsService";
import { getExpenses } from "../services/expenseService";
import AnalyticsStatCard, {
  Wallet,
  TrendingUp,
  TrendingDown,
  Sparkles,
} from "../components/analytics/AnalyticsStatCard";
import NetWorthChart from "../components/analytics/NetWorthChart";
import CategoryShareChart from "../components/analytics/CategoryShareChart";
import IncomeExpenseChart from "../components/analytics/IncomeExpenseChart";
import DailySpendingChart from "../components/analytics/DailySpendingChart";
import { mapCategorySummary } from "../utils/apiHelpers";
import {
  computeAnalyticsStats,
  buildNetWorthTrend,
  buildDailySpending,
  buildCategoryShare,
} from "../utils/analyticsHelpers";

function Analytics() {
  const dispatch = useDispatch();
  const {
    monthlyIncome,
    monthlyExpense,
    categorySummary,
    totalIncome,
    totalExpense,
  } = useSelector((store) => store.analytics);

  const [expenses, setExpenses] = useState([]);

  const fetchAnalytics = async () => {
    const [
      incomeRes,
      expenseRes,
      categoryRes,
      totalIncomeRes,
      totalExpenseRes,
      expensesRes,
    ] = await Promise.all([
      getMonthlyIncome(),
      getMonthlyExpenses(),
      getCategorySummary(),
      getTotalIncome(),
      getTotalExpenses(),
      getExpenses(),
    ]);

    dispatch(setMonthlyIncome(incomeRes.data.data));
    dispatch(setMonthlyExpense(expenseRes.data.data));
    dispatch(
      setCategorySummary(mapCategorySummary(categoryRes.data.data))
    );
    dispatch(setTotalIncome(totalIncomeRes.data.data));
    dispatch(setTotalExpense(totalExpenseRes.data.data));
    setExpenses(expensesRes.data.data);
  };

  // load analytics data when page opens
  useEffect(() => {
    fetchAnalytics();
  }, []);

  // calculate summary stats from the data
  const stats = computeAnalyticsStats(
    monthlyIncome,
    monthlyExpense,
    totalIncome,
    totalExpense
  );

  const netWorthData = buildNetWorthTrend(monthlyIncome, monthlyExpense);
  const categoryShare = buildCategoryShare(categorySummary);
  const dailySpending = buildDailySpending(expenses);

  // combine income and expense data month by month
  const mergedData = monthlyIncome.map((month, index) => {
    let expenseAmount = 0;
    if (monthlyExpense[index] && monthlyExpense[index].amount) {
      expenseAmount = monthlyExpense[index].amount;
    }
    return {
      month: month.month,
      income: month.amount,
      expense: expenseAmount,
    };
  });

  // build subtitle for net worth card
  let netWorthSubtitle = "All-time balance";
  if (stats.netWorthTrend !== null) {
    let prefix = "";
    if (stats.netWorthTrend > 0) {
      prefix = "+";
    }
    netWorthSubtitle = `${prefix}${stats.netWorthTrend}%`;
  }

  // build subtitle for income card
  let incomeSubtitle = "Based on active months";
  if (stats.incomeTrend !== null) {
    let prefix = "";
    if (stats.incomeTrend > 0) {
      prefix = "+";
    }
    incomeSubtitle = `${prefix}${stats.incomeTrend}%`;
  }

  // build subtitle for spend card
  let spendSubtitle = "Based on active months";
  if (stats.spendTrend !== null) {
    let prefix = "";
    if (stats.spendTrend > 0) {
      prefix = "+";
    }
    spendSubtitle = `${prefix}${stats.spendTrend}%`;
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h1 className="page-title">Analytics</h1>
        <p className="page-subtitle">Deep insights into how money moves</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
        <AnalyticsStatCard
          title="Net Worth"
          value={stats.netWorth}
          icon={Wallet}
          trend="positive"
          subtitle={netWorthSubtitle}
        />

        <AnalyticsStatCard
          title="Avg Monthly Income"
          value={stats.avgMonthlyIncome}
          icon={TrendingUp}
          trend="positive"
          subtitle={incomeSubtitle}
        />

        <AnalyticsStatCard
          title="Avg Monthly Spend"
          value={stats.avgMonthlySpend}
          icon={TrendingDown}
          trend={stats.spendTrend !== null && stats.spendTrend < 0 ? "positive" : "info"}
          subtitle={spendSubtitle}
        />

        <AnalyticsStatCard
          title="Savings Rate"
          value={stats.savingsRate}
          suffix="%"
          icon={Sparkles}
          trend="positive"
          subtitle={`₹${Number(totalIncome - totalExpense).toLocaleString("en-IN")} saved`}
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <NetWorthChart data={netWorthData} />
        <CategoryShareChart data={categoryShare} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <IncomeExpenseChart data={mergedData} />
        <DailySpendingChart data={dailySpending} />
      </div>
    </div>
  );
}

export default Analytics;
