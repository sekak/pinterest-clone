import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import GalleryItem from '@/components/galleryItem/galleryItem';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/_mocks_/mockQueryClient';

vi.mock('@/components/postInteractions/postInteractions', () => ({
    default: () => <div data-testid="post-interactions" />,
}));

vi.mock('@/components/image/image', () => ({
    default: ({ media, h, w }: { media: string, h: string, w: string }) => (
        <img data-testid="media-image" src={media} height={h} width={w} alt="mock-media" />
    ),
}));

const renderWithRouter = (ui: React.ReactElement) => {
    const testQueryClient = queryClient;
    return render(
        <QueryClientProvider client={testQueryClient}>
            <BrowserRouter>{ui}</BrowserRouter>          
        </QueryClientProvider>
    );
};

describe('GalleryCard', () => {
    const baseProps = {
        _id: 123,
        height: 350,
        media: '/mock.jpg',
        width: 372,
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders image and link correctly', () => {
        renderWithRouter(<GalleryItem {...baseProps} />);

        const div = screen.getByTestId('class-div');
        expect(div).toHaveClass('flex relative');
        expect(div.style.gridRowEnd).toBe(`span ${Math.ceil(baseProps.height / 100)}`);

        expect(screen.getByTestId('media-image')).toBeInTheDocument();
        expect(screen.getByRole('link')).toHaveAttribute('href', `/pin/${baseProps._id}`);
    });

    it('shows PostInteractions on hover and hides on mouse leave', async () => {
        renderWithRouter(<GalleryItem {...baseProps} />);

        const div = screen.getByTestId('class-div');

        expect(screen.queryByTestId('post-interactions')).not.toBeInTheDocument();

        fireEvent.mouseEnter(div);
        expect(await screen.findByTestId('post-interactions')).toBeInTheDocument();

        fireEvent.mouseLeave(div);
        expect(screen.queryByTestId('post-interactions')).not.toBeInTheDocument();
    });
});
