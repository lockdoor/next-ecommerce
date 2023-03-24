import React, { useState, useRef } from "react";
import useOutsideAlerter from "@/libs/detectOutside";
import { useQuery } from "react-query";
import { list } from "@/libs/clientRequest/category";
import Link from "next/link";
import {AiOutlineDown} from "react-icons/ai"

export default function CategoriesMenuDropdown() {
  const refMenuDropdown = useRef(null);

  const [toggleDropdown, setToggleDropdown] = useState(false);

  useOutsideAlerter(refMenuDropdown, setToggleDropdown);

  const { data: categories } = useQuery("categories", list);
  return (
    <>
      <div
        onClick={() => setToggleDropdown(!toggleDropdown)}
        className="cursor-pointer flex items-center"
        onMouseEnter={()=>setToggleDropdown(true)}
        // onMouseLeave={()=>setToggleDropdown(false)}
      >
        <span>CATEGORY</span><AiOutlineDown />
      </div>
      {toggleDropdown && (
        <ul ref={refMenuDropdown} className="top-nav-dropdown">
          <Link href={"/category"}>
            <li
              className="top-nav-dropdown-item"
              onClick={() =>
                setTimeout(() => {
                  setToggleDropdown(false);
                }, 100)
              }
            >
              ALL
            </li>
          </Link>
          {categories?.map((c) => (
            <Link href={`/category/${c.slug}`} key={c._id}>
              <li
                key={c._id}
                className="top-nav-dropdown-item"
                onClick={() =>
                  setTimeout(() => {
                    setToggleDropdown(false);
                  }, 100)
                }
              >
                {c.name}
              </li>
            </Link>
          ))}
        </ul>
      )}
    </>
  );
}
