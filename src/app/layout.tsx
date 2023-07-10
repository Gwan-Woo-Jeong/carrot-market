"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { SWRConfig } from "swr";
import React from "react";
import { fetcher } from "@/libs/client/utils";

const inter = Inter({ subsets: ["latin"] });

/*
  #10.4 useUser Refactor

  SWR Global Configuration
  컨텍스트 SWRConfig는 모든 SWR 훅에 대한 Global Configuration(옵션)을 제공

  useSWR 옵션
  const { data, error, isValidating, mutate } = useSWR(key, fetcher, options)
 */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SWRConfig value={{ fetcher }}>
          <div className="w-full max-w-lg mx-auto">{children}</div>
        </SWRConfig>
      </body>
    </html>
  );
}
