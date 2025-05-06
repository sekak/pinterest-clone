import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Register from './register';
import { BrowserRouter } from 'react-router-dom';
import { vi } from 'vitest';
import { apiRequest } from '@/utils/apiRequest';

// Mock router
vi.mock('react-router', () => ({
    ...vi.importActual('react-router'),
    useNavigate: () => vi.fn(),
}));

// Mock store
vi.mock('@/utils/authStore', () => ({
    default: () => ({
        setCurrentUser: vi.fn(),
    }),
}));

// Mock api
vi.mock('@/utils/apiRequest', () => ({
    apiRequest: {
        post: vi.fn(),
    },
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>{children}</BrowserRouter>
);

vi.mock('imagekitio-react', () => ({
    IKImage: () => {
        return <img src="img" alt="mocked image" />
    }
}));

describe('Register Page', () => {
    it('renders input fields and submit button', () => {
        render(<Register />, { wrapper });

        expect(screen.getByPlaceholderText('Choose a username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your full name')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Create a password')).toBeInTheDocument();
        expect(screen.getByText('Sign up')).toBeInTheDocument();
    });

    it('submits the form with valid data', async () => {
        render(<Register />, { wrapper });

        fireEvent.change(screen.getByPlaceholderText('Choose a username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Enter your full name'), { target: { value: 'Test User' } });
        fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Create a password'), { target: { value: 'password123' } });

        fireEvent.submit(screen.getByRole('button'));

        await waitFor(() => {
            expect(apiRequest.post).toHaveBeenCalledWith('/users/auth/register', {
                username: 'testuser',
                displayName: 'Test User',
                email: 'test@example.com',
                password: 'password123',
            });
        });
    });

    //   it('displays error message on failed registration', async () => {
    //     const mockPost = apiRequest.post as unknown as ReturnType<typeof vi.fn>;
    //     mockPost.mockRejectedValueOnce({
    //       response: {
    //         data: {
    //           message: 'Email already exists',
    //         },
    //       },
    //     });

    //     render(<Register />, { wrapper });

    //     fireEvent.change(screen.getByPlaceholderText('Choose a username'), { target: { value: 'testuser' } });
    //     fireEvent.change(screen.getByPlaceholderText('Enter your full name'), { target: { value: 'Test User' } });
    //     fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@example.com' } });
    //     fireEvent.change(screen.getByPlaceholderText('Create a password'), { target: { value: 'password123' } });

    //     fireEvent.submit(screen.getByRole('button', { name: /sign up/i }));

    //     await waitFor(() => {
    //       expect(screen.getByText('Email already exists')).toBeInTheDocument();
    //     });
    //   });
});
