/** Normalize backend category summary `{ category, total }` for charts using `amount` */
export const mapCategorySummary = (data = []) =>
  data.map((item) => ({
    category: item.category,
    amount: item.total ?? item.amount ?? 0,
    total: item.total ?? item.amount ?? 0,
  }));

/** Filter to categories with spending for pie charts */
export const filterActiveCategories = (data = []) =>
  mapCategorySummary(data).filter((item) => item.amount > 0);

/** Merge category budget status with document IDs for delete support */
export const mergeCategoryBudgets = (statusList = [], budgetDocs = []) => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();

  const currentDocs = budgetDocs.filter(
    (doc) => doc.month === month && doc.year === year
  );

  return statusList.map((item) => {
    const doc = currentDocs.find((d) => d.category === item.category);
    return {
      _id: doc?._id,
      category: item.category,
      budget: item.budget,
      amount: item.budget,
      spent: item.spent,
      remaining: item.remaining,
      percentageUsed: item.percentageUsed,
      isOverBudget: item.isOverBudget,
    };
  });
};
