import React from 'react'
import LayoutMain from '@/components/layout/layoutMain'
import Jumbotron from '@/components/card/jumbotron'
import { useQuery } from 'react-query'
import { listByCategory } from '@/libs/clientRequest/product'
import CardProduct from '@/components/card/cardProduct'

export default function CategoryView({slug}) {

  const { isLoading, isError, data, error } = useQuery(["listByCategory", slug], ()=>listByCategory(slug));
  if (isLoading) return <div>Product is Loading</div>;
  if (isError)
    return (
      <div>
        Product is error on Loading <pre>{error}</pre>
      </div>
    );
  return (
    <LayoutMain page={"category"}>
      <Jumbotron title={`Category of ${data[0]?.category.name}`} 
      subTitle={`${data.length} Products Found`}
      />

<div className='sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4'>
  {data?.map(p => <div key={p._id}><CardProduct p={p} /></div>)}
</div>
    </LayoutMain>
    
  )
}

export function getServerSideProps(context){
  const {slug} = context.params
  return{
    props:{
      slug
    }
  }
}