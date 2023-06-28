import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest, userAgent } from "next/server";

// #12.5 All Posts

export async function GET(req: NextRequest) {
  const res = new Response();
  const session = await getSession(req, res);

  if (session.user) {
    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            wonderings: true,
            answers: true,
          },
        },
      },
    });

    return createResponse(res, JSON.stringify({ ok: true, posts }), {
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
  const session = await getSession(req, res);

  if (session.user) {
    const { question, latitude, longitude } = await req.json();

    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return createResponse(res, JSON.stringify({ ok: true, post }), {
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
