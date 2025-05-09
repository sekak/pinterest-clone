import { useQuery } from '@tanstack/react-query';
import { Props } from '@/components/comments/types';
import Comment from '@/components/comments/comment';
import { fetchComments } from '@/utils/fetch';
import CommentForm from '@/components/comments/commentForm';
import { useState } from 'react';
import Loading from '@/utils/loading';
import ErrorServer from '@/components/handleErr/ErrorServer';

export default function Comments({ pin }: { pin: string }) {

    const [open, setOpen] = useState<boolean>(false);

    const { data, isPending, error } = useQuery({
        queryKey: ['comments', pin],
        queryFn: () => fetchComments(pin),
    })

    if (isPending) return <Loading/>
    if (error) return <ErrorServer/>

    return (
        <div className="py-4 w-full h-[calc(100%-140px)] flex flex-col justify-between pl-4">
            <div className="flex flex-col gap-2 w-full overflow-y-auto overflow-x-hidden ">
                <span className='font-bold flex justify-between items-center mr-4'>{data?.length === 0 || data?.length === undefined ? 'No Comments!' : data?.length + ' Comments'}
                    {data?.length > 0 && 
                    <span className="cursor-pointer" onClick={() => setOpen(!open)}>
                        {open ? 'Hide' : 'Show'}
                    </span>}
                </span>
                <div className="flex flex-col gap-4">
                    {open && data?.map((comment: Props) => (
                        <Comment key={comment?._id} {...comment} />
                    ))}
                </div>
            </div>
            <CommentForm pin={pin}/>
        </div>
    );
}