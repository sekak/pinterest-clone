import Alignment from "@/components/editor/optionContent/alignment"
import { render, screen } from "@testing-library/react"
import { vi } from "vitest"

let mockSetCanvasOptions = vi.fn()
let mockTextOptions = 'left'

vi.mock('@/utils/editorStore', () => ({
    useEditorStore: () => ({
        textOptions: {
            align: mockTextOptions,
        },
        setTextOptions: mockSetCanvasOptions,
    }),
}))

describe('Size component', () => {


    it('renders correctly', () => {
        const array = ['Left', 'Center', 'Right']
        render(<Alignment />)

        expect(screen.getByText('Alignment')).toBeInTheDocument()
        array.forEach((item) => {
            expect(screen.getByText(item)).toBeInTheDocument()
        })
    })

    it('calls setTextOptions with "left"', () => {
        render(<Alignment />)
        const leftButton = screen.getByText('Left')
        leftButton.click()

        expect(leftButton).toHaveClass('bg-emerald-500 text-white')
        expect(mockSetCanvasOptions).toHaveBeenCalledWith({
            align: 'left',
        })
    })

    it('calls setTextOptions with "center"', () => {
        mockTextOptions = 'center'
        render(<Alignment />)
        const centerButton = screen.getByText('Center')
        centerButton.click()

        expect(centerButton).toHaveClass('bg-emerald-500 text-white')
        expect(mockSetCanvasOptions).toHaveBeenCalledWith({
            align: 'center',
        })
    })

    it('calls setTextOptions with "right"', () => {
        mockTextOptions = 'right'
        render(<Alignment />)
        const rightButton = screen.getByText('Right')
        rightButton.click()

        expect(rightButton).toHaveClass('bg-emerald-500 text-white')
        expect(mockSetCanvasOptions).toHaveBeenCalledWith({
            align: 'right',
        })
    })
})