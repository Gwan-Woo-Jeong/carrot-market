"use client";

import type { NextPage } from "next";
import Layout from "@/components/layout";
import Link from "next/link";
import FloatingButton from "@/components/floating-button";
import { Stream } from "@prisma/client";
import useInfiniteSWR from "swr/infinite";
import { fetcher } from "@/libs/client/utils";
import { useEffect } from "react";
import { useInfiniteScroll } from "@/libs/client/useInfiniteScroll";

/*
  #14.6 Pagination

  useInfiniteSWR
  pagination을 적용해야하는 상황에서 여러 요청을 실행시킨 후 이에 대한 응답 데이터를 배열에 누적시킴
  
  - getKey : pageIndex, previousPageData를 인자로 받아 key(api url)를 반환. null일 때 요청 하지 않음.
 */

interface StreamsResponse {
  ok: boolean;
  streams: Stream[];
  pages: number;
}

const getKey = (pageIndex: number, previousPageData: StreamsResponse) => {
  if (pageIndex === 0) return `api/streams?page=1`;
  if (pageIndex + 1 > previousPageData.pages) return null;
  return `/api/streams?page=${pageIndex + 1}`;
};

const Streams: NextPage = () => {
  const page = useInfiniteScroll();
  const { data, setSize } = useInfiniteSWR<StreamsResponse>(getKey, fetcher);
  const streams = data ? data.map((item) => item.streams).flat() : [];

  useEffect(() => {
    setSize(page);
  }, [setSize, page]);

  return (
    <Layout hasTabBar title="라이브">
      <div className=" divide-y-[1px] space-y-4">
        {streams.map((stream, i) => (
          <Link
            key={stream.id}
            href={`/streams/${stream.id}`}
            className="pt-4 block px-4"
          >
            <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
            <h1 className="text-2xl mt-2 font-bold text-gray-900">
              {stream.name}
            </h1>
          </Link>
        ))}
        <FloatingButton href="/live/create">
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
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Streams;
