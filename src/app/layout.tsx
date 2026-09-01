import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const space = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "kapavamoda.buzz — private inference fabric for developers",
  description: "Invite-only inference fabric trusted by limited developers. 49 models across Text, Image, Video, Audio. Curated and operator-provisioned.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${space.variable} ${jetbrains.variable} h-full`}>
      <body className="min-h-screen bg-[#F6F9FC] text-slate-900 flex flex-col antialiased">
        <header className="sticky top-0 z-50 border-b border-[#E2E8F0] bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 flex h-[64px] items-center justify-between">
            <div className="flex items-center gap-8">
              <a href="/" className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-[8px] bg-[#0A2540] flex items-center justify-center text-white font-bold text-[13px] shadow-[0_1px_3px_rgba(0,0,0,.08)]">k.</div>
                <div className="leading-none">
                  <div className="text-[15px] font-semibold tracking-tight text-slate-900 font-display">kapavamoda.buzz</div>
                  <div className="text-[11px] tracking-wide text-slate-500 -mt-0.5">private inference fabric</div>
                </div>
                <span className="hidden sm:inline-flex ml-2 items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium tracking-wide text-slate-600">
                  <span className="h-2 w-2 rounded-full bg-[#0A8A74]" /> COHORT-03 • PRIVATE
                </span>
              </a>
              <nav className="hidden lg:flex items-center gap-1">
                <a href="/models" className="px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-[8px] transition">Models</a>
                <a href="/docs" className="px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-[8px] transition">Docs</a>
                <a href="/playground" className="px-3 py-2 text-[13px] font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-[8px] transition">Playground</a>
              </nav>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden xl:flex items-center gap-2 rounded-full bg-[#0A8A74]/10 border border-[#0A8A74]/20 px-3 py-1.5 text-[11px] font-medium text-[#0A8A74]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#0A8A74]" /> Fabric Online • p50 TTFT 186ms
              </span>
              <a href="/signup" className="hidden sm:inline-flex h-9 items-center rounded-[8px] border border-slate-200 bg-white px-4 text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition">Request Access</a>
              <a href="/login" className="h-9 inline-flex items-center rounded-[8px] bg-[#0A2540] px-5 text-[13px] font-semibold text-white hover:bg-[#0B2F4A] transition shadow-[0_1px_3px_rgba(0,0,0,.08)]">Sign In</a>
            </div>
          </div>
        </header>
        <main className="flex-1 flex flex-col bg-[#F6F9FC]">{children}</main>
        <footer className="border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-8">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              <div>
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-[8px] bg-[#0A2540] flex items-center justify-center text-white font-bold text-xs">k.</div>
                  <span className="text-sm font-semibold text-slate-900 font-display">kapavamoda.buzz</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-600 max-w-[420px]">Private inference fabric for limited developers. Curated models, operator-provisioned access, invite-only cohort. Not a public API marketplace.</p>
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
              <span>Invite-only • Cohort-03 closed • Global edge network</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
