import { NextRequest, NextResponse } from "next/server";
import { getAdminCreds, ADMIN_COOKIE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { id, password } = await req.json().catch(() => ({}));
  const creds = getAdminCreds();
  if (id === creds.id && password === creds.password) {
    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE, "1", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
    return res;
  }
  return NextResponse.json({ ok: false, error: "invalid credentials" }, { status: 401 });
}
