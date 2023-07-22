"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { SWRConfig } from "swr";
import React from "react";
import { fetcher } from "@/libs/client/utils";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

/*
  #10.4 useUser Refactor

  SWR Global Configuration
  컨텍스트 SWRConfig는 모든 SWR 훅에 대한 Global Configuration(옵션)을 제공

  useSWR 옵션
  const { data, error, isValidating, mutate } = useSWR(key, fetcher, options)
 */

/*
  #19.5 Script Component

  - HTML `script` 태그의 확장
  - 앱에서 써드 파티 스크립트의 로드되는 우선 순위를 설정, 개발 시간을 절약하면서 로드하는 성능을 향상 가능

  strategy options
  - beforeInteractive : 페이지가 interactive 되기 전에 로드 
  - afterInteractive (default) : 페이지가 interactive 된 후에 로드
  - lazyOnload : 다른 모든 데이터나 소스를 불러온 후에 로드
  - worker (experimental) : web worker에 로드

  onLoad prop
  - `Script` 에 명시된 스크립트를 다 불러온 다음에 실행
 */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("APP IS RUNNING");
  return (
    <html lang="en">
      <body className={inter.className}>
        <SWRConfig value={{ fetcher }}>
          <div className="w-full max-w-lg mx-auto">{children}</div>
          <div id="modal-root" />
          {/* <Script
            src="https://developers.kakao.com/sdk/js/kakao.js"
            strategy="lazyOnload"
          />
          <Script
            src="https://connect.facebook.net/en_US/sdk.js"
            onLoad={() => {
              window.fbAsyncInit = function () {
                FB.init({
                  appId: "your-app-id",
                  autoLogAppEvents: true,
                  xfbml: true,
                  version: "v13.0",
                });
              };
            }}
          /> */}
        </SWRConfig>
      </body>
    </html>
  );
}
