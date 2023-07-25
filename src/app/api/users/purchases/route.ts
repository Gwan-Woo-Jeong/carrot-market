import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest } from "next/server";

// #13.4 Sales, Purchases, Favorites

export async function GET(req: NextRequest) {
  const res = new Response();

  const session = await getSession(req, res);

  const userId = req.nextUrl.searchParams.get("userId");

  const favs = await client.purchase.findMany({
    where: {
      userId: userId ? +userId.toString() : session.user!.id,
    },
    include: {
      product: {
        include: {
          _count: {
            select: {
              fav: true,
            },
          },
        },
      },
    },
  });

  return createResponse(res, JSON.stringify({ ok: true, favs }), {
    status: 200,
  });
}
