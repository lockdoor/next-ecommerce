import React, { useState } from "react";
// next
import { getToken } from "next-auth/jwt";
import Link from "next/link";
// component
import Jumbotron from "@/components/card/jumbotron";
import LayoutMain from "@/components/layout/layoutMain";
import CardCart from "@/components/card/cardCart";
import FormAddAddress from "@/components/form/formAddAddress";
import CardAddressCart from "@/components/card/cardAddressCart";
import Payment from "@/components/cart/payment";
// client request
import { list as listAddress } from "@/libs/clientRequest/address";
import { listByUserId } from "@/libs/clientRequest/cart";
import { useQuery } from "react-query";
// util
import { toast } from "react-hot-toast";
import { Modal } from "antd";

export default function CartOfUser({ userId, name }) {
  //state
  const [select, setSelect] = useState([]);
  const [order, setOrder] = useState(false);
  const [isModalAddAddressOpen, setIsModalAddAddressOpen] = useState(false);
  const [isModalChangeAddressOpen, setIsModalChangeAddressOpen] =
    useState(false);
  const [address, setAddress] = useState({});
  const [loading, setLoading] = useState(false)

  //hook
  const { data: products } = useQuery(["listByUserId", userId], () =>
    listByUserId(userId)
  );
  const { data: addresses } = useQuery(
    ["list", userId],
    () => listAddress(userId),
    {
      onSuccess: (response) => {
        if (response?.error) {
          toast.error(response.error);
        } else {
          const main = response.addresses.filter((a) => a.isMain)[0];
          // console.log(main)
          setAddress(main);
        }
      },
    }
  );

  // function
  const totalPrice = () => {
    return select.reduce((a, b) => a + b.product.price * b.amount, 0);
  };

  return (
    <LayoutMain loading={loading}>
      <Jumbotron
        title={`Cart of ${name}`}
        subTitle={`${products?.length} Products in Cart`}
      />

      {products?.length ? (
        <div className="md:flex">
          {/* product */}
          <div className="md:inline-block md:w-2/3 lg:w-7/12 px-2">
            {products.map((c) => (
              <CardCart
                key={c._id}
                c={c}
                userId={userId}
                setSelect={setSelect}
                order={order}
              />
            ))}
          </div>

          {/* Total / Address / Payment */}
          <div className="sticky bottom-0 bg-slate-50 shadow-inner py-2 md:bg-white md:inline-block md:w-1/3 lg:w-5/12 px-2">
            <div className="text-center">Total / Address / Payment</div>
            <hr className="border border-slate-200 my-5" />
            {/* Total */}
            <div className="text-2xl text-center font-bold">
              Your cart summary
            </div>

            <div className="flex justify-center items-center gap-3">
              <span className="text-xl">
                <span className="text-blue-500">
                  Total {select.length} Products:{" "}
                </span>
                <span className="text-red-500">
                  {totalPrice().toLocaleString("th-TH", {
                    style: "currency",
                    currency: "THB",
                    minimumFractionDigits: 0,
                  })}
                </span>
              </span>
              {order ? (
                <button
                  onClick={() => setOrder(false)}
                  className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                >
                  Back to select
                </button>
              ) : (
                <button
                  onClick={() => setOrder(true)}
                  className="px-3 py-2 bg-red-500 text-white disabled:bg-white disabled:text-red-300 disabled:border disabled:border-red-300 rounded-md hover:bg-red-700"
                  disabled={select?.length === 0 ? true : false}
                >
                  {select?.length === 0 ? "Please select order" : "Order Now"}
                </button>
              )}
            </div>
            <hr className="border border-slate-200 my-5" />

            {/* show address and payment if user make order */}
            {order && (
              <div className="">
                <div className="text-2xl text-center font-bold">
                  Your Address
                </div>
                {address ? (
                  <>
                    <div className="mx-5 my-3 py-2 px-4 shadow-md flex gap-3 flex-wrap border border-green-400 rounded-md">
                      <CardAddressCart address={address} />
                    </div>
                    <div className="text-red-500 text-right mr-5">
                      <button onClick={() => setIsModalChangeAddressOpen(true)}>
                        Change Address
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => setIsModalAddAddressOpen(true)}
                    className="block mx-auto px-4 py-2 rounded-md text-white bg-red-400"
                  >
                    Click here to add address
                  </button>
                )}
                <hr className="border border-slate-200 my-5" />

                {/* Payment */}
              {address && <Payment loading={loading} setLoading={setLoading} cart={select} setCart={setSelect} userId={userId} addressId={address._id} />}
              </div>
            )}
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
      <Modal
        open={isModalAddAddressOpen}
        onCancel={() => setIsModalAddAddressOpen(false)}
        footer={null}
      >
        <FormAddAddress userId={userId} setShow={setIsModalAddAddressOpen} />
      </Modal>
      <Modal
        open={isModalChangeAddressOpen}
        onCancel={() => setIsModalChangeAddressOpen(false)}
        footer={null}
      >
        <>
          {addresses?.addresses.map((a) => (
            <div
              key={a._id}
              className="flex gap-3 border border-green-300 rounded-md my-3 px-4 py-2"
            >
              <input
                type="radio"
                name="address"
                className=" cursor-pointer"
                value={a}
                checked={a._id === address._id}
                id={a._id}
                onChange={() => {
                  setAddress(a);
                  setIsModalChangeAddressOpen(false);
                }}
              />
              <label
                htmlFor={a._id}
                className="flex gap-2 flex-wrap cursor-pointer"
              >
                <CardAddressCart address={a} />
              </label>
            </div>
          ))}
          <div className="text-red-400 text-right">
            <button
              onClick={() => {
                setIsModalAddAddressOpen(true);
              }}
            >
              add new address
            </button>
          </div>
        </>
      </Modal>
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
        destination: "/auth/login?callbackUrl=/cart",
      },
    };
  } else {
    return {
      props: {
        userId: token?._id,
        name: token?.name,
      },
    };
  }
}
