import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest, NextResponse } from "next/server";

/*
  9.8 Profile Handler
  - 모든 api는 실제 백엔드 없이 개별적으로 동작하기 때문에
  - 각 api 마다 type과 withIronSessionApiRoute config를 매번 설정해줘야함
  - 쿠키에 세션이 userId가 저장되어 있기 때문에 Id에 해당하는 user정보를 가져올 수 있음
 */

export async function GET(req: NextRequest) {
  const res = new Response();

  const session = await getSession(req, res);

  const profile = await client.user.findUnique({
    where: { id: session.user?.id },
  });

  return createResponse(res, JSON.stringify(profile), { status: 200 });
}
