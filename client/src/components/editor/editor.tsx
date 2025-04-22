import Layers from '@/components/editor/layers'
import WorkSpace from '@/components/editor/workSpace'
import Options from '@/components/editor/options'
import { Img } from '@/routes/createPage/types'

export default function Editor({previewImg}: {previewImg: Img}) {

  return (
    <div className='flex gap-4 h-full w-full'>
      <Layers previewImg={previewImg}/>
      <WorkSpace previewImg={previewImg}/>
      <Options previewImg={previewImg}/>
    </div>
  )
}
