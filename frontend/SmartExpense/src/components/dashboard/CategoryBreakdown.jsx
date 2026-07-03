import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = [
  "#5B64F2",
  "#3B82F6",
  "#F59E0B",
  "#EF4444",
  "#14B8A6",
  "#8B5CF6",
];

function CategoryBreakdown({ data, monthLabel }) {
  // calculate total amount for all categories
  let total = 0;
  for (let i = 0; i < data.length; i++) {
    total = total + data[i].amount;
  }

  if (data.length === 0) {
    return (
      <div className="card-padded">
        <h2 className="text-lg font-bold text-slate-900">By category</h2>
        <p className="text-slate-500 text-sm mt-4">
          No expenses in {monthLabel || "this month"}.
        </p>
      </div>
    );
  }

  let subtitleText = "This month's expenses";
  if (monthLabel) {
    subtitleText = monthLabel + " expenses";
  }

  const topCategories = data.slice(0, 5);

  return (
    <div className="card-padded">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900">By category</h2>
        <p className="text-sm text-slate-500 mt-0.5">{subtitleText}</p>
      </div>

      <div className="relative">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              dataKey="amount"
              nameKey="category"
              cx="50%"
              cy="50%"
              innerRadius={58}
              outerRadius={85}
              paddingAngle={2}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v) => `₹${Number(v).toLocaleString("en-IN")}`}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Total
          </p>
          <p className="text-lg font-bold text-slate-900">
            ₹{total.toLocaleString("en-IN")}
          </p>
        </div>
      </div>

      <div className="space-y-2.5 mt-2">
        {topCategories.map((item, i) => (
          <div key={item.category} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: COLORS[i % COLORS.length] }}
            />
            <span className="text-sm text-slate-600 flex-1 truncate">
              {item.category}
            </span>
            <span className="text-sm font-semibold text-slate-800">
              ₹{Number(item.amount).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryBreakdown;
