"use client";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showGate, setShowGate] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const allowedEmail = "smautomation1234@gmail.com";
    const allowedPass = "Mahesh@2004";
    if (email.trim().toLowerCase() === allowedEmail && password === allowedPass) {
      // Single allowed account - success
      document.cookie = "kapa_user=1; path=/; max-age=86400";
      if (typeof window !== "undefined") localStorage.setItem("kapa_user", allowedEmail);
      window.location.href = "/playground";
      return;
    }
    // Any other credentials -> limit gate
    setShowGate(true);
  }

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 py-10">
      <div className="mx-auto max-w-[440px]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-bold text-sm">k.</div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">Welcome back</h1>
          <p className="mt-1 text-sm text-slate-600">Sign in to your developer workspace. Invite-only cohort.</p>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold tracking-widest uppercase text-slate-700">Work Email</label>
              <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@company.com" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50" />
            </div>
            <div>
              <label className="text-xs font-semibold tracking-widest uppercase text-slate-700">Password</label>
              <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50" />
            </div>
            <button type="submit" className="w-full h-11 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition">Sign In →</button>
            <div className="text-center text-sm text-slate-600">
              Don&apos;t have access? <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-700">Request invite</a>
            </div>
          </form>
          <div className="mt-4 text-xs leading-5 text-slate-500 bg-slate-50 border border-slate-200 rounded-2xl px-3.5 py-3">
            Only developers onboarded by the operator can sign in. Cohort-03 is closed.
          </div>
        </div>

        <div className="mt-4 text-center">
          <a href="/" className="text-sm text-slate-600 hover:text-slate-900">← Back to kapavamoda.buzz</a>
        </div>
      </div>

      {showGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={()=>setShowGate(false)} />
          <div className="relative w-full max-w-[480px] rounded-3xl bg-white shadow-xl border border-slate-200 overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-amber-400 to-orange-500" />
            <div className="p-6">
              <div className="h-10 w-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 text-lg">!</div>
              <h3 className="mt-3 text-lg font-bold text-slate-900">Onboarding Limit Reached</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Sorry, the limit for onboarding new developers is already full for <span className="font-semibold text-slate-900">Cohort-03</span>. Our fabric is intentionally kept small to ensure low latency and high KV-cache residency for every member.
              </p>
              <div className="mt-4 rounded-2xl bg-amber-50 border border-amber-200 p-3.5 text-sm leading-5 text-amber-900">
                You can try again later — <span className="font-semibold">Cohort-04 waitlist is open</span>. Join the waitlist and our operator will review your application within 24-48 hours. You will be notified by email when a slot opens.
              </div>
              <div className="mt-5 flex gap-3">
                <a href="/signup" className="flex-1 h-10 inline-flex items-center justify-center rounded-full bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800">Join Waitlist</a>
                <button onClick={()=>setShowGate(false)} className="h-10 rounded-full border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50">Close</button>
              </div>
              <div className="mt-3 text-xs text-center text-slate-500">Already onboarded? Use your <span className="font-mono">x-kapa-key</span> provisioned by the operator.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
