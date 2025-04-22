import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import Image from '@/components/image/image';
import { Button } from '@mui/material';
import { Props } from '@/components/galleryItem/types';
import { Link } from 'react-router';
import { useState } from 'react';

export default function GalleryItem(props: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const optimizedHeight = (372 * props.height) / props.width

    return (
        <div className='flex relative' style={{ gridRowEnd: `span ${Math.ceil(props.height / 100)}` }} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <Link to={`/pin/${props._id}`} className='absolute top-0 left-0 w-full h-full z-10' />
            <Image media={props.media} h={optimizedHeight.toString()} w='372' className={"object-cover rounded-2xl w-full"}/>
            {isOpen && <div className='absolute bottom-0 w-full h-full p-2 rounded-2xl hover:bg-black/50' >
                <div className='h-full flex flex-col justify-between items-end p-2'>
                    <Button
                        className='!bg-[#e60023] hover:!bg-[#b60000] !text-amber-50 !rounded-full !px-4 !py-2 !font-semibold '
                    >
                        Save
                    </Button>
                    <div className='space-x-1'>
                        <FileUploadOutlinedIcon className='hover:bg-gray-300 bg-white rounded-full !w-9 !h-9 p-2' />
                        <MoreHorizOutlinedIcon className='hover:bg-gray-300 bg-white rounded-full !w-9 !h-9 p-2' />
                    </div>
                </div>
            </div>}
        </div>
    )
}
