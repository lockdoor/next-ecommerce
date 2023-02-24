import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import FormSearch from "../form/formSearch";
import CategoriesMenuDropdown from "./categoriesMenuDropdown";
import UserMenuDropdown from "./userMenuDropdown";
import MainMenuDropdown from "./mainMenuDropdown"


export default function TopNav({ page }) {
  // hook
  const { data } = useSession();  

  return (
    <div className=" z-10  sticky top-0 bg-slate-50 shadow-md  py-3 px-5 text-2xl">
      <ul className=" flex justify-between  ">

        <li className="sm:hidden cursor-pointer">
          <MainMenuDropdown />
        </li>

        {/* item1 */}
        <li className={`hidden sm:block order-1 ${page === 'home' && 'nav-active'} `} >
          <Link href={"/"}>HOME</Link>
        </li>

        {/* item2 */}
        <li className={`hidden sm:block order-2 ${page === 'shop' && 'nav-active'} `}>
          <Link href={"/shop"}>SHOP</Link>
        </li>

        {/* item3 */}
        <li className={`hidden sm:block order-3 ${page === 'category' && 'nav-active'} `}>
          <CategoriesMenuDropdown />
        </li>

        {/* item4 */}
        <li className="order-4 ">
          <FormSearch />
        </li>
        
        {/* item last */}
        <li className="order-last">
          <UserMenuDropdown data={data} />
        </li>

      </ul>
    </div>
  );
}
