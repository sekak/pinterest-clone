import React from 'react'
import PostInteractions from '../../components/postInteractions/postInteractions'
import User from '../../components/user/user'
import Comments from '../../components/comments/comments'
import Image from '../../components/image/image'
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'
import { fetchPin } from '../../utils/fetch'
import Loading from '../../utils/loading'
import ErrorServer from '../../components/handleErr/ErrorServer'

export default function PostPage() {

    const { id } = useParams()

    const { data, isPending, error } = useQuery({
        queryKey: ['pin', 'profile', id],
        queryFn: () => fetchPin(id)
    })

    const handleArrowClick = () => {
        window.history.back();
    }

    if (isPending) return <div>

    </div>

    if (error) return <ErrorServer/>
    if (isPending) return <Loading/>
    if (!data) return <div>Not found</div>

    return (
        <div className='h-[736px] lg:w-[60%] w-full mx-auto flex gap-2'>
            <div className='!w-12 !h-12 min-w-12 mt-4 !mx-4 hover:bg-gray-200 rounded-full flex items-center justify-center'>
                <ArrowBackOutlinedIcon className='!text-2xl !cursor-pointer' onClick={handleArrowClick} />
            </div>
            <div className='flex md:flex-row flex-col h-full w-full border border-gray-300 rounded-4xl mr-4'>
                <div className='bg-red-50 flex-1 flex items-center justify-center w-full h-full overflow-hidden rounded-t-4xl md:rounded-l-4xl md:rounded-t-none'>
                    <Image media={data?.media} w="736" className='object-cover' />
                </div>
                <div className='flex-1 h-full w-full flex flex-col'>
                    <PostInteractions id={id} />
                    <div>
                        <h1 className='px-4 line-clamp-2 text-[28px] font-bold'>{data?.title}</h1>
                    </div>
                    <User {...data?.user} />
                    <Comments pin={data?._id} />
                </div>
            </div>
        </div>
    )
}
