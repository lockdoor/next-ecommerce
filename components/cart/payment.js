import React, { useState } from "react";
// next
import { useRouter } from "next/router";
// client request
import { getToken, payment, listByUserId } from "@/libs/clientRequest/cart";
import { useQuery } from "react-query";
// import axios from "axios";
import { useQueryClient, useMutation } from "react-query";
// util
import DropIn from "braintree-web-drop-in-react";
import { toast } from "react-hot-toast";

export default function Payment({ cart, setCart, userId }) {
  // state
  const [instance, setInstance] = useState("");

  // hook
  const router = useRouter();
  const { data: token } = useQuery("getToken", getToken);
  const queryClient = useQueryClient();
  const makeOrderMutation = useMutation(payment, {
    onSuccess: (response) => {
      if (response?.error) {
        toast.error(response.error);
      } else {
        queryClient.prefetchQuery(["listByUserId", userId], () =>
          listByUserId(userId)
        );
        setCart([]);
        router.push("/dashboard/user/order");
        toast.success("create order success");
      }
    },
  });

  // function
  const handleBuy = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      const payload = {nonce, cart, userId}
      // const payload = {cart, userId}
      makeOrderMutation.mutate(payload)
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(cart);
  return (
    <>
      <div className="text-2xl text-center font-bold">Your Payment</div>
      <div>
        {token?.clientToken && (
          <>
            <DropIn
              options={{
                authorization: token.clientToken,
                paypal: { flow: "vault" },
              }}
              onInstance={(instance) => setInstance(instance)}
            />
            {instance && (
              <button
                onClick={handleBuy}
                className="block w-full btn-submit px-10"
              >
                Buy
              </button>
            )}
          </>
        )}
      </div>
    </>
  );
}
