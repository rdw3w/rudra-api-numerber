import { NextResponse } from "next/server";

const API_KEY = process.env.RUDRA_API_KEY;
const UPSTREAM = process.env.UPSTREAM_URL;

export async function GET(req, { params }) {
  try {
    const { number } = params;

    const key = req.nextUrl.searchParams.get("key");

    if (key !== API_KEY) {
      return NextResponse.json({
        success: false,
        error: "Unauthorized"
      }, { status: 401 });
    }

    if (!/^[6-9]\d{9}$/.test(number)) {
      return NextResponse.json({
        success: false,
        error: "Invalid Indian mobile number"
      }, { status: 400 });
    }

    const response = await fetch(`${UPSTREAM}/${number}`, {
      headers: {
        "User-Agent": "RudraX/2.0"
      },
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Upstream API failed");
    }

    const data = await response.json();

    return NextResponse.json({
      success: true,
      owner: "Shatarudra Prakash Singh",
      branding: "Rudra X Lookup",
      query: number,
      timestamp: new Date().toISOString(),
      source: "details-checker-backend",
      data
    });

  } catch (err) {
    return NextResponse.json({
      success: false,
      error: err.message
    }, { status: 500 });
  }
}
