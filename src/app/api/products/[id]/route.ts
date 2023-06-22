import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest } from "next/server";

/*
  #11.4 Product Detail
 */

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const res = new Response();
  const session = await getSession(req, res);

  if (session.user) {
    const product = await client.product.findUnique({
      where: { id: +id.toString() },
      include: {
        user: {
          // 유저 레코드에서 필요한 칼럼만 가져오기
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    return createResponse(res, JSON.stringify({ ok: true, product }), {
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
