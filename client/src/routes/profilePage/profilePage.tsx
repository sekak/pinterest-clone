import React, { useState } from 'react'
import Image from '../../components/image/image'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import Gallery from '../../components/gallery/gallery';
import Collection from '../../components/collection/collection';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { fetchProfile } from '../../utils/fetch';

export default function ProfilePage() {

  const [type, setType] = useState('created')
  const { username } = useParams()

  const { data, isPending, error } = useQuery({
    queryKey: ['profile', username],
    queryFn: () => fetchProfile(username)
  })

  if (isPending) return <div className='p-2'>Loading...</div>
  
  if (error) return <div className='p-2'>Not Found this user!</div>

  return (
    <div className='flex flex-col items-center'>
      <Image media={data?.img} src={data?.img} w='100' h='100' className='w-[100px] h-[100px] rounded-full object-cover' />
      <h1 className='text-lg font-bold'>{data?.username}</h1>
      <span className='text-gray-700 text-sm'>@{data?.displayName}</span>
      <span className='text-gray-800 mt-3'>0 following . follow</span>
      <div className='flex items-center gap-6 mt-3'>
        <FileUploadOutlinedIcon />
        <div className='flex items-center gap-2'>
          <button className='bg-gray-300 px-4 py-2 rounded-full cursor-pointer'>Message</button>
          <button className='bg-red-500 px-4 py-2 rounded-full text-white cursor-pointer'>Follow</button>
        </div>
        <MoreHorizOutlinedIcon />
      </div>
      <div className='mt-6 flex items-center gap-4 text-sm'>
        <span onClick={() => setType('created')} className={`cursor-pointer ${type === 'created' ? 'border-b-2 border-gray-900' : 'border-b-2 border-transparent'}`}>Created</span>
        <span onClick={() => setType('saved')} className={`cursor-pointer ${type === 'saved' ? 'border-b-2 border-gray-900' : 'border-b-2 border-transparent'}`}>Saved</span>
      </div>
      <div className='mt-6'>

        {
          type === 'created' ? (
            <Gallery userId={data._id}/>
          ) : (
            <Collection userId={data._id}/>
          )
        }
      </div>
    </div>
  )
}
