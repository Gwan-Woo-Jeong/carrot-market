import Layout from "@/components/layout";
import type { NextPage } from "next";
import Link from "next/link";
import FloatingButton from "../../components/floating-button";
// import useSWR from "swr";
import { Post, User } from "@prisma/client";
// import useCoords from "@/libs/client/useCoords";
import { use } from "react";
import { getTimeDifference } from "@/libs/client/utils";

interface PostResponse {
  ok: boolean;
  posts: PostWithUser[];
}

interface PostWithUser extends Post {
  user: User;
  _count: {
    wonderings: number;
    answers: number;
  };
}

// #20.1 ~ 20.2 ISR
/*
  사이트를 build한 후 다시 static 페이지를 만들거나 업데이트
  전체 사이트가 아닌 각 페이지별로 정적으로 페이지 (static-generation)를 생성 
  수백만 페이지로 확장하면서 static의 이점을 유지 가능

  getStaticProps에 revalidate prop을 추가 (= ISR)
  
  revalidate : 백그라운드(서버)에서 페이지를 재생성(rebuild)하고 캐싱하고 있는 시간 (최소 10초)

  이 시간이 지난 후, 요청이 올 경우 해당 요청은 여전히 캐시된 페이지를 응답
  그 다음 페이지를 재생성하고 또 다음 revalidate 시간동안 캐싱

  ISR을 사용하지 못하는 경우
  - 유저마다 다른 정보나 UI를 보여주는 페이지인 경우
 */

const fetchPosts = async () => {
  const res = await fetch(
    process.env.NEXT_PUBLIC_HOST_URL + "/api/posts"
    // {
    //   next: {
    //     revalidate: 10, // 10초마다 static 페이지 최신화 (getStaticProps) = ISR (Incremental Static Regeneration)
    //   },
    // }
  );

  return res.json();
};

const postsPromise = fetchPosts();

// #12.7 Geo Search

const Community: NextPage = () => {
  // const { latitude, longitude } = useCoords();
  // const { data } = useSWR<PostResponse>(
  //   latitude && longitude
  //     ?  process.env.NEXT_PUBLIC_HOST_URL + `/api/posts?latitude=${latitude}&longitude=${longitude}`
  //     : null
  // );

  const data: PostResponse = use(postsPromise);

  return (
    <Layout hasTabBar title="동네생활">
      <div className="space-y-4 divide-y-[2px]">
        {data?.posts?.map((post, i) => (
          <Link
            key={post.id}
            href={`/community/${post.id}`}
            className="flex cursor-pointer flex-col pt-4 items-start"
          >
            <span className="flex ml-4 items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              동네질문
            </span>
            <div className="mt-2 px-4 text-gray-700">
              <span className="text-orange-500 font-medium">Q. </span>
              {post.question}
            </div>
            <div className="mt-5 px-4 flex items-center justify-between w-full text-gray-500 font-medium text-xs">
              <span>{post.user.name}</span>
              <span>{getTimeDifference(post.createdAt)}</span>
            </div>
            <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t w-full">
              <span className="flex space-x-2 items-center text-sm">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <span>궁금해요 {post._count.wonderings}</span>
              </span>
              <span className="flex space-x-2 items-center text-sm">
                <svg
                  className="w-4 h-4"
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
                <span>답변 {post._count.answers}</span>
              </span>
            </div>
          </Link>
        ))}
        <FloatingButton href="/community/write">
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
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
};

export default Community;
