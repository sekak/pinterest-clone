import Size from "@/components/editor/orientationContent/size"
import { SizeType } from "@/components/editor/utils/types"
import { render, screen } from "@testing-library/react"
import { vi } from "vitest"


describe('Size component', () => {
    const mockHandleClick = vi.fn()

    let defaultProps: SizeType = {
        handleClickSize: mockHandleClick,
        canvasOptions: {
            size: 'original',
            orientation: 'landscape',
        },
    }

    it('renders correctly', () => {
        render(<Size {...defaultProps} />)

        expect(screen.getByText('Size')).toBeInTheDocument()
        expect(screen.getByText('Original')).toBeInTheDocument()
    })

    it('calls handleClickSize with "original"', () => {
        render(<Size {...defaultProps} />)
        const originalButton = screen.getByText('Original')
        originalButton.click()

        expect(mockHandleClick).toHaveBeenCalledWith('original')
    })
    it('calls handleClickSize with size object landscape', () => {
        render(<Size {...defaultProps} />)
        const sizeButton = screen.getByText('2:1')
        sizeButton.click()

        expect(mockHandleClick).toHaveBeenCalledWith({
            name: '2:1',
            width: 2,
            height: 1,
        })

    })

    it('calls handleClickSize with size object portrait', () => {
        defaultProps = {
            ...defaultProps,
            canvasOptions: {
                ...defaultProps.canvasOptions,
                orientation: 'portrait',
            },
        }
        render(<Size {...defaultProps} />)
        const sizeButton = screen.getByText('1:2')
        sizeButton.click()

        expect(mockHandleClick).toHaveBeenCalledWith({
            name: '1:2',
            width: 1,
            height: 2,
        })
    })

})