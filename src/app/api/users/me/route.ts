import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";

/*
  9.8 Protected Handlers
 */

export async function GET(req: NextRequest) {
  const res = new Response();

  const session = await getSession(req, res);

  if (session.user) {
    const profile = await client.user.findUnique({
      where: { id: session.user?.id },
    });

    return createResponse(res, JSON.stringify(profile), { status: 200 });
  } else {
    return createResponse(
      res,
      JSON.stringify({ ok: false, message: "Please log in" }),
      { status: 401 }
    );
  }
}
