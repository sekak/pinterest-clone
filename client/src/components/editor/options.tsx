import React from 'react'
import { Img } from '../../routes/createPage/types'
import { useEditorStore } from '../../utils/editorStore'
import { HexColorPicker } from "react-colorful";


export default function Options({previewImg}: {previewImg: Img}) {
  const { textOptions, currentEditor, setTextOptions } = useEditorStore()
  return (
    <div className='flex-1'>
      {currentEditor === 'text' ? (
        <div>
            <div>
              <span>Font Size</span>  
              <input type='number' value={textOptions.fontSize} onChange={(e) => setTextOptions({ ...textOptions, fontSize: parseInt(e.target.value) })} />
            </div>
            <div>
              <span>Color</span>  
              <div className={`w-10 h-10 rounded-full bg-[${textOptions.color}]`}/>
              <div>
                <HexColorPicker/>
              </div>
            </div>
        </div>
      ) : (
        <div>Canvas</div>
      )}
    </div>
  )
}
