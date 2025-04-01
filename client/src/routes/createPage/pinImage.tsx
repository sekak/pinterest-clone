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
        <div>
            {props.previewImg?.url ?
                <div className='relative w-full sm:min-w-[375px] h-[453px]'>
                    <img src={props.previewImg?.url} alt='img' className='rounded-lg max-w-[375px]' />
                    <Image
                        media='/general/edit.svg'
                        className='absolute top-2 right-2 bg-gray-200/40 hover:bg-gray-200 rounded-full p-2 cursor-pointer'
                        onClick={()=>props.setIsEditing?.(true)}
                    />
                </div>
                :
                <div className="bg-gray-200/80 border-dashed border-2 border-gray-300/80 p-4 rounded-xl text-center w-full sm:min-w-[375px] h-[453px] flex flex-col items-center justify-center relative">
                    <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
                        <FileUploadOutlinedIcon className="h-10 w-10" />
                        <span>{props.previewImg?.name ? props.previewImg.name : 'Choose a file'}</span>
                    </label>
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
                </div>
            }
        </div>
    )
}
