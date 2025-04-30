import BackgroundColor from "@/components/editor/orientationContent/backgroundColor"
import { backgroundType } from "@/components/editor/utils/types"
import { fireEvent, render, screen } from "@testing-library/react"
import { vi } from "vitest"

let mockSetCanvasOptions = vi.fn()

vi.mock('react-colorful', () => ({
    HexColorPicker: (props: any) => {
        return (
            <div>
                <input
                    data-testid="color-picker"
                    onChange={(e) => props.onChange(e.target.value)}
                    value={props.color}
                />
            </div>
        )
    }
}))

describe('BackgroundColor component', () => {
    const props: backgroundType = {
        canvasOptions: {
            backgroundColor: '#ffffff',
        },
        setCanvasOptions: mockSetCanvasOptions,
    }
    beforeEach(() => {
        mockSetCanvasOptions.mockClear();
    });
    it('should render correctly', () => {
        render(<BackgroundColor {...props} />)

        expect(screen.getByText('Background Color')).toBeInTheDocument()
    })

    it('update value colorPickerOpen', () => {
        render(<BackgroundColor {...props} />)

        fireEvent.click(screen.getByTestId('background-color'))
        expect(screen.getByTestId('color-picker')).toBeInTheDocument()
    })

    it('change value colorPicker', () => {
        render(<BackgroundColor {...props} />)

        fireEvent.click(screen.getByTestId('background-color'))
        expect(screen.getByTestId('color-picker')).toBeInTheDocument()
        fireEvent.change(screen.getByTestId('color-picker'), { target: { value: '#000000' } })
        expect(mockSetCanvasOptions).toHaveBeenCalledWith({
            ...props.canvasOptions,
            backgroundColor: '#000000'
        })
    })
})