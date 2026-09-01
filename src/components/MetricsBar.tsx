export function MetricsBar() {
  const metrics = [
    { k: "TTFT p50", v: "186ms", sub: "prefill", color: "from-indigo-500 to-violet-500" },
    { k: "TPOT", v: "14.2ms", sub: "KV-cache", color: "from-cyan-500 to-blue-500" },
    { k: "Goodput", v: "99.2%", sub: "SLO <500ms", color: "from-emerald-500 to-teal-500" },
    { k: "Throughput", v: "2.6k TPS", sub: "8xH100", color: "from-amber-500 to-orange-500" },
    { k: "Context", v: "1M", sub: "MLA residency", color: "from-violet-500 to-purple-500" },
    { k: "Cohort", v: "03 • Closed", sub: "invite-only", color: "from-slate-600 to-slate-800" },
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {metrics.map(m => (
        <div key={m.k} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className={`h-1 w-8 rounded-full bg-gradient-to-r ${m.color} mb-3`} />
          <div className="text-[11px] font-semibold tracking-widest uppercase text-slate-500">{m.k}</div>
          <div className="text-[16px] font-bold tracking-tight text-slate-900 mt-1">{m.v}</div>
          <div className="text-[11px] text-slate-500">{m.sub}</div>
        </div>
      ))}
    </div>
  );
}
