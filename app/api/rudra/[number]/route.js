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
        "User-Agent": "RudraX/3.0"
      },
      cache: "no-store"
    });

    const data = await response.json();

    return NextResponse.json({
      success: true,
      owner: "Shatarudra Prakash Singh",
      branding: "Rudra X Lookup",
      query,
      timestamp: new Date().toISOString(),
      data
    });

  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message
    }, { status: 500 });
  }
}
