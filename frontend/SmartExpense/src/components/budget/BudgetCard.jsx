function BudgetCard({ category, amount, spent }) {
  let percentage = 0;
  if (amount > 0) {
    percentage = (spent / amount) * 100;
  }

  const isOver = percentage >= 100;

  let barColor = "bg-primary";
  if (isOver) {
    barColor = "bg-red-500";
  }

  let percentColor = "text-primary";
  if (isOver) {
    percentColor = "text-red-500";
  }

  return (
    <div className="card p-5 sm:p-6">
      <div className="flex justify-between items-start mb-5">
        <h2 className="font-semibold text-slate-900">{category}</h2>
        <p className="text-slate-500 text-sm">
          ₹{Number(amount).toLocaleString("en-IN")}
        </p>
      </div>

      <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${barColor}`}
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>

      <div className="flex justify-between mt-3 text-sm">
        <p className="text-slate-600">
          ₹{Number(spent).toLocaleString("en-IN")} spent
        </p>
        <p className={`font-medium ${percentColor}`}>
          {percentage.toFixed(0)}%
        </p>
      </div>
    </div>
  );
}

export default BudgetCard;
