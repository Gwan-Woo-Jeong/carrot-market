import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const res = new Response();

  const session = await getSession(req, res);

  const chatRooms = await client.chatRoom.findMany({
    where: {
      OR: [
        {
          hostId: session.user!.id,
        },
        {
          guestId: session.user!.id,
        },
      ],
    },
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
        select: {
          id: true,
          message: true,
        },
      },
    },
  });

  return createResponse(res, JSON.stringify({ ok: true, chatRooms }), {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const res = new Response();
  const session = await getSession(req, res);

  const { productId, guestId } = await req.json();

  // 상품 & 판매자가 일치하는 채팅방이 있으면 찾기
  // 없으면 새로 생성 
  const chatRoom = await client.chatRoom.upsert({
    where: {
      productId_guestId: {
        productId,
        guestId,
      },
    },
    create: {
      product: {
        connect: {
          id: productId,
        },
      },
      host: {
        connect: {
          id: session.user!.id,
        },
      },
      guest: {
        connect: {
          id: guestId,
        },
      },
    },
    update: {},
  });

  return createResponse(res, JSON.stringify({ ok: true, chatRoom }), {
    status: 201,
  });
}
