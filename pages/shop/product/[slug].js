import React from "react";
import Product from "@/models/product";
import Image from "next/image";
import LayoutMain from "@/components/layout/layoutMain";
import Jumbotron from "@/components/card/jumbotron";
export default function ProductView(props) {
  const product = JSON.parse(props.product);

  if (!product) return <div>product not found</div>;
  return (
    <LayoutMain>
      <Jumbotron title={product.name}/>
      <div className="px-3 mt-3 ">
        <div className="md:flex border border-green-300">
          <div className="border border-red-400">
            <Image
              src={`/api/product/photo/${product.slug}`}
              className='mx-auto'
              width={400}
              height={400}
              alt={product.slug}
            />
          </div>

          <div className="flex-1 border border-blue-400">
            <div>{product.name}</div>
          </div>
        </div>
      </div>
    </LayoutMain>
  );
}

export async function getServerSideProps(context) {
  const slug = context.params.slug;
  const product = await Product.findOne({ slug }).select("-photo");
  return {
    props: { product: JSON.stringify(product) },
  };
}
