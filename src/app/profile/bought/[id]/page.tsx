"use client";

import type { NextPage } from "next";
import Layout from "@/components/layout";
import ProductList from "@/components/product-list";

// #13.4 Sales, Purchases, Favorites

const Bought: NextPage<{ params: { id: string } }> = ({ params: { id } }) => {
  return (
    <Layout title="구매내역" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        <ProductList kind="purchases" userId={id} />
      </div>
    </Layout>
  );
};

export default Bought;
