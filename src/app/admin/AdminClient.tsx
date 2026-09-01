"use client";
import { useState } from "react";
import { catalog, categories } from "@/lib/catalog";

export default function AdminClient() {
  const [data, setData] = useState<any>(catalog);
  const [status, setStatus] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function save() {
    setSaving(true);
    const res = await fetch("/api/admin/catalog", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    const j = await res.json().catch(()=>({}));
    setStatus(res.ok ? `Changes published successfully` : `Could not save — ${j.error ?? "please try again."}`);
    setSaving(false);
    setTimeout(()=>setStatus(null), 4000);
  }

  async function logout() {
    document.cookie = "kapa_admin=; Max-Age=0; path=/";
    location.href = "/admin/login";
  }

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 py-6">
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm px-6 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex rounded-full bg-[#0A2540] px-2.5 py-1 text-xs font-bold tracking-widest uppercase text-white">Operator Console</div>
          <h1 className="text-lg font-bold tracking-tight text-slate-900 mt-2 font-display">Catalog Management</h1>
          <div className="text-sm text-slate-600 mt-1">Manage models, pricing and availability. Changes publish instantly.</div>
        </div>
        <div className="flex gap-2">
          <button onClick={save} disabled={saving} className="h-10 px-6 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-50">{saving ? "Saving…" : "Save Changes"}</button>
          <button onClick={logout} className="h-10 px-4 rounded-full border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50">Logout</button>
        </div>
      </div>

      {status && <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">{status}</div>}

      <div className="mt-6 grid lg:grid-cols-[280px_1fr] gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 h-fit sticky top-[72px] shadow-sm">
          <div className="text-xs font-bold tracking-widest uppercase text-slate-500">Overview</div>
          <div className="mt-3 space-y-3">
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><div className="text-xs font-bold tracking-widest uppercase text-slate-500">Catalog</div><div className="text-sm font-semibold text-slate-900 mt-1">{catalog.length} endpoints • {categories.length} surfaces</div></div>
            <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><div className="text-xs font-bold tracking-widest uppercase text-slate-500">Workspace</div><div className="text-sm font-semibold text-slate-900 mt-1">kapavamoda.buzz</div><div className="text-xs text-slate-600">Invite-only • Cohort-03</div></div>
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3"><div className="text-xs font-bold tracking-widest uppercase text-emerald-700">Status</div><div className="text-sm font-semibold text-emerald-900 mt-1">Operational</div><div className="text-xs text-emerald-700">All systems normal</div></div>
          </div>
          <div className="mt-4 text-xs leading-5 text-slate-600 bg-white border border-slate-200 rounded-xl p-3">Updates publish instantly and are versioned. Need help? Contact support.</div>
        </div>

        <div className="space-y-6">
          {categories.map(cat => (
            <div key={cat.id} className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                <span className="text-xs font-bold tracking-widest uppercase text-slate-900">{cat.label}</span>
                <span className="rounded-full bg-white border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600">{data.filter((m:any)=>m.category===cat.id).length} endpoints</span>
              </div>
              <div className="divide-y divide-slate-100">
                {data.filter((m:any)=>m.category===cat.id).map((m:any) => {
                  const globalIdx = data.findIndex((x:any)=>x.id===m.id);
                  return (
                    <div key={m.id} className="p-4 grid sm:grid-cols-[1.4fr_0.6fr_0.8fr_auto] gap-3 items-center">
                      <div>
                        <input value={m.display} onChange={e=>{
                          const nd=[...data]; nd[globalIdx]={...m, display:e.target.value}; setData(nd);
                        }} className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-900 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50" placeholder="Display name" />
                        <div className="text-xs font-mono text-slate-500 mt-1">{m.id} • {m.endpoint}</div>
                      </div>
                      <select value={m.status} onChange={e=>{
                        const nd=[...data]; nd[globalIdx]={...m, status:e.target.value}; setData(nd);
                      }} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                        <option value="current">current</option><option value="legacy">legacy</option><option value="deprecated">deprecated</option>
                      </select>
                      <input value={m.pricing} onChange={e=>{
                        const nd=[...data]; nd[globalIdx]={...m, pricing:e.target.value}; setData(nd);
                      }} className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700" placeholder="pricing" />
                      <button onClick={()=>{
                        if(!confirm(`Delete ${m.display}?`)) return;
                        setData(data.filter((_:any,i:number)=>i!==globalIdx));
                      }} className="text-xs font-bold tracking-widest uppercase rounded-full border border-red-200 bg-red-50 text-red-700 px-3 py-2 hover:bg-red-100">Delete</button>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600 flex justify-between items-center">
            <span>Need a new model? Quick add by ID.</span>
            <button onClick={()=>{
              const id = prompt("New model id (e.g. my-model-v1)")?.trim();
              if(!id) return;
              setData([...data, { id, display: id, provider: "Custom", family: "Custom", category: "text", endpoint: id, contextWindow: "128K", modalityIn: "text", modalityOut: "text", specs: {}, pricing: "$0.00", status: "current", bestFor: "custom" }]);
            }} className="h-8 px-4 rounded-full bg-slate-900 text-white text-xs font-semibold">+ Add</button>
          </div>
        </div>
      </div>
    </div>
  );
}
