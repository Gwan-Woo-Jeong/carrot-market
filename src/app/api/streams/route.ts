import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest } from "next/server";

// #14.1 Detail Page

export async function GET(req: NextRequest) {
  const res = new Response();

  const session = await getSession(req, res);

  if (session.user) {
    const streams = await client.stream.findMany();

    return createResponse(res, JSON.stringify({ ok: true, streams }), {
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

export async function POST(req: NextRequest) {
  const res = new Response();
  const { name, price, description } = await req.json();
  const session = await getSession(req, res);

  if (session.user) {
    const stream = await client.stream.create({
      data: {
        name,
        price: +price,
        description,
        user: {
          connect: { id: session.user.id },
        },
      },
    });

    return createResponse(res, JSON.stringify({ ok: true, stream }), {
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
