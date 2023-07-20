import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const res = new Response();

  const chatRoom = await client.chatRoom.findUnique({
    where: { id: +id },
    include: {
      host: {
        select: {
          id: true,
          avatar: true,
          name: true,
        },
      },
      guest: {
        select: {
          id: true,
          avatar: true,
          name: true,
        },
      },
      chatMessages: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
    },
  });

  return createResponse(res, JSON.stringify({ ok: true, chatRoom }), {
    status: 200,
  });
}

export async function POST(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const res = new Response();
  const session = await getSession(req, res);

  const { message } = await req.json();

  const chatMessage = await client.chatMessages.create({
    data: {
      user: {
        connect: {
          id: session.user!.id,
        },
      },
      message,
      chatRoom: {
        connect: {
          id: +id,
        },
      },
    },
  });

  return createResponse(res, JSON.stringify({ ok: true, chatMessage }), {
    status: 201,
  });
}
