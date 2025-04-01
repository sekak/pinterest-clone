import React, { useEffect } from 'react'
import { Img } from '../../routes/createPage/types'
import Image from '../image/image'
import { useEditorStore } from '../../utils/editorStore'

export default function Layers({ previewImg }: { previewImg: Img }) {

  const { currentEditor, setCurrentEditor, addText, canvasOptions} = useEditorStore()

  useEffect(() => {
    if (currentEditor === 'text') {
      addText()
    }
  }, [currentEditor])

  return (
    <div className='flex-1'>
      <div className='w-full h-full mt-6'>
        <div className='flex flex-col px-4 py-2'>
          <h2 className='text-xl font-medium'>Layers</h2>
          <h3 className='text-gray-700 text-sm'>Select a layer to edit.</h3>
        </div>
        <div className='py-2 px-4 space-y-0.5'>
          <div onClick={() => setCurrentEditor('text')} className={`flex items-center space-x-2 cursor-pointer hover:bg-gray-200/50 p-2 rounded-lg ${currentEditor === 'text' && 'bg-gray-200/50'}`}>
            <Image media='/general/text.png' className='h-12 w-12 rounded-lg' w="48" h="48" />
            <span className='text-sm'>Add Text</span>
          </div>
          <div onClick={() => setCurrentEditor('canvas')} className={`flex items-center space-x-2 cursor-pointer hover:bg-gray-200/50 p-2 rounded-lg ${currentEditor === 'canvas' && 'bg-gray-200/50'}`}>
            <div className='h-12 w-12 rounded-lg' style={{backgroundColor: canvasOptions.backgroundColor}} />
            <span className='text-sm'>Canvas</span>
          </div>
        </div>
      </div>
    </div>
  )
}
