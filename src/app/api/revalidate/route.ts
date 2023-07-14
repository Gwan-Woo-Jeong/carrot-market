import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

// #18.3 On-demand Revalidation
/*
  - revalidate 시간을 60으로 설정하면 모든 방문자는 1분 동안 동일한 버전의 사이트를 보게 됨
  - 1분이 지난 후 누군가가 해당 페이지를 방문해야 캐시된 페이지가 업데이트
  - revalidate가 생략되면 revalidate가 호출될 때 on-demand 페이지만 revalidate함
 */

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get("path") || "";

  console.log(`revalidate : /${path}`);

  revalidateTag(`${process.env.NEXT_PUBLIC_HOST_URL}/${path}`);

  return NextResponse.json({ revalidated: true, now: Date.now() });
}
