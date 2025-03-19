import React from 'react'
import Image from '../image/image'
import { Props } from './types'
import { Link } from 'react-router'

export default function User(data: Props) {

  return (
    <Link to={`/${data.username}`} className='flex items-center gap-2 pl-4 pr-2 py-2'>
      <Image media={data?.img} src={data?.img} className='w-6 h-6 rounded-full'/>
      <span className='text-sm'>{data?.username}</span>
    </Link>
  )
}
