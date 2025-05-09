import { mockErrorServer } from "@/_mocks_/mockError"
import { queryClient } from "@/_mocks_/mockQueryClient"
import Comments from "@/components/comments/comments"
import { QueryClientProvider } from "@tanstack/react-query"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import * as React from "react"
import { MemoryRouter } from "react-router-dom"
import { vi } from "vitest"
import { fetchComments } from "@/utils/fetch"


vi.mock('@/utils/fetch', async () => {
    const actual = await vi.importActual<any>('@/utils/fetch');
    return {
        ...actual,
        fetchComments: vi.fn(() => Promise.resolve({}))
    };
});

vi.mock('@/utils/loading', () => ({
    default: () => {
        return <h1>Loading...</h1>;
    }
}));

mockErrorServer()

vi.mock('@/components/comments/comment', () => ({
    default: (props: any) => {
        return <div >
            {props.description}
        </div>
    }
}))

vi.mock('@/components/comments/commentForm', () => ({
    default: (props: any) => {
        return <form data-testid="form">
            <input data-testid="input" />
            <button data-testid="send" type="submit">Send</button>
        </form>
    }
}))


const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
)

const mockData = [
    {
        _id: 'comment1',
        user: { username: 'testuser', img: 'img.jpg' },
        description: 'comment1',
        createdAt: '2024-01-01T00:00:00Z',
    }, {
        _id: 'comment2',
        user: { username: 'testuser', img: 'img.jpg' },
        description: 'comment2',
        createdAt: '2024-01-01T00:00:00Z',
    },
]

describe('Comments Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        queryClient.clear()
    })

    it('renders loading state', async () => {
        vi.mocked(fetchComments).mockImplementation(() => new Promise(() => { })) // Simulate pending state
        render(<Comments pin="123" />, { wrapper })

        expect(await screen.findByText(/Loading.../i)).toBeInTheDocument()
    })

    it('renders error state', async () => {
        vi.mocked(fetchComments).mockRejectedValue(mockData)
        render(<Comments pin="123" />, { wrapper })

        expect(await screen.findByText(/Oops, something went wrong!/i)).toBeInTheDocument()
    })

    it('render component with correctly data', async () => {
        vi.mocked(fetchComments).mockResolvedValue(mockData)
        render(<Comments pin="123" />, { wrapper })

        await waitFor(() => {
            expect(screen.getByText('2 Comments')).toBeInTheDocument()
            expect(screen.getByTestId('form')).toBeInTheDocument()
            expect(screen.getByText('Send')).toBeInTheDocument()

            fireEvent.click(screen.getByText('Show'))
            expect(screen.getByText('comment1')).toBeInTheDocument()
            expect(screen.getByText('comment2')).toBeInTheDocument()
            expect(screen.getByText('Hide')).toBeInTheDocument()
        })
    })

})