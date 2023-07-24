import { ProductWithHeart } from "@/app/page";
import useSWR from "swr";
import Item from "./item";

// #13.4 Sales, Purchases, Favorites

interface ProductListProps {
  kind: "favs" | "sales" | "purchases";
}

interface Record {
  id: number;
  product: ProductWithHeart;
}

interface ProductListResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(
    process.env.NEXT_PUBLIC_HOST_URL + `/api/users/me/${kind}`
  );

  return data ? (
    <>
      {data[kind]?.map((record, i) => (
        <Item
          id={record.product.id}
          key={record.id}
          title={record.product.name}
          price={record.product.price}
          hearts={record.product._count.fav}
          image={record.product.image}
        />
      ))}
    </>
  ) : null;
}
