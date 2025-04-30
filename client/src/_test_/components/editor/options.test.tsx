import Options from "@/components/editor/options"
import { fireEvent, render, screen } from "@testing-library/react"
import { vi } from "vitest"

let mockCurrentEditor = 'text'
let mockSetCanvasOptions = vi.fn()

vi.mock('@/utils/editorStore', () => {
    return {
        useEditorStore: () => ({
            currentEditor: mockCurrentEditor,
            canvasOptions: {
                orientation: 'portrait',
                height: 0,
                size: 'original'
            },
            setCanvasOptions: mockSetCanvasOptions,
        })
    }
})

vi.mock('@/components/editor/optionContent/color', () => ({
    default: () => <div>Mocked Color</div>,
}));
vi.mock('@/components/editor/optionContent/alignment', () => ({
    default: () => <div>Mocked Alignment</div>,
}));
vi.mock('@/components/editor/optionContent/textStyle', () => ({
    default: () => <div>Mocked TextStyle</div>,
}));
vi.mock('@/components/editor/optionContent/fontSize', () => ({
    default: () => <div>Mocked FontSize</div>,
}));

vi.mock('@/components/editor/orientationContent/orientation', () => ({
    default: ({ handleClickOrientation }) => <button onClick={() => handleClickOrientation('portrait')}>Mocked Orientation</button>,
}));
vi.mock('@/components/editor/orientationContent/size', () => ({
    default: ({ handleClickSize }) => <button onClick={() => handleClickSize(('2:1'))}>Mocked Size</button>,
}));
vi.mock('@/components/editor/orientationContent/backgroundColor', () => ({
    default: () => <div>Mocked BackgroundColor</div>,
}));

describe('Options component', () => {
    it('render correctly when currentEditor is text.', () => {
        const previewImg = {
            url: 'https://example.com/image.jpg',
            width: 12,
            height: 23,
            name: 'example.jpg',
        }
        render(<Options previewImg={previewImg} />)

        expect(screen.getByText('Mocked Color')).toBeInTheDocument()
        expect(screen.getByText('Mocked Alignment')).toBeInTheDocument()
        expect(screen.getByText('Mocked TextStyle')).toBeInTheDocument()
        expect(screen.getByText('Mocked FontSize')).toBeInTheDocument()
    })

    it('render when currentEditor is canvas.', () => {
        mockCurrentEditor = 'canvas'
        const previewImg = {
            url: 'https://example.com/image.jpg',
            width: 12,
            height: 23,
            name: 'example.jpg',
        }
        render(<Options previewImg={previewImg} />)

        expect(screen.getByText('Mocked Orientation')).toBeInTheDocument()
        expect(screen.getByText('Mocked Size')).toBeInTheDocument()
        expect(screen.getByText('Mocked BackgroundColor')).toBeInTheDocument()
    })

    it('handleClickOrientation function is called when button is clicked', () => {
        const previewImg = {
            url: 'https://example.com/image.jpg',
            width: 12,
            height: 23,
            name: 'example.jpg',
        }
        render(<Options previewImg={previewImg} />)

        const button = screen.getByText('Mocked Orientation')
        fireEvent.click(button)

        expect(mockSetCanvasOptions).toHaveBeenCalled()
    })
    
    it('handleClickSize function is called when button is clicked', () => {
        const previewImg = {
            url: 'https://example.com/image.jpg',
            width: 12,
            height: 23,
            name: 'example.jpg',
        }
        render(<Options previewImg={previewImg} />)

        const button = screen.getByText('Mocked Size')
        fireEvent.click(button)

        expect(mockSetCanvasOptions).toHaveBeenCalled()
    })
})