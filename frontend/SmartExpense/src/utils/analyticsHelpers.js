export const computeAnalyticsStats = (
  monthlyIncome = [],
  monthlyExpense = [],
  totalIncome = 0,
  totalExpense = 0
) => {
  const monthsWithIncome = monthlyIncome.filter((m) => m.amount > 0);
  const monthsWithExpense = monthlyExpense.filter((m) => m.amount > 0);

  const avgMonthlyIncome =
    monthsWithIncome.length > 0
      ? monthsWithIncome.reduce((s, m) => s + m.amount, 0) /
        monthsWithIncome.length
      : totalIncome / 12;

  const avgMonthlySpend =
    monthsWithExpense.length > 0
      ? monthsWithExpense.reduce((s, m) => s + m.amount, 0) /
        monthsWithExpense.length
      : totalExpense / 12;

  const netWorth = totalIncome - totalExpense;
  const savingsRate =
    totalIncome > 0
      ? ((netWorth / totalIncome) * 100).toFixed(0)
      : avgMonthlyIncome > 0
        ? (
            ((avgMonthlyIncome - avgMonthlySpend) / avgMonthlyIncome) *
            100
          ).toFixed(0)
        : 0;

  const now = new Date().getMonth();
  const recentIncome =
    monthlyIncome
      .slice(Math.max(0, now - 2), now + 1)
      .reduce((s, m) => s + m.amount, 0) / 3;
  const priorIncome =
    monthlyIncome
      .slice(Math.max(0, now - 5), Math.max(0, now - 2))
      .reduce((s, m) => s + m.amount, 0) / 3;

  const incomeTrend =
    priorIncome > 0
      ? (((recentIncome - priorIncome) / priorIncome) * 100).toFixed(1)
      : null;

  const recentSpend =
    monthlyExpense
      .slice(Math.max(0, now - 2), now + 1)
      .reduce((s, m) => s + m.amount, 0) / 3;
  const priorSpend =
    monthlyExpense
      .slice(Math.max(0, now - 5), Math.max(0, now - 2))
      .reduce((s, m) => s + m.amount, 0) / 3;

  const spendTrend =
    priorSpend > 0
      ? (((recentSpend - priorSpend) / priorSpend) * 100).toFixed(1)
      : null;

  let running = 0;
  const netWorthSeries = monthlyIncome.map((m, i) => {
    running += m.amount - (monthlyExpense[i]?.amount || 0);
    return running;
  });

  const recentNet = netWorthSeries[now] ?? netWorth;
  const priorNet = netWorthSeries[Math.max(0, now - 3)] ?? 0;
  const netWorthTrend =
    priorNet !== 0
      ? (((recentNet - priorNet) / Math.abs(priorNet)) * 100).toFixed(1)
      : null;

  return {
    netWorth,
    avgMonthlyIncome,
    avgMonthlySpend,
    savingsRate,
    incomeTrend,
    spendTrend,
    netWorthTrend,
  };
};

export const buildNetWorthTrend = (monthlyIncome = [], monthlyExpense = []) => {
  let running = 0;
  return monthlyIncome.map((m, i) => {
    running += m.amount - (monthlyExpense[i]?.amount || 0);
    return {
      month: m.month.slice(0, 3),
      netWorth: running,
    };
  });
};

export const buildDailySpending = (expenses = []) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = [];

  for (let i = 29; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    days.push({
      date: d,
      day: d.getDate(),
      amount: 0,
    });
  }

  expenses.forEach((exp) => {
    const expDate = new Date(exp.expenseDate);
    expDate.setHours(0, 0, 0, 0);

    const match = days.find(
      (d) => d.date.getTime() === expDate.getTime()
    );
    if (match) {
      match.amount += Number(exp.amount);
    }
  });

  return days.map(({ day, amount }) => ({ day, amount }));
};

export const buildCategoryShare = (categorySummary = []) => {
  const active = categorySummary
    .map((item) => ({
      category: item.category,
      amount: item.amount ?? item.total ?? 0,
    }))
    .filter((item) => item.amount > 0)
    .sort((a, b) => b.amount - a.amount);

  const total = active.reduce((s, item) => s + item.amount, 0);

  return active.map((item) => ({
    ...item,
    percent: total > 0 ? Math.round((item.amount / total) * 100) : 0,
  }));
};
