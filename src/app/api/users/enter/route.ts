import client from "@/libs/server/client";
import { NextRequest, NextResponse } from "next/server";
// import twilio from "twilio";
// import mail from "@sendgrid/mail";

/*
  9.5 Sending Email
 */

// mail.setApiKey(process.env.SENDGRID_API_KEY!);
// const twilioClienet = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

export async function POST(req: NextRequest) {
  const { phone, email } = await req.json();

  const user = phone ? { phone } : { email };
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
  // if (phone) {
  // const message = await twilioClienet.messages.create({
  //   messagingServiceSid: process.env.TWILIO_MSID,
  //   to: process.env.MY_PHONE!,
  //   body: `Your login token is ${payload}`,
  // });
  // console.log(message);
  // 이메일 가입인 경우 token을 이메일로 전송
  // } else if (email) {
  // const email = await mail.send({
  //   from: "19c9d4@naver.com",
  //   to: "19c9d4@naver.com",
  //   subject: "Your Carrot Market Verification Email",
  //   text: `Your login token is ${payload}`,
  //   html: `<strong>Your login token is ${payload}</strong>`,
  // });
  // console.log(email);
  // }

  return NextResponse.json({ ok: true, token });
}
