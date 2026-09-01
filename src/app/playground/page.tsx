"use client";
import { useEffect, useState } from "react";
import { catalog } from "@/lib/catalog";

export default function PlaygroundPage() {
  const [model, setModel] = useState("claude-sonnet-5");
  const [prompt, setPrompt] = useState("Explain MoE sparsity vs dense with a concrete 671B/37B example");
  const [system, setSystem] = useState("You are a helpful assistant. Be concise.");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(800);
  const [stream, setStream] = useState(true);
  const [apiKey, setApiKey] = useState("");
  const [out, setOut] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showGate, setShowGate] = useState(false);
  const [estCost, setEstCost] = useState("$0.003");

  useEffect(() => {
    const k = localStorage.getItem("kapa_default_key") || localStorage.getItem("kapa_keys") ? JSON.parse(localStorage.getItem("kapa_keys") || "[]")[0]?.key : "";
    if (k) setApiKey(k);
    const cost = (prompt.length / 4 * 0.000002 + maxTokens * 0.00001).toFixed(4);
    setEstCost(`$${cost}`);
  }, [prompt, maxTokens]);

  function run() {
    if (!apiKey) {
      // allow demo with mock but show cost
      setShowGate(false);
    }
    setLoading(true);
    const selected = catalog.find(c => c.id === model);
    setTimeout(() => {
      setOut(`[kapavamoda.buzz • ${model} • ${selected?.provider || ""} • ${temperature}T • ${maxTokens} tokens • stream:${stream ? "on" : "off"}]\n\nSystem: ${system}\n\nPrompt:\n${prompt}\n\n[Mock SSE stream - ${stream ? "streaming" : "non-streaming"} - requires x-kapa-key]\n\nResponse:\nMoE 671B total / 37B active means you route through 8 experts per token (sparsity 48, 384 experts total, MLA 37B active). Dense would activate 671B each token. You pay ~37B inference cost with 1T marketing number - same for Qwen 235B/22B, Kimi 1.04T/32B.\n\nTime: queue 12ms • prefill 186ms • decode 842ms • tokens 142 • cost ${estCost}\n\n[Copy] [Regenerate] [Export curl/python/node]`);
      setLoading(false);
    }, 900);
  }

  function copyCode(lang: "curl" | "py" | "node") {
    const code = lang === "curl"
      ? `curl -X POST https://kapavamoda.buzz/v1/inference/execute -H "Authorization: Bearer ${apiKey || "$KAPA_KEY"}" -H "x-kapa-key: ${apiKey || "$KAPA_KEY"}" -d '{"model":"${model}","prompt":"${prompt.slice(0,40)}","system":"${system.slice(0,30)}","temperature":${temperature},"maxTokens":${maxTokens}}'`
      : lang === "py"
      ? `from anthropic import Anthropic\nclient = Anthropic(api_key="${apiKey || "$KAPA_KEY"}")\nresp = client.messages.create(model="${model}", max_tokens=${maxTokens}, temperature=${temperature}, system="${system}", messages=[{"role":"user","content":"${prompt.slice(0,40)}"}])`
      : `import Anthropic from "@anthropic-ai/sdk"\nconst client = new Anthropic({apiKey: "${apiKey || "$KAPA_KEY"}"})\nawait client.messages.create({model: "${model}", max_tokens: ${maxTokens}, temperature: ${temperature}, system: "${system}", messages: [{role: "user", content: "${prompt.slice(0,40)}"}]})`;
    navigator.clipboard.writeText(code);
  }

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 py-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight text-slate-900 font-display">Playground</h1>
        <span className="text-xs text-slate-500">Built on Messages API • Request is same as code • Draft stays in browser</span>
      </div>

      <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 flex gap-3">
        <span className="h-6 w-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0">!</span>
        <div className="text-sm leading-5">
          <div className="font-semibold text-amber-900">Playground is stateful — draft stays in browser</div>
          <div className="text-amber-800">Production hits <span className="font-mono text-xs bg-white border border-amber-200 px-1.5 py-0.5 rounded">POST /v1/inference/execute</span> with <span className="font-mono text-xs bg-white border border-amber-200 px-1.5 py-0.5 rounded">x-kapa-key</span>. <span className="font-medium">Cohort-03 closed — invite key required.</span> Use <a href="/keys" className="underline">API Keys</a> to create one.</div>
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-[420px_1fr] gap-6">
        <div className="rounded-[16px] border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,.08)] p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-widest uppercase text-slate-500">Playground — Cohort 03</span>
            <span className="text-xs font-mono bg-slate-900 text-white px-2 py-1 rounded-full">Est. {estCost}</span>
          </div>

          <div>
            <label className="text-xs font-semibold tracking-widest uppercase text-slate-700">Model — endpoint ID</label>
            <select value={model} onChange={e => setModel(e.target.value)} className="mt-1.5 w-full rounded-[8px] border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#0A2540] focus:ring-4 focus:ring-slate-100">
              {catalog.filter(m => m.status === 'current').map(m => <option key={m.id} value={m.id}>{m.display} — {m.provider} • {m.contextWindow}</option>)}
            </select>
            <div className="text-xs text-slate-500 mt-1">Try: <button onClick={() => setModel("omni-flash-1.1")} className="text-[#0A8A74] underline">Omni Flash 1.1</button> • <button onClick={() => setModel("flux-2-pro")} className="text-[#0A8A74] underline">Flux 2</button></div>
          </div>

          <div>
            <label className="text-xs font-semibold tracking-widest uppercase text-slate-700">System prompt</label>
            <textarea value={system} onChange={e => setSystem(e.target.value)} rows={2} className="mt-1.5 w-full rounded-[8px] border border-slate-200 bg-white px-3 py-2.5 text-sm leading-5 text-slate-900 focus:outline-none focus:border-[#0A2540] focus:ring-4 focus:ring-slate-100" placeholder="You are a helpful assistant..." />
          </div>

          <div>
            <label className="text-xs font-semibold tracking-widest uppercase text-slate-700">User prompt</label>
            <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={4} className="mt-1.5 w-full rounded-[8px] border border-slate-200 bg-white px-3 py-2.5 text-sm leading-5 text-slate-900 focus:outline-none focus:border-[#0A2540] focus:ring-4 focus:ring-slate-100" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold tracking-widest uppercase text-slate-700">Temperature {temperature}</label>
              <input type="range" min={0} max={2} step={0.1} value={temperature} onChange={e => setTemperature(parseFloat(e.target.value))} className="w-full mt-2 accent-[#0A2540]" />
            </div>
            <div>
              <label className="text-xs font-semibold tracking-widest uppercase text-slate-700">Max tokens {maxTokens}</label>
              <input type="range" min={100} max={4096} step={100} value={maxTokens} onChange={e => setMaxTokens(parseInt(e.target.value))} className="w-full mt-2 accent-[#0A2540]" />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={stream} onChange={e => setStream(e.target.checked)} className="rounded" /> Stream response (SSE)
          </label>

          <div>
            <label className="text-xs font-semibold tracking-widest uppercase text-slate-700">x-kapa-key (invite) — from API Keys</label>
            <input value={apiKey} onChange={e => setApiKey(e.target.value)} placeholder="sk-kapa-•••• or paste your key" className="mt-1.5 w-full rounded-[8px] border border-slate-200 bg-white px-3 py-2.5 text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0A2540] focus:ring-4 focus:ring-slate-100" />
            <div className="text-xs text-slate-500 mt-1">Create at <a href="/keys" className="text-[#0A8A74] underline">API Keys</a> • Stored in localStorage</div>
          </div>

          <button onClick={run} disabled={loading} className="w-full h-11 rounded-[8px] bg-[#0A2540] text-white text-sm font-semibold hover:bg-[#0B2F4A] disabled:opacity-50 transition shadow-[0_1px_3px_rgba(0,0,0,.08)]">{loading ? "Streaming..." : `Execute — ${stream ? "SSE" : "JSON"} • ${estCost}`}</button>

          <div className="flex gap-2 text-xs">
            <button onClick={() => copyCode("curl")} className="flex-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 hover:bg-slate-50">Copy curl</button>
            <button onClick={() => copyCode("py")} className="flex-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 hover:bg-slate-50">Copy Python</button>
            <button onClick={() => copyCode("node")} className="flex-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 hover:bg-slate-50">Copy Node</button>
          </div>
        </div>

        <div className="rounded-[16px] border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,.08)] flex flex-col min-h-[520px] overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
            <span className="text-xs font-bold tracking-widest uppercase text-slate-600">SSE Stream Output</span>
            <span className="text-xs font-mono bg-white border border-slate-200 px-2 py-1 rounded-full">queue 12ms • prefill 186ms • {stream ? "streaming" : "json"}</span>
          </div>
          <pre className="flex-1 p-4 text-sm leading-6 text-slate-700 whitespace-pre-wrap overflow-auto bg-white font-mono">{out ?? "No execution yet. Select model, set system/temperature, enter prompt, hit Execute.\n\nTip: Try Omni Flash 1.1 for video — it will show reasoning-enhanced preview."}</pre>
          <div className="px-3 py-2 border-t border-slate-100 bg-slate-50 flex gap-2 text-xs">
            <button onClick={() => out && navigator.clipboard.writeText(out)} className="rounded-full bg-white border border-slate-200 px-3 py-1.5 hover:bg-slate-50">Copy output</button>
            <button onClick={() => out && setOut(out + "\n\n[Regenerated with same params]")} className="rounded-full bg-white border border-slate-200 px-3 py-1.5 hover:bg-slate-50">Regenerate</button>
            <span className="ml-auto text-slate-500">Draft stays in browser • Export via Code tabs</span>
          </div>
          <div className="px-4 py-3 border-t border-slate-100 bg-slate-50 grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-white border border-slate-200 p-2.5"><div className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Admission</div><div className="text-sm font-medium text-slate-900 mt-1">closed</div></div>
            <div className="rounded-xl bg-white border border-slate-200 p-2.5"><div className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Cohort</div><div className="text-sm font-medium text-slate-900 mt-1">03</div></div>
            <div className="rounded-xl bg-white border border-slate-200 p-2.5"><div className="text-[10px] font-bold tracking-widest uppercase text-slate-500">Fabric</div><div className="text-sm font-medium text-slate-900 mt-1">H100x8</div></div>
          </div>
        </div>
      </div>

      {showGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={() => setShowGate(false)} />
          <div className="relative w-full max-w-[520px] rounded-[16px] bg-white shadow-xl border border-slate-200 overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-amber-400 to-orange-500" />
            <div className="p-6">
              <div className="h-10 w-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">!</div>
              <h3 className="mt-3 text-lg font-bold text-slate-900">Onboarding Limit Reached</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">Private fabric stays small to keep goodput at 99.2%. Your execution was queued as a demo only.</p>
              <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm leading-5 text-amber-900">You can try again later — Cohort-04 waitlist is open. Operator reviews within 24-48h.</div>
              <div className="mt-5 flex gap-3">
                <a href="/signup" className="flex-1 h-10 inline-flex items-center justify-center rounded-[8px] bg-[#0A2540] text-white text-sm font-semibold">Join Waitlist</a>
                <button onClick={() => setShowGate(false)} className="h-10 rounded-[8px] border border-slate-200 bg-white px-5 text-sm font-medium">Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
