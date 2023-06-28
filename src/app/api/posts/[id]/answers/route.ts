import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest } from "next/server";

// #12.4 Answer

export async function POST(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const res = new Response();
  const session = await getSession(req, res);
  const { answer } = await req.json();

  if (session.user) {
    const newAnswer = await client.answer.create({
      data: {
        user: {
          connect: {
            id: session.user.id,
          },
        },
        post: {
          connect: {
            id: +id.toString(),
          },
        },
        answer,
      },
    });

    return createResponse(res, JSON.stringify({ ok: true, answer }), {
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
