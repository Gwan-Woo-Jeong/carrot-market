"use client";

import type { NextPage } from "next";
import Item from "@/components/item";
import Layout from "@/components/layout";
import ProductList from "@/components/product-list";

// #13.4 Sales, Purchases, Favorites

const Loved: NextPage<{ params: { id: string } }> = ({ params: { id } }) => {
  return (
    <Layout title="관심목록" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        <ProductList kind="favs" userId={id} />
      </div>
    </Layout>
  );
};

export default Loved;