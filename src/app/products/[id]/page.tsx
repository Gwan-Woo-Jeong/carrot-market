"use client";

import Layout from "@/components/layout";
import type { NextPage } from "next";
import Button from "@/components/button";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import { Product, User } from "@prisma/client";
import useMutation from "@/libs/client/useMutation";
import { cls } from "@/libs/client/utils";
import useUser from "@/libs/client/useUser";

/*
  #11.8 Bound Mutations
  Optimistic UI Update
  서버에 요청 후 응답을 기다리지 않고 즉각적으로 UI를 업데이트하는 기법
  이를 구현하기 위해 mutate 함수를 사용함

  Mutate
  (data? - 캐쉬된 데이터, shouldRevalidate? - 서버에서 받은 데이터로 갱신 여부)
  캐시된 데이터를 변형하기 위한 함수

  Bound Mutate
  동일한 컴포넌트 안에서 데이터를 변형
  useSWR Hook 사용

  Unbound Mutate
  다른 컴포넌트에서 데이터를 변형
  useSWRConfig Hook 사용
 */

interface ProductWithUser extends Product {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: ProductWithUser[];
  isLiked: boolean;
}

const ItemDetail: NextPage<{ params: { id: string } }> = ({
  params: { id },
}) => {
  const { user, isLoading } = useUser();

  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    id ? `/api/products/${id}` : null
  );

  const { mutate } = useSWRConfig();

  const [toggleFav] = useMutation(`/api/products/${id}/fav`);

  const onFavClick = () => {
    toggleFav({});
    if (!data) return;
    boundMutate({ ...data, isLiked: !data.isLiked }, false);
    mutate("/api/users/me", (prev) => ({ ...prev, ok: false }), false);
  };

  return (
    <Layout canGoBack>
      <div className="px-4  py-4">
        <div className="mb-8">
          <div className="h-96 bg-slate-300" />
          <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {data?.product?.user?.name}
              </p>
              <Link
                href={`/users/profiles/${data?.product?.user?.id}`}
                className="text-xs font-medium text-gray-500"
              >
                View profile &rarr;
              </Link>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-3xl font-bold text-gray-900">
              {data?.product?.name}
            </h1>
            <span className="text-2xl block mt-3 text-gray-900">
              ${data?.product?.price}
            </span>
            <p className=" my-6 text-gray-700">{data?.product?.description}</p>
            <div className="flex items-center justify-between space-x-2">
              <Button large text="Talk to seller" />
              <button
                onClick={() => onFavClick()}
                className={cls(
                  "p-3 rounded-md flex items-center justify-center",
                  data?.isLiked
                    ? "text-red-600 hover:bg-red-100 hover:text-red-500"
                    : "text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                )}
              >
                {data?.isLiked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clip-rule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-6 w-6 "
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
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Similar items</h2>
          <div className=" mt-6 grid grid-cols-2 gap-4">
            {data?.relatedProducts?.map((product, i) => (
              <Link
                key={product.id}
                href={`/users/profiles/${product?.user?.id}`}
              >
                <div>
                  <div className="h-56 w-full mb-4 bg-slate-300" />
                  <h3 className="text-gray-700 -mb-1">{product.name}</h3>
                  <span className="text-sm font-medium text-gray-900">
                    ${product.price}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ItemDetail;
