import React from 'react'
import { Img } from '../../routes/createPage/types'
import { useEditorStore } from '../../utils/editorStore'
import Image from '../image/image'

export default function WorkSpace({ previewImg }: { previewImg: Img }) {

  const { textOptions, setTextOptions, setCurrentEditor } = useEditorStore()
  
  const handleDelete = () => {
    setTextOptions({...textOptions, text: ''})
    setCurrentEditor('')
  }

  return (
    <div className='flex-3 h-full w-full bg-gray-200 py-16 flex items-center justify-center'>
      <div className='relative w-[375px] rounded-xl overflow-hidden flex items-center justify-center'>
        <img src={previewImg.url} alt={previewImg.name} className='w-full' />
        {textOptions.text !== '' && 
        <>
          <div className={`w-full h-full text-[${textOptions.fontSize}px] top-[${textOptions.top}px] left-[${textOptions.left}px] !text-[${textOptions.fontSize}px] absolute`} >
            <input value={textOptions.text} onChange={(e) => setTextOptions({ ...textOptions, text: e.target.value })}
              className={`w-full border-none bg-transparent text-[${textOptions.color}] cursor-grab text-inherit`}
            />
          </div>
          <div className='absolute top-2 right-2 bg-white rounded-full p-2 cursor-pointer' onClick={handleDelete}>
            <Image media='/general/edit.svg' w="24" h="24" />
          </div>
        </>
        }
      </div>
    </div>
  )
}
