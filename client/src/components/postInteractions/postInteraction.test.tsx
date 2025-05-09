import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClientProvider } from '@tanstack/react-query';
import PostInteractions from '@/components/postInteractions/postInteractions';
import * as api from '@/utils/apiRequest';
import * as fetchUtils from '@/utils/fetch';
import { queryClient } from '@/_mocks_/mockQueryClient';

vi.mock('@/utils/apiRequest', () => ({
  apiRequest: {
    post: vi.fn()
  }
}));

vi.mock('@/utils/fetch', () => ({
  InterActionFn: vi.fn()
}));

const renderWithClient = (ui: React.ReactElement) => {
  const testQueryClient = queryClient;
  return render(
    <QueryClientProvider client={testQueryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('PostInteractions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders like, share and save buttons for post variant', async () => {
    vi.spyOn(fetchUtils, 'InterActionFn').mockResolvedValue({
      isLiked: false,
      isSaved: false,
      countLikes: 10,
    });

    renderWithClient(<PostInteractions id="123" variant="post" />);

    await waitFor(() => {
      expect(screen.getByTestId('like-button')).toBeInTheDocument();
    });

    expect(screen.getByTestId('save-button')).toHaveTextContent('Save');
    expect(screen.getByText('10')).toBeInTheDocument();
  });

  it('renders save button for gallery variant', async () => {
    vi.spyOn(fetchUtils, 'InterActionFn').mockResolvedValue({
      isLiked: false,
      isSaved: true,
      countLikes: 5,
    });

    renderWithClient(<PostInteractions id="123" variant="gallery" />);

    await waitFor(() => {
      expect(screen.getByTestId('save-button')).toBeInTheDocument();
    });

    expect(screen.getByTestId('save-button')).toHaveTextContent('Saved');
  });

  it('calls interaction mutation on like click', async () => {
    const postMock = vi.spyOn(api.apiRequest, 'post').mockResolvedValue({});

    vi.spyOn(fetchUtils, 'InterActionFn').mockResolvedValue({
      isLiked: false,
      isSaved: false,
      countLikes: 1,
    });

    renderWithClient(<PostInteractions id="123" variant="post" />);

    const likeButton = await screen.findByTestId('like-button');
    fireEvent.click(likeButton);

    await waitFor(() => {
      expect(postMock).toHaveBeenCalledWith('/pins/interaction/123', { type: 'like' });
    });
  });

  it('disables interaction if id is missing', async () => {
    const postMock = vi.spyOn(api.apiRequest, 'post');

    renderWithClient(<PostInteractions id={undefined} variant="post" />);

    await waitFor(() => {
      expect(screen.queryByTestId('like-button')).toBeInTheDocument();
    });

    expect(postMock).not.toHaveBeenCalled();
  });
});
