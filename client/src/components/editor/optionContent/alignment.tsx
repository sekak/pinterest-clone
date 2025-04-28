import { useEditorStore } from "@/utils/editorStore";

export default function Alignment() {

    const { textOptions, setTextOptions } = useEditorStore();
    
    return (
        <div className="flex flex-col gap-2">
            <span className="font-medium text-gray-700">Alignment</span>
            <div className="flex space-x-2">
                {['left', 'center', 'right'].map((align) => (
                    <button
                        key={align}
                        onClick={() => setTextOptions({ ...textOptions, align: align as 'left' | 'center' | 'right' })}
                        className={`p-2 rounded ${textOptions.align === align ? 'bg-emerald-500 text-white' : 'bg-gray-100'}`}
                    >
                        {align.charAt(0).toUpperCase() + align.slice(1)}
                    </button>
                ))}
            </div>
        </div>
    )
}
