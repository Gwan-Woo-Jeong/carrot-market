import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

// 14.5 Seeding

/*
    Seeding : 데이터베이스에서 동일한 데이터를 일관되게 다시 생성
    - 애플리케이션을 시작하는 데 필요한 데이터를 데이터베이스를 채움
    - 개발 환경에서 애플리케이션을 검증하고 사용하기 위한 기본 데이터를 제공

    seed를 실행법
    - scirpt 실행을 위해 ts-node 설치 (npm install -D ts-node)
    - prisma 폴더에 실행시킬 스크립트 파일 (seed) 생성 및 입력
    - 다음 script를 package.json 파일에 입력 후 명령어로 실행
    "prisma": {
        "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
    },  
 */

async function main() {
  Array.from({ length: 500 }, (_, i) => i).forEach(async (item) => {
    await client.stream.create({
      data: {
        name: String(item),
        description: String(item),
        price: item,
        user: {
          connect: {
            id: 2,
          },
        },
      },
    });
    console.log(`${item}/500`);
  });
}

main()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());
