import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const colors = [
  "#5B64F2",
  "#3B82F6",
  "#F59E0B",
  "#8B5CF6",
  "#EC4899",
  "#EF4444",
  "#22C55E",
];

function CategoryAnalysisChart({ data }) {
  const rawData = data || [];
  const chartData = [];
  for (let i = 0; i < rawData.length; i++) {
    const item = rawData[i];
    let amount = 0;
    if (item.amount) {
      amount = item.amount;
    } else if (item.total) {
      amount = item.total;
    }
    chartData.push({
      category: item.category,
      amount: amount,
    });
  }

  return (
    <div className="card-padded">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Spending Categories</h2>

      <ResponsiveContainer width="100%" height={320}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="amount"
            nameKey="category"
            outerRadius={110}
            innerRadius={55}
            paddingAngle={3}
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryAnalysisChart;
