import { useEditorStore } from '@/utils/editorStore';
import { useState } from 'react'
import { HexColorPicker } from 'react-colorful';

export default function Color() {
    const [isTextColorPickerOpen, setIsTextColorPickerOpen] = useState<boolean>(false);
    const { textOptions, setTextOptions } = useEditorStore();

    return (
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
    )
}
