import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import { Button } from '@mui/material';
import { apiRequest } from '@/utils/apiRequest';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { InterActionFn } from '@/utils/fetch';
import InterActionSkeleton from '@/skeleton/interAction';
import LikeIcon from '@/components/postInteractions/utils/likeIcon';
import { InterAction } from './utils/types';

export default function PostInteractions({ id, variant }: InterAction) {
  const queryClient = useQueryClient();

  const { isLoading, data } = useQuery({
    queryKey: ['interaction', id],
    queryFn: () => InterActionFn(id),
    enabled: !!id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (type: string) => apiRequest.post(`/pins/interaction/${id}`, { type }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['interaction', id] }),
  });

  const handleInteractionClick = (type: string) => {
    if (!id || isPending || isLoading) return;
    mutate(type);
  };

  if (isLoading && variant === 'post') return <InterActionSkeleton />;

  const buttonClass = `!px-4 !py-3 !rounded-full !text-white !font-bold !text-sm  z-10 ${
    data?.isSaved ? '!bg-gray-400' : '!bg-red-600'
  }`;

  if (variant === 'gallery') {
    return (
      <div className="h-full flex flex-col justify-between items-end p-2">
        <Button
          data-testid="save-button"
          onClick={() => handleInteractionClick('save')}
          className={buttonClass}
          variant="contained"
        >
          {data?.isSaved ? 'Saved' : 'Save'}
        </Button>
        <div className="space-x-1 cursor-pointer z-10">
          <FileUploadOutlinedIcon className="hover:bg-gray-300 bg-white rounded-full !w-9 !h-9 p-2" />
          <MoreHorizOutlinedIcon className="hover:bg-gray-300 bg-white rounded-full !w-9 !h-9 p-2" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center pr-4 pt-2">
      <div className="flex">
        <div className="flex items-center mr-2">
          <div
            data-testid="like-button"
            className="w-12 h-12 hover:bg-gray-200 rounded-full flex items-center justify-center cursor-pointer"
            onClick={() => handleInteractionClick('like')}
          >
            <LikeIcon isLiked={data?.isLiked} />
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
        data-testid="save-button"
        onClick={() => handleInteractionClick('save')}
        className={buttonClass}
        variant="contained"
      >
        {data?.isSaved ? 'Saved' : 'Save'}
      </Button>
    </div>
  );
}