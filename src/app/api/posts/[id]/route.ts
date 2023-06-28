import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest } from "next/server";

/*
    #12.3 궁금해요
 */

export async function GET(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const res = new Response();
  const session = await getSession(req, res);

  const post = await client.post.findUnique({
    where: {
      id: +id.toString(),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      answers: {
        select: {
          id: true,
          answer: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          answers: true,
          wonderings: true,
        },
      },
    },
  });

  const isWondering = session?.user
    ? Boolean(
        await client.wondering.findFirst({
          where: {
            postId: +id.toString(),
            userId: session.user.id,
          },
        })
      )
    : false;

  if (post) {
    return createResponse(
      res,
      JSON.stringify({ ok: true, post, isWondering }),
      {
        status: 200,
      }
    );
  } else {
    return createResponse(
      res,
      JSON.stringify({ ok: false, message: "Not Found" }),
      { status: 404 }
    );
  }
}
