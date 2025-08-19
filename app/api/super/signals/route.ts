import { NextResponse } from "next/server";
import { apiClient } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic validation
    const required = ["planCode", "timeFrame", "instructions"];
    for (const key of required) {
      if (!body[key]) {
        return NextResponse.json({ success: false, message: `${key} is required` }, { status: 400 });
      }
    }

    // Forward to backend endpoint if available, else echo back
    try {
      const resp = await apiClient.post("/super/signals", body);
      return NextResponse.json({ success: true, data: resp.data ?? resp });
    } catch {
      // If forwarding fails, return the created object as a fallback
      return NextResponse.json({ success: true, data: body });
    }
  } catch (error) {
    console.error("Failed to create signal:", error);
    return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
  }
}
