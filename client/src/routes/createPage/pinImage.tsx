import React from 'react'
import Image from '../../components/image/image';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import { Props } from './types';

export default function PinImage(props: Props) {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            props.setFile?.(e.target.files[0]);
        }
    };

    return (
        <div className=''>
            {props.previewImg?.url ?
                <div className='relative flex justify-center overflow-hidden'>
                    <img src={props.previewImg?.url} alt='img' className='rounded-[40px]' />
                    <Image
                        media='/general/edit.svg'
                        className='w-10 h-10 absolute top-3 right-3 bg-white hover:bg-gray-200 rounded-full p-2 cursor-pointer'
                        onClick={() => props.setIsEditing?.(true)}
                    />
                </div>
                :
                <label htmlFor="file-upload" className="cursor-pointer bg-gray-200/80 border-dashed border-2 border-gray-300/80 p-4 rounded-[60px] text-center h-[453px] flex flex-col items-center justify-center relative">
                    <div className='rounded-full bg-black p-2'>
                        <FileUploadOutlinedIcon className="h-10 w-10 text-white" />
                    </div>
                    <span className='font-bold mt-2'>{props.previewImg?.name ? props.previewImg.name : 'Choose a file'}</span>
                    <input
                        id="file-upload"
                        type="file"
                        name="file"
                        className="hidden"
                        accept=".jpg,.mp4"
                        onChange={handleFileChange}
                    />
                    <p className="absolute bottom-4 p-2 text-sm">
                        We recommend using high quality .jpg files less than 20 MB or .mp4 files less than 200 MB.
                    </p>
                </label>
            }
        </div>
    )
}
