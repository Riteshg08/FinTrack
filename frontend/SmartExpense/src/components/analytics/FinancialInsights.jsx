function FinancialInsights({ income, expense }) {
  const savings = income - expense;

  let message = "";
  let emoji = "💡";

  if (savings < 0) {
    message =
      "Your expenses are higher than your income. Consider reviewing your spending habits.";
    emoji = "⚠️";
  } else if (savings < income * 0.2) {
    message =
      "Try saving at least 20% of your income for better financial health.";
    emoji = "📊";
  } else {
    message = "Excellent financial management! Keep up the great work.";
    emoji = "🎉";
  }

  return (
    <div className="card-padded">
      <h2 className="text-lg font-bold text-slate-900 mb-4">Insights</h2>
      <div className="flex gap-4 items-start">
        <span className="text-2xl">{emoji}</span>
        <p className="text-slate-600 leading-relaxed text-sm">{message}</p>
      </div>
    </div>
  );
}

export default FinancialInsights;
