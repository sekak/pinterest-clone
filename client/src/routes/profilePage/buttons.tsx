import React from 'react'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '../../utils/apiRequest';
import { fetchFollow } from '../../utils/fetch';

export default function Buttons({ userId, isFollowing }: { userId: string, isFollowing: boolean }) {

    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn: () => fetchFollow(userId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        },
    });

    const handleFollow = () => {
        mutation.mutate();
    };

    return (
        <div className='flex items-center gap-6 mt-3'>
            <FileUploadOutlinedIcon />
            <div className='flex items-center gap-2'>
                <button className='bg-gray-300 px-4 py-2 rounded-full cursor-pointer'>Message</button>
                <button className={`bg-red-500 px-4 py-2 rounded-full text-white cursor-pointer ${isFollowing && ' !bg-black border'}`} onClick={handleFollow}>{isFollowing ? 'Unfollow' : 'Follow'}</button>
            </div>
            <MoreHorizOutlinedIcon />
        </div>
    )
}
