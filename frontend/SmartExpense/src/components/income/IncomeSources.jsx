const SOURCE_COLORS = [
  "#5B64F2",
  "#14B8A6",
  "#F59E0B",
  "#3B82F6",
  "#EC4899",
  "#8B5CF6",
];

function getSourceBreakdown(incomes = []) {
  const totals = {};

  for (let i = 0; i < incomes.length; i++) {
    const inc = incomes[i];
    let key = "Other";
    if (inc.source) {
      key = inc.source;
    }
    if (!totals[key]) {
      totals[key] = 0;
    }
    totals[key] = totals[key] + Number(inc.amount);
  }

  let grandTotal = 0;
  const keys = Object.keys(totals);
  for (let i = 0; i < keys.length; i++) {
    grandTotal = grandTotal + totals[keys[i]];
  }

  const result = [];
  for (let i = 0; i < keys.length; i++) {
    const name = keys[i];
    const amount = totals[name];
    let percent = 0;
    if (grandTotal > 0) {
      percent = Math.round((amount / grandTotal) * 100);
    }
    result.push({ name, amount, percent });
  }

  result.sort(function (a, b) {
    return b.amount - a.amount;
  });

  return result.slice(0, 6);
}

function IncomeSources({ incomes }) {
  const sources = getSourceBreakdown(incomes);

  return (
    <div className="card-padded h-full">
      <h2 className="text-lg font-bold text-slate-900 mb-6">Sources</h2>

      {sources.length === 0 ? (
        <p className="text-slate-500 text-sm">No income sources yet.</p>
      ) : (
        <div className="space-y-5">
          {sources.map((source, index) => (
            <div key={source.name}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-800">
                  {source.name}
                </span>
                <span className="text-sm text-slate-500">{source.percent}%</span>
              </div>

              <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: source.percent + "%",
                    backgroundColor:
                      SOURCE_COLORS[index % SOURCE_COLORS.length],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default IncomeSources;
