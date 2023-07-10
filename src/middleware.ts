import { getIronSession } from "iron-session";
import { NextRequest, NextFetchEvent, NextResponse } from "next/server";

interface ironSessionData {
  user?: {
    id: number;
  };
}

// #19.0 Middlewares
// 첫 번째 파일 시스템 조회 전에 redirects 및 headers 직후 실행

// #19.1 Responses and Redirections
/*
  UserAgent
  요청 유저의 응용 프로그램, 운영 체제, 공급 업체 및 / 또는 버전을 식별

  Matcher
  - 미들웨어는 모든 요청에서 발생 (api 포함)
  - 페이지 하나를 불러올때마다 발생되는 관련 static 파일 요청이 있음
  - 매칭(matcher)되는 `url`에서만 미들웨어가 발생하도록 할 수 있음
 */

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const cookie = req.cookies.get("Carrot Session");

  // 세션 쿠키가 존재하지 않으면 로그인 페이지로 강제 이동
  if (!cookie && !req.url.includes("/enter")) {
    console.log("no cookie");
    req.nextUrl.pathname = "/enter";
    return NextResponse.redirect(req.nextUrl);
  }

  const res = NextResponse.next();

  // 존재하면 세션이 유효한지 확인
  const session = await getIronSession<ironSessionData>(req, res, {
    cookieName: "Carrot Session",
    password: process.env.COOKIE_PASSWORD!,
    cookieOptions: {
      secure: process.env.NODE_ENV! === "production",
    },
  });

  // 세션 쿠키가 존재하지 않으면 로그인 페이지 이동
  if (!session.user && !req.url.includes("/enter")) {
    console.log("no session");
    req.nextUrl.pathname = "/enter";
    return NextResponse.redirect(req.nextUrl);
  }

  // 존재하면 홈페이지 이동
  if (session.user && req.url.includes("/enter")) {
    console.log("found session");
    req.nextUrl.pathname = "/";
    return NextResponse.redirect(req.nextUrl);
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
