import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const res = new Response();

  const reviews = await client.review.findMany({
    where: {
      createdForId: +id.toString(),
    },
    include: {
      createdBy: {
        // 리뷰 쓴 유저의 다음 데이터를 포함
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
}

export async function POST(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const res = new Response();
  const session = await getSession(req, res);

  const { review, score } = await req.json();

  const productId = req.nextUrl.searchParams.get("productId");

  const newReview = await client.review.create({
    data: {
      review,
      score,
      createdBy: {
        connect: {
          id: session.user!.id,
        },
      },
      createdFor: {
        connect: {
          id: +id,
        },
      },
      ...{
        ...(productId && {
          products: {
            connect: {
              id: +productId,
            },
          },
        }),
      },
    },
  });

  return createResponse(res, JSON.stringify({ ok: true, review: newReview }), {
    status: 201,
  });
}
