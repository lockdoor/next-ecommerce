import React, { useState } from "react";
import LayoutMain from "@/components/layout/layoutMain";
import Jumbotron from "@/components/card/jumbotron";
import { useQuery } from "react-query";
import { listpage, total } from "@/libs/clientRequest/product";
import CardProduct from "@/components/card/cardProduct";
import { toast } from "react-hot-toast";

export default function Home() {
  // state
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [productsSortBySold, setProductsSortBySold] = useState([]);

  // hook
  const { isLoading, isError, error } = useQuery(
    ["listpage", page, "createdAt"],
    () => listpage(page, 6, "createdAt"),
    {
      onSuccess: (response) => {
        if (response?.error) {
          toast.error(response.error);
          return;
        } else {
          setProducts([...new Set([...products, ...response])]);
        }
      },
    }
  );
  const {} = useQuery(
    ["listpage", page, "sold"],
    () => listpage(page, 6, "sold"),
    {
      onSuccess: (response) => {
        if (response?.error) {
          toast.error(response.error);
          return;
        } else {
          setProductsSortBySold([...new Set([...productsSortBySold, ...response])]);
        }
      },
    }
  );
  const { data: totalData } = useQuery("total", total);
  if (isError) return <div>Has error {error}</div>;


  return (
    <LayoutMain page={"home"}>
      <Jumbotron title={"HOME PAGE"} subTitle={"Wellcome to my shop"} />
      <div className="sm:flex">
        <div className="sm:w-1/2 pl-2 pr-2">
          <div className="text-center my-3 p-3 bg-slate-200 text-2xl">
            New Arrivals
          </div>
          <div className="lg:grid lg:grid-cols-2 gap-4">
            {products.map((p) => (
              <CardProduct key={p._id} p={p} />
            ))}
          </div>
        </div>
        <div className="sm:w-1/2 pl-2 pr-2">
          <div className="text-center my-3 p-3 bg-slate-200 text-2xl">
            Best Sellers
          </div>
          <div className="lg:grid lg:grid-cols-2 gap-4">
            {productsSortBySold.map((p) => (
              <CardProduct key={p._id} p={p} />
            ))}
          </div>
        </div>
      </div>
      <div className="text-center mt-3 mb-10">
        <button onClick={()=>setPage(page + 1)}
        disabled={products.length >= totalData || isLoading}
        className="border border-orange-400 text-orange-400 py-2 px-10 rounded-md hover:bg-orange-400 hover:text-white">
          {
            products.length >= totalData ? 'End of Product' :
            isLoading ? 'Product is Loading' : 'Load More ...'
          }
          
        </button>
      </div>
    </LayoutMain>
  );
}
