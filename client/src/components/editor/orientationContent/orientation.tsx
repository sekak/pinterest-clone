import { orientationType } from "@/components/editor/utils/types";

export default function Orientation(props: orientationType) {
    return (
        <div className="flex flex-col gap-2">
            <span className="font-medium">Orientation</span>
            <div className="bg-gray-100 rounded-lg w-max p-1 space-x-2">
                <button
                    onClick={() => props.handleClickOrientation('landscape')}
                    className={`px-3 py-1 rounded ${props.canvasOptions.orientation === 'landscape' ? 'bg-white shadow' : ''}`}
                >
                    Landscape
                </button>
                <button
                    onClick={() => props.handleClickOrientation('portrait')}
                    className={`px-3 py-1 rounded ${props.canvasOptions.orientation === 'portrait' ? 'bg-white shadow' : ''}`}
                >
                    Portrait
                </button>
            </div>
        </div>
    )
}
