import React from 'react'

export default function Jumbotron({title, subTitle}) {
  return (
    <div className='text-center py-16 bg-slate-200'>
      <div className='text-5xl font-mono font-black mb-5'>{title}</div>
      <div className='text-xl font-mono'>{subTitle}</div>
    </div>
  )
}
