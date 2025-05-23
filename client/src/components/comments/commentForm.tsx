import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { useState } from 'react';
import { addComment } from '@/utils/fetch';

export default function CommentForm({ pin }: { pin: string }) {

    const queryClient = useQueryClient();
    const [content, setContent] = useState<string>('');
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

    const handleClickEmoji = (emoji: EmojiClickData) => {
        if (emoji.emoji) setContent(prev => prev + emoji.emoji.trim());
    };

    const mutation = useMutation({
        mutationFn: addComment,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['comments', pin]
            });
        }
    })

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        mutation.mutate({
            pin,
            description: content
        });
        setContent('');
    }

    return (
        <form data-testid='form' onSubmit={handleSubmit} className="bg-gray-200 mr-4 mt-6 rounded-xl flex justify-between items-center px-3 relative">
            <input
                data-testid='input'
                type="text"
                placeholder="Add a comment"
                className="w-full h-12 pr-4 text-gray-500 outline-none bg-transparent"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <div
                className="text-xl cursor-pointer"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >😊</div>
            <div className={`absolute bottom-12 right-0 ${showEmojiPicker ? 'block' : 'hidden'}`}>
                <EmojiPicker onEmojiClick={handleClickEmoji} lazyLoadEmojis />
            </div>
            {content.length !== 0 && <button data-testid='send' className='bg-red-600 hover:bg-red-700 rounded-full min-w-8 min-h-8 flex items-center justify-center mx-1' type="submit">
                <SendOutlinedIcon className="!h-4 !w-4 cursor-pointer !text-white" />
            </button>}
        </form>
    )
}
