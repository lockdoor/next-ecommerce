import React from 'react'
import LayoutMain from '@/components/layout/layoutMain'
import LayoutUser from '@/components/layout/layoutUser'

export default function Order() {
  return (
    <LayoutMain>
      <LayoutUser page={"order"} headText={"Order"}>
      <div>Order</div>
      </LayoutUser>
    </LayoutMain>
    
  )
}
