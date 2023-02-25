import React, { useState, useRef } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import Link from "next/link";
import useOutsideAlerter from "@/libs/detectOutside";

export default function MainMenuDropdown() {
  const [toggle, setToggle] = useState(false);
  const ulRef = useRef(null);
  useOutsideAlerter(ulRef, setToggle);
  return (
    <>
      <BiMenuAltLeft size={30} onClick={() => setToggle(!toggle)} />
      {toggle && (
        <ul ref={ulRef} className="top-nav-dropdown">
          {/* item1 */}
          <Link href={"/"}>
            <li className="top-nav-dropdown-item">HOME</li>
          </Link>
          
          {/* item2 */}
          <Link href={"/shop"}>
            <li className="top-nav-dropdown-item">SHOP</li>
          </Link>

          {/* item3 */}
          <Link href={"/category"}>
            <li className="top-nav-dropdown-item">CATEGORY</li>
          </Link>
        </ul>
      )}
    </>
  );
}
