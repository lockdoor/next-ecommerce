import React, { useState } from "react";
import { getToken } from "next-auth/jwt";
import Jumbotron from "@/components/card/jumbotron";
import LayoutMain from "@/components/layout/layoutMain";
import { listByUserId } from "@/libs/clientRequest/cart";
import { useQuery } from "react-query";
import CardCart from "@/components/card/cardCart";
import Link from "next/link";

export default function CartOfUser({ userId, name }) {
  const [select, setSelect] = useState([]);

  const { data } = useQuery(["listByUserId", userId], () =>
    listByUserId(userId)
  );

  const totalPrice = () => {
    const total = select.reduce((a, b) => a + b.product.price * b.amount, 0);
    return total.toLocaleString("th-TH", {
      style: "currency",
      currency: "THB",
      minimumFractionDigits: 0,
    });
  };

  return (
    <LayoutMain>
      <Jumbotron
        title={`Cart of ${name}`}
        subTitle={`${data?.length} Products in Cart`}
      />

      {data?.length ? (
        <div className="md:flex">
          <div className="md:inline-block md:w-2/3 lg:w-7/12 px-2">
            {data.map((c) => (
              <CardCart
                key={c._id}
                c={c}
                userId={userId}
                setSelect={setSelect}
              />
            ))}
          </div>

          <div className="sticky bottom-0 bg-slate-50 shadow-inner py-2 md:bg-white md:inline-block md:w-1/3 lg:w-5/12 px-2">
            <div className="text-2xl text-center font-bold">
              Your cart summary
            </div>
            <div className="text-center">Total / Address / Payment</div>
            <hr className="border border-slate-200 my-3" />
            <div className="flex justify-center items-center gap-3">
              <span className="text-xl">
                <span className="text-blue-500">Total {select.length} Products:{" "}</span>
                <span className="text-red-500">{totalPrice()}</span>
              </span>
              <button className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-700">
                Order Now
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-2xl mt-10 text-blue-400 hover:text-blue-600">
          <Link href={"/shop"}>
            Cart is empty, Back to Shopping click here!
          </Link>
        </div>
      )}
      <div className="h-52 text-center">footer</div>
    </LayoutMain>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const token = await getToken({ req });
  // console.log(token);
  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: "/auth/login",
      },
    };
  } else {
    return {
      props: {
        userId: token._id,
        name: token.name,
      },
    };
  }
}
