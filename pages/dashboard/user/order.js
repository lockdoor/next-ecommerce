import React from 'react'
import LayoutMain from '@/components/layout/layoutMain'
import LayoutUser from '@/components/layout/layoutUser'
import { useQuery } from 'react-query'
import {listByUserId} from '@/libs/clientRequest/order'
import { getToken } from 'next-auth/jwt'
import CardUserOrders from '@/components/card/cardUserOrders'
import moment from 'moment'

export default function Order({userId}) {
  const {data: orders, isLoading} = useQuery(['listOrderByUserId', userId], ()=>listByUserId(userId))
  
  
  return (
    <LayoutMain loading={isLoading}>
      <LayoutUser page={"order"} headText={"Order"}>
      <div>
        {orders?.length > 0 && orders.map(o => (
          <div key={o._id} className="border shadow-md my-3 rounded-md">
            <div className='flex justify-between bg-slate-200 rounded-t-md p-3'>
              <div>Date: {moment(o.createdAt).fromNow()}</div>
              <div>Payment: {o.payment ? 'True' : 'False'}</div>
              <div>Status: {o.status}</div>
            </div>
            {o.products.map(p=>(
              <CardUserOrders p={p} key={p._id}/>
            ))}
            <div className='flex justify-between p-3'>
              <div>Total price: {o.totalPrice}</div>
              <div>View order details</div>
            </div>
          </div>
        ))}
      </div>
      </LayoutUser>
    </LayoutMain>
    
  )
}

export async function getServerSideProps(context){
  const {req} = context
  const token = await getToken({req})
  // console.log(token)
  return {
    props: {
      userId: token._id
    }
  }
}
