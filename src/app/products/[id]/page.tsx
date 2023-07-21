import Layout from "@/components/layout";
import type { NextPage } from "next";
import Button from "@/components/button";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import { Product, User } from "@prisma/client";
import useMutation from "@/libs/client/useMutation";
import { cls } from "@/libs/client/utils";
import Image from "next/image";
import LikeButton from "@/components/likeButton";
import { ProductResponse } from "@/app/page";

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

/*
  #20.4 Blocking SSG

  getStaticPaths fallback

  blocking
  - getStaticPaths에서 빌드되지 않은 새 경로는 SSR처럼 HTML이 생성될 때까지 기다리게함(block). 생성된 파일은 이후 요청을 위해 캐시됨
  - 즉, 첫번재로 방문한 유저는 HTML이 만들어질 때 까지 기다리고 이후는 처음에 저장한 HTML 파일을 바로 받음
  - 기본적으로 생성된 페이지를 업데이트 X. 생성된 페이지를 업데이트하려면 fallback: blocking과 함께 ISR을 사용


  #20.5 fallback
  false
  - getStaticPaths에서 반환하지 않은 모든 경로는 404 페이지를 리턴

  true
  - blocking과 같이, 빌드시 경로에 대한 HTML 파일을 생성하지 않지만 block하지 않고 생성 시간동안 다른 페이지를 볼 수 있게 해줌.
  - router.isFallback의 조건에 따라 로딩 표시 가능

  Next 13
  https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamicparams
  
  페이지에서 export하는 변수의 값에 따라, 캐싱 옵션을 변경할 수 있다.
  
  dynamic
  - auto (default): 컴포넌트가 가능하나 동적인 동작을 하지 못하도록 막으며 가능한 캐싱을 많이 하게 한다.
  - force-dynamic: 모든 캐싱을 비활성화 하고, 동적 렌더링 및 fetch를 수행한다. 이 옵션은 구 getServerSideProps와 동일하다.
  - error: 동적으로 가져오는 경우 에러를 발생시킨다. 다시 말하면 모든 페이지를 정적으로 렌더링하는 것을 강제한다. 이 옵션은 getStaticProps와 같으며 이 블로그가 이 옵션을 사용하였다.

  force-static: 정적인 렌더링이 강제되고, 레이아웃이나 페이지에서 데이터 요청이 있을 경우 쿠키, 헤더, searchParams의 값이 모두 빈값으로 나온다.

  dynamicParmas: generateStaticParams로 생성되지 않은 파일을 방문했을 때 어떻게 동작할지 결정한다. (= 12 버전의 fallback)
  - true (default): 해당 페이지 요청이 오면 파일을 생성한다.
  - false: 404를 반환한다. 위에서 만약 force-static나 error를 사용한다면 이 값이 자동으로 false가 된다.

  revalidate: 레이아웃과 페이지의 유효기간을 어떻게 가져갈지 정한다.
  - false: Infinity를 준것 과 동일하며, 무기한 캐싱된다. 단, 개별적으로 내부 페이지에서 fetch의 캐싱 동작을 오버라이드 하지는 않는다.
  - 0: 동적 렌더링이 없어도 항상 페이지가 동적으로 렌더링 된다.
  - number: 특정 유효시간 (초) 를 정할 수 있다.
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

export async function generateStaticParams() {
  const res: ProductResponse = await (
    await fetch(process.env.NEXT_PUBLIC_HOST_URL + "/api/products")
  ).json();

  return res.products.map((product) => {
    return { params: { id: product.id } };
  });
}

const ItemDetail = async ({ params: { id } }: { params: { id: string } }) => {
  // const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
  //   id ? process.env.NEXT_PUBLIC_HOST_URL + `/api/products/${id}` : null
  // );

  // const { mutate } = useSWRConfig();

  const data: ItemDetailResponse = await (
    await fetch(process.env.NEXT_PUBLIC_HOST_URL + `/api/products/${id}`)
  ).json();

  // const [toggleFav] = useMutation(
  //   process.env.NEXT_PUBLIC_HOST_URL + `/api/products/${id}/fav`
  // );

  // const onFavClick = () => {
  // toggleFav({});
  // if (!data) return;
  // boundMutate({ ...data, isLiked: !data.isLiked }, false);
  // mutate(
  //   process.env.NEXT_PUBLIC_HOST_URL + "/api/users/me",
  //   (prev) => ({ ...prev, ok: false }),
  //   false
  // );
  // return data.ok;
  // };

  return (
    <Layout canGoBack>
      <div className="px-4  py-4">
        <div className="mb-8">
          {data?.product.image ? (
            <Image
              alt={data?.product.name ? data.product.name : "image"}
              width={400}
              height={96}
              src={data.product.image}
              className="h-96 object-contain mx-auto"
            />
          ) : (
            <div className="w-400 h-96 bg-gray-500" />
          )}
          <div className="flex cursor-pointer py-3 border-t border-b items-center space-x-3">
            {data?.product.user.avatar ? (
              <div className="relative w-12 h-12 rounded-full object-cover">
                <Image
                  fill
                  alt={
                    data?.product.user.name ? data.product.user.name : "image"
                  }
                  src={data.product.user.avatar}
                />
              </div>
            ) : (
              <div className="w-12 h-12 bg-slate-300 rounded-full" />
            )}
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
              <LikeButton id={id} isLiked={data?.isLiked} />
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
