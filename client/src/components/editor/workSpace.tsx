import { useEffect, useRef } from 'react';
import { Img } from '@/routes/createPage/types';
import { useEditorStore } from '@/utils/editorStore';
import Image from '@/components/image/image';
import { useStyle } from '@/components/editor/utils/styles';

export default function WorkSpace({ previewImg }: { previewImg: Img }) {
  const { textOptions, setTextOptions, setCurrentEditor, canvasOptions, setCanvasOptions } = useEditorStore();
  const { textContainerStyles, inputStyles, styleContainer } = useStyle(textOptions, canvasOptions)

  const handleDelete = () => {
    setTextOptions({ ...textOptions, text: '' });
    setCurrentEditor('');
  };

  useEffect(() => {
    if (canvasOptions.height === 0 && canvasOptions.orientation === '') {
      let newHeight: number = 0;
      const canvasRat = previewImg.height > previewImg.width

      if (canvasRat)
        newHeight = (375 * previewImg.height) / previewImg.width;
      else
        newHeight = (375 * previewImg.width) / previewImg.height;

      if (!canvasRat && newHeight > previewImg.height)
        newHeight = previewImg.height;

      setCanvasOptions({ ...canvasOptions, orientation: canvasRat ? 'portrait' : 'landscape', height: newHeight });
    }
  }, [previewImg, canvasOptions, setCanvasOptions]);

  const itemRef = useRef(null);
  const containerRef = useRef(null);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!dragging.current) return;
    setTextOptions({
      ...textOptions,
      left: e.clientX - offset.current.x,
      top: e.clientY - offset.current.y,
    });
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };

  const handleMouseLeave = () => {
    dragging.current = false;
  };

  const handleMouseDown = (e) => {
    setCurrentEditor("text");
    dragging.current = true;
    offset.current = {
      x: e.clientX - textOptions.left,
      y: e.clientY - textOptions.top,
    };
  };


  return (
    <div className="flex-3 h-full w-full bg-gray-200 py-16 flex items-center justify-center">
      <div className="relative w-[375px] rounded-xl overflow-hidden flex items-center justify-center" style={styleContainer}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        ref={containerRef}>
        <img src={previewImg.url} alt={previewImg.name} className="w-full rounded-xl" />
        {textOptions.text !== '' && (
          <>
            <div className='w-full' style={textContainerStyles}
              ref={itemRef}
              onMouseDown={handleMouseDown}
            >
              <input
                value={textOptions.text}
                onChange={(e) =>
                  setTextOptions({ ...textOptions, text: e.target.value })
                }
                style={inputStyles}
                className="w-full border-none bg-transparent cursor-grab"
              />
            </div>
            <div
              className="absolute top-2 right-2 bg-white rounded-full p-2 cursor-pointer"
              onClick={handleDelete}
            >
              <Image media="/general/delete.svg" w="20" h="20" />
            </div>
          </>
        )}
      </div>
    </div>
  );
}