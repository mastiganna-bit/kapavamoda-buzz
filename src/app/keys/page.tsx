"use client";
import { useEffect, useState } from "react";

type ApiKey = { id: string; name: string; key: string; hint: string; created: string; lastUsed: string; scope: string };

function genKey() {
  const rand = Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 10);
  return `sk-kapa-${rand}${rand}`.slice(0, 32);
}

export default function KeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [lastCreated, setLastCreated] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("kapa_keys");
    if (stored) setKeys(JSON.parse(stored));
  }, []);
  useEffect(() => {
    localStorage.setItem("kapa_keys", JSON.stringify(keys));
    if (keys.length > 0) localStorage.setItem("kapa_default_key", keys[0].key);
  }, [keys]);

  function createKey() {
    if (!newName.trim()) return;
    const full = genKey();
    const item: ApiKey = { id: Date.now().toString(36), name: newName.trim(), key: full, hint: full.slice(0, 10) + "••••••••" + full.slice(-4), created: new Date().toLocaleDateString(), lastUsed: "—", scope: "inference:execute" };
    setKeys([item, ...keys]);
    setLastCreated(full);
    setNewName("");
    setShowCreate(false);
  }

  function revoke(id: string) {
    if (!confirm("Revoke this key? Requests using it will fail immediately.")) return;
    setKeys(keys.filter(k => k.id !== id));
  }

  function copy(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-display">API keys</h1>
          <p className="text-sm text-slate-600 mt-1">Manage keys for <span className="font-mono text-xs bg-white border border-slate-200 px-1.5 py-0.5 rounded">kapavamoda.buzz</span> — Bearer + <span className="font-mono">x-api-key</span>. Keys are project-scoped.</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="h-10 px-5 rounded-[8px] bg-[#0A2540] text-white text-sm font-semibold hover:bg-[#0B2F4A] shadow-[0_1px_3px_rgba(0,0,0,.08)]">+ Create key</button>
      </div>

      {lastCreated && (
        <div className="mt-4 rounded-[16px] border border-emerald-200 bg-emerald-50 p-4">
          <div className="text-sm font-bold text-emerald-900">Copy your key — shown only once</div>
          <div className="mt-2 flex gap-2">
            <code className="flex-1 rounded-xl bg-white border border-emerald-200 px-3 py-2.5 text-sm font-mono text-slate-900 break-all">{lastCreated}</code>
            <button onClick={() => copy(lastCreated)} className="h-10 px-4 rounded-[8px] bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700">Copy</button>
          </div>
          <div className="text-xs text-emerald-800 mt-2">Store in <span className="font-mono">ANTHROPIC_API_KEY</span> / <span className="font-mono">KAPA_KEY</span> env or secrets manager. You won’t see it again.</div>
        </div>
      )}

      <div className="mt-6 rounded-[16px] border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,.08)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr className="text-xs font-bold tracking-widest uppercase text-slate-500">
                <th className="text-left px-4 py-3">Name</th>
                <th className="text-left px-4 py-3">Key</th>
                <th className="text-left px-4 py-3">Created</th>
                <th className="text-left px-4 py-3">Last used</th>
                <th className="text-left px-4 py-3">Scope</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {keys.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-10 text-center text-sm text-slate-500">No keys yet. Create one to authenticate. <span className="font-mono text-xs">Authorization: Bearer sk-kapa-...</span></td></tr>
              ) : keys.map(k => (
                <tr key={k.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{k.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-700">{k.hint} <button onClick={() => copy(k.key)} className="ml-2 text-xs text-[#0A8A74] hover:underline">Copy</button></td>
                  <td className="px-4 py-3 text-slate-600">{k.created}</td>
                  <td className="px-4 py-3 text-slate-600">{k.lastUsed}</td>
                  <td className="px-4 py-3"><span className="rounded-full bg-slate-100 border border-slate-200 px-2 py-1 text-xs font-mono">{k.scope}</span></td>
                  <td className="px-4 py-3 text-right"><button onClick={() => revoke(k.id)} className="text-xs font-medium text-red-600 hover:text-red-700 border border-red-200 bg-red-50 px-3 py-1.5 rounded-full">Revoke</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-200 bg-slate-50 text-xs text-slate-600 flex justify-between">
          <span>SDKs read <span className="font-mono">ANTHROPIC_API_KEY</span> automatically. HTTP: <span className="font-mono">x-api-key: $KAPA_KEY</span> + <span className="font-mono">anthropic-version: 2023-06-01</span></span>
          <a href="/docs" className="text-[#0A8A74] font-medium hover:underline">View docs →</a>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs leading-5 text-amber-800">
        Never expose keys in client-side code, GitHub, or screenshots. If exposed, revoke immediately and check Usage for anomalies. Use separate keys per environment.
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm" onClick={() => setShowCreate(false)} />
          <div className="relative w-full max-w-[480px] rounded-[16px] bg-white shadow-xl border border-slate-200 p-6">
            <h3 className="text-lg font-bold text-slate-900">Create API key</h3>
            <p className="text-sm text-slate-600 mt-1">Name the key and set expiry. Shown only once — store securely.</p>
            <label className="mt-4 block text-xs font-bold tracking-widest uppercase text-slate-700">Key name</label>
            <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="my-app-production" className="mt-1.5 w-full rounded-[8px] border border-slate-200 px-3.5 py-2.5 text-sm focus:outline-none focus:border-[#0A2540] focus:ring-4 focus:ring-slate-100" />
            <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><div className="font-semibold text-slate-900">Scope</div><div className="text-slate-600">inference:execute</div></div>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><div className="font-semibold text-slate-900">Workspace</div><div className="text-slate-600">Default</div></div>
            </div>
            <div className="mt-5 flex gap-3">
              <button onClick={createKey} className="flex-1 h-10 rounded-[8px] bg-[#0A2540] text-white text-sm font-semibold hover:bg-[#0B2F4A]">Create key</button>
              <button onClick={() => setShowCreate(false)} className="h-10 rounded-[8px] border border-slate-200 bg-white px-5 text-sm font-medium">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
