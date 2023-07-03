import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest } from "next/server";

// #14.3 See Message

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const res = new Response();

  const session = await getSession(req, res);

  if (session.user) {
    const stream = await client.stream.findUnique({
      where: { id: +id.toString() },
      include: {
        messages: {
          select: {
            id: true,
            message: true,
            user: {
              select: {
                id: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    if (!stream) {
      return createResponse(
        res,
        JSON.stringify({ ok: false, message: "Not Found" }),
        { status: 404 }
      );
    }

    return createResponse(res, JSON.stringify({ ok: true, stream }), {
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
