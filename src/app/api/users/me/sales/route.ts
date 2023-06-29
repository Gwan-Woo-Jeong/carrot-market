import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest } from "next/server";

/*
  13.2 Handlers
 */

export async function GET(req: NextRequest) {
  const res = new Response();

  const session = await getSession(req, res);

  if (session.user) {
    const sales = await client.sale.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        product: true,
      },
    });

    return createResponse(res, JSON.stringify({ ok: true, sales }), {
      status: 200,
    });
  } else {
    return createResponse(
      res,
      JSON.stringify({ ok: false, message: "Please log in" }),
      { status: 401 }
    );
  }
}
