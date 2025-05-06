import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Login from "./login";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { apiRequest } from "@/utils/apiRequest";

vi.mock('imagekitio-react', () => ({
    IKImage: () => {
        return <img src="img" alt="mocked image" />
    }
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>
        {children}
    </BrowserRouter>
);

vi.mock('@/utils/apiRequest', () => ({
    apiRequest: {
        post: vi.fn()
    },
}));

describe('Login Page', () => {

    it('should render the login page correctly', () => {
        render(<Login />, { wrapper });

        expect(screen.getByText(/Log in to Medspire/i)).toBeInTheDocument();
        expect(screen.getByText(/Find new ideas to try/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter your email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Enter your password/i)).toBeInTheDocument();
        expect(screen.getByText(/Forgot password\?/i)).toBeInTheDocument();
    });

    it('submit button should send the form data', async () => {
        render(<Login />, { wrapper });

        fireEvent.change(screen.getByPlaceholderText('Enter your email'), { target: { value: 'test@gmail.com' } });
        fireEvent.change(screen.getByPlaceholderText('Enter your password'), { target: { value: 'password123' } });

        fireEvent.submit(screen.getByTestId('form'));

        await waitFor(() => {
            expect(apiRequest.post).toHaveBeenCalledTimes(1);
            expect(apiRequest.post).toHaveBeenCalledWith('/users/auth/login', {
                email: 'test@gmail.com',
                password: 'password123',
            });
        });
    });

    it('should redirect to signup page on clicking signup link', () => {
        render(<Login />, { wrapper });

        const signupLink = screen.getByText(/Sign up/i);
        fireEvent.click(signupLink);

        expect(window.location.pathname).toBe('/auth/register');
    });

    it('should show error message on failed login', async () => {
        // Override the mock to simulate failed login
        (apiRequest.post as jest.Mock).mockRejectedValueOnce({
            response: {
                data: {
                    message: 'Invalid credentials',
                },
            },
        });

        render(<Login />, { wrapper });

        fireEvent.submit(screen.getByTestId('form'));

        await waitFor(() => {
            expect(screen.getByText('Invalid credentials')).toBeInTheDocument();
        });
    });
})