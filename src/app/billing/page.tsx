"use client";
import { useState } from "react";

export default function BillingPage() {
  const [credits, setCredits] = useState(0);
  const [autoReload, setAutoReload] = useState(false);
  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-display">Billing</h1>
          <p className="text-sm text-slate-600 mt-1">Prepaid credits • 1 year expiry • Non-refundable • Stripe</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white border border-slate-200 px-3 py-1.5 text-sm">Available credits <span className="font-bold text-slate-900">${credits.toFixed(2)}</span></span>
          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-xs font-medium text-emerald-700">20% OFF active</span>
        </div>
      </div>

      <div className="mt-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-6">
        <div className="space-y-6">
          <div className="rounded-[16px] border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,.08)] p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold tracking-wide text-slate-900">Credit balance</h2>
              <span className="text-xs text-slate-500">Balance decreases per token • Free credits used first</span>
            </div>
            <div className="mt-3 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-slate-900">${credits.toFixed(2)}</span>
              <span className="text-sm text-slate-500">remaining • Trust tier: Build</span>
            </div>
            <div className="mt-4 grid sm:grid-cols-3 gap-3">
              <button onClick={() => setCredits(c => c + 10)} className="h-10 rounded-[8px] bg-[#0A2540] text-white text-sm font-semibold hover:bg-[#0B2F4A]">Add $10 credits</button>
              <button onClick={() => setCredits(c => c + 25)} className="h-10 rounded-[8px] bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50">Buy $25</button>
              <button onClick={() => setCredits(c => c + 50)} className="h-10 rounded-[8px] bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50">Buy $50</button>
            </div>
            <div className="mt-3 text-xs leading-5 text-slate-600 bg-amber-50 border border-amber-200 rounded-xl p-3">
              <span className="font-semibold text-amber-900">20% OFF on credit limits:</span> For Cohort-03, your effective limit is 20% higher for the same purchase. Add $10, get $12 effective.
            </div>
            <div className="mt-3 flex items-center justify-between rounded-xl bg-slate-50 border border-slate-200 p-3">
              <div><div className="text-xs font-bold tracking-widest uppercase text-slate-500">Auto-reload</div><div className="text-sm text-slate-700">Recharge when below $10 → restore to $25</div></div>
              <button onClick={() => setAutoReload(!autoReload)} className={`relative h-6 w-11 rounded-full transition ${autoReload ? "bg-[#0A8A74]" : "bg-slate-300"}`}><span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${autoReload ? "left-5" : "left-0.5"}`} /></button>
            </div>
            <div className="text-xs text-slate-500 mt-2">Minimum purchase $5, default $10. Max balance by trust tier. Auto-recharge limit is not a usage limit.</div>
          </div>

          <div className="rounded-[16px] border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,.08)] p-5">
            <h2 className="text-sm font-bold tracking-wide text-slate-900">Invoices & Payment history</h2>
            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="text-xs font-bold tracking-widest uppercase text-slate-500 border-b border-slate-200"><tr><th className="text-left py-2">Date</th><th className="text-left py-2">Description</th><th className="text-right py-2">Amount</th><th className="text-right py-2">Balance</th></tr></thead>
                <tbody className="text-slate-600">
                  <tr className="border-b border-slate-100"><td className="py-2">—</td><td>No invoices yet</td><td className="text-right">—</td><td className="text-right">—</td></tr>
                </tbody>
              </table>
            </div>
            <div className="mt-3 text-xs text-slate-500">Credits expire after 1 year. Expired credits appear in Invoice history. Negative balance (processing delay) is deducted from next purchase.</div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-[16px] border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,.08)] p-5">
            <h2 className="text-sm font-bold tracking-wide text-slate-900">Spend limits</h2>
            <div className="mt-3 space-y-3">
              <div><div className="flex justify-between text-xs"><span className="font-medium text-slate-700">Monthly spend limit</span><span className="text-slate-500">$500</span></div><div className="mt-1 h-2 w-full rounded-full bg-slate-100 overflow-hidden"><div className="h-full w-0 bg-[#0A2540]" /></div><div className="text-xs text-slate-500 mt-1">$0.00 of $500 • resets Oct 1 (UTC) • Hard limit returns <span className="font-mono">429</span></div></div>
              <div><div className="flex justify-between text-xs"><span className="font-medium text-slate-700">Spend alert</span><span className="text-slate-500">$400</span></div><div className="mt-1 h-2 w-full rounded-full bg-slate-100 overflow-hidden"><div className="h-full w-0 bg-amber-500" /></div><div className="text-xs text-slate-500 mt-1">Notification only — does not block</div></div>
            </div>
            <div className="mt-4 text-xs text-slate-500">Positive balance does not mean below rate limits. See <a href="/usage" className="text-[#0A8A74] hover:underline">Usage</a>.</div>
          </div>

          <div className="rounded-[16px] border border-slate-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,.08)] p-5">
            <h2 className="text-sm font-bold tracking-wide text-slate-900">Payment method</h2>
            <div className="mt-3 rounded-xl border border-slate-200 p-3 flex justify-between items-center">
              <span className="text-sm text-slate-600">No payment method • Add to enable auto-reload</span>
              <button className="text-xs font-medium text-[#0A8A74] border border-[#0A8A74]/20 bg-emerald-50 px-3 py-1.5 rounded-full hover:bg-emerald-100">Add payment details</button>
            </div>
            <div className="text-xs text-slate-500 mt-2">Powered by Stripe • Error <span className="font-mono">credit_balance_exhausted</span> when prepaid empty</div>
          </div>

          <div className="rounded-[16px] border border-amber-200 bg-amber-50 p-4">
            <div className="text-sm font-bold text-amber-900">Need monthly invoicing?</div>
            <div className="text-xs leading-5 text-amber-800 mt-1">Contact Sales for invoicing in arrears, custom rate limits, or hands-on support.</div>
          </div>
        </div>
      </div>
    </div>
  );
}
