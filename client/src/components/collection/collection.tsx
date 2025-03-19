import React from 'react'
import Image from '../image/image'
import { useQuery } from '@tanstack/react-query'
import { fetchBoards } from '../../utils/fetch'
import { Props } from './types'
import { Link } from 'react-router'
import {format} from  'timeago.js'

export default function Collection({ userId }: { userId: string }) {
  const { data, isPending, error } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => fetchBoards(userId)
  })


  if (isPending) return <div className='p-2'>Loading...</div>
  if (error) return <div className='p-2'>Not Found this user!</div>

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4'>
      {data.map((item: Props)=> (
        <Link to={`/search?board_id=${item?._id}`}>
          <Image media={item.firstPin.media} src={item?.firstPin?.media} className='rounded-xl' />
          <div className='flex flex-col'>
            <span className='font-semibold'>{data?.title}</span>
            <span className='text-sm text-gray-500'>{item?.countPin} pins - {format(data?.createdAt)}</span>
          </div>
        </Link>
      ))
      }

    </div>
  )
}
