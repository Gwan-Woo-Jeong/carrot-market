"use client";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// #19.2 Dynamic Imports
/*
  - JS 모듈을 동적으로 가져와 실행
  - SSR과 함께 작동
  - `React.lazy`와 유사하게 사전 로드가 작동하도록 모듈의 최상위에 표시되어야 하므로 React 렌더링 내부에서 사용할 수 없음
  - 예시 : 사용자가 검색을 입력한 후, 브라우저에서 모듈을 동적으로 로드하기
 */

// #19.3 Lazy-load Imports
/*
  dynamic 컴포넌트가 로드되는 동안 로드 상태를 렌더링하기 위해 로딩 컴포넌트를 추가
 */

const Bs = dynamic(
  //@ts-ignore
  () =>
    new Promise((resolve) =>
      setTimeout(() => resolve(import("@/components/dynamic-component")), 5000)
    ),
  {
    ssr: false,
    loading: () => <div>Loading a big component...</div>,
  }
);

export default function DynamicImports() {
  return (
    <div>
      <Suspense fallback={<div>Loading a big component...</div>}>
        <Bs />
      </Suspense>
    </div>
  );
}
