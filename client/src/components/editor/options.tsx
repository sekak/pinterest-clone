import { Img } from '@/routes/createPage/types';
import { useEditorStore } from '@/utils/editorStore';
import { OptionsType } from '@/components/editor/utils/types';
import Color from '@/components/editor/optionContent/color';
import Alignment from '@/components/editor/optionContent/alignment';
import TextStyle from './optionContent/textStyle';
import FontSize from './optionContent/fontSize';
import Orientation from './orientationContent/orientation';
import Size from './orientationContent/size';
import BackgroundColor from './orientationContent/backgroundColor';

export default function Options({ previewImg }: { previewImg: Img }) {
  const { currentEditor, canvasOptions, setCanvasOptions } = useEditorStore();

  const isOrientationImg = previewImg.width > previewImg.height ? 'landscape' : 'portrait';

  const handleClickOrientation = (orientation: 'landscape' | 'portrait') => {
    let newHeight: number = 0;

    if (isOrientationImg === 'portrait' && orientation === 'portrait') {
      newHeight = (375 * previewImg.height) / previewImg.width;
    }
    else if (isOrientationImg === 'landscape' && orientation === 'landscape') {
      newHeight = (375 * previewImg.width) / previewImg.height;
    }
    else {
      if (orientation === 'landscape') {
        newHeight = (375 * previewImg.width) / previewImg.height;
      }
      else {
        newHeight = (375 * previewImg.height) / previewImg.width;
      }
    }

    if (orientation === 'landscape' && newHeight > previewImg.height)
      newHeight = previewImg.height;

    setCanvasOptions({ ...canvasOptions, orientation, height: newHeight, size: 'original' });
  }


  const handleClickSize = (size: OptionsType | string) => {
    let newHeight: number = 0;

    if (typeof size === 'string' && size === 'original') {
      if (isOrientationImg === 'portrait' && canvasOptions.orientation === 'portrait') {
        newHeight = (375 * previewImg.height) / previewImg.width;
      }
      else if (isOrientationImg === 'landscape' && canvasOptions.orientation === 'landscape') {
        newHeight = (375 * previewImg.width) / previewImg.height;
      }
      else {
        if (canvasOptions.orientation === 'landscape') {
          newHeight = (375 * previewImg.width) / previewImg.height;
        }
        else {
          newHeight = (375 * previewImg.height) / previewImg.width;
        }
      }
    }
    else if (typeof size === 'object') {
      newHeight = (375 * size.height) / size.width;
    }
    if (canvasOptions.orientation === 'landscape' && newHeight > previewImg.height)
      newHeight = previewImg.height;

    setCanvasOptions({ ...canvasOptions, size: typeof size === 'object' ? size.name : size, height: newHeight });
  }

  return (
    <div className="flex-1 w-full h-full overflow-hidden">
      {currentEditor === 'text' ? (
        <div className="py-4 pr-4 space-y-6 mt-6">
          {/* Font Size, COLORS, ALIGNMENT, TEXTSTYLE */}
          <FontSize />
          <Color />
          <Alignment />
          <TextStyle />
        </div>

      ) : (
        <div className="py-2 pr-4 space-y-6 mt-6">
          {/* Orientation, Size, BackgroundColor */}
          <Orientation handleClickOrientation={handleClickOrientation} canvasOptions={canvasOptions} />
          <Size handleClickSize={handleClickSize} canvasOptions={canvasOptions} />
          <BackgroundColor canvasOptions={canvasOptions} setCanvasOptions={setCanvasOptions} />
        </div>
      )}
    </div>
  );
}