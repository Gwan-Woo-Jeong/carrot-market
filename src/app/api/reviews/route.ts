import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest } from "next/server";

/*
    #13.1 Reviews
 */

export async function GET(req: NextRequest) {
  const res = new Response();

  const session = await getSession(req, res);

  if (session.user) {
    const reviews = await client.review.findMany({
      where: {
        createdForId: session.user.id, // 로그인 유저에게 쓰여진 리뷰
      },
      include: {
        createdBy: { // 리뷰 쓴 유저의 다음 데이터를 포함
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    return createResponse(res, JSON.stringify({ ok: true, reviews }), {
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
