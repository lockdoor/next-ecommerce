import React, { useState, useRef } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { UserOutlined } from "@ant-design/icons";
import useOutsideAlerter from "@/libs/detectOutside";
import FormSearch from "../form/formSearch";

export default function TopNav({ page }) {
  // hook
  const { data } = useSession();
  const router = useRouter();
  const refMenuUser = useRef(null);

  //state
  const [toggleMenuUser, setToggleMenuUser] = useState(false);

  //
  const logout = async () => {
    await signOut({ redirect: false });
    router.replace("/auth/login");
  };

  const handleToggleMenuUser = () => {
    setToggleMenuUser(!toggleMenuUser);
  };

  const closeToggle = () => {
    setToggleMenuUser(false);
  };

  useOutsideAlerter(refMenuUser, closeToggle);

  return (
    <div>
      <ul className=" z-10 flex justify-between px-5 gap-12 md:gap-40 shadow-md py-3 text-2xl">
        <li className={page === "home" ? "nav-active" : ""}>
          <Link href={"/"}>HOME</Link>
        </li>
        <li className={page === "shop" ? "nav-active" : ""}>
          <Link href={"/shop"}>SHOP</Link>
        </li>
        <li>
          <FormSearch />
        </li>
        <li>
          {data?.token.name ? (
            <>
              <span
                className="flex items-center cursor-pointer "
                onClick={handleToggleMenuUser}
              >
                <span>Hi {data.token?.name}</span>
                <UserOutlined />
              </span>
              {toggleMenuUser && (
                <ul ref={refMenuUser} className="top-nav-dropdown">
                  <li className="top-nav-dropdown-item">
                    <Link
                      href={`/dashboard/${
                        data.token?.role === 1 ? "admin" : "user"
                      }`}
                    >
                      Dashboard
                    </Link>
                  </li>
                  <li onClick={logout} className="top-nav-dropdown-item">
                    Logout
                  </li>
                </ul>
              )}
            </>
          ) : (
            <>
              <span
                className="flex items-center cursor-pointer"
                onClick={handleToggleMenuUser}
              >
                <UserOutlined />
              </span>
              {toggleMenuUser && (
                <ul ref={refMenuUser} className="top-nav-dropdown">
                  <li className="top-nav-dropdown-item">
                    <Link href={"/auth/login"}>LOGIN</Link>
                  </li>
                  <li className="top-nav-dropdown-item">
                    <Link href={"/auth/register"}>REGISTER</Link>
                  </li>
                </ul>
              )}
            </>
          )}
        </li>
      </ul>
    </div>
  );
}
