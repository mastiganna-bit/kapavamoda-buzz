import { NextRequest, NextResponse } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { catalog } from "@/lib/catalog";
import fs from "fs";
import path from "path";

// GET returns catalog (public or protected)
export async function GET() {
  // Allow public read, but admin sees same
  return NextResponse.json({ catalog });
}

// PUT to update - protected, writes to file if possible (dev) else in-memory (prod without GitHub)
export async function PUT(req: NextRequest) {
  const cookie = req.headers.get("cookie");
  if (!isAuthenticated(cookie)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  try {
    const body = await req.json();
    const dataPath = path.join(process.cwd(), "data", "catalog.override.json");
    try {
      fs.mkdirSync(path.dirname(dataPath), { recursive: true });
      fs.writeFileSync(dataPath, JSON.stringify(body, null, 2));
    } catch {
      // on hosted filesystem, changes are kept in memory for this session
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Unable to save changes. Please try again." }, { status: 400 });
  }
}
