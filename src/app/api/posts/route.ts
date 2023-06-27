import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest, userAgent } from "next/server";

/*
  #12.1 Forms and Handlers
 */

export async function POST(req: NextRequest) {
  const res = new Response();
  const session = await getSession(req, res);

  if (session.user) {
    const { question } = await req.json();

    const post = await client.post.create({
      data: {
        question,
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
