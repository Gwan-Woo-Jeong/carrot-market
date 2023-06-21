import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest, NextResponse } from "next/server";

/*
  9.8 Profile Handler
  TypeScript로 세션 데이터 Tying (req.session에 데이터 입력)
  - req.session은 자동으로 올바른 유형으로 채워지므로 .save() 및 .destroy()를 호출 가능
  - 세션 데이터를 입력한 후 특정 시점에 필요한 파일에 있는 한 프로젝트의 아무 곳에나 넣을 수 있음
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
    id: exists.userId,
  };

  await session.save();

  return createResponse(res, "ok", { status: 200 });
}
