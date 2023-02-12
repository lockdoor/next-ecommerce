import React from 'react'
import TopNav from '../nav/topnav'

export default function LayoutMain({children, page, title}) {
  return (
    <div>
      <TopNav page={page}/>
      {children}
    </div>
  )
}
