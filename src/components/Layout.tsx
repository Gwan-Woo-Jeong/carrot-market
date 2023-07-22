"use client";

import { cls } from "@/libs/client/utils";
import { Product } from "@prisma/client";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import Button from "./button";

/*
  #5.16 Layout part One

  Layout.tsx
  모든 페이지에서 위에는 네비게이션(헤더) 바 밑에는 탭이 보이도록 하는 레이아웃 wrapper 컴포넌트
  
  하단 탭은 hasTabBar가 true여야 보이도록 함
  상단 헤더에는 페이지의 제목이 보여줌
  헤더에 콘텐츠가 가려지지 않도록 padding 주어 헤더가 들어갈 자리 확보
 */

interface LayoutProps {
  title?: string;
  canGoBack?: boolean;
  hasTabBar?: boolean;
  children: React.ReactNode;
  seoTitle?: string;
  product?: Product;
  handleSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onClickWriteReview?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function Layout({
  title,
  canGoBack,
  hasTabBar,
  children,
  seoTitle,
  product,
  handleSelect,
  onClickWriteReview,
}: LayoutProps) {
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    router.back();
  };

  const selectList = [
    { status: "sale", label: "판매중" },
    { status: "reserve", label: "예약중" },
    { status: "sold", label: "판매완료" },
  ];

  const getReserveData = (reservedAt: string) => {
    const splitted = reservedAt.split("T");
    return `${splitted[0]}\n${splitted[1].slice(0, 5)}`;
  };

  return (
    <div>
      <Head>
        <title>{seoTitle} | Carrot Market </title>
      </Head>
      <div className="bg-white w-full h-12 max-w-lg justify-center text-lg px-10 font-medium  fixed text-gray-800 border-b top-0  flex items-center z-3">
        {canGoBack ? (
          <button onClick={onClick} className="absolute left-4">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
        ) : null}
        {title ? (
          <span className={cls(canGoBack ? "mx-auto" : "", "")}>{title}</span>
        ) : null}
      </div>
      {product ? (
        <div className="bg-white w-full h-32 max-w-lg justify-center item-center text-lg px-10 font-medium fixed text-gray-800 top-12 flex items-center z-3">
          <div className="flex items-center w-full text-sm text-gray-700 p-3 border border-gray-300 rounded-md space-x-4">
            <div className="relative w-16 h-16 rounded-lg object-cover bg-slate-400">
              {product.image ? (
                <Image fill alt="avatar-preview" src={product.image} />
              ) : null}
            </div>
            <div className="flex-1 py-1 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span
                  className={cls(
                    "text-lg font-bold",
                    product.status === "sold"
                      ? "line-through text-gray-500"
                      : ""
                  )}
                >
                  {product.name}
                </span>
                {product.status ? (
                  <select
                    disabled={product.status === "sold"}
                    className="border-none pr-8 focus:ring-0"
                    onChange={handleSelect}
                    value={product.status}
                  >
                    {selectList.map((item) => (
                      <option value={item.status} key={item.status}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                ) : null}
              </div>
              <div className="flex justify-between items-center">
                <span
                  className={cls(
                    "text-lg",
                    product.status === "sold"
                      ? "line-through text-gray-500"
                      : ""
                  )}
                >
                  ${product.price}
                </span>
                {product?.status === "reserve" && product?.reservedAt ? (
                  <span className="pr-4 text-slate-500">
                    {getReserveData(product.reservedAt as any)}
                  </span>
                ) : product?.status === "sold" ? (
                  <Button
                    onClick={onClickWriteReview}
                    disabled={Boolean(product.reviewId)}
                    small
                    text={
                      "리뷰 " + (Boolean(product.reviewId) ? "완료" : "쓰기")
                    }
                  />
                ) : null}
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div
        className={cls(product ? "pt-36" : "pt-12", hasTabBar ? "pb-24" : "")}
      >
        {children}
      </div>
      {hasTabBar ? (
        <nav className="bg-white max-w-xl text-gray-700 border-t fixed bottom-0 w-full px-10 pb-5 pt-3 flex justify-between text-xs">
          <Link
            href="/"
            className={cls(
              "flex flex-col items-center space-y-2 ",
              pathname === "/"
                ? "text-orange-500"
                : "hover:text-gray-500 transition-colors"
            )}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
            <span>홈</span>
          </Link>
          <Link
            href="/community"
            className={cls(
              "flex flex-col items-center space-y-2 ",
              pathname === "/community"
                ? "text-orange-500"
                : "hover:text-gray-500 transition-colors"
            )}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              ></path>
            </svg>
            <span>동네생활</span>
          </Link>
          <Link
            href="/chats"
            className={cls(
              "flex flex-col items-center space-y-2 ",
              pathname === "/chats"
                ? "text-orange-500"
                : "hover:text-gray-500 transition-colors"
            )}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
            <span>채팅</span>
          </Link>
          <Link
            href="/streams"
            className={cls(
              "flex flex-col items-center space-y-2 ",
              pathname === "/streams"
                ? "text-orange-500"
                : "hover:text-gray-500 transition-colors"
            )}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              ></path>
            </svg>
            <span>라이브</span>
          </Link>
          <Link
            href="/profile"
            className={cls(
              "flex flex-col items-center space-y-2 ",
              pathname === "/profile"
                ? "text-orange-500"
                : "hover:text-gray-500 transition-colors"
            )}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
            <span>나의 캐럿</span>
          </Link>
        </nav>
      ) : null}
    </div>
  );
}
