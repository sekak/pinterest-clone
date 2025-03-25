import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Props } from './types';
import Comment from './comment';
import { fetchComments } from '../../utils/fetch';
import CommentForm from './commentForm';

export default function Comments({ pin }: { pin: string }) {

    const [open, setOpen] = React.useState<boolean>(false);

    const { data, isPending, error } = useQuery({
        queryKey: ['comments', pin],
        queryFn: () => fetchComments(pin),
    })

    if (error) return <div>Error</div>
    if (isPending) return <div>Loading...</div>

    return (
        <div className="py-4 w-full h-[calc(100%-140px)] flex flex-col justify-between pl-4">
            <div className="flex flex-col gap-2 w-full overflow-y-auto overflow-x-hidden ">
                <span className='font-bold flex justify-between items-center mr-4'>{data.length === 0 ? 'No Comments!' : data.length + ' Comments'}
                    <span className="cursor-pointer" onClick={() => setOpen(!open)}>
                        {open ? 'Hide' : 'Show'}
                    </span>
                </span>
                <div className="flex flex-col gap-4">
                    {open && data?.map((comment: Props) => (
                        <Comment key={comment._id} {...comment} />
                    ))}
                </div>
            </div>

            <CommentForm pin={data[0].pin}/>
        </div>
    );
}