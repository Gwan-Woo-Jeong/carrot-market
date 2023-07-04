import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest } from "next/server";

// #15.4 Direct Upload URL

export async function POST(req: NextRequest) {
  const res = new Response();
  const { name, price, description } = await req.json();
  const session = await getSession(req, res);

  if (session.user) {
    // Cloud Flare Upload
    const response = await (
      await fetch(
        `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v1/direct_upload`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.CF_TOKEN}`,
          },
        }
      )
    ).json();

    // => 서버에 저장할 id와 upload 해야하는 1회용 URL을 리턴

    return createResponse(res, JSON.stringify({ ok: true }), {
      status: 200,
      ...response.result,
    });
  } else {
    return createResponse(
      res,
      JSON.stringify({ ok: false, message: "Please log in" }),
      { status: 401 }
    );
  }
}
