import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Badge } from "antd";
import { useQuery } from "react-query";
import { listByUserId } from "@/libs/clientRequest/cart";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Cart() {
  const router = useRouter();
  const { data: session } = useSession();
  const { data } = useQuery(["listByUserId", session?.token._id], () =>
    listByUserId(session?.token._id)
  );
  return (
    <Link href="/cart" className="flex">
      <Badge count={data?.length} offset={[8, 15]}>
        <AiOutlineShoppingCart size={30} />
      </Badge>
    </Link>
  );
}
