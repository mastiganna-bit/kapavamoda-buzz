"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null); setLoading(true);
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, password: pw }),
    });
    setLoading(false);
    if (res.ok) router.push("/admin");
    else setErr("Incorrect ID or password. Please try again.");
  }

  return (
    <div className="mx-auto w-full max-w-[440px] px-4 py-10">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-sm">k.</div>
        <h1 className="mt-4 text-xl font-bold tracking-tight text-slate-900">Operator Console</h1>
        <p className="mt-1 text-sm text-slate-600">Sign in to your operator workspace</p>
      </div>
      <div className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
        <div className="rounded-2xl bg-[#F6F9FC] border border-slate-200 px-4 py-3 text-xs leading-5 text-slate-600 flex gap-2">
          <span className="h-5 w-5 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 text-[10px]">!</span>
          <span>Invite-only workspace. Contact your administrator if you need access.</span>
        </div>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="text-xs font-bold tracking-widest uppercase text-slate-700">ID</label>
            <input value={id} onChange={e=>setId(e.target.value)} placeholder="kapavamoda" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50" />
          </div>
          <div>
            <label className="text-xs font-bold tracking-widest uppercase text-slate-700">Password</label>
            <input type="password" value={pw} onChange={e=>setPw(e.target.value)} placeholder="••••••••" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50" />
          </div>
          {err && <div className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-sm text-red-800">{err}</div>}
          <button disabled={loading} className="w-full h-11 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 disabled:opacity-50 transition">{loading ? "Checking…" : "Enter Console →"}</button>
        </form>
        <div className="mt-4 text-center">
          <a href="/" className="text-sm text-slate-600 hover:text-slate-900">← Back to kapavamoda.buzz</a>
        </div>
      </div>
    </div>
  );
}
