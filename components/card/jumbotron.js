import React from 'react'

export default function Jumbotron({title = 'NextJS E-commerce', subTitle = "Welcome to My Shop"}) {
  return (
    <div className='jumbotron'>
      <div className='text-5xl font-mono font-black'>{title}</div>
      <div className='text-xl font-mono'>{subTitle}</div>
    </div>
  )
}
