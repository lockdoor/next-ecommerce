import React from "react";
import Image from "next/image";
import { Badge } from "antd";
import { useRouter } from "next/router";

export default function CardProduct({ p }) {

  //hook
  const router = useRouter()
  return (
    <div className="border border-gray-200 my-3 rounded-md shadow-md hover:border-gray-400">
      <div className="h-52 text-center">
        <Badge.Ribbon
          text={p.quantity > 0 ? `In stock ${p.quantity}` : "Out of stock"}
          placement="start" 
        >
          <Badge.Ribbon text={`Sold ${p.sold}`} color="green">
            <Image
              src={`/api/product/photo/${p.slug}`}
              className="mx-auto"
              width={200}
              height={200}
              alt={p.name}
            />
          </Badge.Ribbon>
        </Badge.Ribbon>
      </div>

      <div>
        <div className="text-2xl bg-gray-200 text-center py-2 font-black truncate">
          {p.name}
        </div>
        <div className=" line-clamp-2 text-sm m-2">{p.description}</div>
        
        <div className="text-xl m-2">{p.price.toLocaleString("th-TH", {style: "currency", currency: "THB", minimumFractionDigits: 0})}</div>
         
        
        <div>
          <button onClick={()=>router.push(`/shop/product/${p.slug}`)} className="w-1/2 bg-blue-400 py-1 hover:bg-blue-600 hover:text-white rounded-bl-md">
            View Detail
          </button>
          <button className="w-1/2 bg-green-400 py-1 hover:bg-green-600 hover:text-white rounded-br-md">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
