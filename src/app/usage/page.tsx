export default function UsagePage() {
  const bars = [12, 22, 18, 30, 16, 28, 35, 24, 40, 32, 26, 18, 22, 30];
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-display">Usage</h1>
          <p className="text-sm text-slate-600 mt-1">Cost and activity — updated every 5 minutes • UTC</p>
        </div>
        <div className="flex rounded-full border border-slate-200 p-1 text-xs bg-white">
          <button className="px-3 py-1.5 rounded-full bg-slate-900 text-white font-medium">7d</button>
          <button className="px-3 py-1.5 text-slate-600">24h</button>
          <button className="px-3 py-1.5 text-slate-600">14d</button>
          <button className="px-3 py-1.5 text-slate-600">30d</button>
          <button className="px-3 py-1.5 text-slate-600 flex items-center gap-1">Custom ▾</button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { k: "Total tokens", v: "0", sub: "Input 0 • Output 0", change: "—" },
          { k: "Total requests", v: "0", sub: "Responses + Chat", change: "—" },
          { k: "Cost", v: "$0.00", sub: "This period", change: "—" },
          { k: "Prompt caching", v: "—", sub: "Hit rate • tokens reused", change: "Not enabled" },
        ].map(m => (
          <div key={m.k} className="rounded-[16px] border border-slate-200 bg-white p-4 shadow-[0_1px_3px_rgba(0,0,0,.08)]">
            <div className="text-xs font-bold tracking-widest uppercase text-slate-500">{m.k}</div>
            <div className="text-xl font-bold text-slate-900 mt-1">{m.v}</div>
            <div className="text-xs text-slate-500">{m.sub} • {m.change}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-[16px] border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,.08)] p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold tracking-wide text-slate-900">Requests & Tokens — Last 7 days</h2>
          <span className="text-xs text-slate-500">AreaChart • per-model stacked • Export CSV</span>
        </div>
        <div className="mt-4 h-40 flex items-end gap-1">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col justify-end gap-1">
              <div className="rounded-t bg-[#0A2540]" style={{ height: `${h * 3}px`, opacity: 0.85 - i * 0.02 }} />
              <div className="h-1 rounded-full bg-slate-200" />
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-slate-500">
          <span>0 requests • 0 tokens • No activity in the last 7 days — chart will populate after first inference</span>
          <a href="/billing" className="text-[#0A8A74] font-medium hover:underline">View billing →</a>
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-6">
        <div className="rounded-[16px] border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,.08)] p-5">
          <h3 className="text-sm font-bold text-slate-900">Usage by model</h3>
          <div className="mt-3 space-y-2 text-sm">
            {[
              { m: "Fable 5", t: "0 tokens", c: "$0.00", w: "0%" },
              { m: "Opus 5", t: "0 tokens", c: "$0.00", w: "0%" },
              { m: "Sonnet 5", t: "0 tokens", c: "$0.00", w: "0%" },
              { m: "Haiku 4.5", t: "0 tokens", c: "$0.00", w: "0%" },
            ].map(r => (
              <div key={r.m} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                <span className="font-medium text-slate-900">{r.m}</span>
                <span className="text-slate-600">{r.t}</span>
                <span className="font-mono text-xs text-slate-500">{r.c}</span>
                <span className="w-16 h-1.5 rounded-full bg-slate-100 overflow-hidden"><span className="block h-full bg-[#0A8A74]" style={{ width: r.w }} /></span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[16px] border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,.08)] p-5">
          <h3 className="text-sm font-bold text-slate-900">Rate limits</h3>
          <div className="mt-3 space-y-3">
            {[
              { k: "Requests / min", v: "0 / 10,000", p: "0%" },
              { k: "Input tokens / min", v: "0 / 200,000", p: "0%" },
              { k: "Output tokens / min", v: "0 / 100,000", p: "0%" },
            ].map(l => (
              <div key={l.k}>
                <div className="flex justify-between text-xs"><span className="font-medium text-slate-700">{l.k}</span><span className="text-slate-500">{l.v} • {l.p}</span></div>
                <div className="mt-1 h-2 w-full rounded-full bg-slate-100 overflow-hidden"><div className="h-full bg-[#0A2540] rounded-full" style={{ width: l.p }} /></div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-slate-500">Tier: Build • <a href="/billing" className="text-[#0A8A74] hover:underline">Request increase →</a></div>
        </div>
      </div>
    </div>
  );
}
