import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import TopBar from './topBar';
import { BrowserRouter } from 'react-router-dom';

// Mock useNavigate
const mockUseNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
    return {
        ...actual,
        useNavigate: () => mockUseNavigate,
    };
});

vi.mock('@/components/userButton/userButton', () => ({
    default: () => (
        <div>
            mockUserButton
        </div>
    )
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>
        {children}
    </BrowserRouter>
);

describe('TopBar', () => {
    it('renders input and UserButton', () => {
        render(<TopBar />, { wrapper });

        expect(screen.getByText(/mockUserButton/i)).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
    });

    it('navigates to search page with query on form submit', () => {

        render(<TopBar />, { wrapper });

        const input = screen.getByPlaceholderText('Search')

        fireEvent.change(input, { target: { value: 'react' } })
        fireEvent.submit(screen.getByTestId('form'))
        expect(mockUseNavigate).toHaveBeenCalledWith('/search?search=react')
    });
});
