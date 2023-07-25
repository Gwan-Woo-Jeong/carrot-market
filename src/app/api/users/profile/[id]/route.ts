import client from "@/libs/server/client";
import { createResponse } from "@/libs/server/session";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const res = new Response();

  const profile = await client.user.findUnique({
    where: { id: +id.toString() },
  });

  return createResponse(res, JSON.stringify({ ok: true, profile }), {
    status: 200,
  });
}
