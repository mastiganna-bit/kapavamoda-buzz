import { catalog, categories } from "@/lib/catalog";

const catMeta: Record<string, { color: string; bg: string; border: string; accent: string }> = {
  text: { color: "bg-[#0A2540]", bg: "bg-slate-50", border: "border-slate-200", accent: "text-slate-700" },
  image: { color: "bg-[#0A2540]", bg: "bg-slate-50", border: "border-slate-200", accent: "text-slate-700" },
  video: { color: "bg-[#0A8A74]", bg: "bg-emerald-50", border: "border-emerald-200", accent: "text-emerald-700" },
  audio: { color: "bg-[#0A2540]", bg: "bg-slate-50", border: "border-slate-200", accent: "text-slate-700" },
};

export default function ModelsPage() {
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 py-8">
      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm px-6 py-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">Model Catalog — {catalog.length} endpoints • 4 surfaces</h1>
          <p className="text-sm text-slate-600 mt-1">Production-ready • OpenAPI 3.1 • Fully managed • Search by endpoint ID</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-white">671B MoE max</span>
          <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700">1M ctx residency</span>
          <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">p50 TTFT 186ms</span>
        </div>
      </div>

      {categories.map(cat => {
        const models = catalog.filter(m => m.category === cat.id);
        const meta = catMeta[cat.id] ?? catMeta.text;
        return (
          <div key={cat.id} id={cat.id} className="mt-10 scroll-mt-20">
            <div className="flex items-center gap-3">
              <span className={`h-2 w-2 rounded-full ${meta.color}`} />
              <h2 className="text-sm font-bold tracking-widest uppercase text-slate-900">{cat.label}</h2>
              <span className="text-sm text-slate-500 hidden sm:inline">— {cat.desc}</span>
              <span className={`ml-auto rounded-full border ${meta.border} ${meta.bg} px-3 py-1 text-xs font-semibold ${meta.accent}`}>{models.length} endpoints</span>
            </div>
            <div className="mt-4 grid lg:grid-cols-2 gap-4">
              {models.map(m => (
                <div key={m.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition group">
                  <div className="px-5 py-4 flex items-start justify-between gap-3 border-b border-slate-100 bg-gradient-to-r from-white to-slate-50">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-semibold text-slate-900">{m.display}</span>
                        <span className={`text-[10px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded-full border ${m.status==='current' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : m.status==='legacy' ? 'border-amber-200 bg-amber-50 text-amber-700' : 'border-red-200 bg-red-50 text-red-700'}`}>{m.status}</span>
                      </div>
                      <div className="text-xs font-mono text-slate-500 mt-1">{m.provider} • {m.family} • <span className="text-slate-700 font-medium">{m.endpoint}</span></div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-xs font-mono font-medium text-slate-900">{m.pricing}</div>
                      <div className="text-xs text-slate-500">{m.contextWindow} ctx</div>
                    </div>
                  </div>
                  <div className="px-5 py-4 grid grid-cols-2 gap-4 text-xs">
                    <div><div className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Modality</div><div className="text-slate-900 mt-1 font-mono text-xs">{m.modalityIn} → {m.modalityOut}</div></div>
                    <div><div className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Architecture</div><div className="text-slate-700 mt-1 leading-4">{m.architecture ?? "—"}</div></div>
                    <div><div className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Performance</div><div className="text-slate-600 mt-1 font-mono text-xs">{m.specs.ttft ? `TTFT ${m.specs.ttft}` : m.specs.latency ?? "—"} {m.specs.tps ? `• ${m.specs.tps}` : m.specs.tpot ? `• TPOT ${m.specs.tpot}` : ""}</div></div>
                    <div><div className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Best For</div><div className="text-slate-600 mt-1 leading-4">{m.bestFor}</div></div>
                  </div>
                  {(m.activeParams || m.totalParams || m.license) && (
                    <div className="px-5 pb-3 flex flex-wrap gap-1.5">
                      {m.totalParams && <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-mono text-slate-600">{m.totalParams} total</span>}
                      {m.activeParams && <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-mono text-slate-600">{m.activeParams} active</span>}
                      {m.license && <span className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600">{m.license}</span>}
                    </div>
                  )}
                  {m.notes && <div className="mx-5 mb-3 rounded-xl bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-800">{m.notes}</div>}
                  <div className="px-5 py-3 border-t border-slate-100 flex justify-between text-xs bg-slate-50">
                    <span className="font-mono text-slate-600">POST /v1/inference/execute</span>
                    <span className="font-medium text-slate-700">x-kapa-key required</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
        <span className="font-semibold text-slate-900">Note:</span> All model endpoints are versioned and maintained by our team. Deprecated IDs remain with red badge for migration tracking — do not route production traffic.
      </div>
    </div>
  );
}
