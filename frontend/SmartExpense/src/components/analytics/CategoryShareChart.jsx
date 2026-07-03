import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#5B64F2",
  "#14B8A6",
  "#EF4444",
  "#22C55E",
  "#8B5CF6",
  "#F59E0B",
  "#3B82F6",
  "#EC4899",
];

function CategoryShareChart({ data }) {
  const hasData = data && data.length > 0;

  if (!hasData) {
    return (
      <div className="card-padded">
        <h2 className="text-lg font-bold text-slate-900">Category Share</h2>
        <p className="text-slate-500 text-sm mt-4">No spending data yet.</p>
      </div>
    );
  }

  return (
    <div className="card-padded">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-900">Category Share</h2>
        <p className="text-sm text-slate-500 mt-0.5">All time breakdown</p>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="category"
            cx="50%"
            cy="50%"
            outerRadius={80}
            innerRadius={50}
            paddingAngle={2}
          >
            {data.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [
              `₹${Number(value).toLocaleString("en-IN")}`,
              name,
            ]}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-4">
        {data.slice(0, 6).map((item, index) => (
          <div key={item.category} className="flex items-center gap-2">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-xs text-slate-600 truncate">
              {item.category}
            </span>
            <span className="text-xs font-semibold text-slate-800 ml-auto">
              {item.percent}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryShareChart;
