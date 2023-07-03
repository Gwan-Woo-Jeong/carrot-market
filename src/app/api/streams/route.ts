import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest } from "next/server";

// #14.6 Pagination

export async function GET(req: NextRequest) {
  const res = new Response();

  const session = await getSession(req, res);

  if (session.user) {
    const size = req.nextUrl.searchParams.get("size");
    const page = req.nextUrl.searchParams.get("page");

    const sizeVal = size ? +size : 10;
    const pageVal = page ? +page : 1;

    const streams = await client.stream.findMany({
      take: sizeVal, // 전달할 레코드의 개수
      skip: (pageVal - 1) * sizeVal, // 이전 개수의 레코드를 생략
    });

    const streamCount = await client.stream.count();

    return createResponse(
      res,
      JSON.stringify({
        ok: true,
        streams,
        pages: Math.ceil(streamCount / sizeVal),
      }),
      {
        status: 200,
      }
    );
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
