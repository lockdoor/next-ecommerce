import React from 'react'

export default function Jumbotron({title = 'NextJS E-commerce', subTitle = "Welcome to My Shop"}) {
  return (
    <div className='jumbotron'>
      <div className='text-5xl font-mono font-black text-center'>{title}</div>
      <div className='text-xl font-mono text-center'>{subTitle}</div>
    </div>
  )
}
