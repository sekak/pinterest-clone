import React from 'react'
import Layers from './layers'
import WorkSpace from './workSpace'
import Options from './options'
import { Img } from '../../routes/createPage/types'

export default function Editor({previewImg}: {previewImg: Img}) {

  return (
    <div className='flex gap-4 h-full w-full'>
      <Layers previewImg={previewImg}/>
      <WorkSpace previewImg={previewImg}/>
      <Options previewImg={previewImg}/>
    </div>
  )
}
