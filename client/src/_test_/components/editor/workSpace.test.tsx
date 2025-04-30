import WorkSpace from "@/components/editor/workSpace"
import { fireEvent, render, screen } from "@testing-library/react"
import { vi } from "vitest"

let mockTextOptions = vi.fn()
let mockCurrentEditor = vi.fn()

vi.mock('@/utils/editorStore', () => ({
    useEditorStore: () => ({
        textOptions: {
            text: 'test',
            left: 0,
            top: 0,
        },
        setTextOptions: mockTextOptions,
        setCurrentEditor: mockCurrentEditor,
        canvasOptions: {
            height: 0,
            orientation: '',
        },
        setCanvasOptions: vi.fn(),
    }),
}))

vi.mock('@/components/image/image', () => ({
    default: (props: any) => {
        const { urlEndpoint, ...restProps } = props;
        return <img {...restProps} />
    }
}))

describe('WorkSpace component', () => {
    const previewImg = {
        url: 'https://example.com/image.jpg',
        name: 'test',
        width: 100,
        height: 100,
    }
    
    it('should render correctly', () => {
        render(<WorkSpace previewImg={previewImg} />)

        const img = screen.getByAltText('test')
        expect(img).toBeInTheDocument()
        expect(img).toHaveAttribute('src', previewImg.url)
        expect(screen.getByTestId('text-input')).toBeInTheDocument()
    })

    it('updates text value on input change', () => {
        render(<WorkSpace previewImg={previewImg} />)

        const input = screen.getByTestId('text-input') as HTMLInputElement
        fireEvent.change(input, { target: { value: 'hello' } })
        
        expect(mockTextOptions).toHaveBeenCalledWith({
            text: 'hello',
            left: 0,
            top: 0,
        })
    })

    it('clears text when delete icon is clicked', () => {
        render(<WorkSpace previewImg={previewImg} />)

        const deleteIcon = screen.getByTestId('delete-icon')
        fireEvent.click(deleteIcon)

        expect(mockTextOptions).toHaveBeenCalledWith({
            text: '',
            left: 0,
            top: 0,
        })

        expect(mockCurrentEditor).toHaveBeenCalledWith('')
    })
})
