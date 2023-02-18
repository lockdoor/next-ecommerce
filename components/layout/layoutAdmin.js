import React, {useState, useEffect} from "react";
import AdminMenu from "../nav/adminMenu";
import Jumbotron from "../card/jumbotron";
import {MenuUnfoldOutlined} from "@ant-design/icons"

export default function LayoutAdmin({ children, headText, page }) {
  
  const [toggleMenu, setToggleMenu] = useState(false)

  useEffect(()=>{
    window.addEventListener('resize',() => {
      if(window.innerWidth < 768) setToggleMenu(false)
    })
  }, [])

  return (
    <>
      <Jumbotron title="Admin Dashboard" />
      <div className="md:grid md:grid-cols-12">
        <MenuUnfoldOutlined
          onClick={()=>setToggleMenu(!toggleMenu)}
         className=" absolute text-4xl md:hidden"/>
        {toggleMenu && <AdminMenu page={page} />}
        <div className=" max-md:hidden md:col-span-3 ">
          <AdminMenu page={page} />
        </div>
        
        <div className=" md:col-span-9  md:ml-2">
          <div className="header-menu">{headText}</div>
          <div className="px-2">
            {children}
          </div>
          
        </div>
      </div>
    </>
  );
}
