import React from "react";
import LayoutMain from "@/components/layout/layoutMain";
import LayoutAdmin from "@/components/layout/layoutAdmin";
import { useQuery } from "react-query";
import { list } from "@/libs/clientRequest/product";
import Image from "next/image";
import moment from "moment";
import Link from "next/link";

export default function CreateCategory() {
  // hook
  const { isLoading, isError, data, error } = useQuery("listProduct", list);
  if (isLoading) return <div>Product is Loading</div>;
  if (isError) return <div>Has error {error}</div>;
  return (
    <LayoutMain>
      <LayoutAdmin headText={"Products"} page="products">
        <div className="flex flex-col xl:grid xl:grid-cols-2 gap-2">
          {data.map((p) => (
            <Link key={p._id} href={`/dashboard/admin/productUpdate/${p.slug}`}>
            <div className="border rounded-md h-72 flex">
              <div className="flex items-center">
              <Image
                // loader={() => `/api/product/photo/${p._id}?w=${200}&q=${75}?t=${new Date().getTime()}`}
                src={`/api/product/photo/${p._id}?t=${new Date().getTime()}`}
                alt={p.name}
                width={200}
                height={200}
                // priority={true}
              />
              </div>
              
              <div className="py-3 px-2 flex-1">
                <div className="bg-slate-200 p-2 my-2 text-xl">{p.name}</div>
                <div className="p-2">Category {p.category?.name}</div>
                <div className="p-2">In stock {p.quantity}</div>
                <div className="p-2">Sold {p.sold}</div>
                <div className="p-2">Create at {moment(p.createdAt).format('MMMM D, YYYY')}</div>
              </div>
            </div>
            </Link>
            
          ))}
        </div>
      </LayoutAdmin>
    </LayoutMain>
  );
}
