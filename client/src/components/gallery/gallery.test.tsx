import Gallery from "@/components/gallery/gallery";
import { useInfiniteQuery } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

vi.mock('@tanstack/react-query', async () => { return { useInfiniteQuery: vi.fn() }; });

vi.mock('@/components/galleryItem/galleryItem', () => ({
    default: (props: any) => {
        return <div >
            {props._id}
        </div>
    }
}))

describe('Gallery component', () => {
    it('renders pending state', () => {
        (useInfiniteQuery as any).mockReturnValue({ status: 'pending', })
        render(<Gallery search="" userId="" board_id="" />);

        expect(screen.getByTestId('loading-svg')).toBeInTheDocument();
    })

    it('renders error state', () => {
        (useInfiniteQuery as any).mockReturnValue({ status: 'error', })
        render(<Gallery search="" userId="" board_id="" />);

        expect(screen.getByText('Oops, something went wrong!')).toBeInTheDocument();
    })

    it('renders gallery items', () => {
        (useInfiniteQuery as any).mockReturnValue({
            status: 'success',
            dataLength: 2,
            next: vi.fn(),
            hasNextPage: true,
            fetchNextPage: vi.fn(),
            data: {
                pages: [
                    { pins: [{ _id: 1 }] },
                    { pins: [{ _id: 2 }] }
                ]
            }
        })

        render(<Gallery search="" userId="" board_id="" />);

        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
        expect(screen.getByTestId('loading-svg')).toBeInTheDocument();
    })
})