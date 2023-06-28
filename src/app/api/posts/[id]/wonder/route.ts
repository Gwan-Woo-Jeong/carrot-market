import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest } from "next/server";

/*
    #12.3 궁금해요 
 */

export async function POST(
  req: NextRequest,
  { params: { id } }: { params: { id: string } }
) {
  const res = new Response();
  const session = await getSession(req, res);

  if (session.user) {
    const alreadyExist = await client.wondering.findFirst({
      where: {
        userId: session.user.id,
        postId: +id.toString(),
      },
      select: {
        id: true,
      },
    });

    if (alreadyExist) {
      await client.wondering.delete({
        where: {
          id: alreadyExist.id,
        },
      });
    } else {
      await client.wondering.create({
        data: {
          user: {
            connect: {
              id: session.user.id, // 참조 키인 userId를 연결
            },
          },
          post: {
            connect: {
              id: +id.toString(), // 참조 키인 postId를 연결
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
