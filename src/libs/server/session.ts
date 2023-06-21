import { getIronSession, createResponse } from "iron-session";

/*
    9.7 Serverless Session
    - 서명, 암호화된 쿠키를 사용하는 node.js stateless 세션 도구
    - JWT는 암호화되지 않고 서명이 되어 있음
    - 유저가 안에 있는 정보를 볼 수 없음
    - 세션을 위한 백엔드 구축이 필요 없음
 */

export const getSession = (req: Request, res: Response) => {
  const session = getIronSession(req, res, {
    cookieName: "Carrot Session",
    password: "dMC5xXev2iETQgufUNkpdkktwxdFqxi3",
    cookieOptions: {
      secure: false,
    },
  });

  return session;
};

export { createResponse };
