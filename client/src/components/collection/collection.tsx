import Image from '@/components/image/image'
import { useQuery } from '@tanstack/react-query'
import { fetchBoards } from '@/utils/fetch'
import { Props } from '@/components/collection/types'
import { Link } from 'react-router-dom'
import {format} from  'timeago.js'
import Loading from '@/utils/loading'
import ErrorServer from '@/components/handleErr/ErrorServer'

export default function Collection({ userId }: { userId: string }) {
  const { data, isPending, error } = useQuery({
    queryKey: ['profile', userId],
    queryFn: () => fetchBoards(userId)
  })

  if (isPending) return <Loading/>
  if (error) return <ErrorServer/>

  return (
    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-4'>
      {data.map((item: Props)=> (
        <Link to={`/pin/${item?._id}`} key={item?._id}>
          <Image media={item?.media} className='rounded-xl' />
          <div className='flex flex-col'>
            <span className='font-semibold'>{item?.title}</span>
            <span className='text-sm text-gray-500'>1 pins - {format(item?.createdAt)}</span>
          </div>
        </Link>
      ))
      }
    </div>
  )
}