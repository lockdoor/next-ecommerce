import React, { useState } from "react";
import LayoutMain from "@/components/layout/layoutMain";
import Jumbotron from "@/components/card/jumbotron";
import CardProduct from "@/components/card/cardProduct";
import { list as categoriesList } from "@/libs/clientRequest/category";
import { listFilter as productsList } from "@/libs/clientRequest/product";
import { Checkbox, Radio, Space } from "antd";
import { useQuery } from "react-query";

export default function Shop() {
  // state
  const [filterCategory, setFilterCategory] = useState([]);
  const [filterPrice, setFilterPrice] = useState(prices[0].value);

  //hook
  const { data: categories } = useQuery("categoriesList", categoriesList);
  const { data: products } = useQuery(
    ["productsList", filterCategory, filterPrice.min, filterPrice.max],
    () => productsList(filterCategory, filterPrice.min, filterPrice.max)
  );

  //function
  const onCheckFilterCategory = (e, value) => {
    e.target.checked
      ? setFilterCategory([...filterCategory, value])
      : setFilterCategory([...filterCategory].filter((f) => f !== value));
  };

  const handleRadio = (e) => {
    setFilterPrice(e.target.value);
  };

  return (
    <LayoutMain page={"shop"}>
      <Jumbotron />
      <div className="">
        <div className="md:flex">
          {/* filter */}
          <div className="md:w-1/4">
            <div>
              <h2 className="text-xl text-center bg-slate-200 my-3 py-3">
                Fillter by Categories
              </h2>
              <div className="ml-4">
                <Space direction="vertical">
                  {categories?.map((c) => (
                    <Checkbox
                      key={c._id}
                      onChange={(e) => onCheckFilterCategory(e, c.slug)}
                    >
                      {c.name}
                    </Checkbox>
                  ))}
                </Space>
              </div>
            </div>

            <div>
              <h2 className="text-xl text-center bg-slate-200 my-3 py-3">
                Fillter by Price
              </h2>
              <div className="ml-2">
                <Radio.Group
                  onChange={handleRadio}
                  defaultValue={prices[0].value}
                  style={{ marginLeft: 8 }}
                >
                  <Space direction="vertical">
                    {prices.map((p, i) => (
                      <Radio value={p.value} key={i}>
                        {p.value.min === Number.NEGATIVE_INFINITY
                          ? "Any"
                          : `${p.value.min.toLocaleString("th-TH", {
                              style: "currency",
                              currency: "THB",
                              minimumFractionDigits: 0,
                            })} to ${p.value.max.toLocaleString("th-TH", {
                              style: "currency",
                              currency: "THB",
                              minimumFractionDigits: 0,
                            })}`}
                      </Radio>
                    ))}
                  </Space>
                </Radio.Group>
              </div>
            </div>

            <div className="text-center my-5">
              <button
                className="bg-blue-400 py-2 px-10 rounded-md text-white"
                onClick={() => window.location.reload()}
              >
                Reset
              </button>
            </div>
          </div>

          {/* products content */}
          <div className="md:w-3/4 mx-2">
            <h2 className="text-xl text-center bg-slate-200 my-3 py-3">
              {products?.length}
              Products
            </h2>
            <div
              className="sm:grid sm:grid-cols-2 md:grid-cols-3 gap-2"
              style={{ height: "90vh", overflow: "scroll" }}
            >
              {products?.map((p) => (
                <div key={p._id} className="mx-2">
<CardProduct p={p}  />
                </div>
                
              ))}
            </div>
          </div>
        </div>
      </div>
    </LayoutMain>
  );
}

const prices = [
  {
    value: { min: Number.NEGATIVE_INFINITY, max: Number.POSITIVE_INFINITY },
  },
  {
    value: { min: 0, max: 999 },
  },
  {
    value: { min: 1000, max: 4999 },
  },
  {
    value: { min: 5000, max: 9999 },
  },
  {
    value: { min: 10000, max: 19999 },
  },
  {
    value: { min: 20000, max: 39999 },
  },
  {
    value: { min: 40000, max: 100000 },
  },
];
