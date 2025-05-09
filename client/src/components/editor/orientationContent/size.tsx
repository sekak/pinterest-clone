import { SizeType } from "@/components/editor/utils/types";
import { landscapeSizes, portraitSizes } from "../utils/variant";

export default function Size(props: SizeType) {
    return (
        <div className="flex flex-col gap-2">
            <span className="font-medium">Size</span>
            <div className="bg-gray-100 rounded-lg p-2 flex flex-wrap gap-2">
                <button
                    onClick={() => props.handleClickSize("original")}
                    className={`px-3 py-1 rounded ${props.canvasOptions.size === 'original' ? 'bg-white shadow' : ''}`}
                >
                    Original
                </button>
                {(props.canvasOptions.orientation === "portrait" ? portraitSizes : landscapeSizes).map((size) => (
                    <button
                        key={size.name}
                        onClick={() => props.handleClickSize(size)}
                        className={`px-3 py-1 rounded ${props.canvasOptions.size === size.name ? 'bg-white shadow' : ''}`}
                    >
                        {size.name}
                    </button>
                ))}
            </div>
        </div>
    )
}
