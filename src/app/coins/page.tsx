/*
    #21.1 Server Components
    - 서버에서 React 컴포넌트를 렌더링
    - 서버에서 HTML을 미리 생성하는 서버 측 렌더링(SSR) X
    - "클라이언트 측 JS가 필요하지 않으므로" 페이지 렌더링이 빨라짐
    - 서버 렌더링 + 클라이언트 측 상호 작용 = 사용자 경험을 향상
 */

/*
    #21.2 Promise Me Your Love
    - Suspense는 내부의 컴포넌트의 fetch 함수가 Promise를 반환하면 성공/실패를 확인한 후 컴포넌트를 렌더링
 */

// #12.3 Throwing Our Promise

import { Suspense } from "react";
import RootLayout from "./layout";

let finished = false;

const cache: any = {};

function fetchData(url: string) {
  if (!cache[url]) {
    throw fetch(url)
      .then((r) => r.json())
      .then((json) => (cache[url] = json.slice(0, 10)));
  }

  return cache[url];
}

function List() {
  const coins = fetchData("https://api.coinpaprika.com/v1/coins");

  return (
    <ul>
      {coins.map((coin: any) => (
        <li key={coin.id}>
          {coin.name} / {coin.symbol}
        </li>
      ))}
    </ul>
  );
}

export default function Coins() {
  return (
    <RootLayout>
      <div>
        <h1>Welcome to RSC</h1>
        <Suspense fallback="Rendering in the server...">
          <List />
        </Suspense>
      </div>
    </RootLayout>
  );
}
