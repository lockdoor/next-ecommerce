import React, {useState, useRef} from 'react'
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { UserOutlined } from "@ant-design/icons";
import useOutsideAlerter from "@/libs/detectOutside";
import Link from "next/link";


export default function UserMenuDropdown({data}) {

  const router = useRouter();
  const refMenuUser = useRef(null);

  //state
  const [toggleMenuUser, setToggleMenuUser] = useState(false);

  // function
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
    <>
    {data?.token.name ? (
            <>
              <div
                className="flex items-center cursor-pointer "
                onClick={handleToggleMenuUser}
              >
                <div className='hidden xl:block'>{data.token?.name}</div>
                <UserOutlined />
              </div>
              {toggleMenuUser && (
                <ul ref={refMenuUser} className="top-nav-dropdown right-2">
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
                <ul ref={refMenuUser} className="top-nav-dropdown right-2">
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
    </>
  )
}
