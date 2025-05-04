import GalleryItem from "@/components/galleryItem/galleryItem";
import { Props } from "@/components/galleryItem/types";
import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock('imagekitio-react', () => ({
    IKImage: (props: any) => {
      return <img {...props} />
    }
}))

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter>{children}</MemoryRouter>
)

describe('GalleryItem component', () => {
    const defaultProps: Props = {
        media: 'media',
        width: 10,
        height: 12,
        _id: 1,
    }

    it('renders correctly', () => {
        render(<GalleryItem {...defaultProps} />, { wrapper })

        expect(screen.getByRole('link')).toHaveAttribute('href', '/pin/1')
        expect(screen.getByRole('img')).toBeInTheDocument()
    });

    it('displays the save button and icons on hover', () => {
        render(<GalleryItem {...defaultProps} />, { wrapper })

        fireEvent.mouseEnter(screen.getByTestId('class-div'))
        expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
    })

    it('hides the save button and icons when not hovered', () => {
        render(<GalleryItem {...defaultProps} />, { wrapper })

        fireEvent.mouseLeave(screen.getByTestId('class-div'))
        expect(screen.queryByRole('button', { name: 'Save' })).not.toBeInTheDocument()
    })

})
