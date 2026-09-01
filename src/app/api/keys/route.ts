import { NextRequest, NextResponse } from "next/server";
// Mock API for API keys - in production would use DB, here we echo
export async function GET() {
  return NextResponse.json({ keys: [] });
}
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  const key = `sk-kapa-${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
  return NextResponse.json({ id: Date.now().toString(36), name: body.name || "unnamed", key, hint: key.slice(0, 10) + "••••" + key.slice(-4) });
}
