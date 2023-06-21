import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest, NextResponse } from "next/server";

/*
  9.6 Token UI
 */

export async function POST(req: NextRequest) {
  const res = new Response();
  const { token } = await req.json();

  // Token 테이블에서 일치하는 레코드 찾기
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
    // User 객체 추가
    include: { user: true },
  });

  console.log(exists);

  if (!exists) return NextResponse.json({}, { status: 404 });

  const session = await getSession(req, res);

  session.user = {
    id: exists?.userId,
  };

  await session.save();

  return createResponse(res, "ok", { status: 200 });
}
