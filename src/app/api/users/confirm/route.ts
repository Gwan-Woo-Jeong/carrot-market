import client from "@/libs/server/client";
import { NextRequest, NextResponse } from "next/server";

/*
  9.6 Token UI
 */

export async function POST(req: NextRequest) {
  const { token } = await req.json();
  console.log(token);

  return NextResponse.json({}, { status: 200 });
}
