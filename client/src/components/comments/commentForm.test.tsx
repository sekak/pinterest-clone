import { queryClient } from "@/_mocks_/mockQueryClient";
import CommentForm from "@/components/comments/commentForm";
import { addComment } from "@/utils/fetch";
import { QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor, } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

vi.mock('@/utils/fetch', () => {
    return {
        addComment: vi.fn(() => Promise.resolve({})),
    }
})

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
        <MemoryRouter>{children}</MemoryRouter>
    </QueryClientProvider>
)

describe('CommentForm', () => {

    beforeEach(() => {
        vi.clearAllMocks()
        queryClient.clear()
    })

    it('renders the input, emoji button and hide send button', () => {
        render(<CommentForm pin="123" />, { wrapper })

        const form = screen.getByTestId('form')
        const input = screen.getByTestId('input')
        const sendButton = screen.queryByTestId('send')

        expect(form).toBeInTheDocument()
        expect(input).toBeInTheDocument()
        expect(sendButton).not.toBeInTheDocument()

    });

    it('typing into the input and shows submit button when input', () => {
        render(<CommentForm pin="123" />, { wrapper })

        fireEvent.change(screen.getByTestId('input'), { target: { value: 'Hello' } })
        const sendButton = screen.getByTestId('send')

        expect(screen.getByTestId('input')).toHaveValue('Hello')
        expect(sendButton).toBeInTheDocument()
    })

    it('submits the comment and clears the input', async () => {

        render(<CommentForm pin="test-pin" />, { wrapper })

        const input = screen.getByTestId('input')
        fireEvent.change(input, { target: { value: 'Another Comment' } })

        const submitButton = screen.getByTestId('send')
        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(addComment).toHaveBeenCalledWith({
                pin: 'test-pin',
                description: 'Another Comment',
            })
        })
        expect((input as HTMLInputElement).value).toBe('')
    })
})