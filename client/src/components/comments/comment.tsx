import { format } from 'timeago.js'
import { Props } from '@/components/comments/types'
import Image from '@/components/image/image'

export default function Comment(comment: Props) {

    return (
        <div className="flex items-start gap-2 mr-2">
            <Image  media={comment?.user?.img ?? '/general/noAvatar.png'}  className="w-8 h-8 rounded-full" />
            <div className="flex flex-col">
                <span className="text-sm font-bold">
                    {comment?.user?.username}
                    <span className="break-all font-normal pl-2">
                        {comment?.description}
                    </span>
                </span>
                <span className="text-gray-500 text-sm">{format(comment?.createdAt)}</span>
            </div>
        </div>
    )
}
