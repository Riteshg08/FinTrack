import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import {
  buildSpendingTrend,
  TREND_PERIOD_OPTIONS,
} from "../../utils/dashboardHelpers";

function getXAxisInterval(period, length) {
  if (period === "year" || period === 7) {
    return 0;
  }
  if (period === 30) {
    return Math.floor(length / 6);
  }
  if (period === 60) {
    return Math.floor(length / 8);
  }
  if (period === 90) {
    return Math.floor(length / 10);
  }
  return "preserveStartEnd";
}

function SpendingTrendChart({ expenses = [], incomes = [] }) {
  const [period, setPeriod] = useState(7);

  // build chart data for the selected time period
  const data = buildSpendingTrend(expenses, incomes, period);

  let periodLabel = "";
  for (let i = 0; i < TREND_PERIOD_OPTIONS.length; i++) {
    if (TREND_PERIOD_OPTIONS[i].value === period) {
      periodLabel = TREND_PERIOD_OPTIONS[i].label;
      break;
    }
  }

  let hasData = false;
  for (let i = 0; i < data.length; i++) {
    if (data[i].income > 0 || data[i].expense > 0) {
      hasData = true;
      break;
    }
  }

  const xInterval = getXAxisInterval(period, data.length);
  const rotateLabels = period !== "year" && period > 7;

  function handlePeriodChange(e) {
    const val = e.target.value;
    if (val === "year") {
      setPeriod("year");
    } else {
      setPeriod(Number(val));
    }
  }

  return (
    <div className="card-padded lg:col-span-2">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Spending trend</h2>
          <p className="text-sm text-slate-500 mt-0.5">
            Income vs expenses · {periodLabel.toLowerCase()}
          </p>
        </div>

        <select
          value={period}
          onChange={handlePeriodChange}
          className="input-field py-2 px-3 text-sm w-full sm:w-auto min-w-[140px]"
        >
          {TREND_PERIOD_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {!hasData ? (
        <div className="h-[260px] flex items-center justify-center">
          <p className="text-slate-500 text-sm">
            No income or expense activity in {periodLabel.toLowerCase()}.
          </p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="incomeArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22C55E" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseArea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5B64F2" stopOpacity={0.25} />
                <stop offset="100%" stopColor="#5B64F2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f1f5f9"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 10, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              interval={xInterval}
              angle={rotateLabels ? -35 : 0}
              textAnchor={rotateLabels ? "end" : "middle"}
              height={rotateLabels ? 50 : 30}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              width={50}
              tickFormatter={(v) =>
                v >= 1000 ? `₹${(v / 1000).toFixed(0)}k` : `₹${v}`
              }
            />
            <Tooltip
              formatter={(v) => `₹${Number(v).toLocaleString("en-IN")}`}
              labelFormatter={(_, payload) => {
                const item = payload && payload[0] && payload[0].payload;
                if (!item) return "";
                if (item.weekday) {
                  return item.day + " (" + item.weekday + ")";
                }
                return item.day;
              }}
              contentStyle={{
                borderRadius: "12px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            />
            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 12 }}
            />
            <Area
              type="monotone"
              dataKey="income"
              name="Income"
              stroke="#22C55E"
              strokeWidth={2}
              fill="url(#incomeArea)"
            />
            <Area
              type="monotone"
              dataKey="expense"
              name="Expenses"
              stroke="#5B64F2"
              strokeWidth={2}
              fill="url(#expenseArea)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingTrendChart;
