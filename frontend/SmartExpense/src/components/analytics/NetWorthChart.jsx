import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

function NetWorthChart({ data }) {
  return (
    <div className="card-padded lg:col-span-2">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-900">Net Worth Trend</h2>
        <p className="text-sm text-slate-500 mt-0.5">Rolling 12 months</p>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
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
            width={50}
            tickFormatter={(v) =>
              v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v
            }
          />
          <Tooltip
            formatter={(value) => [
              `₹${Number(value).toLocaleString("en-IN")}`,
              "Net Worth",
            ]}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          />
          <Line
            type="monotone"
            dataKey="netWorth"
            stroke="#5B64F2"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 5, fill: "#5B64F2" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default NetWorthChart;
