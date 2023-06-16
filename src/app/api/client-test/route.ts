import client from "@/libs/client";
import { NextResponse } from "next/server";

/*
  #6.7 API Routes 

  NextJS는 자체적으로 풀스택을 지원하는 프레임워크다. 따라서, API를 설계하는 것도 가능하다.
  `app/api/라우트명` 디렉토리 안에 `route.ts` 파일을 만든 후, 안에 API 로직을 입력하면 된다.
  `app/api` 폴더 내의 모든 파일은 `/api/*`에 매핑되며 API 엔드포인트로 처리된다.
*/

export async function GET() {
  await client.user.create({
    data: {
      name: "first user",
      email: "hi@hello.com",
    },
  });

  return NextResponse.json({ ok: true, data: "hello" });
}
