import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function getLast6Months(data = []) {
  const now = new Date().getMonth();
  const result = [];

  for (let i = 5; i >= 0; i--) {
    const idx = now - i;
    if (idx >= 0 && data[idx]) {
      result.push({
        month: data[idx].month.slice(0, 3),
        amount: data[idx].amount,
      });
    }
  }

  return result;
}

function ExpenseChart({ data }) {
  const chartData = getLast6Months(data);

  return (
    <div className="card-padded h-full">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">Expenses over time</h2>
        <p className="text-sm text-slate-500 mt-0.5">Last 6 months</p>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData} barCategoryGap="20%">
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            width={45}
          />
          <Tooltip
            formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`, "Expenses"]}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          />
          <Bar
            dataKey="amount"
            fill="#EF4444"
            radius={[6, 6, 0, 0]}
            maxBarSize={48}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ExpenseChart;
