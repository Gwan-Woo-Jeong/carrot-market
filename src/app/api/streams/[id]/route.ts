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

  // include : 테이블에 있는 모든 칼럼을 불러옴
  // select : 테이블의 특정 칼럼만 불러옴

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

  const isOwner = session?.user ? stream?.userId === session.user.id : false;

  // 스트림이 로그인 유저가 방송하는 스트림이 아니면 key & url 지움
  if (stream && !isOwner) {
    stream.cloudflareKey = null;
    stream.cloudflareUrl = null;
  }

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
}
