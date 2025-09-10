import { NextResponse } from "next/server";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q");
  const page = searchParams.get("page") || 1;

  if (!q) {
    return NextResponse.json({ results: [] }, { status: 400 });
  }

  try {
    const res = await fetch(
      `https://hent.shoko.fun/api/hen-all?search=${encodeURIComponent(q)}&page=${page}`,
      { cache: "no-store" }
    );
    const json = await res.json();
    return NextResponse.json(json);
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ results: [] }, { status: 500 });
  }
}
