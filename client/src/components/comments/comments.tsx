import React from 'react';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';


export default function Comments() {
    const [content, setContent] = React.useState<string>('');
    const [showEmojiPicker, setShowEmojiPicker] = React.useState<boolean>(false);

    const handleClickEmoji = (emoji: EmojiClickData) => {
        if (emoji.emoji) setContent(prev => prev + emoji.emoji.trim());
    };

    const fetchComments = async () => {
        const res = await axios.get('http://localhost:3000/api/comments');
        return res.data;
    }

    const {data, isPending, error} = useQuery({
        queryKey: ['comments'],
        queryFn: fetchComments,
    })

    console.log(data, isPending, error);

    return (
        <div className="py-4 w-full h-[calc(100%-100px)] flex flex-col justify-between pl-4">
            <div className="flex flex-col gap-2 w-full overflow-y-auto overflow-x-hidden h-[calc(100%-48px)]">
                <div className="">
                    {/* Comment */}
                    <div className="flex items-start gap-2 mr-2">
                        <img src="/general/noAvatar.png" alt="noAvatar" className="w-8 h-8" />
                        <div className="flex flex-col">
                            <span className="text-sm font-bold">
                                Username
                                <span className="break-all font-normal pl-2">
                                    Comment1
                                </span>
                            </span>
                            <span className="text-gray-500 text-sm">2m</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-200 mr-4 rounded-xl flex justify-between items-center px-4 relative">
                <input
                    type="text"
                    placeholder="Add a comment"
                    className="w-full h-12 pr-4 text-gray-500 outline-none bg-transparent"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <EmojiEmotionsIcon
                    className="h-6 w-6 cursor-pointer"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                />
                <div className={`absolute bottom-12 right-0 ${showEmojiPicker ? 'block' : 'hidden'}`}>
                    <EmojiPicker onEmojiClick={handleClickEmoji} lazyLoadEmojis />
                </div>
            </div>
        </div>
    );
}