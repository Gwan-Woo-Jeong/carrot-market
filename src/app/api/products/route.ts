import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest } from "next/server";

/*
  #11.4 Product Detail
 */

export async function POST(req: NextRequest) {
  const res = new Response();
  const { name, price, description } = await req.json();
  const session = await getSession(req, res);

  if (session.user) {
    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: "",
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

export async function GET(req: NextRequest) {
  const res = new Response();
  const session = await getSession(req, res);

  if (session.user) {
    const products = await client.product.findMany({});

    return createResponse(res, JSON.stringify({ ok: true, products }), {
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
