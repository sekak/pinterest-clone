import React, { useState } from 'react'
import Image from '../../components/image/image'
import Gallery from '../../components/gallery/gallery';
import Collection from '../../components/collection/collection';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '../../utils/fetch';
import Buttons from './buttons';
import Navigation from './navigation';
import Loading from '../../utils/loading';

export default function ProfilePage() {

  const [type, setType] = useState('created')
  const { username } = useParams()

  const { data, isPending, error } = useQuery({
    queryKey: ['profile', 'interaction', username],
    queryFn: () => fetchProfile(username)
  })

  if (isPending) return <Loading/>
  if (error) return <div className='p-2'>Not Found this user!</div>

  return (
    <div className='flex flex-col items-center'>
      <Image media={data?.img ? data?.img : '/general/noAvatar.png'} w='100' h='100' className='w-[100px] h-[100px] rounded-full object-cover' />
      <h1 className='text-lg font-bold'>{data?.username}</h1>
      <span className='text-gray-700 text-sm'>@{data?.displayName}</span>
      <span className='text-gray-800 mt-3'>{data?.followings} following . {data?.followers} followers</span>
      <Buttons userId={data._id} isFollowing={data?.isFollowing} />
      <Navigation setType={setType} type={type} />
      <div className='mt-6'>
        {
          type === 'created' ? (
            <Gallery userId={data._id} />
          ) : (
            <Collection userId={data._id} />
          )
        }
      </div>
    </div>
  )
}
