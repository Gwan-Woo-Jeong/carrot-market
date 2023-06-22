import { PrismaClient } from "@prisma/client";

declare global {
  var client: PrismaClient | undefined;
}

/*
    #11.0 Product Model
    
    개발 환경에서 Next가 리로드 될 때마다 prisma 클라이언트를 새로 생성하여 연결한다.
    이를 방지하기 위해, 글로벌 변수를 선언한 후 할당된 prisma가 없을 경우에만 생성하도록 한다.
 */

const client = global.client || new PrismaClient();

if (process.env.NODE_ENV === "development") global.client = client;

export default client;
