import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest, NextResponse } from "next/server";

/*
  9.9 Clean code
 */

export async function POST(req: NextRequest) {
  const res = new Response();
  const { token } = await req.json();

  // Token 테이블에서 일치하는 레코드 찾기
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
    // User 객체 추가
    include: { user: true },
  });

  if (!foundToken) return NextResponse.json({}, { status: 404 });

  const session = await getSession(req, res);

  session.user = {
    id: foundToken.userId,
  };

  await session.save();
  // 로그인 시, 유저에게 발급한 현재 토큰을 제외한 나머지 토큰을 모두 삭제
  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });

  return createResponse(res, JSON.stringify({ ok: true }), { status: 200 });
}
