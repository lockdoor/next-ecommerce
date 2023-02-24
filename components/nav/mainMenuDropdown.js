import React, {useState, useRef} from 'react'
import {BiMenuAltLeft} from 'react-icons/bi'
import Link from 'next/link'
import useOutsideAlerter from '@/libs/detectOutside'

export default function MainMenuDropdown() {

  const [toggle, setToggle] = useState(false)
  const ulRef = useRef(null)
  useOutsideAlerter(ulRef, setToggle);
  return (
    <>
    <BiMenuAltLeft size={30} onClick={()=>setToggle(!toggle)}/>
    {toggle && <ul ref={ulRef} className='top-nav-dropdown'>
      {/* item1 */}
      <li  className="top-nav-dropdown-item">
          <Link href={"/"}>HOME</Link>
        </li>

        {/* item2 */}
        <li className="top-nav-dropdown-item">
          <Link href={"/shop"}>SHOP</Link>
        </li>

        {/* item3 */}
        <li className="top-nav-dropdown-item">
        <Link href={"/category"}>CATEGORY</Link>
        </li>
    </ul>}
    </>
    
  )
}
