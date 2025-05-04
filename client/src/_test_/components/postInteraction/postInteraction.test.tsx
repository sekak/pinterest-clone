import { queryClient } from "@/_test_/_mocks_/mockQueryClient"
import PostInteractions from "@/components/postInteractions/postInteractions"
import { apiRequest } from "@/utils/apiRequest"
import { QueryClientProvider } from "@tanstack/react-query"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { vi } from "vitest"

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
)

let mockLoading = false


vi.mock('@tanstack/react-query', async () => {
    const actual = await vi.importActual<typeof import('@tanstack/react-query')>('@tanstack/react-query')
    return {
        ...actual,
        useQuery: vi.fn(() => ({
            isLoading: mockLoading,
            data: {
                isLiked: false,
                isSaved: false,
                countLikes: 0
            }
        })),
    }
})

vi.mock('@/skeleton/interAction', () => ({
    default: () => <div>Loading...</div>
}))

vi.mock('@/utils/apiRequest', () => ({
    apiRequest: {
        post: vi.fn(() => Promise.resolve({}))
    }
}))


describe('PostInteraction Component', () => {
    it('renders loading state', () => {
        mockLoading = true
        render(<PostInteractions id="123" />, { wrapper })
        
        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('renders interaction like button',async () => {
        mockLoading = false
        render(<PostInteractions id="123" />, { wrapper })

        fireEvent.click(screen.getByTestId('like-button'))
        
        await waitFor(() => {
            expect(apiRequest.post).toHaveBeenCalledWith(`/pins/interaction/${'123'}`, { type: 'like' });
        });        
    })
    
    it('renders interaction save button',async () => {
        mockLoading = false
        render(<PostInteractions id="123" />, { wrapper })

        fireEvent.click(screen.getByTestId('save-button'))
        
        await waitFor(() => {
            expect(apiRequest.post).toHaveBeenCalledWith(`/pins/interaction/${'123'}`, { type: 'save' });
        });        

        expect(screen.getByText('Save')).toBeInTheDocument()
    })
})
