import React from 'react'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { Button } from '@mui/material';
import { apiRequest } from '../../utils/apiRequest';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { InterActionFn } from '../../utils/fetch';
import InterActionSkeleton from '../../skeleton/interAction';

export default function PostInteractions({ id }: { id: string | undefined }) {
  const queryClient = useQueryClient();

  const { isLoading, data, error } = useQuery<{
    isLiked: boolean;
    isSaved: boolean;
    countLikes: number;
  }>({
    queryKey: ['interaction', id],
    queryFn: () => InterActionFn(id),
  });

  const {mutate, isPending} = useMutation({
    mutationFn: (type: string) => apiRequest.post(`/pins/interaction/${id}`, { type }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['interaction', id],
      });
    },
  });

  const handleInteractionClick = async (type: string) => {
    if (!id || isPending || isLoading) return;
    mutate(type);
  };

  if (isLoading) {
    return <InterActionSkeleton/>
  }

  if (error) {
    return <div>Error loading interactions</div>;
  }

  return (
    <div className="flex justify-between items-center pr-4 pt-2">
      <div className="flex">
        <div className="flex items-center mr-2">
          <div
            className="w-12 h-12 hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => handleInteractionClick('like')}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill={data?.isLiked ? 'red' : 'none'}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                stroke={data?.isLiked ? 'red' : 'black'}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span>{data?.countLikes ?? 0}</span>
        </div>
        <div className="w-12 h-12 hover:bg-gray-200 rounded-full flex items-center justify-center">
          <FileUploadOutlinedIcon />
        </div>
        <div className="w-12 h-12 hover:bg-gray-200 rounded-full flex items-center justify-center">
          <MoreHorizOutlinedIcon />
        </div>
      </div>
      <Button
        onClick={() => handleInteractionClick('save')}
        className={`!px-4 !py-3 ${
          data?.isSaved ? '!bg-gray-400' : '!bg-red-600'
        } !rounded-full !text-white !font-bold !text-sm`}
        variant="contained"
      >
        {data?.isSaved ? 'Saved' : 'Save'}
      </Button>
    </div>
  );
}