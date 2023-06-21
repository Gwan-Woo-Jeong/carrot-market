"use client";

import Layout from "@/components/layout";
import type { NextPage } from "next";
import FloatingButton from "@/components/floating-button";
import Item from "@/components/item";
import useUser from "@/libs/client/useUser";

/*
  Heroicons
  Tailwind CSS에서 만들어진 SVG 아이콘
  https://heroicons.com/

  Space Between (space-x, space-y)
  자식 요소 사이의 공간을 제어

  space-x-{amount}
  요소 사이의 수평 공간을 제어
  ex) space-x-4

  space-y-{amount} 
  요소 사이의 수직 공간을 제어
  ex) space-y-4
 */

const Home: NextPage = () => {
  const { user, isLoading } = useUser();
  console.log(user);
  return (
    <Layout title="홈" hasTabBar>
      <div className="flex flex-col space-y-5 divide-y">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <Item
            id={i}
            key={i}
            title="iPhone 14"
            price={99}
            comments={1}
            hearts={1}
          />
        ))}
        <FloatingButton href="/items/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Home;
