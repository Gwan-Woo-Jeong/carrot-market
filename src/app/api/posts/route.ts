import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest, userAgent } from "next/server";

// #12.7 Geo Search

/*
  parseFloat(string)
  주어진 값을 필요한 경우 문자열로 변환한 후 부동소수점 실수로 파싱해 반환
  ex) parseFloat('3.14'); // 3.14

  gte: 크거나 같다.
  lte: 작거나 같다.

  const getPosts = await prisma.post.findMany({
  where: { likes: { lte: 9 } }
  })
 */

export async function GET(req: NextRequest) {
  const res = new Response();
  const session = await getSession(req, res);

  const latitude = req.nextUrl.searchParams.get("latitude");
  const longitude = req.nextUrl.searchParams.get("longitude");

  if (session.user) {
    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            wonderings: true,
            answers: true,
          },
        },
      },
      ...{
        ...(latitude &&
          longitude && {
            where: {
              latitude: {
                gte: parseFloat(latitude.toString()) - 0.01,
                lte: parseFloat(latitude.toString()) + 0.01,
              },
              longitude: {
                gte: parseFloat(longitude.toString()) - 0.01,
                lte: parseFloat(longitude.toString()) + 0.01,
              },
            },
          }),
      },
    });

    return createResponse(res, JSON.stringify({ ok: true, posts }), {
      status: 200,
    });
  } else {
    return createResponse(
      res,
      JSON.stringify({ ok: false, message: "Please log in" }),
      { status: 401 }
    );
  }
}

export async function POST(req: NextRequest) {
  const res = new Response();
  const session = await getSession(req, res);

  if (session.user) {
    const { question, latitude, longitude } = await req.json();

    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    return createResponse(res, JSON.stringify({ ok: true, post }), {
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
