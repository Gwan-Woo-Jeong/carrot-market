import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest } from "next/server";

/*
  #11.6 Favorite Products

  delete
  기존 DB 레코드를 삭제 (id 또는 유니크한 속성으로만 삭제 가능)
  
  deleteMany
  여러 레코드를 삭제 (유니크하지 않은 속성으로도 삭제 가능)
 */

export async function POST(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const res = new Response();
  const session = await getSession(req, res);

  if (session.user) {
    // 이미 좋아요를 눌렀는지 확인
    const alreadyExists = await client.fav.findFirst({
      where: {
        productId: +id.toString(),
        userId: session.user.id,
      },
    });

    if (alreadyExists) {
      // 삭제
      await client.fav.delete({
        where: {
          id: alreadyExists.id,
        },
      });
    } else {
      // 생성
      await client.fav.create({
        data: {
          user: {
            connect: {
              id: session.user.id,
            },
          },
          product: {
            connect: {
              id: +id.toString(),
            },
          },
        },
      });
    }

    return createResponse(res, JSON.stringify({ ok: true }), {
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
