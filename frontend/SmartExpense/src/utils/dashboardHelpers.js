const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const normalizeDate = (date) => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
};

export const isInMonth = (date, month, year) => {
  const d = normalizeDate(date);
  return d.getMonth() === month && d.getFullYear() === year;
};

export const isSameDay = (a, b) => {
  const d1 = normalizeDate(a);
  const d2 = normalizeDate(b);
  return d1.getTime() === d2.getTime();
};

const formatDayLabel = (date) => {
  const d = normalizeDate(date);
  return d.toLocaleDateString("en-IN", { month: "short", day: "numeric" });
};

export const getMonthLabel = (month, year) =>
  new Date(year, month, 1).toLocaleDateString("en-IN", {
    month: "short",
    year: "numeric",
  });

/** Default to the month of the most recent transaction, else current month */
export const getDefaultMonth = (expenses = [], incomes = []) => {
  const dates = [
    ...expenses.map((e) => e.expenseDate || e.createdAt),
    ...incomes.map((i) => i.incomeDate || i.createdAt),
  ]
    .filter(Boolean)
    .map((d) => new Date(d));

  if (!dates.length) {
    const now = new Date();
    return { month: now.getMonth(), year: now.getFullYear() };
  }

  const latest = new Date(Math.max(...dates.map((d) => d.getTime())));
  return { month: latest.getMonth(), year: latest.getFullYear() };
};

/** Build list of month options that have any data */
export const getAvailableMonths = (expenses = [], incomes = []) => {
  const keys = new Set();

  [...expenses, ...incomes].forEach((item) => {
    const date = new Date(
      item.expenseDate || item.incomeDate || item.createdAt
    );
    if (!isNaN(date)) {
      keys.add(`${date.getFullYear()}-${date.getMonth()}`);
    }
  });

  const now = new Date();
  keys.add(`${now.getFullYear()}-${now.getMonth()}`);

  return Array.from(keys)
    .map((key) => {
      const [year, month] = key.split("-").map(Number);
      return { month, year, label: getMonthLabel(month, year) };
    })
    .sort((a, b) =>
      a.year !== b.year ? b.year - a.year : b.month - a.month
    );
};

export const filterByMonth = (items, month, year, dateKey) =>
  items.filter((item) => isInMonth(item[dateKey] || item.createdAt, month, year));

export const computeMonthSummary = (expenses, incomes, month, year) => {
  const monthExpenses = filterByMonth(expenses, month, year, "expenseDate");
  const monthIncomes = filterByMonth(incomes, month, year, "incomeDate");

  const totalExpenses = monthExpenses.reduce(
    (s, e) => s + Number(e.amount),
    0
  );
  const totalIncome = monthIncomes.reduce(
    (s, i) => s + Number(i.amount),
    0
  );
  const balance = totalIncome - totalExpenses;
  const savings = balance;
  const savingsRate =
    totalIncome > 0 ? ((savings / totalIncome) * 100).toFixed(1) : "0";

  return { totalIncome, totalExpenses, balance, savings, savingsRate };
};

export const computeDashboardTrends = (
  expenses,
  incomes,
  month,
  year,
  monthlyIncome = [],
  monthlyExpense = []
) => {
  const prevMonth = month === 0 ? 11 : month - 1;
  const prevYear = month === 0 ? year - 1 : year;

  const current = computeMonthSummary(expenses, incomes, month, year);
  const previous = computeMonthSummary(expenses, incomes, prevMonth, prevYear);

  const pct = (cur, prev) =>
    prev > 0 ? (((cur - prev) / prev) * 100).toFixed(1) : null;

  return {
    ...current,
    balanceTrend: pct(current.balance, previous.balance),
    incomeTrend: pct(current.totalIncome, previous.totalIncome),
    expenseTrend: pct(current.totalExpenses, previous.totalExpenses),
  };
};

export const TREND_PERIOD_OPTIONS = [
  { value: 7, label: "Last 7 days" },
  { value: 30, label: "Last 30 days" },
  { value: 60, label: "Last 60 days" },
  { value: 90, label: "Last 90 days" },
  { value: "year", label: "Last year" },
];

export const buildSpendingTrend = (expenses = [], incomes = [], period = 7) => {
  const now = normalizeDate(new Date());

  if (period === "year") {
    const result = [];
    for (let i = 11; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const month = d.getMonth();
      const year = d.getFullYear();

      const income = incomes
        .filter((inc) => isInMonth(inc.incomeDate || inc.createdAt, month, year))
        .reduce((s, inc) => s + Number(inc.amount), 0);

      const expense = expenses
        .filter((exp) => isInMonth(exp.expenseDate || exp.createdAt, month, year))
        .reduce((s, exp) => s + Number(exp.amount), 0);

      result.push({
        day: getMonthLabel(month, year),
        weekday: "",
        income,
        expense,
      });
    }
    return result;
  }

  const days = Number(period);
  const result = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);

    const income = incomes
      .filter((inc) => isSameDay(inc.incomeDate || inc.createdAt, d))
      .reduce((s, inc) => s + Number(inc.amount), 0);

    const expense = expenses
      .filter((exp) => isSameDay(exp.expenseDate || exp.createdAt, d))
      .reduce((s, exp) => s + Number(exp.amount), 0);

    result.push({
      day:
        days <= 14
          ? formatDayLabel(d)
          : d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
      weekday: DAY_NAMES[d.getDay()],
      income,
      expense,
    });
  }

  return result;
};

/** @deprecated Use buildSpendingTrend */
export const buildWeeklyTrend = (expenses, incomes, month, year) =>
  buildSpendingTrend(expenses, incomes, 7);

export const buildMonthCategories = (expenses, month, year) => {
  const monthExpenses = filterByMonth(expenses, month, year, "expenseDate");

  const totals = monthExpenses.reduce((acc, exp) => {
    const cat = exp.category || "Other";
    acc[cat] = (acc[cat] || 0) + Number(exp.amount);
    return acc;
  }, {});

  const grandTotal = Object.values(totals).reduce((s, v) => s + v, 0);

  return Object.entries(totals)
    .map(([category, amount]) => ({
      category,
      amount,
      percent: grandTotal > 0 ? Math.round((amount / grandTotal) * 100) : 0,
    }))
    .sort((a, b) => b.amount - a.amount);
};

export const buildBudgetProgress = (
  expenses,
  categoryBudgetDocs,
  month,
  year
) => {
  const monthExpenses = filterByMonth(expenses, month, year, "expenseDate");

  const spentByCategory = monthExpenses.reduce((acc, exp) => {
    const cat = exp.category || "Other";
    acc[cat] = (acc[cat] || 0) + Number(exp.amount);
    return acc;
  }, {});

  const budgetsForMonth = categoryBudgetDocs.filter(
    (b) => b.month === month + 1 && b.year === year
  );

  const budgetMap = {};
  budgetsForMonth.forEach((b) => {
    budgetMap[b.category] =
      (budgetMap[b.category] || 0) + Number(b.category_budget);
  });

  const allCategories = new Set([
    ...Object.keys(spentByCategory),
    ...Object.keys(budgetMap),
  ]);

  return Array.from(allCategories)
    .map((category) => {
      const budget = budgetMap[category] || 0;
      const spent = spentByCategory[category] || 0;
      return {
        category,
        budget,
        spent,
        isOverBudget: budget > 0 && spent > budget,
      };
    })
    .filter((item) => item.budget > 0 || item.spent > 0)
    .sort((a, b) => b.spent - a.spent);
};

export const mergeRecentTransactions = (
  expenses,
  incomes,
  month,
  year,
  limit = 6
) => {
  const items = [
    ...expenses.map((e) => ({
      _id: e._id,
      label: e.title,
      category: e.category,
      amount: Number(e.amount),
      date: e.expenseDate || e.createdAt,
      type: "expense",
    })),
    ...incomes.map((i) => ({
      _id: i._id,
      label: i.source,
      category: "Income",
      amount: Number(i.amount),
      date: i.incomeDate || i.createdAt,
      type: "income",
    })),
  ];

  const inMonth = items.filter((item) =>
    isInMonth(item.date, month, year)
  );

  const pool = inMonth.length > 0 ? inMonth : items;

  return pool
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, limit);
};

export const formatRelativeDate = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now - date;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  const time = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (diffDays === 0) return `Today, ${time}`;
  if (diffDays === 1) return `Yesterday, ${time}`;
  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
};
