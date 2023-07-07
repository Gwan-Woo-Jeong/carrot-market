import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest } from "next/server";

// #14.6 Pagination

export async function GET(req: NextRequest) {
  const res = new Response();

  const session = await getSession(req, res);

  if (session.user) {
    const size = req.nextUrl.searchParams.get("size");
    const page = req.nextUrl.searchParams.get("page");

    const sizeVal = size ? +size : 10;
    const pageVal = page ? +page : 1;

    const streams = await client.stream.findMany({
      take: sizeVal, // 전달할 레코드의 개수
      skip: (pageVal - 1) * sizeVal, // 이전 개수의 레코드를 생략
    });

    const streamCount = await client.stream.count();

    return createResponse(
      res,
      JSON.stringify({
        ok: true,
        streams,
        pages: Math.ceil(streamCount / sizeVal),
      }),
      {
        status: 200,
      }
    );
  } else {
    return createResponse(
      res,
      JSON.stringify({ ok: false, message: "Please log in" }),
      { status: 401 }
    );
  }
}

// #17.2 Stream API
/*
  실시간 스트림 시작

  API를 통해 라이브 스트림을 시작하려면 /live_inputs 엔드포인트에 POST 요청

  mode : automatic
  - 라이브 스트림을 자동으로 볼 수 있음
  - 종료 후 다시 볼 수 있도록 자동으로 녹화

  body 속성
  timeoutSeconds
  - 라이브 피드의 연결을 끊을 수 있는 시간을 지정. 10초라면 10초 간 스트리머와 연결이 끊길 시, 라이브 자동 종료.

  requireSignedURLs
  - 비디오를 보기 위해 서명된 URL이 필요한지 여부

  allowedOrigins
 - 선택적으로 호출되어 허용된 출처 목록을 제공 가능
 */

export async function POST(req: NextRequest) {
  const res = new Response();
  const { name, price, description } = await req.json();
  const session = await getSession(req, res);

  if (session.user) {
    /*
    Cloud Flare Live Stream

    const {
      result: {
        uid,
        rtmps: { streamKey, url },
      },
    } = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/stream/live_inputs`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.CF_STREAM_TOKEN}`,
          },
          body: `{"meta": {"name":"${name}"},"recording": { "mode": "automatic", "timeoutSeconds": 10 }}`,
        }
      )
    ).json();
    */

    const stream = await client.stream.create({
      data: {
        name,
        price: +price,
        description,
        // cloudflareId: uid,
        // cloudflareKey: streamKey,
        // cloudflareUrl: url,
        user: {
          connect: { id: session.user.id },
        },
      },
    });

    return createResponse(res, JSON.stringify({ ok: true, stream }), {
      status: 201,
    });
  } else {
    return createResponse(
      res,
      JSON.stringify({ ok: false, message: "Please log in" }),
      { status: 401 }
    );
  }
}
