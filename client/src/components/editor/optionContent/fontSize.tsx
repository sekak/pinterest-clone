import { useEditorStore } from "@/utils/editorStore";


export default function FontSize() {
    const { textOptions, setTextOptions } = useEditorStore();

    return (
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
    )
}
