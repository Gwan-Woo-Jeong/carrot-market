import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest } from "next/server";

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
