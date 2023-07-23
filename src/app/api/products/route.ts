import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest } from "next/server";

/*
  #11.10 Counting Relationships
 */

export async function POST(req: NextRequest) {
  const res = new Response();
  const { name, price, description, image } = await req.json();
  const session = await getSession(req, res);

  if (session.user) {
    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image,
        user: {
          connect: { id: session.user.id },
        },
      },
    });

    return createResponse(res, JSON.stringify({ ok: true, product }), {
      status: 201,
    });
  } else {
    return createResponse(
      res,
      JSON.stringify({ ok: false, message: "Please log in" }),
      { status: 401 }
    );
  }
}

export async function GET() {
  const res = new Response();
  // product를 가리키고 있는 fav의 개수(_count)를 추가
  const products = await client.product.findMany({
    where: {
      NOT: {
        status: "sold",
      },
    },
    include: {
      _count: {
        select: {
          fav: true,
          chatRooms: true,
        },
      },
    },
  });

  return createResponse(res, JSON.stringify({ ok: true, products }), {
    status: 200,
  });
}
