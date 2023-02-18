import React from 'react'
import Image from 'next/image'

export default function CardProduct({p}) {
  return (
    <div className='border border-gray-200 my-3 rounded-md shadow-md hover:border-gray-400'>
      <div className='h-52 flex items-center'>
      <Image
        src={`/api/product/photo/${p._id}`}
        className="mx-auto"
        width={200}
        height={200}
        alt={p?.name}
      />
      </div>
      
      <div>
        <div className='text-2xl bg-gray-200 text-center py-2 font-black'>{p.name}</div>
        <div className=' line-clamp-2 text-sm m-2'>{p.description}</div>
        <div className='flex m-2 '>
        <div className='w-1/2 text-sm'>Price {p.price}</div>
        <div className='w-1/2 text-sm'>Sold {p.sold}</div>
        </div> 
        <div>
          <button className='w-1/2 bg-blue-400 py-1 hover:bg-blue-600 hover:text-white rounded-bl-md'>View Detail</button>
          <button className='w-1/2 bg-green-400 py-1 hover:bg-green-600 hover:text-white rounded-br-md'>Add to Cart</button>
        </div>       
      </div>
    </div>
  )
}
