import LayoutMain from "@/components/layout/layoutMain";
import Jumbotron from "@/components/card/jumbotron";
import { useQuery } from "react-query";
import { list } from "@/libs/clientRequest/product"
import CardProduct from "@/components/card/cardProduct";

export default function Home() {

  // hook
  const {isLoading, isError, data, error} = useQuery('listProduct', list)

  if (isLoading) return <div>Product is Loading</div>;
  if (isError) return <div>Has error {error}</div>;

  const dataSortBySold = [...data].sort((a, b) => a.sold < b.sold ? 1 : -1)
  // console.log(data)
  return (
    <LayoutMain page={"home"}>
      <Jumbotron title={"HOME PAGE"} subTitle={"Wellcome to my shop"} />
      <div className="sm:flex">
        <div className="sm:w-1/2 pl-2 pr-2">
          <div className="text-center my-3 p-3 bg-slate-200 text-2xl">New Arrivals</div>
          <div className="lg:grid lg:grid-cols-2 gap-4">
            {data.map(p => (
              <CardProduct key={p._id} p={p}/>
            ))}
          </div>
        </div>
        <div className="sm:w-1/2 pl-2 pr-2">
          <div className="text-center my-3 p-3 bg-slate-200 text-2xl">Best Sellers</div>
          <div className="lg:grid lg:grid-cols-2 gap-4">
            {dataSortBySold.map(p => (
              <CardProduct key={p._id} p={p}/>
            ))}
          </div>
        </div>
      </div>
    </LayoutMain>
  );
}
