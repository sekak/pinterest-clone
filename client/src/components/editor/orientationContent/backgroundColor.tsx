import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { backgroundType } from "@/components/editor/utils/types";

export default function BackgroundColor(props: backgroundType) {
  const [isBgColorPickerOpen, setIsBgColorPickerOpen] = useState<boolean>(false);

  return (
    <div className="flex flex-col gap-2 relative">
      <span className="font-medium">Background Color</span>
      <div
        onClick={() => setIsBgColorPickerOpen(prev => !prev)}
        className="w-8 h-8 rounded-full cursor-pointer border border-gray-300"
        style={{ backgroundColor: props.canvasOptions.backgroundColor }}
      />
      {isBgColorPickerOpen && (
        <div className="absolute z-10 top-20 left-0">
          <HexColorPicker
            color={props.canvasOptions.backgroundColor}
            onChange={(bg) => props.setCanvasOptions({ ...props.canvasOptions, backgroundColor: bg })}
          />
        </div>
      )}
    </div>
  )
}
