import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

function IncomeExpenseChart({ data }) {
  const chartData = [];
  for (let i = 0; i < data.length; i++) {
    const d = data[i];
    let monthLabel = d.month;
    if (d.month && d.month.slice) {
      monthLabel = d.month.slice(0, 3);
    }
    chartData.push({
      month: monthLabel,
      income: d.income,
      expense: d.expense,
    });
  }

  return (
    <div className="card-padded">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">Income vs Expenses</h2>
        <p className="text-sm text-slate-500 mt-0.5">Monthly comparison</p>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData} barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
            width={45}
            tickFormatter={(v) =>
              v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v
            }
          />
          <Tooltip
            formatter={(value) =>
              `₹${Number(value).toLocaleString("en-IN")}`
            }
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
          />
          <Bar
            dataKey="income"
            name="Income"
            fill="#22C55E"
            radius={[4, 4, 0, 0]}
            maxBarSize={20}
          />
          <Bar
            dataKey="expense"
            name="Expenses"
            fill="#5B64F2"
            radius={[4, 4, 0, 0]}
            maxBarSize={20}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default IncomeExpenseChart;
