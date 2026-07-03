import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
} from "lucide-react";

// icon and color for each stat card title
const config = {
  "Total Balance": { icon: Wallet, color: "bg-primary-50 text-primary" },
  Income: { icon: TrendingUp, color: "bg-green-50 text-green-600" },
  Expenses: { icon: TrendingDown, color: "bg-red-50 text-red-500" },
  Savings: { icon: PiggyBank, color: "bg-amber-50 text-amber-600" },
};

function StatCard({
  title,
  value,
  subtitle,
  trend = "neutral",
  format = "currency",
}) {
  let cardConfig = config[title];
  if (!cardConfig) {
    cardConfig = config["Total Balance"];
  }
  const Icon = cardConfig.icon;
  const color = cardConfig.color;

  const trendColors = {
    positive: "text-green-600",
    negative: "text-red-500",
    info: "text-primary",
    neutral: "text-slate-400",
  };

  let formattedValue = "";
  if (format === "percentage") {
    formattedValue =
      Number(value).toLocaleString("en-IN", { maximumFractionDigits: 1 }) + "%";
  } else if (format === "number") {
    formattedValue = Number(value).toLocaleString("en-IN");
  } else {
    formattedValue =
      "₹" +
      Number(value).toLocaleString("en-IN", { maximumFractionDigits: 0 });
  }

  const subtitleColor = trendColors[trend];

  return (
    <div className="card p-5 sm:p-6 relative">
      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${color}`}>
          <Icon size={16} />
        </div>
      </div>

      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider pr-12">
        {title}
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
        {formattedValue}
      </h2>

      {subtitle && (
        <p className={`text-xs mt-3 font-medium ${subtitleColor}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default StatCard;
