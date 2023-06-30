import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest } from "next/server";

// #13.4 Sales, Purchases, Favorites

export async function GET(req: NextRequest) {
  const res = new Response();

  const session = await getSession(req, res);

  if (session.user) {
    const purchases = await client.purchase.findMany({
      where: {
        userId: session.user.id,
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

    return createResponse(res, JSON.stringify({ ok: true, purchases }), {
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
