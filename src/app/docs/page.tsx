export default function DocsPage() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 py-8 grid lg:grid-cols-[240px_1fr_340px] gap-6">
      <aside className="hidden lg:block sticky top-[72px] h-fit rounded-2xl border border-slate-200 bg-white shadow-sm p-4">
        <div className="text-xs font-bold tracking-widest uppercase text-slate-500 mb-3">Docs — Fabric v0.3</div>
        <nav className="space-y-1 text-sm">
          <div className="text-xs font-bold tracking-widest uppercase text-slate-900 mt-3">Getting Started</div>
          <a className="block rounded-lg px-2 py-1.5 text-slate-700 bg-slate-50 font-medium">Quickstart — 3 steps</a>
          <a className="block px-2 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg">Auth — Bearer + x-kapa-key</a>
          <a className="block px-2 py-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg">Admission — Cohort 03</a>
          <div className="text-xs font-bold tracking-widest uppercase text-slate-900 mt-4">Concepts</div>
          <a className="block px-2 py-1.5 text-slate-600 hover:text-slate-900">Prefill vs Decode</a>
          <a className="block px-2 py-1.5 text-slate-600 hover:text-slate-900">KV-cache Residency (MLA)</a>
          <a className="block px-2 py-1.5 text-slate-600 hover:text-slate-900">MoE Routing & Sparsity</a>
          <a className="block px-2 py-1.5 text-slate-600 hover:text-slate-900">Tensor Parallel 8xH100</a>
          <div className="text-xs font-bold tracking-widest uppercase text-slate-900 mt-4">Reference</div>
          <a className="block px-2 py-1.5 text-slate-600 hover:text-slate-900">POST /v1/inference/execute</a>
          <a className="block px-2 py-1.5 text-slate-600 hover:text-slate-900">Streaming SSE</a>
          <a className="block px-2 py-1.5 text-slate-600 hover:text-slate-900">Errors & Retries</a>
        </nav>
      </aside>

      <article className="min-w-0 rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-6 border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white">
          <div className="inline-flex rounded-full bg-indigo-50 border border-indigo-200 px-2.5 py-1 text-xs font-semibold tracking-widest uppercase text-indigo-700">kapavamoda.buzz • OpenAPI 3.1</div>
          <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">Execute inference — routed, admission-controlled, watermarked.</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">Optimized routing with enterprise-grade reliability. You pick the target model, we ensure consistent performance. Monitor your latency in queue, prefill and decode metrics.</p>
        </div>

        <div className="px-6 py-6 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-sm font-bold tracking-wide text-slate-900">Quickstart — 3 steps before 200 OK</div>
            <ol className="mt-3 space-y-2 text-sm leading-6 text-slate-700 list-decimal list-inside">
              <li>Operator provisions <span className="font-mono text-xs bg-white border border-slate-200 px-1.5 py-0.5 rounded">x-kapa-key</span> scoped to cohort-03.</li>
              <li>Export <span className="font-mono text-xs bg-white border border-slate-200 px-1.5 py-0.5 rounded">KAPA_KEY</span> and <span className="font-mono text-xs bg-white border border-slate-200 px-1.5 py-0.5 rounded">KAPA_BASE=https://kapavamoda.buzz</span></li>
              <li>POST with routing hints — see runnable example →</li>
            </ol>
            <div className="mt-3 text-xs text-slate-500">TTSR target &lt;5min. Sandbox vs prod isolated. Limited cohort keeps goodput high.</div>
          </div>

          <div>
            <h2 className="text-sm font-bold tracking-wide text-slate-900">Auth — Bearer + x-kapa-key</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">All calls require <span className="font-mono text-xs bg-slate-900 text-white px-1.5 py-0.5 rounded">Authorization: Bearer $KAPA_KEY</span> plus cohort header <span className="font-mono text-xs bg-white border border-slate-200 px-1.5 py-0.5 rounded">x-kapa-cohort: 03</span>. Keys are scoped, rotated by operator, audit-logged.</p>
            <div className="mt-3 grid sm:grid-cols-3 gap-3">
              <div className="rounded-xl border border-slate-200 bg-white p-3"><div className="text-xs font-bold tracking-widest uppercase text-slate-500">Scope</div><div className="text-sm font-medium text-slate-900 mt-1">inference:execute</div></div>
              <div className="rounded-xl border border-slate-200 bg-white p-3"><div className="text-xs font-bold tracking-widest uppercase text-slate-500">Rate</div><div className="text-sm font-medium text-slate-900 mt-1">per-key RPS + TPM</div></div>
              <div className="rounded-xl border border-slate-200 bg-white p-3"><div className="text-xs font-bold tracking-widest uppercase text-slate-500">Residency</div><div className="text-sm font-medium text-slate-900 mt-1">KV-cache 1M</div></div>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold tracking-wide text-slate-900">Concepts — why TTFT vs TPOT matters</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">Prefill is compute-bound (prompt ingestion, MLA compression). Decode is memory-bound (KV-cache streaming). TTFT is your prefill SLO. TPOT is your decode slope. Batch <span className="font-mono text-xs">max_num_seqs</span> too high and you trade RPS for queuing.</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-mono text-slate-700">TTFT p50 186ms</span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-mono text-slate-700">TPOT 14.2ms</span>
              <span className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-mono text-slate-700">Goodput 99.2%</span>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            Operator note: MoE 1.04T total / 32B active - you pay the 32B inference cost, not the 1T marketing number. Same for DeepSeek 671B/37B, Qwen 235B/22B.
          </div>
        </div>
      </article>

      <aside className="hidden lg:block sticky top-[72px] h-fit space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-slate-950 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-slate-800 flex justify-between items-center">
            <span className="text-xs font-bold tracking-widest uppercase text-slate-400">Runnable — copy, paste, 200 OK</span>
            <span className="text-[10px] tracking-widest uppercase rounded-full bg-white px-2 py-1 font-bold text-slate-900">curl • py • js</span>
          </div>
          <pre className="p-4 text-xs leading-5 text-slate-200 overflow-x-auto">{`curl -X POST https://kapavamoda.buzz/v1/inference/execute \\
  -H "Authorization: Bearer $KAPA_KEY" \\
  -H "x-kapa-cohort: 03" \\
  -d '{
    "model": "kimi-k2",
    "prompt": "explain MLA vs GQA",
    "maxTokens": 800
  }'

# 200 OK — 186ms prefill`}</pre>
          <div className="px-4 py-3 border-t border-slate-800 text-xs text-slate-400">Invite key required. No demo anon path.</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-xs font-bold tracking-widest uppercase text-slate-900">Error Taxonomy</div>
          <ul className="mt-2 space-y-2 text-sm leading-5 text-slate-600">
            <li><span className="font-mono text-xs bg-slate-900 text-white px-1.5 py-0.5 rounded">429</span> cohort closed — wait for 04</li>
            <li><span className="font-mono text-xs bg-slate-900 text-white px-1.5 py-0.5 rounded">504</span> prefill timeout — reduce batch</li>
            <li><span className="font-mono text-xs bg-slate-900 text-white px-1.5 py-0.5 rounded">422</span> KV exceeded 1M</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
