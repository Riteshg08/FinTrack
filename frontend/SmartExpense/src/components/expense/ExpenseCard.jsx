function ExpenseCard({ title, value }) {
  return (
    <div className="stat-card">
      <p className="text-slate-500 text-sm font-medium">{title}</p>
      <h2 className="text-2xl sm:text-3xl font-bold mt-2 text-slate-900">
        ₹{Number(value).toLocaleString("en-IN")}
      </h2>
    </div>
  );
}

export default ExpenseCard;
