import { useEditorStore } from "@/utils/editorStore";

export default function TextStyle() {

    const { textOptions, setTextOptions } = useEditorStore();

    return (
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
    )
}
