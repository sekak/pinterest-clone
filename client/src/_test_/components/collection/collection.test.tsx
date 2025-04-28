import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { MemoryRouter } from 'react-router-dom'
import { fetchBoards } from '@/utils/fetch'
import Collection from '@/components/collection/collection'
import { mockLoading } from '@/_test_/_mocks_/mockLoading'
import { mockErrorServer } from '@/_test_/_mocks_/mockError'
import { queryClient } from '@/_test_/_mocks_/mockQueryClient'

// Mock dependencies
vi.mock('@/utils/fetch', () => ({
  fetchBoards: vi.fn(),
}))

vi.mock('@/utils/loading', () => ({
  default: () => {
    return <h1>Loading...</h1>;
  }
}));

mockErrorServer()

// Mock timeago.js format function
vi.mock('timeago.js', () => ({
  format: vi.fn((date: string) => `formatted-${date}`),
}))

// Wrapper component to provide QueryClient and MemoryRouter
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    <MemoryRouter>{children}</MemoryRouter>
  </QueryClientProvider>
)

// Mock data
const mockData = [
  {
    _id: '1',
    media: 'https://example.com/image1.jpg',
    title: 'Board 1',
    createdAt: '2023-10-01T12:00:00Z',
  },
  {
    _id: '2',
    media: 'https://example.com/image2.jpg',
    title: 'Board 2',
    createdAt: '2023-10-02T12:00:00Z',
  },
]

describe('Collection Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    queryClient.clear()
  })

  it('renders loading state', async () => {
    vi.mocked(fetchBoards).mockImplementation(() => new Promise(() => {})) // Simulate pending state
    render(<Collection userId="123" />, { wrapper })

    expect(await screen.findByText(/Loading.../i)).toBeInTheDocument()  
  })

  it('renders error state', async () => {
    vi.mocked(fetchBoards).mockRejectedValue(new Error('Failed to fetch'))
    render(<Collection userId="123" />, { wrapper })

    expect(await screen.findByText('Oops, something went wrong!')).toBeInTheDocument()
  })

  it('renders data correctly', async () => {
    vi.mocked(fetchBoards).mockResolvedValue(mockData)
    render(<Collection userId="123" />, { wrapper })
    // Wait for data to render
    expect(await screen.findByText('Board 1')).toBeInTheDocument()
    expect(screen.getByText('Board 2')).toBeInTheDocument()
    expect(screen.getByText('1 pins - formatted-2023-10-01T12:00:00Z')).toBeInTheDocument()
    expect(screen.getByText('1 pins - formatted-2023-10-02T12:00:00Z')).toBeInTheDocument()

    // Check Link component
    expect(screen.getByText('Board 1').closest('a')).toHaveAttribute('href', '/pin/1')
    expect(screen.getByText('Board 2').closest('a')).toHaveAttribute('href', '/pin/2')
  })
})