import client from "@/libs/server/client";
import { createResponse, getSession } from "@/libs/server/session";
import { NextRequest } from "next/server";

// #13.6 Edit Profile

export async function GET(req: NextRequest) {
  const res = new Response();

  const session = await getSession(req, res);

  if (session.user) {
    const profile = await client.user.findUnique({
      where: { id: session.user?.id },
    });

    return createResponse(res, JSON.stringify({ ok: true, profile }), {
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
    const { email, phone, name } = await req.json();

    const currentUser = await client.user.findUnique({
      where: { id: session.user.id },
    });

    if (email && email !== currentUser?.email) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
          },
        })
      );

      if (alreadyExists)
        return createResponse(
          res,
          JSON.stringify({ ok: false, error: "Email already taken" }),
          { status: 409 }
        );

      await client.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          email,
        },
      });

      return createResponse(res, JSON.stringify({ ok: true }), { status: 200 });
    } else if (phone && phone !== currentUser?.phone) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            phone,
          },
          select: {
            id: true,
          },
        })
      );

      if (alreadyExists)
        return createResponse(
          res,
          JSON.stringify({ ok: false, error: "Phone number is in use" }),
          { status: 409 }
        );

      await client.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          phone,
        },
      });

      return createResponse(res, JSON.stringify({ ok: true }), { status: 200 });
    }

    if (name) {
      await client.user.update({
        where: {
          id: session.user?.id,
        },
        data: {
          name,
        },
      });
    }

    createResponse(res, JSON.stringify({ ok: true }));
  } else {
    return createResponse(
      res,
      JSON.stringify({ ok: false, message: "Please log in" }),
      { status: 401 }
    );
  }
}
