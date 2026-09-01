import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "kapavamoda.buzz — private inference fabric for developers",
  description: "Invite-only inference fabric trusted by limited developers. 47 models across Text, Image, Video, Audio. Hard-coded, operator-provisioned.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrains.variable} h-full`}>
      <body className="min-h-screen bg-white text-slate-900 flex flex-col antialiased">
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 flex h-[64px] items-center justify-between">
            <div className="flex items-center gap-8">
              <a href="/" className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-[13px] shadow-sm">k.</div>
                <div className="leading-none">
                  <div className="text-[15px] font-semibold tracking-tight text-slate-900">kapavamoda.buzz</div>
                  <div className="text-[11px] tracking-wide text-slate-500 -mt-0.5">private inference fabric</div>
                </div>
                <span className="hidden sm:inline-flex ml-2 items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-medium tracking-wide text-slate-600">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> COHORT-03 • PRIVATE
                </span>
              </a>
              <nav className="hidden lg:flex items-center gap-1">
                <a href="/models" className="px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition">Models</a>
                <a href="/docs" className="px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition">Docs</a>
                <a href="/playground" className="px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition">Playground</a>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden xl:flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1.5 text-[11px] font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Fabric Online • p50 TTFT 186ms
              </span>
              <a href="/signup" className="hidden sm:inline-flex h-9 items-center rounded-full border border-slate-200 bg-white px-4 text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition">Request Access</a>
              <a href="/login" className="h-9 inline-flex items-center rounded-full bg-slate-900 px-5 text-[13px] font-semibold text-white hover:bg-slate-800 transition shadow-sm">Sign In</a>
            </div>
          </div>
        </header>
        <main className="flex-1 flex flex-col bg-white">{children}</main>
        <footer className="border-t border-slate-200 bg-slate-50">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-8">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-lg bg-slate-900 flex items-center justify-center text-white font-bold text-xs">k.</div>
                  <span className="text-sm font-semibold text-slate-900">kapavamoda.buzz</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600 max-w-[420px]">Private inference fabric for limited developers. Hard-coded models, operator-provisioned access, invite-only cohort. Not a public API marketplace.</p>
              </div>
              <div className="grid grid-cols-2 gap-8 text-sm">
                <div>
                  <div className="text-xs font-semibold tracking-widest uppercase text-slate-900">Platform</div>
                  <ul className="mt-3 space-y-2 text-slate-600">
                    <li><a href="/models" className="hover:text-slate-900">Model Catalog</a></li>
                    <li><a href="/docs" className="hover:text-slate-900">Documentation</a></li>
                    <li><a href="/playground" className="hover:text-slate-900">Playground</a></li>
                  </ul>
                </div>
                <div>
                  <div className="text-xs font-semibold tracking-widest uppercase text-slate-900">Access</div>
                  <ul className="mt-3 space-y-2 text-slate-600">
                    <li><a href="/signup" className="hover:text-slate-900">Request Invite</a></li>
                    <li><a href="/login" className="hover:text-slate-900">Developer Login</a></li>
                    <li><a href="/admin" className="hover:text-slate-900">Operator Console</a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row justify-between gap-2 text-xs text-slate-500">
              <span>© 2026 kapavamoda.buzz — H100x8 NVLink • MLA + FlashAttention-3 • SynthID provenance</span>
              <span>Invite-only • Cohort-03 closed • GitHub JSON store • Vercel</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
