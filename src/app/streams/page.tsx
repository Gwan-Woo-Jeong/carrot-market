"use client";

import type { NextPage } from "next";

/*
    #5.13 Streams

    Aspect Ratio

    요소의 종횡비를 제어
    대괄호를 사용하여 새로운 속성을 생성 가능

    ex )
    aspect-auto = aspect-ratio: auto;
    aspect-square = aspect-ratio: 1 / 1;
    aspect-video = aspect-ratio: 16 / 9;

    iframe class="w-full aspect-[4/3]" src="https://www.youtube.com/...
 */

const Streams: NextPage = () => {
  return (
    <div className="py-10 divide-y-2">
      {Array(7)
        .fill(1)
        .map((_, i) => (
          <div className="py-4 px-4" key={i}>
            <div className="w-full rounded-md bg-slate-300 aspect-video mb-2" />
            <span className="text-gray-700 font-medium text-lg">
              Let's learn Next JS
            </span>
          </div>
        ))}
      <button className="fixed hover:bg-orange-500 transition-colors cursor-pointer  bottom-24 right-5 shadow-xl bg-orange-400 rounded-full p-4 border-transparent text-white">
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
          />
        </svg>
      </button>
    </div>
  );
};

export default Streams;
