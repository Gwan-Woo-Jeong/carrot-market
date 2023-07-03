import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest } from "next/server";

// #14.2 Send Message

export async function POST(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const res = new Response();
  const { message } = await req.json();

  const session = await getSession(req, res);

  if (session.user) {
    const newMessage = await client.message.create({
      data: {
        message,
        stream: {
          connect: { id: +id.toString() },
        },
        user: {
          connect: { id: session.user.id },
        },
      },
    });

    return createResponse(
      res,
      JSON.stringify({ ok: true, message: newMessage }),
      {
        status: 201,
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
