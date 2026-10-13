import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth, database } from "@/lib/auth";
import { validMeasurements } from "@/data/measurements";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
function table() {
  database.exec(
    "CREATE TABLE IF NOT EXISTS measurement_profile (user_id TEXT PRIMARY KEY REFERENCES user(id) ON DELETE CASCADE, data TEXT NOT NULL, updated_at TEXT NOT NULL)",
  );
}
export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  table();
  const row = database
    .prepare("SELECT data FROM measurement_profile WHERE user_id = ?")
    .get(session.user.id) as { data: string } | undefined;
  return NextResponse.json(
    { measurements: row ? JSON.parse(row.data) : {} },
    { headers: { "Cache-Control": "no-store" } },
  );
}
export async function PUT(request: Request) {
  const origin = request.headers.get("origin");
  const expected = new URL(
    process.env.BETTER_AUTH_URL || "http://localhost:3000",
  ).origin;
  if (origin !== expected)
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (Number(request.headers.get("content-length") || 0) > 4096)
    return NextResponse.json({ error: "Too large" }, { status: 413 });
  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > 4096)
      return NextResponse.json({ error: "Too large" }, { status: 413 });
    body = JSON.parse(raw);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!validMeasurements(body))
    return NextResponse.json(
      { error: "Invalid measurements" },
      { status: 400 },
    );
  table();
  database
    .prepare(
      "INSERT INTO measurement_profile (user_id,data,updated_at) VALUES (?,?,?) ON CONFLICT(user_id) DO UPDATE SET data=excluded.data, updated_at=excluded.updated_at",
    )
    .run(session.user.id, JSON.stringify(body), new Date().toISOString());
  return NextResponse.json(
    { ok: true },
    { headers: { "Cache-Control": "no-store" } },
  );
}
