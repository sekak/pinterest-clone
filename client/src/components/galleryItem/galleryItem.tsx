import Image from '@/components/image/image';
import { Props } from '@/components/galleryItem/types';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PostInteractions from '@/components/postInteractions/postInteractions';

export default function GalleryItem(props: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const optimizedHeight = (372 * props.height) / props.width

    return (
        <div data-testid='class-div' className='flex relative' style={{ gridRowEnd: `span ${Math.ceil(props.height / 100)}` }} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <Image media={props.media} h={optimizedHeight.toString()} w='372' className={"object-cover rounded-2xl w-full"} />
            <Link to={`/pin/${props._id}`} className='absolute top-0 left-0 w-full h-full z-1' />
            {isOpen && <div className='absolute bottom-0 w-full h-full p-2 rounded-2xl bg-black/50' >
                <PostInteractions id={props._id} variant='gallery' />
            </div>}
        </div>
    )
}
