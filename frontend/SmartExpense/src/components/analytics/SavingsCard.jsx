function SavingsCard({ income, expense }) {
  const savings = income - expense;

  let savingsRate = 0;
  if (income > 0) {
    savingsRate = ((savings / income) * 100).toFixed(1);
  }

  return (
    <div className="card-padded">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Savings Rate</h2>

      <h1 className="text-4xl sm:text-5xl font-bold text-primary">
        {savingsRate}%
      </h1>

      <p className="text-slate-500 mt-4 text-sm">
        ₹{Number(savings).toLocaleString("en-IN")} saved this year
      </p>
    </div>
  );
}

export default SavingsCard;
