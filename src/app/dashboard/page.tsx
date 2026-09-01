export default function DashboardPage() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 py-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-display">Good afternoon, Mahesh</h1>
          <p className="text-sm text-slate-600 mt-1">Mahesh’s Individual Org • Last active 2m ago • <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-xs font-medium text-emerald-700">● Fabric Online</span></p>
        </div>
        <div className="flex gap-2">
          <span className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-4 py-2 text-sm text-slate-700">Organization credits <span className="font-semibold text-slate-900">$0.00</span> <a href="/billing" className="text-[#0A8A74] font-medium hover:underline ml-1">View billing →</a></span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.6fr_0.9fr] gap-6">
        <div className="space-y-6">
          <div className="rounded-[16px] border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,.08)] p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold tracking-wide text-slate-900">Get started</h2>
              <button className="text-xs text-slate-500 hover:text-slate-700">Dismiss ×</button>
            </div>
            <div className="mt-4 grid sm:grid-cols-3 gap-3">
              {[
                { n: "1", title: "Create an API key", desc: "Generate a key to authenticate your requests", cta: "Create key →", href: "/keys", done: false },
                { n: "2", title: "Test models", desc: "Try 49 models in the Playground", cta: "Open Playground →", href: "/playground", done: false },
                { n: "3", title: "Add credits", desc: "Prepaid credits • 1yr expiry • 20% OFF", cta: "Add funds →", href: "/billing", done: false },
              ].map(s => (
                <a key={s.n} href={s.href} className="rounded-xl border border-slate-200 bg-slate-50 p-4 hover:bg-white hover:shadow-sm transition group">
                  <div className="h-6 w-6 rounded-full bg-[#0A2540] text-white flex items-center justify-center text-xs font-bold">{s.n}</div>
                  <div className="text-sm font-semibold text-slate-900 mt-2">{s.title}</div>
                  <div className="text-xs leading-4 text-slate-600 mt-1">{s.desc}</div>
                  <div className="text-xs font-medium text-[#0A8A74] mt-2 group-hover:underline">{s.cta}</div>
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-[16px] border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,.08)] p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold tracking-wide text-slate-900">Usage summary</h2>
              <div className="flex rounded-full border border-slate-200 p-1 text-xs">
                <button className="px-3 py-1 rounded-full bg-slate-900 text-white font-medium">7d</button>
                <button className="px-3 py-1 text-slate-600">24h</button>
                <button className="px-3 py-1 text-slate-600">14d</button>
                <button className="px-3 py-1 text-slate-600">30d</button>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-3">
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><div className="text-xs font-bold tracking-widest uppercase text-slate-500">Total tokens</div><div className="text-xl font-bold text-slate-900 mt-1">0</div><div className="text-xs text-slate-500">Input: 0 • Output: 0</div></div>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><div className="text-xs font-bold tracking-widest uppercase text-slate-500">Total requests</div><div className="text-xl font-bold text-slate-900 mt-1">0</div><div className="text-xs text-slate-500">Responses + Chat</div></div>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><div className="text-xs font-bold tracking-widest uppercase text-slate-500">Prompt caching</div><div className="text-xl font-bold text-slate-900 mt-1">—</div><div className="text-xs text-slate-500">Hit rate • tokens reused</div></div>
            </div>
            <div className="mt-4 h-28 rounded-xl bg-[#F6F9FC] border border-slate-200 flex items-center justify-center text-xs text-slate-500">
              No activity in the last 7 days — chart will appear after first request
            </div>
            <div className="mt-3 flex justify-between text-xs text-slate-500">
              <span>Credit remaining <span className="font-semibold text-slate-900">$0.00</span></span>
              <span>Responses and Chat Completions</span>
            </div>
          </div>

          <div className="rounded-[16px] border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,.08)] p-5">
            <h2 className="text-sm font-bold tracking-wide text-slate-900">Recommended models</h2>
            <div className="mt-3 grid sm:grid-cols-2 gap-3">
              {[
                { name: "Fable 5", tag: "Most capable", use: "Research • Multi-day tasks", price: "$10 / $50" },
                { name: "Opus 5", tag: "Complex projects", use: "Agents • Coding", price: "$5 / $25" },
                { name: "Sonnet 5", tag: "Everyday tasks", use: "Writing • Cost-efficient", price: "$2 / $10" },
                { name: "Haiku 4.5", tag: "Fastest", use: "High volume", price: "$1 / $5" },
              ].map(m => (
                <div key={m.name} className="rounded-xl border border-slate-200 p-3 flex justify-between">
                  <div><div className="text-sm font-semibold text-slate-900">{m.name} <span className="text-xs font-medium text-[#0A8A74] bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-full ml-1">{m.tag}</span></div><div className="text-xs text-slate-600 mt-1">{m.use}</div></div>
                  <div className="text-xs font-mono text-slate-500">{m.price}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[16px] border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,.08)] p-5">
            <h2 className="text-sm font-bold tracking-wide text-slate-900">Organization credits</h2>
            <div className="mt-3 text-2xl font-bold text-slate-900">$0.00</div>
            <a href="/billing" className="text-xs font-medium text-[#0A8A74] hover:underline">View billing</a>
            <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-3">
              <div className="text-xs font-bold tracking-widest uppercase text-slate-500">Spend this month</div>
              <div className="text-sm font-semibold text-slate-900 mt-1">$0.00 of $500 limit • resets Oct 1 (UTC)</div>
              <div className="mt-2 h-2 w-full rounded-full bg-slate-200 overflow-hidden"><div className="h-full w-0 bg-[#0A2540]" /></div>
              <div className="text-xs text-slate-500 mt-1">No activity yet — add credits to start</div>
            </div>
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between"><span className="text-slate-600">Prompt caching</span><span className="font-medium text-slate-900">Not enabled — tokens reused</span></div>
              <div className="flex justify-between"><span className="text-slate-600">Token volume</span><span className="font-medium text-slate-900">—</span></div>
            </div>
          </div>

          <div className="rounded-[16px] border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,.08)] p-5">
            <h2 className="text-sm font-bold tracking-wide text-slate-900">Resources</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><a href="/docs" className="flex justify-between p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200"><span>Advisor tool <span className="text-xs bg-amber-100 border border-amber-200 text-amber-800 px-1.5 py-0.5 rounded-full ml-1">Beta</span></span><span className="text-slate-400">→</span></a><div className="text-xs text-slate-500 ml-2 -mt-1">Increase intelligence while minimizing cost</div></li>
              <li><a href="/docs" className="flex justify-between p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200"><span>Fast mode</span><span className="text-slate-400">→</span></a><div className="text-xs text-slate-500 ml-2 -mt-1">Up to 2.5x faster output</div></li>
              <li><a href="/docs" className="flex justify-between p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200"><span>Batch API</span><span className="text-slate-400">→</span></a><div className="text-xs text-slate-500 ml-2 -mt-1">Save 50% on async workloads</div></li>
              <li><a href="/docs" className="flex justify-between p-2 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-200"><span>Prompt caching</span><span className="text-slate-400">→</span></a></li>
            </ul>
          </div>

          <div className="rounded-[16px] border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,.08)] p-5">
            <div className="flex justify-between"><h2 className="text-sm font-bold tracking-wide text-slate-900">Updates</h2><span className="text-xs text-slate-500">last month</span></div>
            <ul className="mt-3 space-y-3 text-xs leading-5">
              <li><div className="font-semibold text-slate-900">GPT-5.6 Sol, Terra, and Luna</div><div className="text-slate-600">Our state-of-the-art model completes tasks across coding with fewer tokens.</div></li>
              <li><div className="font-semibold text-slate-900">Omni Flash 1.1 & Omni Flash</div><div className="text-slate-600">Native video + audio generation — now in video catalog.</div></li>
              <li><div className="font-semibold text-slate-900">20% OFF on credit limits</div><div className="text-slate-600">Cohort-03 exclusive — claim in billing.</div></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
