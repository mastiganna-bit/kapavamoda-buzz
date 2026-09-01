import { catalog, categories } from "@/lib/catalog";
import { MetricsBar } from "@/components/MetricsBar";

const categoryStyles: Record<string, { bg: string; border: string; dot: string; accent: string }> = {
  text: { bg: "from-indigo-50 to-violet-50", border: "border-indigo-200", dot: "bg-indigo-600", accent: "text-indigo-700" },
  image: { bg: "from-fuchsia-50 to-pink-50", border: "border-fuchsia-200", dot: "bg-fuchsia-600", accent: "text-fuchsia-700" },
  video: { bg: "from-cyan-50 to-blue-50", border: "border-cyan-200", dot: "bg-cyan-600", accent: "text-cyan-700" },
  audio: { bg: "from-amber-50 to-orange-50", border: "border-amber-200", dot: "bg-amber-600", accent: "text-amber-700" },
};

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* cohort banner - softer */}
      <div className="border-b border-amber-200 bg-amber-50">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-[12px]">
          <span className="inline-flex items-center gap-2 font-medium text-amber-900">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" /> Cohort-03 is now closed — limited to invited developers only
          </span>
          <span className="text-amber-700 text-xs">New applications are waitlisted. Operator review required.</span>
        </div>
      </div>

      {/* hero - genuine, polished */}
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 pt-8 pb-6">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" /> Private Inference Fabric • Invite-Only • Hard-Coded
              <span className="hidden sm:inline-flex ml-1 rounded-full bg-slate-900 px-2 py-0.5 text-[10px] tracking-widest uppercase text-white">COHORT-03</span>
            </div>
            <h1 className="mt-5 text-[36px] sm:text-[48px] font-bold tracking-[-0.03em] leading-[0.95] text-slate-900">
              The inference fabric<br />
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">for builders, not browsers.</span>
            </h1>
            <p className="mt-4 max-w-[640px] text-[15px] leading-7 text-slate-600">
              <span className="font-semibold text-slate-900">kapavamoda.buzz</span> is a private, operator-provisioned platform. We host <span className="font-semibold text-slate-900">47 production models</span> across Text, Image, Video and Audio - with hard-coded routing on H100x8 NVLink. No public signup, no vibe-coded dashboards.
            </p>
            <p className="mt-3 max-w-[640px] text-sm leading-6 text-slate-500 border-l-2 border-slate-200 pl-4">
              Designed for engineers who understand <span className="font-medium text-slate-700">MoE sparsity, MLA, TTFT/TPOT and KV-cache residency</span>. If you need screenshots, this fabric is not for you. Admission is manual and limited.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/models" className="h-11 inline-flex items-center rounded-full bg-slate-900 px-6 text-sm font-semibold text-white hover:bg-slate-800 transition shadow-sm">Explore Catalog — 47 models →</a>
              <a href="/docs" className="h-11 inline-flex items-center rounded-full border border-slate-200 bg-white px-6 text-sm font-medium text-slate-700 hover:bg-slate-50 transition">View Documentation</a>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200 px-3 py-1.5 text-slate-700"><span className="h-1.5 w-1.5 rounded-full bg-indigo-500" /> Bearer + x-kapa-key</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200 px-3 py-1.5 text-slate-700"><span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Invite-only</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-50 border border-slate-200 px-3 py-1.5 text-slate-700"><span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> GitHub + Vercel store</span>
            </div>

            <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { k: "Auth", v: "Bearer + x-kapa-key", sub: "scope: inference:execute", color: "border-indigo-200 bg-indigo-50" },
                { k: "Admission", v: "Cohort-03 closed", sub: "operator manual", color: "border-amber-200 bg-amber-50" },
                { k: "Context", v: "1M residency", sub: "MLA 37B active", color: "border-violet-200 bg-violet-50" },
                { k: "Storage", v: "Vercel + GitHub", sub: "JSON, no DB", color: "border-slate-200 bg-slate-50" },
              ].map(c => (
                <div key={c.k} className={`rounded-2xl border p-3.5 ${c.color}`}>
                  <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-600">{c.k}</div>
                  <div className="text-sm font-semibold text-slate-900 mt-1">{c.v}</div>
                  <div className="text-xs text-slate-600">{c.sub}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white shadow-xl overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-3">
              <span className="text-xs font-semibold tracking-widest uppercase text-slate-600">Live Fabric Snapshot</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-bold tracking-widest uppercase text-white">● LIVE</span>
            </div>
            <div className="bg-slate-950 p-4 font-mono text-xs leading-5 text-slate-200 overflow-x-auto">
              <div className="text-slate-500"># POST /v1/inference/execute — invite key required</div>
              <div className="mt-2 text-white">curl -X POST https://kapavamoda.buzz/v1/inference/execute \</div>
              <div className="text-cyan-300">&nbsp;&nbsp;-H &quot;Authorization: Bearer $KAPA_KEY&quot; \</div>
              <div className="text-cyan-300">&nbsp;&nbsp;-H &quot;x-kapa-cohort: 03&quot; \</div>
              <div className="text-slate-300">&nbsp;&nbsp;-d &apos;&#123; &quot;model&quot;: &quot;claude-sonnet-5&quot;, &quot;prompt&quot;: &quot;ship it&quot; &#125;&apos;</div>
              <div className="mt-3 rounded-xl bg-slate-900 border border-slate-800 p-3 text-xs leading-4">
                <div className="text-slate-400">// 200 OK — routed via admission-control</div>
                <div className="text-emerald-300 mt-1">&#123; &quot;decision&quot;: &#123; &quot;targetRef&quot;: &quot;h100x8-nvlink&quot; &#125;, &quot;time_info&quot;: &#123; &quot;prefill_ms&quot;: 186, &quot;decode_ms&quot;: 842 &#125; &#125;</div>
                <div className="text-slate-500 mt-1">// TTFT 186ms p50 • TPOT 14.2ms • Goodput 99.2%</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 border-t border-slate-100">
              <div className="rounded-xl bg-white border border-slate-200 p-3">
                <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-500">Inference Path</div>
                <div className="text-sm font-medium text-slate-900 mt-1">prefill → decode → SynthID</div>
              </div>
              <div className="rounded-xl bg-white border border-slate-200 p-3">
                <div className="text-[10px] font-semibold tracking-widest uppercase text-slate-500">Provenance</div>
                <div className="text-sm font-medium text-slate-900 mt-1">Vertex + 1.04T MoE</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <MetricsBar />
        </div>
      </div>

      {/* categories - color-coded genuine cards */}
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 pb-6">
        <div className="flex items-baseline justify-between border-b border-slate-200 pb-4">
          <h2 className="text-sm font-bold tracking-widest uppercase text-slate-900">Model Catalog — 4 Surfaces • {catalog.length} Endpoints</h2>
          <a href="/models" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">View all catalog →</a>
        </div>
        <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          {categories.map(cat => {
            const models = catalog.filter(m => m.category === cat.id);
            const style = categoryStyles[cat.id] ?? categoryStyles.text;
            return (
              <a key={cat.id} href={`/models#${cat.id}`} className={`group rounded-3xl border-2 ${style.border} bg-gradient-to-br ${style.bg} p-[1px] hover:shadow-lg transition`}>
                <div className="rounded-[22px] bg-white p-5 h-full flex flex-col">
                  <div className="flex items-center gap-2.5">
                    <span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} />
                    <span className="text-xs font-bold tracking-widest uppercase text-slate-900">{cat.label}</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1 leading-5">{cat.desc}</div>
                  <div className={`mt-3 inline-flex self-start rounded-full bg-white border ${style.border} px-2.5 py-1 text-xs font-medium ${style.accent}`}>{cat.count} endpoints • hard-coded</div>
                  <ul className="mt-4 space-y-2 flex-1">
                    {models.slice(0, 5).map(m => (
                      <li key={m.id} className="flex justify-between gap-2 text-sm">
                        <span className="font-medium text-slate-900 truncate">{m.display}</span>
                        <span className="text-xs text-slate-500 font-mono shrink-0">{m.provider}</span>
                      </li>
                    ))}
                    {models.length > 5 && <li className="text-xs text-slate-500">+{models.length - 5} more models →</li>}
                  </ul>
                  <div className={`mt-4 rounded-full bg-slate-900 text-white text-xs font-semibold tracking-wide text-center py-2 group-hover:bg-slate-800`}>Enter {cat.label.toLowerCase()} →</div>
                </div>
              </a>
            );
          })}
        </div>
      </div>

      {/* limited onboarding value prop */}
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 pb-8">
        <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden grid lg:grid-cols-[1.3fr_0.7fr]">
          <div className="p-8">
            <div className="inline-flex rounded-full bg-indigo-50 border border-indigo-200 px-3 py-1 text-xs font-semibold tracking-widest uppercase text-indigo-700">Why Limited Access</div>
            <h3 className="mt-3 text-xl font-bold tracking-tight text-slate-900">Built for a small cohort of serious builders.</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">We keep the cohort small so every developer gets low-latency, high-residency inference. No queue dilution, no over-subscription. When the limit is reached, onboarding pauses until the next cohort.</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center rounded-full bg-slate-900 px-3 py-1.5 text-xs font-medium text-white">Limited to invited developers</span>
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700">Manual review • 24-48h</span>
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700">No public self-serve</span>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-700">MLA 37B / 671B</span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-700">GQA 96 heads</span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-700">EAGLE-3</span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-slate-700">FlashAttention-3</span>
            </div>
          </div>
          <div className="bg-slate-50 border-t lg:border-t-0 lg:border-l border-slate-200 p-8 flex flex-col">
            <div className="text-xs font-bold tracking-widest uppercase text-slate-900">Admission Status</div>
            <div className="mt-3 rounded-2xl bg-amber-50 border border-amber-200 p-4">
              <div className="text-sm font-semibold text-amber-900">Cohort-03 — Closed</div>
              <div className="text-sm leading-5 text-amber-800 mt-1">Onboarding limit reached. New requests are waitlisted for Cohort-04. You will still get a response within 48 hours.</div>
            </div>
            <p className="mt-3 text-sm leading-5 text-slate-600">Approved developers receive an <span className="font-semibold text-slate-900 font-mono text-xs">x-kapa-key</span> scoped to their cohort. All models are hard-coded in GitHub JSON.</p>
            <a href="/signup" className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800 transition">Join Waitlist →</a>
            <a href="/login" className="mt-2 inline-flex h-10 items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition">Developer Sign In</a>
          </div>
        </div>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600 flex gap-2">
          <span className="text-amber-600">⚠</span>
          <span><span className="font-semibold text-slate-900">Note on Legacy:</span> GPT-4o/4.1/o3 and Sora 2 are deprecated - listed only for reference. Gemini 2.5 sunsets Oct 16 2026. See <a href="/docs" className="text-indigo-600 hover:underline font-medium">/docs</a> for migration.</span>
        </div>
      </div>
    </div>
  );
}
