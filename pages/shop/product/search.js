import React, { useEffect } from "react";
import Jumbotron from "@/components/card/jumbotron";
import LayoutMain from "@/components/layout/layoutMain";
import { useQuery } from "react-query";
import { search } from "@/libs/clientRequest/product";
import CardProduct from "@/components/card/cardProduct";

export default function Search({ keyword }) {
  const {
    data: products,
    refetch,
    isLoading,
  } = useQuery("search", () => search(keyword));
  useEffect(() => {
    refetch();
  }, [keyword]);
  if (isLoading) return <div>Product is Loading</div>;
  return (
    <LayoutMain>
      <Jumbotron
        title={`Result of ${keyword}`}
        subTitle={`${products?.length} products found`}
      />
      <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 px-3 ">
        {products.map((p) => (
          <CardProduct p={p} />
        ))}
      </div>
    </LayoutMain>
  );
}

export async function getServerSideProps(context) {
  const { keyword } = context.query;
  // console.log('context.query' , context.query)
  return {
    props: {
      keyword,
    },
  };
}
