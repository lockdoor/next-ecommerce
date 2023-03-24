import React from "react";
import LayoutMain from "@/components/layout/layoutMain";
import Jumbotron from "@/components/card/jumbotron";
import { list } from "@/libs/clientRequest/category";
import { useQuery } from "react-query";
import Link from "next/link";

export default function CategoryAll() {
  const { isLoading, isError, data, error } = useQuery("list", list);
  if (isLoading) return <div>Category is Loading</div>;
  if (isError)
    return (
      <div>
        Category is error on Loading <pre>{error}</pre>
      </div>
    );
  return (
    <LayoutMain page="category" loading={isLoading}>
      <Jumbotron title="Category" subTitle="Please choose Category" />
      <div className="px-3 mt-3 sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {data?.map((c) => (
          <Link key={c._id} href={`/category/${c.slug}`}>
            <div  className="bg-cyan-300 my-3 sm:my-0 rounded-md p-3 cursor-pointer hover:bg-cyan-500 hover:text-white hover:font-bold shadow-md">{c.name}</div>
          </Link>
          
        ))}
      </div>
    </LayoutMain>
  );
}

