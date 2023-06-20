/*
  9.1 Accounts Logic
  Upsert : Update or Create Records
  조건에 맞는 기존 데이터가 있으면 업데이트 없으면 새롭게 생성
  where, create, update 객체가 모두 들어가야 함
 */

import client from "@/libs/server/client";

export async function POST(req: Request) {
  const { phone, email } = await req.json();

  // VERSION 4
  const payload = phone ? { phone: +phone } : { email };
  const user = await client.user.upsert({
    where: {
      ...payload,
    },
    create: {
      name: "Anonymous",
      ...payload,
    },
    update: {},
  });

  console.log(user);

  /*
  VERSION 3

  let user;

  user = await client.user.upsert({
    where: {
      ...(phone && { phone }),
      ...(email && { email }),
    },
    create: {
      name: "Anonymous",
      ...(phone && { phone }),
      ...(email && { email }),
    },
    update: {},
  });
  */

  /*
  // VERSION 2
  let user;

  if (phone) {
    user = await client.user.upsert({
      where: {
        phone,
      },
      create: {
        name: "Anonymous",
        phone,
      },
      update: {},
    });
  }

  if (email) {
    user = await client.user.upsert({
      where: {
        email,
      },
      create: {
        name: "Anonymous",
        email,
      },
      update: {},
    });
  }
  */

  /*
  // VERSION 1
  let user;

  if (email) {
    user = await client.user.findUnique({
      where: {
        email,
      },
    });

    if (user) console.log(`found user : ${email}`);

    if (!user) {
      console.log(`not found user, will creatae : ${email}`);
      user = client.user.create({
        data: {
          name: "Anonymous",
          email,
        },
      });
    }
  }

  if (phone) {
    user = await client.user.findUnique({
      where: {
        phone,
      },
    });

    if (user) console.log(`found user : ${phone}`);

    if (!user) {
      console.log(`not found user, will creatae : ${phone}`);
      user = client.user.create({
        data: {
          name: "Anonymous",
          phone,
        },
      });
    }
  }
  */

  return new Response("ok", { status: 200 });
}
