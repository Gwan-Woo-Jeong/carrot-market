import client from "@/libs/server/client";
import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

/*
  9.4 Sending SMS
 */

const twilioClienet = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

export async function POST(req: NextRequest) {
  const { phone, email } = await req.json();

  const user = phone ? { phone: +phone } : { email };
  if (!user) return NextResponse.json({ ok: false }, { status: 400 });

  const payload = Math.floor(100000 + Math.random() * 900000) + "";

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
          },
          create: {
            name: "Anonymous",
            ...user,
          },
        },
      },
    },
  });

  // 핸드폰 번호 가입인 경우 token을 문자로 전송
  if (phone) {
    const message = await twilioClienet.messages.create({
      messagingServiceSid: process.env.TWILIO_MSID,
      to: process.env.MY_PHONE!,
      body: `Your login token is ${payload}`,
    });

    console.log(message);
  }

  console.log(token);

  return NextResponse.json({ ok: true });
}
