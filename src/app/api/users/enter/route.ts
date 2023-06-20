import client from "@/libs/server/client";

/*
  9.2 Token Logic
 */

export async function POST(req: Request) {
  const { phone, email } = await req.json();

  const payload = phone ? { phone: +phone } : { email };

  // 토큰 생성
  const token = await client.token.create({
    data: {
      payload: "123",
      // 로그인한 유저의 id로 토큰 연결
      user: {
        /*
          connect : 새로운 토큰을 이미 생성된 유저와 연결
          create : 새로운 토큰과 새로운 유저를 생성
          connectOrCreate : 유저를 찾으면 connect / 못찾으면 create (= upsert)
        */
        connectOrCreate: {
          where: {
            ...payload,
          },
          create: {
            name: "Anonymous",
            ...payload,
          },
        },
      },
    },
  });

  console.log(token);

  return new Response("ok", { status: 200 });
}
