import React from 'react'
import LayoutMain from '@/components/layout/layoutMain'
import FromLogin from '@/components/fromLogin'
import Jumbotron from '@/components/jumbotron'
import { getToken } from 'next-auth/jwt'

export default function Login () {
  return(
    <LayoutMain page={'login'}>
      <main>
        <Jumbotron 
          title={'LOGIN PAGE'} 
          subTitle={"Please Login to my shop."}/>
        <FromLogin />
      </main>
    </LayoutMain>
  )
}

export async function getServerSideProps({req}){
  const token = await getToken({req})
  if(!token) {
    return {
      props: {}
    }
  }
  else if(token?.role === 1){
    return {
      redirect: {
        permanent: false,
        destination: '/admin/dashboard'
      }
    }
  }else {
    return {
      redirect: {
        permanent: false,
        destination: '/user/dashboard'
      }
    }
  }
  
}