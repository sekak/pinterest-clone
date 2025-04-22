import Image from '@/components/image/image'
import { Props } from '@/components/user/types'
import { Link } from 'react-router'

export default function User(data: Props) {

  return (
    <Link to={`/profile/${data.username}`} className='flex items-center gap-2 ml-4 py-2 mr-2 border-b border-gray-300'>
      <Image media={data?.img ? data?.img : '/general/noAvatar.png'} className='w-6 h-6 rounded-full'/>
      <span className='text-sm'>{data?.username}</span>
    </Link>
  )
}
