"use client";
import { useState } from "react";
import { catalog } from "@/lib/catalog";

export default function PlaygroundPage() {
  const [model, setModel] = useState("claude-sonnet-5");
  const [prompt, setPrompt] = useState("Explain MoE sparsity vs dense with a concrete 671B/37B example");
  const [out, setOut] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showGate, setShowGate] = useState(false);

  function run() {
    // Check invite - always gate for non-onboarded
    setShowGate(true);
    setLoading(true);
    setTimeout(() => {
      setOut(`[kapavamoda.buzz • ${model} • cohort-03 • invite key required]\n\nMock execution - requires x-kapa-key provisioned by operator.\n\nYour prompt:\n${prompt}\n\nFor waitlisted developers: cohort-03 is full. Join waitlist at /signup. Operator will provision key for Cohort-04.`);
      setLoading(false);
    }, 800);
  }

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 py-8">
      <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 flex gap-3">
        <span className="h-6 w-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0">!</span>
        <div className="text-sm leading-5">
          <div className="font-semibold text-amber-900">Playground is invite-only, keyed</div>
          <div className="text-amber-800">This UI mocks the gateway. Production hits <span className="font-mono text-xs bg-white border border-amber-200 px-1.5 py-0.5 rounded">POST /v1/inference/execute</span> with <span className="font-mono text-xs bg-white border border-amber-200 px-1.5 py-0.5 rounded">x-kapa-key</span>. Cohort-03 closed.</div>
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-[420px_1fr] gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm p-5">
          <div className="text-xs font-bold tracking-widest uppercase text-slate-500">Playground — Cohort 03 • Admission Control</div>
          <label className="mt-4 block text-xs font-semibold tracking-widest uppercase text-slate-700">Model — endpoint ID</label>
          <select value={model} onChange={e=>setModel(e.target.value)} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50">
            {catalog.filter(m=>m.status==='current').slice(0, 20).map(m => <option key={m.id} value={m.id}>{m.display} — {m.contextWindow}</option>)}
          </select>
          <label className="mt-4 block text-xs font-semibold tracking-widest uppercase text-slate-700">Prompt</label>
          <textarea value={prompt} onChange={e=>setPrompt(e.target.value)} rows={5} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm leading-5 text-slate-900 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50" />
          <label className="mt-3 block text-xs font-semibold tracking-widest uppercase text-slate-700">x-kapa-key (invite)</label>
          <input placeholder="kapa_•••••••••••• (operator provisioned)" disabled className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-500 placeholder:text-slate-400" />
          <button onClick={run} disabled={loading} className="mt-4 w-full h-11 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-50 transition">{loading ? "Routing — prefill..." : "Execute — TTFT p50 186ms"}</button>
          <div className="mt-3 text-xs leading-5 text-slate-500">Limit reached? <a href="/signup" className="text-indigo-600 font-medium hover:text-indigo-700">Join waitlist</a> for Cohort-04.</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col min-h-[420px] overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex justify-between text-xs font-medium text-slate-600"><span>SSE Stream Output</span><span className="font-mono">queue 12ms • prefill 186ms</span></div>
          <pre className="flex-1 p-4 text-sm leading-6 text-slate-700 whitespace-pre-wrap overflow-auto bg-white">{out ?? "No execution yet. Select model, enter prompt, hit Execute.\n\nFor new developers: onboarding is limited. You will see waitlist message if not onboarded."}</pre>
          <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-white border border-slate-200 p-2.5"><div className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Admission</div><div className="text-sm font-medium text-slate-900 mt-1">closed</div></div>
            <div className="rounded-xl bg-white border border-slate-200 p-2.5"><div className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Cohort</div><div className="text-sm font-medium text-slate-900 mt-1">03</div></div>
            <div className="rounded-xl bg-white border border-slate-200 p-2.5"><div className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Fabric</div><div className="text-sm font-medium text-slate-900 mt-1">H100x8</div></div>
          </div>
        </div>
      </div>

      {showGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={()=>setShowGate(false)} />
          <div className="relative w-full max-w-[520px] rounded-3xl bg-white shadow-xl border border-slate-200 overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-amber-400 to-orange-500" />
            <div className="p-6">
              <div className="h-10 w-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">!</div>
              <h3 className="mt-3 text-lg font-bold text-slate-900">Onboarding Limit Reached</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Sorry, the limit for onboarding new developers is already full for Cohort-03. Private fabric stays small to keep goodput at 99.2%. Your execution was queued as a demo only.</p>
              <div className="mt-4 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-sm leading-5 text-amber-900">
                You can try again later — Cohort-04 waitlist is open. Operator reviews within 24-48h.
              </div>
              <div className="mt-5 flex gap-3">
                <a href="/signup" className="flex-1 h-10 inline-flex items-center justify-center rounded-full bg-slate-900 px-5 text-sm font-semibold text-white">Join Waitlist</a>
                <button onClick={()=>setShowGate(false)} className="h-10 rounded-full border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
