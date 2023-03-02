import React, { useEffect, useState } from "react";
import Image from "next/image";
import moment from "moment";
import { listByUserId, removeProductInCart } from "@/libs/clientRequest/cart";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-hot-toast";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";

export default function CardCart({ c, userId, setSelect, order }) {
  const [checked, setChecked] = useState(false);
  const [amount, setAmount] = useState(c.amount);
  const queryClient = useQueryClient();
  const removeMutation = useMutation(removeProductInCart, {
    onSuccess: (response) => {
      if (response?.error) {
        toast.error(response.error);
      } else {
        queryClient.prefetchQuery(["listByUserId", userId], () =>
          listByUserId(userId)
        );
      }
    },
  });

  const handleRemove = (cartId) => {
    removeMutation.mutate(cartId);
  };

  const handlePlus = () => {
    if (!checked || order) return;
    setAmount(amount + 1);
    setSelect(prev => {
      const arr = [...prev]
      const index = arr.findIndex((p) => p._id === c._id)
      arr[index].amount = amount + 1
      return arr
    })
    
  };

  const handleMinus = () => {
    if (!checked || order || amount ===1) return;
    // if(amount === 1){
    //   return
    // }
    setAmount(amount - 1);
    setSelect(prev => {
      const arr = [...prev]
      const index = arr.findIndex((p) => p._id === c._id)
      arr[index].amount = amount - 1
      return arr
    })
  };

  const handleCheckboxChange = (e) => {
    setChecked(!checked);
    c.amount = amount;
    e.target.checked
      ? setSelect((prev) => [...prev, c])
      : setSelect((prev) => prev.filter((p) => p._id !== c._id));
  };

  return (
    <div
      className={`border ${
        checked ? "border-2 border-blue-500" : "border-slate-200"
      } my-3 rounded-md shadow-md p-3`}
    >
      <div className="flex">
        <div className="w-1/3 flex justify-center items-center">
          <Image
            // className="blo"
            src={`/api/product/photo/${c.product._id}`}
            width={200}
            height={200}
            alt={c.product.name}
          />
        </div>
        <div className="w-2/3">
          <h5 className="text-2xl font-bold">
            <label>
              <input
                type="checkbox"
                className="mr-3 w-5 aspect-square accent-blue-500 "
                disabled={order}
                checked={checked}
                onChange={handleCheckboxChange}
              />
              {c.product.name}
            </label>
          </h5>
          <p className="line-clamp-2 text-sm">{c.product.description}</p>
          <p className="text-red-400 text-xl">
            <span>Price:</span>
            <span className="ml-3">
              {c.product.price.toLocaleString("th-TH", {
                style: "currency",
                currency: "THB",
                minimumFractionDigits: 0,
              })}
            </span>
          </p>
          <div className="flex items-center my-2">
            <span className="md:mr-5 ">amount:</span>
            <div className="flex items-center bg-gray-100 p-1 rounded-md">
              <AiOutlineMinusSquare
                size={30}
                className={
                  checked ? "cursor-pointer text-blue-500" : "text-gray-200"
                }
                onClick={handleMinus}
              />
              <span
                className={`mx-5 text-3xl bg-white px-5 rounded-md ${
                  checked ? "text-black" : "text-gray-200"
                }`}
              >
                {amount}
              </span>
              <AiOutlinePlusSquare
                size={30}
                className={
                  checked ? "cursor-pointer text-blue-500" : "text-gray-200"
                }
                onClick={handlePlus}
              />
            </div>
          </div>
          {/* <p className="text-blue-500 text-xl">
            <span>Total Price:</span>
            <span className="ml-3">
              {(c.product.price * amount).toLocaleString("th-TH", {
                style: "currency",
                currency: "THB",
                minimumFractionDigits: 0,
              })}
            </span>
          </p> */}
        </div>
      </div>
      <div className="flex">
        <div className="w-1/3 text-center">
          <small>In Cart {moment(c.createdAt).fromNow()}</small>
        </div>
        <div className="w-2/3">
          <p
            className=" text-right text-red-500 cursor-pointer"
            onClick={() => handleRemove(c._id)}
          >
            Remove
          </p>
        </div>
      </div>
    </div>
  );
}
