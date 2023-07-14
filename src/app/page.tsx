import Layout from "@/components/layout";
import type { NextPage } from "next";
import FloatingButton from "@/components/floating-button";
import Item from "@/components/item";
import useSWR from "swr";
import { Product } from "@prisma/client";
import { use } from "react";

export interface ProductResponse {
  ok: boolean;
  products: ProductWithHeart[];
}

export interface ProductWithHeart extends Product {
  _count: { fav: number };
}

const fetchProducts = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_HOST_URL + "/api/products", {
    cache: "no-store", // SSR (getServerSideProps)
  });
  return res.json();
};

const productsPromise = fetchProducts();

// #19.6 getServerSideProps

/*
  - 페이지에서 getServerSideProps(서버 측 렌더링)라는 함수를 export
  - Next.js는 getServerSideProps에서 반환된 데이터를 사용하여 각 요청에서 이 페이지를 미리 렌더링

  export async function getServerSideProps(context) {
    return {
      props: {}, // will be passed to the page component as props
    }
  }
 */

const Home: NextPage = () => {
  // const { data } = useSWR<ProductResponse>(process.env.NEXT_PUBLIC_HOST_URL + "/api/products");

  const data: ProductResponse = use(productsPromise);

  return (
    <Layout title="홈" hasTabBar>
      <div className="flex flex-col space-y-5 divide-y">
        {data?.products?.map((product, i) => (
          <Item
            id={product.id}
            key={product.id}
            title={product.name}
            price={product.price}
            image={product.image}
            comments={1}
            hearts={product._count.fav}
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
