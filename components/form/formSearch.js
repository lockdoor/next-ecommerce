import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { searchCount } from "@/libs/clientRequest/product";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";

export default function FormSearch() {
  // hook
  const router = useRouter();

  // state
  const [search, setSearch] = useState("");

  // function
  const handleChange = async (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      const response = await searchCount(search);
      if (!response) {
        toast.error("Product not found");
      } else {
        router.replace(`/shop/product/search?keyword=${search}`);
      }
    }
  };

  return (
    <div className="flex px-2 border items-center border-slate-300 rounded-md">
      <SearchOutlined />
      <input
        type={"search"}
        placeholder="search"
        className="pl-2 text-md outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={handleChange}
      />
    </div>
  );
}
