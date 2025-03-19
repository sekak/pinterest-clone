import React from 'react'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Button } from '@mui/material';

export default function PostInteractions() {
  return (
    <div className='flex justify-between items-center pr-4 pt-2'>
      <div className='flex '>
        <div className='flex items-center mr-2'>
          <div className='w-12 h-12 hover:bg-gray-200 rounded-full flex items-center justify-center'>
            <FavoriteBorderOutlinedIcon className='!w-5 !h-5' />
          </div>
          <span>2.5k</span>
        </div>
        <div className='w-12 h-12 hover:bg-gray-200 rounded-full flex items-center justify-center'>
          <MoreHorizOutlinedIcon />
        </div>
        <div className='w-12 h-12 hover:bg-gray-200 rounded-full flex items-center justify-center'>
          <FileUploadOutlinedIcon />
        </div>
      </div>
      <Button className='!px-4 !py-3 !bg-red-600 !rounded-full !text-white !font-bold !text-sm' variant='contained'
      >
        Save
      </Button>
    </div>
  )
}
