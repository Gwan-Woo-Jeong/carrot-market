import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest } from "next/server";

/*
  #11.5 Related Products
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
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    });

    // 상품명을 띄어쓰기로 스플릿해서 해당 단어와 일치하는 다른 상품을 연관 상품으로 검색
    const terms = product?.name
      .split(" ")
      .map((word) => ({ name: { contains: word } }));

    const relatedProducts = await client.product.findMany({
      where: {
        OR: terms,
        // 검색 단어를 추출한 상품은 연관 상품에서 제외
        AND: {
          id: {
            not: product?.id,
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
          },
        },
      },
    });

    return createResponse(
      res,
      JSON.stringify({ ok: true, product, relatedProducts }),
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
