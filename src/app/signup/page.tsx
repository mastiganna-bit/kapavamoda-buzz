"use client";
import { useState } from "react";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", useCase: "" });
  const [showGate, setShowGate] = useState(false);
  const limitReached = true; // hard-coded limited

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (limitReached) setShowGate(true);
  }

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 py-10">
      <div className="mx-auto max-w-[560px]">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-sm">k.</div>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">Request developer access</h1>
          <p className="mt-2 text-sm leading-6 text-slate-600">Limited to invited developers only. Cohort-03 is closed. Applications are reviewed manually and waitlisted for Cohort-04.</p>
        </div>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white shadow-sm p-6">
          <div className="rounded-2xl bg-amber-50 border border-amber-200 px-4 py-3 flex gap-3">
            <span className="h-6 w-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0">!</span>
            <div className="text-sm leading-5">
              <div className="font-semibold text-amber-900">Limited onboarding — Cohort-03 full</div>
              <div className="text-amber-800">We onboard only a small cohort at a time to keep p50 TTFT low. New signups are queued.</div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-slate-700">Full Name</label>
                <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Ada Lovelace" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50" />
              </div>
              <div>
                <label className="text-xs font-semibold tracking-widest uppercase text-slate-700">Work Email</label>
                <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="you@company.com" className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold tracking-widest uppercase text-slate-700">What will you build?</label>
              <textarea value={form.useCase} onChange={e=>setForm({...form, useCase:e.target.value})} rows={3} placeholder="Briefly describe your workload: e.g. code agent over 200K repo, image-to-video for ads..." className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50" />
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><div className="font-semibold text-slate-900">Invite-only</div><div className="text-slate-600 mt-1">Manual review • 24-48h</div></div>
              <div className="rounded-xl bg-slate-50 border border-slate-200 p-3"><div className="font-semibold text-slate-900">Hard-coded</div><div className="text-slate-600 mt-1">No self-serve keys</div></div>
            </div>
            <button type="submit" className="w-full h-11 rounded-full bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition">Request Access →</button>
            <div className="text-center text-sm text-slate-600">Already have an <span className="font-mono text-xs bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded">x-kapa-key</span>? <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-700">Sign in</a></div>
          </form>
        </div>

        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs leading-5 text-slate-600 text-center">
          By requesting access you agree to operator review. We do not auto-provision. Limited slots ensure fabric goodput stays at 99.2%.
        </div>
      </div>

      {showGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={()=>setShowGate(false)} />
          <div className="relative w-full max-w-[520px] rounded-3xl bg-white shadow-xl border border-slate-200 overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-amber-400 to-orange-500" />
            <div className="p-6">
              <div className="h-10 w-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 text-lg">!</div>
              <h3 className="mt-3 text-lg font-bold text-slate-900">Sorry — onboarding limit reached</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                Thanks for your interest in <span className="font-semibold text-slate-900">kapavamoda.buzz</span>. The onboarding limit for <span className="font-semibold text-slate-900">Cohort-03</span> is already full — we keep the cohort intentionally small to protect latency and residency for existing developers.
              </p>
              <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-200 p-4">
                <div className="text-sm font-semibold text-slate-900">You can try again later</div>
                <div className="text-sm leading-5 text-slate-600 mt-1">Your request has been waitlisted for <span className="font-semibold text-slate-900">Cohort-04</span>. Our operator will review and notify you by email within 24-48 hours when a slot opens. No payment or key is needed until you are invited.</div>
                <div className="mt-3 flex gap-2">
                  <span className="inline-flex rounded-full bg-white border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700">Waitlist position: queued</span>
                  <span className="inline-flex rounded-full bg-white border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700">Review: manual</span>
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <button onClick={()=>setShowGate(false)} className="flex-1 h-10 inline-flex items-center justify-center rounded-full bg-slate-900 px-5 text-sm font-semibold text-white hover:bg-slate-800">Got it, keep me on waitlist</button>
                <a href="/login" className="h-10 inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 text-sm font-medium text-slate-700 hover:bg-slate-50">Sign in</a>
              </div>
              <div className="mt-3 text-xs text-center text-slate-500">Questions? Contact operator via provisioned channel. No auto-provisioning.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
