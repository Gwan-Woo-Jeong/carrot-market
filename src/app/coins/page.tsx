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

/*
    #21.4 Parallelism
    - 서버에 의해 모든 컴포넌트가 평행적으로 렌더링
    - 모든 컴포넌트들이 다른 컴포넌트가 렌더링되기까지 기다릴 필요 X
    - http 스트리밍을 통해 리액트가 결과를 받으면 Suspense fallback에 따라 결과를 보여줌
 */

import { Suspense } from "react";
import RootLayout from "./layout";

const cache: any = {};

function fetchData(url: string) {
  if (!cache[url]) {
    throw Promise.all([
      fetch(url)
        .then((r) => r.json())
        .then((json) => (cache[url] = json)),
      new Promise((resolve) =>
        setTimeout(resolve, Math.round(Math.random() * 10555))
      ),
    ]);
  }

  return cache[url];
}
function Coin({ id, name, symbol }: any) {
  const {
    quotes: {
      USD: { price },
    },
  } = fetchData(`https://api.coinpaprika.com/v1/tickers/${id}`);
  return (
    <span>
      {name} / {symbol}: ${price}
    </span>
  );
}

function List() {
  const coins = fetchData("https://api.coinpaprika.com/v1/coins");

  return (
    <div>
      <h4>List is done</h4>
      <ul>
        {coins.slice(0, 10).map((coin: any) => (
          <li key={coin.id}>
            <Suspense fallback={`Coin ${coin.name} is loading`}>
              <Coin {...coin} />
            </Suspense>
          </li>
        ))}
      </ul>
    </div>
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
