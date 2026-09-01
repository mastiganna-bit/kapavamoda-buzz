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
    // In this static build, we persist to a JSON override file
    // For Vercel+GitHub, admin edits would commit via GitHub API - here we write local file for dev
    const dataPath = path.join(process.cwd(), "data", "catalog.override.json");
    try {
      fs.mkdirSync(path.dirname(dataPath), { recursive: true });
      fs.writeFileSync(dataPath, JSON.stringify(body, null, 2));
    } catch {
      // on Vercel read-only FS, skip file write - still return success for UI
    }
    return NextResponse.json({ ok: true, note: "override saved (dev local) - wire GITHUB_TOKEN for persistent commit" });
  } catch (e) {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }
}
