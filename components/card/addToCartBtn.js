import React from "react";
import { useQueryClient, useMutation } from "react-query";
import { create, listByUserId } from "@/libs/clientRequest/cart";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function AddToCartBtn({ p }) {
  const { data } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const createMutation = useMutation(create, {
    onSuccess: (response) => {
      if (response?.error) {
        toast.error(response.error);
      } else {
        queryClient.prefetchQuery(["listByUserId", data.token._id], () =>
          listByUserId(data.token._id)
        );
        toast.success("Add to Cart successful");
      }
    },
  });

  const handleClick = () => {
    // console.log("token is => ", data?.token);
    if (!data?.token) {
      router.push("/auth/login");
    } else {
      const payload = {
        productId: p._id,
        userId: data.token._id,
      };
      createMutation.mutate(payload);
    }
  };
  return (
    <button
      onClick={handleClick}
      className="w-full bg-green-400 py-1 hover:bg-green-600 hover:text-white"
    >
      Add to Cart
    </button>
  );
}
