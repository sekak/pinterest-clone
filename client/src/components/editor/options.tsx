import React from 'react';
import { Img } from '../../routes/createPage/types';
import { useEditorStore } from '../../utils/editorStore';
import { HexColorPicker } from 'react-colorful';
import { OptionsProps } from './utils/types';
import { landscapeSizes, portraitSizes } from './utils/variant';


export default function Options({ previewImg }: { previewImg: Img }) {
  const { textOptions, currentEditor, setTextOptions, canvasOptions, setCanvasOptions } = useEditorStore();
  const [isBgColorPickerOpen, setIsBgColorPickerOpen] = React.useState<boolean>(false);
  const [isTextColorPickerOpen, setIsTextColorPickerOpen] = React.useState<boolean>(false);

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


  const handleClickSize = (size: OptionsProps | string) => {
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
          {/* Font Size */}
          <div className="flex flex-col gap-2">
            <span className="font-medium text-gray-700">Font Size</span>
            <input
              type="number"
              value={textOptions.fontSize}
              onChange={(e) => setTextOptions({
                ...textOptions,
                fontSize: Math.max(8, parseInt(e.target.value) || 16),
              })}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
              min="8"
              max="72"
            />
          </div>

          {/* Text Color */}
          <div className="flex flex-col gap-2">
            <span className="font-medium text-gray-700">Color</span>
            <div className="relative">
              <div
                onClick={() => setIsTextColorPickerOpen(prev => !prev)}
                className="w-10 h-10 rounded-full cursor-pointer border border-gray-300 shadow-sm"
                style={{ backgroundColor: textOptions.color }}
              />
              {isTextColorPickerOpen && (
                <div className="absolute z-10 top-12 left-0">
                  <HexColorPicker
                    color={textOptions.color}
                    onChange={(color) => setTextOptions({ ...textOptions, color })}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Alignment */}
          <div className="flex flex-col gap-2">
            <span className="font-medium text-gray-700">Alignment</span>
            <div className="flex space-x-2">
              {['left', 'center', 'right'].map((align) => (
                <button
                  key={align}
                  onClick={() => setTextOptions({ ...textOptions, align })}
                  className={`p-2 rounded ${textOptions.align === align ? 'bg-emerald-500 text-white' : 'bg-gray-100'}`}
                >
                  {align.charAt(0).toUpperCase() + align.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Text Styles */}
          <div className="flex flex-col gap-2">
            <span className="font-medium text-gray-700">Style</span>
            <div className="flex space-x-2">
              <button
                onClick={() => setTextOptions({ ...textOptions, bold: !textOptions.bold })}
                className={`p-2 rounded ${textOptions.bold ? 'bg-emerald-500 text-white' : 'bg-gray-100'}`}
              >
                Bold
              </button>
              <button
                onClick={() => setTextOptions({ ...textOptions, italic: !textOptions.italic })}
                className={`p-2 rounded ${textOptions.italic ? 'bg-emerald-500 text-white' : 'bg-gray-100'}`}
              >
                Italic
              </button>
              <button
                onClick={() => setTextOptions({ ...textOptions, underline: !textOptions.underline })}
                className={`p-2 rounded ${textOptions.underline ? 'bg-emerald-500 text-white' : 'bg-gray-100'}`}
              >
                Underline
              </button>
            </div>
          </div>
        </div>

      ) : (
      <div className="py-2 pr-4 space-y-6 mt-6">
        <div className="flex flex-col gap-2">
          <span className="font-medium">Orientation</span>
          <div className="bg-gray-100 rounded-lg w-max p-1 space-x-2">
            <button
              onClick={() => handleClickOrientation('landscape')}
              className={`px-3 py-1 rounded ${canvasOptions.orientation === 'landscape' ? 'bg-white shadow' : ''}`}
            >
              Landscape
            </button>
            <button
              onClick={() => handleClickOrientation('portrait')}
              className={`px-3 py-1 rounded ${canvasOptions.orientation === 'portrait' ? 'bg-white shadow' : ''}`}
            >
              Portrait
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-medium">Size</span>
          <div className="bg-gray-100 rounded-lg p-2 flex flex-wrap gap-2">
            <button
              onClick={() => handleClickSize("original")}
              className={`px-3 py-1 rounded ${canvasOptions.size === 'original' ? 'bg-white shadow' : ''}`}
            >
              Original
            </button>
            {(canvasOptions.orientation === "portrait" ? portraitSizes : landscapeSizes).map((size) => (
              <button
                key={size.name}
                onClick={() => handleClickSize(size)}
                className={`px-3 py-1 rounded ${canvasOptions.size === size.name ? 'bg-white shadow' : ''}`}
              >
                {size.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-medium">Background Color</span>
          <div
            onClick={() => setIsBgColorPickerOpen(prev => !prev)}
            className="w-8 h-8 rounded-full cursor-pointer border border-gray-300"
            style={{ backgroundColor: canvasOptions.backgroundColor }}
          />
          {isBgColorPickerOpen && (
            <div className="absolute z-10 top-12 left-0">
              <HexColorPicker
                color={canvasOptions.backgroundColor}
                onChange={(bg) => setCanvasOptions({ ...canvasOptions, backgroundColor: bg })}
              />
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
}