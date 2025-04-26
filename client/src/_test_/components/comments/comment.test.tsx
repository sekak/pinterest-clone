import Comment from '@/components/comments/comment'
import { Props } from '@/components/comments/types'
import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'


vi.mock('timeago.js', () => ({
    format: vi.fn((date: string) => `formatted-${date}`),
}))

vi.mock('imagekitio-react', () => ({
    IKImage: (props: any) => (
        <img {...props} />
    ),
}))

describe('Comment Component', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('should render the comment component with user data', () => {
        const mockComment: Props = {
            user: {
                username: 'testuser',
                img: 'https://example.com/avatar.jpg',
                alt: 'test'
            },
            description: 'This is a test comment',
            createdAt: '2023-10-01T12:00:00Z',
            _id: '1',
        }

        render(<Comment {...mockComment} />)

        const img = screen.getByRole('img') as HTMLImageElement
        expect(img).toBeInTheDocument()
        expect(img.getAttribute('alt')).toBe(mockComment.user.img)

        expect(screen.getByText('testuser')).toBeInTheDocument()
        expect(screen.getByText('This is a test comment')).toBeInTheDocument()
        expect(screen.getByText('formatted-2023-10-01T12:00:00Z')).toBeInTheDocument()
    })

    it('should render the comment component with default image', () => {
        const mockComment: Props = {
            user: {
                username: 'testuser',
                img: '',
            },
            description: 'This is a test comment',
            createdAt: '2023-10-01T12:00:00Z',
            _id: '1',
        }

        render(<Comment {...mockComment} />)

        const img = screen.getByRole('img') as HTMLImageElement
        expect(img).toBeInTheDocument()
        expect(img.getAttribute('alt')).toBe('/general/noAvatar.png')

        expect(screen.getByText('testuser')).toBeInTheDocument()
        expect(screen.getByText('This is a test comment')).toBeInTheDocument()
        expect(screen.getByText('formatted-2023-10-01T12:00:00Z')).toBeInTheDocument()
    })
})