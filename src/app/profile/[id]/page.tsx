"use client";

import type { NextPage } from "next";
import Link from "next/link";
import Layout from "@/components/layout";
import useUser from "@/libs/client/useUser";
import useSWR, { SWRConfig } from "swr";
import { Review, User } from "@prisma/client";
import { cls } from "@/libs/client/utils";
import Image from "next/image";
import { Suspense } from "react";

// #21.0 Suspense

/*
  - 컴포넌트가 렌더링되기 전까지 기다릴 수 있음
  - React 16.6 버전에서는 코드를 불러오는 동안 “기다릴 수 있고”, 기다리는 동안 로딩 상태를 지정할 수 있도록 < Suspense > 컴포넌트가 추가
  - Suspense는 단순히 데이터 로딩뿐만 아니라 이미지, 스크립트, 비동기 작업을 기다리는 데에도 사용될 수 있음
 */

interface ReviewWithUser extends Review {
  createdBy: User;
}

interface ReviewsResponse {
  ok: boolean;
  reviews: ReviewWithUser[];
}

const UserProfile = ({ userId }: { userId: string }) => {
  const { data } = useSWR(`/api/users/profile/${userId}`);

  return (
    <>
      {data.profile?.avatar ? (
        <div className="relative w-16 h-16 obeject-cover rounded-full overflow-hidden">
          <Image fill alt={data.profile?.avatar} src={data.profile?.avatar} />
        </div>
      ) : (
        <div className="w-16 h-16 bg-slate-500 rounded-full" />
      )}
      <div className="flex flex-col">
        <span className="font-medium text-gray-900">{data.profile?.name}</span>
        <span className="text-sm text-gray-700">
          Member since :{" "}
          {data.profile?.createdAt
            ? data.profile.createdAt.split("T")[0]
            : null}
        </span>
      </div>
    </>
  );
};

const UserReview = ({ createdForId }: { createdForId: string }) => {
  const { data } = useSWR<ReviewsResponse>(
    typeof window === "undefined" ? `/api/reviews/${createdForId}` : null
  );

  return (
    <>
      {data?.reviews?.map((review) => (
        <div key={review.id} className="mt-12">
          <div className="flex space-x-4 items-center">
            {
              <div className="relative w-12 h-12 obeject-cover rounded-full overflow-hidden bg-slate-500">
                {review.createdBy.avatar ? (
                  <Image
                    fill
                    alt={review.createdBy.name}
                    src={review.createdBy.avatar}
                  />
                ) : null}
              </div>
            }
            <div>
              <h4 className="text-sm font-bold text-gray-800">
                {review.createdBy.name}
              </h4>
              <div className="flex items-center">
                {Array(5)
                  .fill(0)
                  .map((_, star) => (
                    <svg
                      key={star}
                      className={cls(
                        "h-5 w-5",
                        review.score > star
                          ? "text-yellow-400"
                          : "text-gray-400"
                      )}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
              </div>
            </div>
          </div>
          <div className="mt-4 text-gray-600 text-sm">
            <p>{review.review}</p>
          </div>
        </div>
      ))}
    </>
  );
};

const Loading = () => {
  return <h2>Loading...</h2>;
};

const Profile = ({ userId }: { userId: string }) => {
  return (
    <Layout canGoBack hasTabBar title="프로필">
      <div className="px-4">
        <div className="flex items-center mt-4 space-x-3">
          <Suspense fallback={"UserProfile Loading..."}>
            <UserProfile userId={userId} />
          </Suspense>
        </div>
        <div className="mt-10 flex justify-around">
          <Link
            href={`/profile/sold/${userId}`}
            className="flex flex-col items-center"
          >
            <div className="w-14 h-14 text-white bg-orange-400 rounded-full flex items-center justify-center">
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                ></path>
              </svg>
            </div>
            <span className="text-sm mt-2 font-medium text-gray-700">
              판매내역
            </span>
          </Link>
          <Link
            href={`/profile/bought/${userId}`}
            className="flex flex-col items-center"
          >
            <div className="w-14 h-14 text-white bg-orange-400 rounded-full flex items-center justify-center">
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
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
            </div>
            <span className="text-sm mt-2 font-medium text-gray-700">
              구매내역
            </span>
          </Link>
          <Link
            href={`/profile/loved/${userId}`}
            className="flex flex-col items-center"
          >
            <div className="w-14 h-14 text-white bg-orange-400 rounded-full flex items-center justify-center">
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
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <span className="text-sm mt-2 font-medium text-gray-700">
              관심목록
            </span>
          </Link>
        </div>
        <Suspense fallback={<Loading />}>
          <UserReview createdForId={userId} />
        </Suspense>
      </div>
    </Layout>
  );
};

const Page: NextPage<{ params: { id: string } }> = ({ params: { id } }) => {
  return (
    <SWRConfig value={{ suspense: true }}>
      <Profile userId={id} />
    </SWRConfig>
  );
};

export default Page;
