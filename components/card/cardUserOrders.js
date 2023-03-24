import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function CardUserOrders({ p }) {
  return (
    <div key={p._id} className="flex border-b py-2">
      <div className="w-1/3">
        <Image
          src={`/api/product/photo/${p.product._id}`}
          alt={p.product.slug}
          width={100}
          height={100}
        />
      </div>
      <div className="w-2/3">
        <div>{p.product.name}</div>
        <div>
          Price:{" "}
          {p.product.price.toLocaleString("th-TH", {
            style: "currency",
            currency: "THB",
            minimumFractionDigits: 0,
          })}
        </div>
        <div>Amount: {p.amount}</div>

        <Link
          href={`/shop/product/${p.product.slug}`}
          className="text-blue-400"
        >
          View product
        </Link>
      </div>
    </div>
  );
}
