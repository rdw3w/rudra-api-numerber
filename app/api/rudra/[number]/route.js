import { NextResponse } from "next/server";

const UPSTREAM =
  "https://details-checker-backend.onrender.com/lookup";

export async function GET(req) {
  try {
    const query = req.nextUrl.searchParams.get("query");

    if (!query) {
      return NextResponse.json({
        success: false,
        error: "Query parameter required"
      }, { status: 400 });
    }

    if (!/^[6-9]\d{9}$/.test(query)) {
      return NextResponse.json({
        success: false,
        error: "Invalid Indian mobile number"
      }, { status: 400 });
    }

    const response = await fetch(`${UPSTREAM}/${query}`, {
      headers: {
        "User-Agent": "RudraX/5.0"
      },
      cache: "no-store"
    });

    const raw = await response.json();

    // Hide unwanted fields
    const {
      status,
      owner,
      type,
      used,
      remaining,
      ...cleanData
    } = raw;

    // Final custom response
    return NextResponse.json({
      "🔥 START 🔥": "👑 Shatarudra Prakash Singh 👑",

      success: true,
      branding: "⚡ Rudra X Lookup ⚡",
      query,
      timestamp: new Date().toISOString(),

      data: cleanData,

      "🔥 END 🔥": "👑 Shatarudra Prakash Singh 👑"
    });

  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message
    }, { status: 500 });
  }
}
