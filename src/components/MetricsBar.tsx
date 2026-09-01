export function MetricsBar() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
      {/* Lead - bento asymmetry breaks 3-card sameness */}
      <div className="col-span-2 rounded-[16px] border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,.08)]">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-semibold tracking-widest uppercase text-slate-500">TTFT p50 • Prefill</div>
          <span className="h-1.5 w-1.5 rounded-full bg-[#0A8A74] animate-pulse" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-[22px] font-bold tracking-tight text-slate-900 font-display">186ms</span>
          <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full">SLO &lt;500ms</span>
        </div>
        <div className="mt-3 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
          <div className="h-full w-[72%] bg-[#0A2540] rounded-full" />
        </div>
        <div className="mt-1.5 text-[11px] text-slate-500">Goodput 99.2% • 2.6k TPS • 8xH100</div>
      </div>
      <div className="rounded-[16px] border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,.08)]">
        <div className="text-[11px] font-semibold tracking-widest uppercase text-slate-500">TPOT • Decode</div>
        <div className="text-[16px] font-bold tracking-tight text-slate-900 mt-1">14.2ms</div>
        <div className="text-[11px] text-slate-500">KV-cache</div>
      </div>
      <div className="rounded-[16px] border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,.08)]">
        <div className="text-[11px] font-semibold tracking-widest uppercase text-slate-500">Context</div>
        <div className="text-[16px] font-bold tracking-tight text-slate-900 mt-1">1M</div>
        <div className="text-[11px] text-slate-500">MLA residency</div>
      </div>
      <div className="rounded-[16px] border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,.08)]">
        <div className="text-[11px] font-semibold tracking-widest uppercase text-slate-500">Throughput</div>
        <div className="text-[16px] font-bold tracking-tight text-slate-900 mt-1">2.6k</div>
        <div className="text-[11px] text-slate-500">TPS • H100x8</div>
      </div>
      <div className="rounded-[16px] border border-amber-200 bg-amber-50 p-4 shadow-[0_1px_3px_rgba(0,0,0,.08)]">
        <div className="text-[11px] font-semibold tracking-widest uppercase text-amber-700">Cohort</div>
        <div className="text-[16px] font-bold tracking-tight text-amber-900 mt-1">03 • Closed</div>
        <div className="text-[11px] text-amber-700">invite-only</div>
      </div>
    </div>
  );
}
