import Head from 'next/head'
import React from 'react'
import TopNav from '../nav/topnav'

export default function LayoutMain({children, page, title="Next Ecommerce" }) {
  return (
    <div>
      <Head><title>{title}</title></Head> 
      <TopNav page={page}/>      
      {children}
    </div>
  )
}
