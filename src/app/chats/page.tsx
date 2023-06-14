"use client";

import type { NextPage } from "next";
import Layout from "@/components/Layout";

/*
    #5.8 Chats

    Divide Width
    요소 사이의 border width를 제어.
    자동적으로 구분선을 생성하되 첫 요소의 윗 부분과 마지막 요소의 아래 부분의 구분선은 생성하지 않는다. 

    divide-x = border-right-width: 1px; border-left-width: 0px;
    divide-x-2 = border-right-width: 2px; border-left-width: 0px;

    divide-y = border-top-width: 0px; border-bottom-width: 1px;
    divide-y-2 = border-top-width: 0px; border-bottom-width: 2px;

    (+) divide-y-[1px]로 쓰거나 [1px]을 생략하고 divide-y로 쓸 수도 있음
 */

const Chats: NextPage = () => {
  return (
    <Layout hasTabBar title="채팅">
      <div className="divide-y-[1px] ">
        {[1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <div
            key={i}
            className="flex px-4 cursor-pointer py-3 items-center space-x-3"
          >
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-gray-700">Steve Jebs</p>
              <p className="text-sm  text-gray-500">
                See you tomorrow in the corner at 2pm!
              </p>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Chats;
