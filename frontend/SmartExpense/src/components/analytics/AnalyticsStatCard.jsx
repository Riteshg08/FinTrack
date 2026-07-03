import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Sparkles,
} from "lucide-react";

function AnalyticsStatCard({
  title,
  value,
  subtitle,
  trend = "neutral",
  icon: Icon,
  suffix = "",
}) {
  const trendColors = {
    positive: "text-green-600",
    negative: "text-red-500",
    neutral: "text-slate-400",
    info: "text-primary",
  };

  let displayValue = value + suffix;
  if (typeof value === "number" && !suffix) {
    displayValue =
      "₹" +
      Number(value).toLocaleString("en-IN", { maximumFractionDigits: 0 });
  }

  return (
    <div className="card p-5 sm:p-6 relative">
      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center">
        <Icon size={17} className="text-slate-400" />
      </div>

      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider pr-10">
        {title}
      </p>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
        {displayValue}
      </h2>

      {subtitle && (
        <p className={`text-xs mt-3 font-medium ${trendColors[trend]}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

export { Wallet, TrendingUp, TrendingDown, Sparkles };
export default AnalyticsStatCard;
