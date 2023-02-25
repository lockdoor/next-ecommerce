import React from "react";
import Product from "@/models/product";
// import Category from "@/models/category";
import connectDB from "@/database/connectDB";
import Image from "next/image";
import LayoutMain from "@/components/layout/layoutMain";
import Jumbotron from "@/components/card/jumbotron";
import { Badge } from "antd";
import CardProduct from "@/components/card/cardProduct";
import moment from "moment";
import AddToCartBtn from "@/components/card/addToCartBtn";
import {
  FaDollarSign,
  FaProjectDiagram,
  FaRegClock,
  FaTimes,
  FaCheck,
  FaTruckMoving,
  FaWarehouse,
  FaRocket,
} from "react-icons/fa";

export default function ProductView(props) {
  const product = JSON.parse(props.product);
  const relate = JSON.parse(props.relate);

  if (!product) return <div>product not found</div>;
  // console.log(relate);
  return (
    <LayoutMain>
      <Jumbotron title={product.name} />

      <main className="my-3 mx-4 md:flex gap-4">
        <div className="md:w-3/4 border border-gray-200 rounded-md shadow-md hover:border-gray-400">
          <div className="text-center">
            <Badge.Ribbon
              text={
                product.quantity > 0
                  ? `In stock ${product.quantity}`
                  : "Out of stock"
              }
              placement="start"
            >
              <Badge.Ribbon text={`Sold ${product.sold}`} color="green">
                <Image
                  src={`/api/product/photo/${product._id}`}
                  className="mx-auto"
                  width={400}
                  height={400}
                  alt={product.name}
                />
              </Badge.Ribbon>
            </Badge.Ribbon>
          </div>

          <div>
            <div className="text-2xl bg-gray-200 text-center py-2 font-black truncate">
              {product.name}
            </div>
            <div className="text-4xl font-black text-red-600 m-2">
              {product.price.toLocaleString("th-TH", {
                style: "currency",
                currency: "THB",
                minimumFractionDigits: 0,
              })}
            </div>

            <div className="text-xl font-bold mx-5">
              <Detail
                icon={<FaDollarSign />}
                text={"Price:"}
                value={product.price.toLocaleString("th-TH", {
                  style: "currency",
                  currency: "THB",
                  minimumFractionDigits: 0,
                })}
              />
              <Detail
                icon={<FaProjectDiagram />}
                text={"Category:"}
                value={product.category.name}
              />

              <Detail
                icon={<FaRegClock />}
                text={"Added:"}
                value={moment(product.createdAt).fromNow()}
              />

              <Detail
                icon={product.quantity > 0 ? <FaCheck /> : <FaTimes />}
                text={product.quantity > 0 ? "In Stock" : "Out of Stock"}
              />

              <Detail
                icon={<FaWarehouse />}
                text={"Available:"}
                value={product.quantity}
              />
              <Detail icon={<FaRocket />} text={"Sold:"} value={product.sold} />
            </div>

            <div className="m-2">{product.description}</div>

            <div className="rounded-b-md overflow-hidden">
              <AddToCartBtn p={product}/>
            </div>
          </div>
        </div>
        <div className="md:w-1/4">
          <div className="text-xl text-center border-b-2 py-5 font-bold">
            Related Products
          </div>
          <div>
            {relate.length > 0 ? (
              relate.map((p) => <CardProduct p={p} key={p._id} />)
            ) : (
              <div>Related Products not Found</div>
            )}
          </div>
        </div>
      </main>
    </LayoutMain>
  );
}

const Detail = ({ icon, text, value }) => {
  return (
    <div className="flex items-center my-3 gap-3">
      {icon}
      <span>{text}</span>
      <span>{value}</span>
    </div>
  );
};

export async function getServerSideProps(context) {
  const slug = context.params.slug;
  try {
    await connectDB();
    const product = await Product.findOne({ slug })
      .populate({ path: "category" })
      .select("-photo");
    const relate = await Product.find({
      category: product.category,
      slug: { $ne: slug },
    })
      .select("-photo")
      .populate("category")
      .limit(4);
    return {
      props: {
        product: JSON.stringify(product),
        relate: JSON.stringify(relate),
      },
    };
  } catch (err) {
    console.log(err);
  }
}
